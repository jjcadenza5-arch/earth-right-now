import fs from "node:fs";
import assert from "node:assert/strict";
import {affiliatePlatformResearchStatus} from "../src/affiliate-platform-research.js";

const rows=JSON.parse(fs.readFileSync("data/affiliate-platform-research.json","utf8"));
const r=affiliatePlatformResearchStatus(rows,{now:Date.parse("2026-09-29T12:00:00Z")});
assert.equal(r.total,5);
assert.equal(r.valid,5);
assert.equal(r.invalid,0);
assert.equal(r.researchCandidates,4);
assert.equal(r.activePlatforms,1);
assert.equal(r.publicActivationAllowed,false);

const research=r.items.filter(x=>x.state==="RESEARCH_CANDIDATE");
for(const x of research){
 assert.equal(x.relationshipActive,false);
 assert.equal(x.credentialsConfigured,false);
 assert.equal(x.publicActivationAllowed,false);
 assert.equal(x.trackedLinksAllowed,false);
 assert.equal(x.paidRankingAllowed,false);
}
const active=r.items.find(x=>x.id==="travelpayouts");
assert.equal(active.state,"ACTIVE_OPERATOR_CONFIRMED");
assert.equal(active.relationshipActive,true);
assert.equal(active.credentialsConfigured,true);
assert.equal(active.publicActivationAllowed,true);
assert.equal(active.trackedLinksAllowed,true);
assert.equal(active.manualToolsOnly,true);
assert.equal(active.driveAutomationAllowed,false);
assert.equal(active.automaticLinkRewritingAllowed,false);
assert.equal(active.automaticPlacementAllowed,false);
assert.equal(active.rankingAffectedByCommission,false);
assert.equal(active.paidRankingAllowed,false);
assert.ok(active.operatorEvidence);
assert.equal(r.safety.automaticApplicationAllowed,false);
assert.equal(r.safety.automaticPlacementAllowed,false);
assert.equal(r.safety.automaticLinkRewritingAllowed,false);
assert.equal(r.safety.paidRankingAllowed,false);
assert.equal(r.safety.revenueForecast,false);
console.log("ERN affiliate registry separates inactive research candidates from operator-confirmed active platforms");
