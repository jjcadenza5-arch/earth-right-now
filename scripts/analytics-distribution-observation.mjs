import fs from "node:fs";
const analyticsPath=process.argv[2],eventsPath=process.argv[3]||"data/organic-distribution-events.json";
if(!analyticsPath)throw new Error("usage: analytics-distribution-observation <analytics.json> [events.json]");
const x=JSON.parse(fs.readFileSync(analyticsPath,"utf8"));
const e=JSON.parse(fs.readFileSync(eventsPath,"utf8"));
const refs=Array.isArray(x.referrers)?x.referrers:[];
const facebookHosts=new Set(["facebook.com","l.facebook.com","lm.facebook.com","m.facebook.com","mobile.facebook.com","web.facebook.com","fb.com"]);
const facebookReferralViews=refs.filter(r=>facebookHosts.has(String(r.value||"").toLowerCase())||String(r.value||"").toLowerCase().endsWith(".facebook.com")).reduce((n,r)=>n+(Number(r.count)||0),0);
const latest=[...(e.events||[])].sort((a,b)=>String(b.date||"").localeCompare(String(a.date||"")))[0]||null;
const pageViews=Number(x.visitors?.pageViews)||0,approxUnique=Number(x.visitors?.approxUnique)||0;
const eventCount=name=>(x.events||[]).filter(r=>String(r.value||"")===name).reduce((n,r)=>n+(Number(r.count)||0),0);
const current={
 pageViews,
 approximateUniqueVisitors:approxUnique,
 facebookReferralViews,
 facebookReferralShareOfPageViews:pageViews?Number((facebookReferralViews/pageViews).toFixed(4)):0,
 earthSearches:eventCount("earth_search"),
 zeroResultSearches:eventCount("earth_search_zero"),
 windowOpens:eventCount("window_opened"),
 externalSourceOpens:eventCount("external_source_opened"),
 travelOptionOpens:eventCount("travel_option_opened"),
 topSearches:(x.searches||[]).slice(0,5),
 topPlaces:(x.places||[]).slice(0,5)
};
const baseline=latest?.baseline&&typeof latest.baseline==="object"?latest.baseline:null;
const deltaMetric=k=>baseline&&Number.isFinite(Number(baseline[k]))?current[k]-Number(baseline[k]):null;
const generatedAt=x.generatedAt||new Date().toISOString();
const baselineAt=baseline?.observedAt?Date.parse(baseline.observedAt):NaN,nowAt=Date.parse(generatedAt);
const elapsedHours=Number.isFinite(baselineAt)&&Number.isFinite(nowAt)?Math.max(0,(nowAt-baselineAt)/36e5):null;
const milestones=Array.isArray(latest?.observationWindowsHours)?latest.observationWindowsHours.filter(Number.isFinite).map(Number).sort((a,b)=>a-b):[24,72,168];
const completedMilestones=elapsedHours===null?[]:milestones.filter(h=>elapsedHours>=h);
const nextMilestoneHours=elapsedHours===null?null:(milestones.find(h=>elapsedHours<h)??null);
const phase=elapsedHours===null?"NO_BASELINE_TIME":elapsedHours<24?"EARLY_UNDER_24H":elapsedHours<72?"POST_24H":elapsedHours<168?"POST_72H":"POST_7D";
const out={
 schemaVersion:2,
 generatedAt,
 analyticsWindowDays:x.windowDays||null,
 latestOrganicDistributionEvent:latest,
 observation:current,
 baseline:baseline?{
   observedAt:baseline.observedAt||null,
   metrics:{
     approximateUniqueVisitors:Number(baseline.approximateUniqueVisitors)||0,
     pageViews:Number(baseline.pageViews)||0,
     facebookReferralViews:Number(baseline.facebookReferralViews)||0,
     facebookReferralShareOfPageViews:Number(baseline.facebookReferralShareOfPageViews)||0,
     earthSearches:Number(baseline.earthSearches)||0,
     zeroResultSearches:Number(baseline.zeroResultSearches)||0,
     windowOpens:Number(baseline.windowOpens)||0,
     externalSourceOpens:Number(baseline.externalSourceOpens)||0,
     travelOptionOpens:Number(baseline.travelOptionOpens)||0
   }
 }:null,
 sinceBaseline:{
   elapsedHours:elapsedHours===null?null:Number(elapsedHours.toFixed(2)),
   phase,
   completedMilestonesHours:completedMilestones,
   nextMilestoneHours,
   deltas:{
     approximateUniqueVisitors:deltaMetric("approximateUniqueVisitors"),
     pageViews:deltaMetric("pageViews"),
     facebookReferralViews:deltaMetric("facebookReferralViews"),
     earthSearches:deltaMetric("earthSearches"),
     zeroResultSearches:deltaMetric("zeroResultSearches"),
     windowOpens:deltaMetric("windowOpens"),
     externalSourceOpens:deltaMetric("externalSourceOpens"),
     travelOptionOpens:deltaMetric("travelOptionOpens")
   }
 },
 exploration:{
   currentTopSearches:current.topSearches,
   currentTopPlaces:current.topPlaces,
   interpretationBoundary:"Aggregate behavior only. Search/place activity cannot identify an individual visitor as a nomad or prove that Facebook caused the activity."
 },
 safety:{
   impressionsInferred:false,
   groupReachInferred:false,
   audienceIdentityInferred:false,
   causationInferred:false,
   conversionsInferred:false,
   bookingsInferred:false,
   revenueInferred:false,
   paidPromotionAssumed:false
 },
 note:"Correlation context only. Manual distribution events and aggregate analytics may move together, but no causal or commercial outcome is inferred."
};
console.log(JSON.stringify(out,null,2));
