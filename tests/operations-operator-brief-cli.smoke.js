import assert from "node:assert/strict";
import {mkdtempSync,writeFileSync} from "node:fs";
import {tmpdir} from "node:os";
import path from "node:path";
import {spawnSync} from "node:child_process";

const dir=mkdtempSync(path.join(tmpdir(),"ern-ops-brief-cli-"));
const write=(name,value)=>{const p=path.join(dir,name);writeFileSync(p,JSON.stringify(value));return p};
const args=[
 write("snapshot.json",{generatedAt:"2026-09-24T12:00:00Z",catalog:{healthy:1,total:1,degraded:0,expired:0},watchEarth:{strongCurrent:1,insideCurrent:1,status:"INSIDE_SHORTFALL",recommendedLimit:1},insideERN:{ready:1,targetReady:5,readyShortfall:4,recoveryDebt:2},providers:{families:1,targetFamilies:2,dominantShare:1,nextGoal:"REVIEW_SECOND_EMBED_PROVIDER"},release:{blockers:0},maintenance:{sourceRevalidation:0}}),
 write("delta.json",{direction:"BASELINE",score:0,improved:[],regressed:[]}),
 write("availability.json",{summary:{total:0,reachable:0,missing:0,blocked:0,temporaryError:0,timeout:0,networkError:0}}),
 write("recovery.json",{restorationCandidates:[],blocked:[]}),
 write("research.json",{next:[]}),
 write("horizon.json",{summary:{current:1,due6h:0,due12h:0,expired:0,missing:0,held:0},urgent:[]}),
 write("preflight.json",{rows:[]}),
 write("continuity.json",{summary:{persistentMissing:0,repeatedTransient:0,repeatedAccessLimitation:0,newMissing:0,recovered:0},incidents:[]}),
 write("commercial.json",{stage:"EMPTY_STAGING",publicActivationAllowed:false,partnerRegistry:{active:0,total:0},travelOfferRegistry:{current:0,total:0,placeCoverage:0}}),
 write("onboarding.json",{items:[{title:"Test Place",country:"Testland",recommendedAction:"RESEARCH_REAL_OPTIONS",score:88}]}),
 write("transport.json",{status:"DISABLED",active:false,missing:["ENDPOINT"]})
];
const r=spawnSync(process.execPath,["scripts/operations-operator-brief.mjs",...args],{encoding:"utf8"});
assert.equal(r.status,0,r.stderr);
assert.match(r.stdout,/Commercial staging/);
assert.match(r.stdout,/Commercial onboarding research/);
assert.match(r.stdout,/Submission transport/);
assert.match(r.stdout,/Read-only operational summary/);
console.log("ERN operations operator-brief CLI wiring passed");
