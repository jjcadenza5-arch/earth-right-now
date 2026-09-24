import fs from "node:fs";import assert from "node:assert/strict";import {embedResearchStatus} from "../src/embed-research-status.js";
const rows=JSON.parse(fs.readFileSync("data/embed-research-candidates.json","utf8"));
assert.equal(rows.length,3);assert.ok(rows.every(x=>x.status==="RESEARCH_ONLY"));
assert.ok(rows.every(x=>x.candidateEmbedUrl.startsWith("https://www.youtube-nocookie.com/embed/")));
const r=embedResearchStatus(rows);assert.equal(r.total,3);assert.equal(r.policyAccepted,3);assert.equal(r.approvedForCatalog,0);
assert.equal(r.needsHumanPlayback.length,3);assert.equal(r.needsPerVideoPermissionReview.length,3);
console.log("ERN embed research ledger passed");
