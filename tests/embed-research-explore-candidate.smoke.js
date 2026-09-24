import fs from "node:fs";import assert from "node:assert/strict";
const rows=JSON.parse(fs.readFileSync("data/embed-research-candidates.json","utf8")),x=rows.find(r=>r.id==="explore-brooks-falls");
assert.ok(x);assert.equal(x.status,"RESEARCH_ONLY");assert.equal(x.platform,"Explore");assert.match(x.sourceUrl,/explore\.org\/livecams\/currently-live/);assert.match(x.candidateEmbedUrl,/explore\.org\/livecams\/player/);assert.match(x.permissionReview,/REQUIRES_REVIEW/);assert.equal(x.playbackReview,"HUMAN_PLAYBACK_REQUIRED");assert.equal(x.promotion,"BLOCKED_UNTIL_REVIEW");
console.log("ERN Explore Brooks Falls research candidate safely staged");
