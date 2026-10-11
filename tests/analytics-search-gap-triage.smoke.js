import assert from "node:assert/strict";
import {mkdtempSync,writeFileSync} from "node:fs";
import {tmpdir} from "node:os";
import path from "node:path";
import {spawnSync} from "node:child_process";
const dir=mkdtempSync(path.join(tmpdir(),"ern-gap-triage-"));
const a=path.join(dir,"analytics.json");
writeFileSync(a,JSON.stringify({
 generatedAt:"2026-10-05T11:00:00Z",windowDays:30,
 searchGaps:[
  {value:"new york",count:1},
  {value:"纽约",count:1},
  {value:"chiangmai",count:1},
  {value:"civic opera",count:1}
 ]
}));
const r=spawnSync(process.execPath,["scripts/analytics-search-gap-triage.mjs",a],{encoding:"utf8"});
assert.equal(r.status,0,r.stderr);
const x=JSON.parse(r.stdout);
const by=q=>x.rows.find(v=>v.query===q);
assert.equal(by("new york").state,"CURRENTLY_RESOLVES");
assert.equal(by("纽约").state,"CURRENTLY_RESOLVES");
assert.equal(by("chiangmai").state,"GENUINE_CURRENT_GAP");
assert.equal(by("civic opera").state,"NON_DESTINATION_OR_VENUE_QUERY");
assert.equal(x.safety.automaticCatalogMutationAllowed,false);
assert.equal(x.safety.automaticAliasMutationAllowed,false);
console.log("Search-gap triage distinguishes resolved historical gaps from genuine current gaps");
const {visitorDemandTriage}=await import('../src/visitor-demand-triage.js');
const now=new Date('2026-10-11T12:00:00Z');
const local={id:'local-test-cafe',placeId:'test-town',name:'Test Cafe',place:'Test Town',country:'Testland',type:'cafe',summary:'A town cafe',url:'https://example.com/cafe',verifiedAt:now.toISOString(),status:'APPROVED',paidPlacement:false,affiliate:false};
const view={id:'test-town',title:'Test Town',placeId:'test-town',country:'Testland',health:'HEALTHY',truth:'LIVE_VIDEO',permission:'EMBED_ALLOWED',playback:'EMBED',embedUrl:'https://www.youtube.com/embed/abc123',sourceUrl:'https://example.com/live',checkedAt:now.toISOString(),playbackVerifiedAt:now.toISOString()};
const demand=visitorDemandTriage({searches:[{value:'test cafe',count:4},{value:'test town',count:3}],places:[{value:'local-test-cafe',count:2}]},{locals:[local],sources:[view],now});
assert.equal(demand.rows.find(r=>r.query==='test cafe').state,'INFORMATION_ONLY');
assert.equal(demand.rows.find(r=>r.query==='test town').state,'CURRENT_VIEW_AVAILABLE');
assert.equal(demand.items.find(r=>r.key===local.id).resultOpens,2);
assert.equal(demand.items.find(r=>r.key===local.id).searchCount,4);
assert.equal(demand.measurement.resultStateAtEventTimeKnown,false);
assert.equal(demand.safety.newResearchQueueCreated,false);
const stale=visitorDemandTriage({searches:[{value:'test town',count:5}]},{sources:[{...view,playbackVerifiedAt:'2026-10-01T00:00:00Z'}],now});
assert.equal(stale.rows[0].state,'SOURCE_RECHECK_REQUIRED');
const hold=visitorDemandTriage({searches:[{value:'test cafe',count:10}]},{locals:[local],now,research:{searchDemandGaps:{items:[{query:'test cafe',priority:'MONITOR',status:'NO_SOURCE'}]}}});
assert.equal(hold.items[0].action,'HOLD_PENDING_NEW_SOURCE_EVIDENCE');
console.log('Information-only demand reuses aggregate searches and local opens without mistaking nearby cameras or stale proof for exact coverage');
