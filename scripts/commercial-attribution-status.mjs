import fs from "node:fs";
const config=JSON.parse(fs.readFileSync("data/commercial-attribution.json","utf8"));
const offers=JSON.parse(fs.readFileSync("data/travel-offers.json","utf8"));
const activation=JSON.parse(fs.readFileSync("data/affiliate-activation.json","utf8"));
const activeOffers=(offers||[]).filter(o=>o?.verified===true&&o?.url);
console.log(JSON.stringify({
  phase:"STAGE_P_COMMERCIAL_ATTRIBUTION_TRUTH",
  state:config.state,
  analyticsEnabled:config.analyticsEnabled===true,
  verifiedPublicOfferCount:activeOffers.length,
  offers:activeOffers.map(o=>({id:o.id,placeId:o.placeId,intent:o.intent,provider:o.provider,affiliate:o.affiliate===true,sponsored:o.sponsored===true,linkScope:o.linkScope||"destination"})),
  affiliateActivationState:activation.state||"UNKNOWN",
  eventMeaning:config.countsAs,
  doesNotProve:config.doesNotProve,
  ranking:config.ranking,
  next:config.analyticsEnabled?"OBSERVE_OUTBOUND_OPTION_OPENS":"KEEP_DEFAULT_OFF_UNTIL_ANALYTICS_DECISION",
  note:"Outbound option opens are not bookings, conversions, commissions or revenue. Partner reporting remains the authority for any later commercial outcome."
},null,2));
