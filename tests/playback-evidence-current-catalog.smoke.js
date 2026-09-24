import fs from "node:fs";import assert from "node:assert/strict";import {playbackEvidenceConsistency} from "../src/playback-evidence-consistency.js";
const sources=JSON.parse(fs.readFileSync("data/sources.json","utf8")),observations=JSON.parse(fs.readFileSync("data/provider-observations.json","utf8"));
const r=playbackEvidenceConsistency(sources,observations,{now:new Date("2026-09-24T12:00:00Z"),freshHours:24,toleranceMinutes:2});
assert.equal(r.consistent,true,JSON.stringify(r.issues));assert.equal(r.summary.catalogMarkers,3);assert.ok(r.summary.humanObservations>=4);console.log("ERN current playback evidence ledger is consistent");
