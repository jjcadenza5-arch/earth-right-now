import fs from "node:fs";import assert from "node:assert/strict";import {sourceRevalidationTriage} from "../src/source-revalidation-triage.js";
const sources=JSON.parse(fs.readFileSync("data/sources.json","utf8"));
const r=sourceRevalidationTriage(sources,{availability:{results:[]},continuity:{rows:[]}});
assert.equal(r.items.find(x=>x.id==="maui-hale-pau-hana")?.lane,"CURATION_HOLD");
assert.equal(r.items.find(x=>x.id==="waikiki-south-shore")?.lane,"DEFERRED_PLAYBACK_REPROVE");
assert.equal(r.items.find(x=>x.id==="cold-lake-marina")?.lane,"DEFERRED_PLAYBACK_REPROVE");
assert.equal(r.items.find(x=>x.id==="jungfrau-region")?.lane,"HUMAN_MEDIA_REVIEW");
console.log("ERN known degraded exceptions stay out of ordinary immediate work");
