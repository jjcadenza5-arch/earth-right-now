import fs from "node:fs";
import assert from "node:assert/strict";
import {embedResearchStatus} from "../src/embed-research-status.js";

const rows=JSON.parse(fs.readFileSync("data/embed-research-candidates.json","utf8"));
assert.ok(rows.length>=5);
assert.ok(rows.every(x=>x.status==="RESEARCH_ONLY"||x.status==="APPROVED"));

const hida=rows.find(x=>x.id==="youtube-hida-takayama-channel-live");
assert.ok(hida);
assert.equal(hida.status,"APPROVED");
assert.equal(hida.playbackReview,"HUMAN_PLAYBACK_CONFIRMED");
assert.equal(hida.permissionReview,"PER_VIDEO_EMBED_CONFIRMED");
assert.equal(hida.promotion,"APPROVED_FOR_CATALOG");

const r=embedResearchStatus(rows);
assert.equal(r.total,rows.length);
assert.ok(r.policyAccepted>=4);
assert.equal(r.approvedForCatalog,1);
assert.ok(!r.next.some(x=>x.id==="youtube-hida-takayama-channel-live"));
assert.ok(!r.next.some(x=>x.playbackReview==="HUMAN_PLAYBACK_FAILED"));
assert.ok(r.deferredFailed.includes("youtube-monterey-open-sea"));
assert.ok(r.deferredFailed.includes("youtube-monterey-jelly-cam"));

console.log("ERN embed research ledger separates approved, active and failed-deferred candidates");
