import fs from "node:fs";

const readJson=path=>JSON.parse(fs.readFileSync(path,"utf8"));
const exists=path=>fs.existsSync(path);
const affiliate=readJson("data/affiliate-activation.json");
const offers=readJson("data/travel-offers.json");
const distribution=readJson("data/distribution-channels.json");
const earthSignals=readJson("data/earth-signal-deployment.json");
const submissions=readJson("data/submission-transport.json");
const media=readJson("data/now-moment-media-deployment.json");
const guide=readJson("data/guide-ai-deployment.json");
const brand=readJson("data/public-brand-facts.json");
const analyticsText=fs.readFileSync("src/analytics-config.js","utf8");

const verifiedOffers=(Array.isArray(offers)?offers:[]).filter(x=>x?.verified===true);
const programs=(affiliate.waves||[]).flatMap(w=>w.programs||[]).filter(x=>x&&typeof x==="object");
const program=id=>programs.find(x=>x.id===id)||null;
const connectedChannels=(distribution.channels||[]).filter(x=>x.state==="CONNECTED").map(x=>x.id);
const pendingChannels=(distribution.channels||[]).filter(x=>x.state!=="CONNECTED").map(x=>x.id);
const analyticsEnabled=/enabled\s*:\s*true/.test(analyticsText)&&!/provider\s*:\s*["']NONE["']/.test(analyticsText);

const externalGates=[];
const booking=program("booking-com"),viator=program("viator"),travelpayouts=program("travelpayouts-platform");
if(booking&&/PENDING|WAIT|REVIEW|ACTIVATION/i.test(String(booking.state)))externalGates.push({id:"booking-com",state:booking.state});
if(viator&&/PENDING|WAIT|ACTIVATION/i.test(String(viator.state)))externalGates.push({id:"viator",state:viator.state});
if(travelpayouts?.reviewState==="MATCHING_IN_PROGRESS")externalGates.push({id:"travelpayouts-program-matching",state:travelpayouts.reviewState,availablePrograms:Number(travelpayouts.availableProgramsObserved||0)});
if(earthSignals.status!=="DEPLOYED")externalGates.push({id:"earth-signals-deployment",state:earthSignals.status});
if(submissions.enabled!==true)externalGates.push({id:"submission-transport",state:submissions.status||"DISABLED"});
if(media.status!=="DEPLOYED")externalGates.push({id:"now-moment-media",state:media.status});
if(pendingChannels.length)externalGates.push({id:"social-channels",state:"NOT_CONNECTED",count:pendingChannels.length});

const status={
  schemaVersion:1,
  phase:"STAGE_Q_BUSINESS_OPERATIONS_CONTROL",
  generatedAt:new Date().toISOString(),
  publicIdentity:{
    canonicalUrl:brand.canonicalUrl||null,
    mediaKitPresent:exists("press.html"),
    socialClaims:(brand.socialAccountClaims||[]).length,
    contactClaimed:brand.contactClaimed===true
  },
  commercial:{
    activationState:affiliate.state||"UNKNOWN",
    bookingCom:booking?{state:booking.state,submittedAt:booking.submittedAt||null,decisionAt:booking.decisionAt||null,relationshipActive:booking.relationshipActive===true}:null,
    viator:viator?{state:viator.state,activatedAt:viator.activatedAt||null,partnerIdPresent:Boolean(viator.partnerId)}:null,
    travelpayouts:travelpayouts?{state:travelpayouts.state,reviewState:travelpayouts.reviewState||null,driveAutomationAllowed:travelpayouts.driveAutomationAllowed===true,availablePrograms:Number(travelpayouts.availableProgramsObserved||0)}:null,
    verifiedPublicOffers:verifiedOffers.length,
    affiliateOffers:verifiedOffers.filter(x=>x.affiliate===true).length,
    sponsoredOffers:verifiedOffers.filter(x=>x.sponsored===true).length
  },
  attribution:{
    boundedEventPrepared:true,
    analyticsConfigured:analyticsEnabled,
    outboundMeasurementActive:analyticsEnabled,
    bookingInferenceAllowed:false,
    revenueInferenceAllowed:false
  },
  distribution:{
    websiteShareReady:distribution.website?.storyDeepLinks===true,
    aiSearchReady:distribution.aiSearch?.sitemapPublished===true&&distribution.aiSearch?.robotsPublished===true,
    connectedChannels,
    externalConnectionRequired:pendingChannels
  },
  participation:{
    earthSignals:{status:earthSignals.status,publicActivationAllowed:earthSignals.publicActivationAllowed===true},
    submissions:{status:submissions.status||null,enabled:submissions.enabled===true},
    nowMomentMedia:{status:media.status,publicActivationAllowed:media.publicActivationAllowed===true},
    guide:{state:guide.state||guide.status||null,publicActivationAllowed:guide.publicActivationAllowed===true}
  },
  externalGates,
  safety:{
    revenueForecastAllowed:false,
    bookingOrConversionInferenceAllowed:false,
    paidRankingAllowed:false,
    automaticPartnerClaimAllowed:false,
    automaticExternalAccountActionAllowed:false,
    automaticPublicActivationAllowed:false,
    commercialSignalsMayAffectEarthRanking:false
  },
  next:externalGates.length?"WAIT_OR_ACT_ON_EXTERNAL_GATES_WITH_EVIDENCE":"OPERATE_AND_OBSERVE_WITHOUT_RANKING_EFFECT",
  note:"Business control is read-only. Counts and states are evidence, not demand, bookings, revenue, conversion, endorsement, partnership breadth or ranking signals."
};
console.log(JSON.stringify(status,null,2));
