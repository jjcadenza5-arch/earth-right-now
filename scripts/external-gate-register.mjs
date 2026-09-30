import {GUIDE_AI_CAPABILITIES} from "../src/guide-ai-capabilities.js";
import fs from "node:fs";

const read=path=>JSON.parse(fs.readFileSync(path,"utf8"));
const viator=read("data/viator-api-deployment.json");
const affiliate=read("data/affiliate-activation.json");
const earth=read("data/earth-signal-deployment.json");
const submission=read("data/submission-transport.json");
const media=read("data/now-moment-media-deployment.json");
const guide=read("data/guide-ai-deployment.json");
const realtime=read("data/realtime-context-sources.json");
const seoulMappings=read("data/seoul-context-place-mappings.json");
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
}else if(viator.sandboxKeyState==="ACTIVE_AUTH_CONFIRMED"&&(!viator.taxonomyVerified||!viator.productSearchVerified||!viator.affiliateAttributionVerified)){
  add({
    id:"viator-api-product-validation",
    lane:"TRAVEL_API",
    state:viator.taxonomyVerified?"AUTH_AND_TAXONOMY_CONFIRMED_PUBLIC_OFF":"AUTH_CONFIRMED_TAXONOMY_PENDING",
    trigger:"A controlled non-public Viator product-search validation path is deployed/run for an explicitly approved destination mapping, and returned product URLs/campaign attribution are verified.",
    nextEligibleAt:null,
    eligibleNow:false,
    beforeTrigger:"KEEP_PUBLIC_PRODUCTS_OFF",
    taxonomyVerified:viator.taxonomyVerified===true,
    productSearchVerified:viator.productSearchVerified===true,
    affiliateAttributionVerified:viator.affiliateAttributionVerified===true
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
}else if(earth.publicActivationAllowed!==true){
  const evidenceComplete=earth.observability===true&&earth.costGuard===true;
  add({
    id:"earth-signals-public-activation",
    lane:"PARTICIPATION",
    state:evidenceComplete?"DEPLOYED_PUBLIC_OFF":"DEPLOYED_PUBLIC_OFF_EVIDENCE_PARTIAL",
    trigger:evidenceComplete
      ?"An explicit product decision approves a limited Earth Signals pilot after current deployment evidence is reviewed."
      :"Observability and cost-guard evidence are independently verified, then an explicit product decision approves a limited Earth Signals pilot.",
    nextEligibleAt:null,
    eligibleNow:false,
    beforeTrigger:"READ_ONLY",
    deploymentVerified:true,
    observabilityVerified:earth.observability===true,
    costGuardVerified:earth.costGuard===true
  });
}
if(submission.enabled!==true){
  const deployed=submission.status==="DEPLOYED"&&/^https:\/\//.test(String(submission.endpoint||""));
  add({
    id:"submission-transport",
    lane:"PARTICIPATION",
    state:deployed?"DEPLOYED_PUBLIC_OFF":"DISABLED",
    trigger:deployed
      ?"An explicit product decision enables the already-deployed Submission transport after current privacy, moderation and retention evidence is reviewed."
      :"Controlled submission Worker deployment passes live health evidence and transport is explicitly enabled.",
    nextEligibleAt:null,
    eligibleNow:false,
    beforeTrigger:"LOCAL_REVIEW_ONLY",
    deploymentVerified:deployed,
    retentionDays:Number(submission.retentionDays)||null,
    rawNetworkIdentifiersStored:submission.rawNetworkIdentifiersStored===true
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
}else if(media.publicActivationAllowed!==true){
  add({
    id:"now-moment-media-public-activation",
    lane:"NOW_MOMENT_MEDIA",
    state:"DEPLOYED_PUBLIC_OFF",
    trigger:"Deployment health, private storage, moderation, cleanup and cost evidence pass, then an explicit product decision approves a still-photo pilot and a separate public UI activation.",
    nextEligibleAt:null,
    eligibleNow:false,
    beforeTrigger:"PHOTO_UPLOAD_OFF"
  });
}
const guideActivationReady=Object.entries(GUIDE_AI_CAPABILITIES).filter(([k])=>k!=="deterministicFallback").every(([,v])=>v===true);
if(guide.status==="DEPLOYED"&&!guideActivationReady){
  add({
    id:"guide-ai-public-activation",
    lane:"GUIDE_AI",
    state:"BACKEND_DEPLOYED_CLIENT_DISABLED",
    trigger:"An explicit product decision enables the public generative Guide after current cost, privacy, fallback and quality evidence is reviewed.",
    nextEligibleAt:null,
    eligibleNow:false,
    beforeTrigger:"DETERMINISTIC_ONLY"
  });
}
const seoul=realtime.sources?.find(x=>x.id==="seoul-realtime-city-data")||null;
const seoulMap=seoulMappings.mappings?.find(x=>x.ernPlaceId==="seoul-plaza")||null;
if(seoul&&(!seoulMap||seoulMap.realResponseValidated!==true||seoulMap.mayPublishContext!==true||seoulMappings.publicActivationAllowed!==true)){
  add({
    id:"seoul-context-validation-and-activation",
    lane:"REALTIME_CONTEXT",
    state:seoul.state||"PUBLIC_OFF",
    trigger:"A Seoul Open Data API key is supplied, a real citydata_eng response validates the mapped provider area identity/timestamps, and explicit mapping/public activation approval is given.",
    nextEligibleAt:null,
    eligibleNow:false,
    beforeTrigger:"KEEP_CONTEXT_PUBLIC_OFF"
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

const eligibleNow=gates.filter(x=>x.eligibleNow);
const waiting=gates.filter(x=>!x.eligibleNow);
const timedWaiting=waiting.filter(x=>x.nextEligibleAt&&Number.isFinite(Date.parse(x.nextEligibleAt))).sort((a,b)=>Date.parse(a.nextEligibleAt)-Date.parse(b.nextEligibleAt));
const nextTimedReview=timedWaiting[0]?{id:timedWaiting[0].id,lane:timedWaiting[0].lane,nextEligibleAt:timedWaiting[0].nextEligibleAt,beforeTrigger:timedWaiting[0].beforeTrigger}:null;

console.log(JSON.stringify({
  schemaVersion:1,
  phase:"STAGE_R_EXTERNAL_GATE_TRIGGER_REGISTER",
  generatedAt:new Date().toISOString(),
  openGates:gates,
  count:gates.length,
  eligibleNow,
  waiting,
  nextTimedReview,
  untimedWaiting:waiting.filter(x=>!x.nextEligibleAt).map(x=>x.id),
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
