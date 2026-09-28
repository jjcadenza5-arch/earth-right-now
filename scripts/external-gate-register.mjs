import fs from "node:fs";

const read=path=>JSON.parse(fs.readFileSync(path,"utf8"));
const viator=read("data/viator-api-deployment.json");
const affiliate=read("data/affiliate-activation.json");
const earth=read("data/earth-signal-deployment.json");
const submission=read("data/submission-transport.json");
const media=read("data/now-moment-media-deployment.json");
const distribution=read("data/distribution-channels.json");
const analytics=fs.readFileSync("src/analytics-config.js","utf8");
const now=Date.now();

const programs=(affiliate.waves||[]).flatMap(w=>w.programs||[]).filter(x=>x&&typeof x==="object");
const booking=programs.find(x=>x.id==="booking-com")||null;
const travelpayouts=programs.find(x=>x.id==="travelpayouts-platform")||null;
const connected=(distribution.channels||[]).filter(x=>x.state==="CONNECTED").map(x=>x.id);
const unconnected=(distribution.channels||[]).filter(x=>x.state!=="CONNECTED").map(x=>x.id);
const analyticsEnabled=/enabled\s*:\s*true/.test(analytics)&&!/provider\s*:\s*["']NONE["']/.test(analytics);

const gates=[];
function add(g){gates.push({reopenOnlyWhen:true,...g})}

if(viator.sandboxKeyState==="ENABLED_PENDING_ACTIVATION"){
  const retestAt=viator.nextRecommendedRetestAt||null;
  add({
    id:"viator-api-activation",
    lane:"TRAVEL_API",
    state:"WAIT_PROVIDER_ACTIVATION",
    trigger:"Viator sandbox auth succeeds, Viator reports activation, or the recommended retest time is reached.",
    nextEligibleAt:retestAt,
    eligibleNow:Boolean(retestAt&&Date.parse(retestAt)<=now),
    beforeTrigger:"DO_NOT_RETEST_OR_ROTATE_KEY"
  });
}
if(booking&&booking.state==="SUBMITTED_PENDING_REVIEW"){
  add({
    id:"booking-com-review",
    lane:"AFFILIATE_WAVE_A",
    state:booking.state,
    trigger:"Booking.com returns documented approval, rejection, or a material account-state change.",
    nextEligibleAt:null,
    eligibleNow:false,
    beforeTrigger:"WAIT"
  });
}
if(travelpayouts&&/MATCHING|CONTINUES/.test(String(travelpayouts.reviewState||""))){
  add({
    id:"travelpayouts-program-matching",
    lane:"AFFILIATE_PLATFORM",
    state:travelpayouts.reviewState||"MATCHING_IN_PROGRESS",
    trigger:"Travelpayouts materially changes the available/unlockable program set or finishes broader matching.",
    nextEligibleAt:null,
    eligibleNow:false,
    beforeTrigger:"NO_MASS_ACTIVATION_OR_DRIVE_AUTOMATION",
    currentlyAvailable:Number(travelpayouts.availableProgramsObserved||0),
    potentiallyUnlockable:Number(travelpayouts.unlockMoreObserved||0)
  });
}
if(earth.status!=="DEPLOYED"){
  add({
    id:"earth-signals-deployment",
    lane:"PARTICIPATION",
    state:earth.status,
    trigger:"Controlled Cloudflare deployment is intentionally run and live /health evidence passes.",
    nextEligibleAt:null,
    eligibleNow:false,
    beforeTrigger:"NO_PUBLIC_ACTIVATION"
  });
}
if(submission.enabled!==true){
  add({
    id:"submission-transport",
    lane:"PARTICIPATION",
    state:"DISABLED",
    trigger:"Controlled submission Worker deployment passes live health evidence and transport is explicitly enabled.",
    nextEligibleAt:null,
    eligibleNow:false,
    beforeTrigger:"LOCAL_REVIEW_ONLY"
  });
}
if(media.status!=="DEPLOYED"){
  add({
    id:"now-moment-media-deployment",
    lane:"NOW_MOMENT_MEDIA",
    state:media.status,
    trigger:"Structured Earth Signals are active first, then the media Worker/R2 deployment passes live health evidence.",
    nextEligibleAt:null,
    eligibleNow:false,
    beforeTrigger:"PHOTO_UPLOAD_OFF"
  });
}
if(unconnected.length){
  add({
    id:"official-social-channels",
    lane:"DISTRIBUTION",
    state:"NOT_CONNECTED",
    trigger:"An official ERN social account is actually created/owned and intentionally connected.",
    nextEligibleAt:null,
    eligibleNow:false,
    beforeTrigger:"DO_NOT_CLAIM_OR_POST",
    channels:unconnected
  });
}
if(!analyticsEnabled){
  add({
    id:"aggregate-analytics",
    lane:"COMMERCIAL_ATTRIBUTION",
    state:"OFF",
    trigger:"ERN intentionally configures an approved aggregate analytics provider/site token after privacy review.",
    nextEligibleAt:null,
    eligibleNow:false,
    beforeTrigger:"NO_ERN_TELEMETRY_TRANSMISSION"
  });
}

console.log(JSON.stringify({
  schemaVersion:1,
  phase:"STAGE_R_EXTERNAL_GATE_TRIGGER_REGISTER",
  generatedAt:new Date().toISOString(),
  openGates:gates,
  count:gates.length,
  eligibleNow:gates.filter(x=>x.eligibleNow),
  waiting:gates.filter(x=>!x.eligibleNow),
  connectedChannels:connected,
  safety:{
    inventTriggerEvidenceAllowed:false,
    automaticExternalActionAllowed:false,
    automaticCredentialRotationAllowed:false,
    automaticPublicActivationAllowed:false,
    automaticPartnerClaimAllowed:false,
    timePassingAloneCountsAsSuccess:false
  },
  next:gates.some(x=>x.eligibleNow)?"REVIEW_ELIGIBLE_TRIGGER":"HOLD_BLOCKED_LANES_AND_WORK_ELSEWHERE",
  note:"A trigger makes a lane eligible for evidence review; it does not prove success or authorize activation."
},null,2));
