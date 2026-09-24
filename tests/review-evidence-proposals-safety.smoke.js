import fs from "node:fs";import assert from "node:assert/strict";
const pkg=JSON.parse(fs.readFileSync("package.json","utf8"));assert.equal(pkg.scripts["inside:review-proposals"],"node scripts/review-evidence-proposals.mjs");
const src=fs.readFileSync("src/review-evidence-proposals.js","utf8");
for(const token of ["catalogMutationAllowed:false","automaticHealthChangeAllowed:false","automaticPermissionApprovalAllowed:false","automaticWriteAllowed:false","Proposal layer only"])assert.ok(src.includes(token),token);
console.log("ERN review evidence proposal safety wiring passed");
