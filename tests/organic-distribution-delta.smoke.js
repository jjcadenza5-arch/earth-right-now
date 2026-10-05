import assert from "node:assert/strict";
import {mkdtempSync,writeFileSync} from "node:fs";
import {tmpdir} from "node:os";
import path from "node:path";
import {spawnSync} from "node:child_process";
const dir=mkdtempSync(path.join(tmpdir(),"ern-organic-delta-"));
const analytics={
 generatedAt:"2026-10-06T12:54:55Z",windowDays:30,
 visitors:{approxUnique:55,pageViews:310},
 referrers:[{value:"l.facebook.com",count:25},{value:"m.facebook.com",count:5},{value:"direct",count:200}],
 events:[
  {value:"earth_search",count:31},{value:"earth_search_zero",count:7},{value:"window_opened",count:224},
  {value:"external_source_opened",count:46},{value:"travel_option_opened",count:2},{value:"page_view",count:310}
 ],
 searches:[{value:"new york",count:5},{value:"switzerland",count:3}],
 places:[{value:"kyoto-hanamikoji",count:31},{value:"rovaniemi-santa-claus-village",count:29}]
};
const events={schemaVersion:1,events:[{
 id:"wave",date:"2026-10-05",channel:"facebook",observationWindowsHours:[24,72,168],
 baseline:{observedAt:"2026-10-05T10:54:55Z",approximateUniqueVisitors:43,pageViews:257,facebookReferralViews:22,facebookReferralShareOfPageViews:.0856,earthSearches:22,zeroResultSearches:6,windowOpens:193,externalSourceOpens:38,travelOptionOpens:1}
}]};
const a=path.join(dir,"analytics.json"),e=path.join(dir,"events.json");
writeFileSync(a,JSON.stringify(analytics));writeFileSync(e,JSON.stringify(events));
const r=spawnSync(process.execPath,["scripts/analytics-distribution-observation.mjs",a,e],{encoding:"utf8"});
assert.equal(r.status,0,r.stderr);
const x=JSON.parse(r.stdout);
assert.equal(x.schemaVersion,3);
assert.equal(x.sinceBaseline.phase,"POST_24H");
assert.deepEqual(x.sinceBaseline.completedMilestonesHours,[24]);
assert.equal(x.sinceBaseline.nextMilestoneHours,72);
assert.equal(x.sinceBaseline.deltas.approximateUniqueVisitors,12);
assert.equal(x.sinceBaseline.deltas.pageViews,53);
assert.equal(x.sinceBaseline.deltas.facebookReferralViews,8);
assert.equal(x.sinceBaseline.deltas.earthSearches,9);
assert.equal(x.sinceBaseline.deltas.windowOpens,31);
assert.equal(x.sinceBaseline.deltas.externalSourceOpens,8);
assert.equal(x.safety.audienceIdentityInferred,false);
assert.equal(x.safety.causationInferred,false);
assert.equal(x.exploration.currentTopSearches[0].value,"new york");
assert.equal(x.exploration.intensity.denominator,"approximateUniqueVisitors");
assert.equal(x.exploration.intensity.current.searchesPerApproxVisitor,0.5636);
assert.equal(x.exploration.intensity.current.windowOpensPerApproxVisitor,4.0727);
assert.equal(x.exploration.intensity.current.externalSourceOpensPerApproxVisitor,0.8364);
assert.equal(x.exploration.intensity.current.travelOptionOpensPerApproxVisitor,0.0364);
assert.equal(x.exploration.intensity.current.zeroResultSearchRate,0.2258);
assert.equal(x.exploration.intensity.baseline.searchesPerApproxVisitor,0.5116);
assert.equal(x.exploration.intensity.delta.searchesPerApproxVisitor,0.052);
console.log("Organic distribution observation reports safe aggregate discovery deltas, milestones and exploration intensity");
