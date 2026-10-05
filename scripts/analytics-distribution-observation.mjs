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
const out={
 schemaVersion:1,
 generatedAt:x.generatedAt||new Date().toISOString(),
 analyticsWindowDays:x.windowDays||null,
 latestOrganicDistributionEvent:latest,
 observation:{
   pageViews,
   approximateUniqueVisitors:approxUnique,
   facebookReferralViews,
   facebookReferralShareOfPageViews:pageViews?Number((facebookReferralViews/pageViews).toFixed(4)):0
 },
 safety:{
   impressionsInferred:false,
   groupReachInferred:false,
   conversionsInferred:false,
   bookingsInferred:false,
   revenueInferred:false,
   paidPromotionAssumed:false
 },
 note:"Correlation context only. Manual distribution events and aggregate referrer counts do not establish causation or downstream commercial outcomes."
};
console.log(JSON.stringify(out,null,2));
