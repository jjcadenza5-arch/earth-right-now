import assert from "node:assert/strict";import {mkdtemp,writeFile} from "node:fs/promises";import os from "node:os";import path from "node:path";import {validateOperationsPacket} from "../src/operations-packet-integrity.js";
const dir=await mkdtemp(path.join(os.tmpdir(),"ern-packet-"));
const files={
 "verification-horizon.json":{},
 "source-availability.json":{results:[{id:"a",provesLive:false}]},
 "source-availability-continuity.json":{rows:[{id:"a",catalogMutationAllowed:false,automaticHealthChangeAllowed:false}]},
 "watch-earth-now.json":{},
 "watch-earth-balance.json":{},
 "provider-worklist.json":{},
 "inside-recovery.json":{},
 "inside-playback-horizon.json":{},
 "inside-provider-resilience.json":{},
 "embed-research.json":{},
 "embed-research-preflight.json":{rows:[{id:"y",permissionConfirmed:false,humanPlaybackConfirmed:false,promotionAllowed:false}]},
 "commercial-inventory.json":{stage:"EMPTY_STAGING",publicActivationAllowed:false,safety:{inventPartnersAllowed:false,unverifiedOffersVisible:false,undisclosedAffiliateLinksAllowed:false,paidRankingAllowed:false}},
 "trend-current.json":{schemaVersion:1},
 "trend-delta.json":{direction:"BASELINE"},
 "operations-status.json":{providerReview:{unsafe:[]}}
};
for(const [name,value] of Object.entries(files))await writeFile(path.join(dir,name),JSON.stringify(value));
await writeFile(path.join(dir,"operator-brief.md"),"_Read-only operational summary._");
let r=await validateOperationsPacket(dir);assert.equal(r.valid,true);assert.equal(r.issueCount,0);

const bad=await mkdtemp(path.join(os.tmpdir(),"ern-packet-bad-"));
for(const [name,value] of Object.entries(files))await writeFile(path.join(bad,name),JSON.stringify(value));
await writeFile(path.join(bad,"operator-brief.md"),"no boundary");
await writeFile(path.join(bad,"source-availability-continuity.json"),JSON.stringify({rows:[{id:"a",catalogMutationAllowed:true,automaticHealthChangeAllowed:false}]}));
await writeFile(path.join(bad,"embed-research-preflight.json"),JSON.stringify({rows:[{id:"y",permissionConfirmed:true,humanPlaybackConfirmed:false,promotionAllowed:false}]}));
await writeFile(path.join(bad,"commercial-inventory.json"),JSON.stringify({stage:"EMPTY_STAGING",publicActivationAllowed:true,safety:{inventPartnersAllowed:false,unverifiedOffersVisible:false,undisclosedAffiliateLinksAllowed:false,paidRankingAllowed:true}}));
r=await validateOperationsPacket(bad);assert.equal(r.valid,false);assert.ok(r.issues.some(x=>x.code==="CONTINUITY_MUTATION_BOUNDARY_VIOLATION"));assert.ok(r.issues.some(x=>x.code==="PREFLIGHT_PERMISSION_BOUNDARY_VIOLATION"));assert.ok(r.issues.some(x=>x.code==="PREMATURE_COMMERCIAL_ACTIVATION"));assert.ok(r.issues.some(x=>x.code==="COMMERCIAL_RANKING_BOUNDARY_VIOLATION"));assert.ok(r.issues.some(x=>x.code==="READ_ONLY_BOUNDARY_MISSING"));
console.log("ERN operations packet integrity passed");
