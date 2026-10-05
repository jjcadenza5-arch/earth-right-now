import fs from "node:fs";import assert from "node:assert/strict";
import {validateOperatorReviewEvidence} from "../src/operator-review-evidence.js";
import {reviewEvidenceProposals} from "../src/review-evidence-proposals.js";
const packet=JSON.parse(fs.readFileSync("data/review-evidence/heping-island-generated-2026-10-05.json","utf8"));
const generated=JSON.parse(fs.readFileSync("data/provider-generated-targets.json","utf8"));
const validated=validateOperatorReviewEvidence(packet,{
 generatedTargetIds:generated.map(x=>x.id),
 expectedReviewOrigins:["https://earthrightnow.app/review/inside-ern.html"],
 maxItemAgeHours:24,
 now:new Date("2026-10-05T10:45:00Z")
});
assert.equal(validated.ok,true);
assert.equal(validated.generatedEvidence.length,1);
assert.equal(validated.generatedEvidence[0].id,"north-coast-heping-island-youtube-player");
const proposals=reviewEvidenceProposals(packet,{
 generatedTargetIds:generated.map(x=>x.id),
 generatedTargets:generated,
 expectedReviewOrigins:["https://earthrightnow.app/review/inside-ern.html"],
 maxReviewAgeHours:24,
 now:new Date("2026-10-05T10:45:00Z")
});
assert.equal(proposals.validation.ok,true);
assert.equal(proposals.generatedProposals.length,1);
assert.equal(proposals.generatedProposals[0].status,"READY_TO_RECORD_HUMAN_PLAYBACK_PENDING_EDITORIAL_REVIEW");
assert.equal(proposals.generatedProposals[0].catalogPromotionAllowed,false);
assert.equal(proposals.generatedProposals[0].automaticWriteAllowed,false);
console.log("Heping Island generated-target evidence validates against the exact staged official page/player and remains non-promotional");
