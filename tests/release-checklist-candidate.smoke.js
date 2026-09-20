import assert from "node:assert/strict";
import { releaseEvidenceMarkdown } from "../src/release-evidence-plan.js";
const sha="a".repeat(40),md=releaseEvidenceMarkdown({candidateCommit:sha});
assert.ok(md.includes(sha));
assert.ok(md.includes("release:record -- <key> <pass|fail> "+sha));
const generic=releaseEvidenceMarkdown();
assert.ok(generic.includes("<40-char candidate commit>"));
console.log("candidate-aware release checklist passed");
