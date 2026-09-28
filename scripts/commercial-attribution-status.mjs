import fs from "node:fs";
const configText=fs.readFileSync("src/analytics-config.js","utf8");
const offers=JSON.parse(fs.readFileSync("data/travel-offers.json","utf8"));
const activation=JSON.parse(fs.readFileSync("data/affiliate-activation.json","utf8"));
const verified=(Array.isArray(offers)?offers:[]).filter(x=>x?.verified===true);
const analyticsEnabled=/enabled\s*:\s*true/.test(configText)&&!/provider\s*:\s*["']NONE["']/.test(configText);
console.log(JSON.stringify({
  phase:"STAGE_P_COMMERCIAL_ATTRIBUTION_TRUTH",
  verifiedPublicTravelOffers:verified.length,
  affiliateState:activation.state||"UNKNOWN",
  boundedTravelEventPrepared:true,
  telemetryConfigured:analyticsEnabled,
  outboundMeasurementActive:analyticsEnabled,
  bookingInferenceAllowed:false,
  revenueInferenceAllowed:false,
  userProfilingAllowed:false,
  rankingMayUseCommercialEvents:false,
  eventFields:["offerId","placeId","intent","linkScope","affiliate","sponsored"],
  next:analyticsEnabled?"OBSERVE_AGGREGATE_OUTBOUND_ACTIONS":"KEEP_DEFAULT_OFF_UNTIL_ANALYTICS_INTENTIONALLY_ENABLED",
  note:"A travel-option click is only an outbound action. It is not evidence of a booking, purchase, commission, revenue, traveler identity, or preference profile."
},null,2));
