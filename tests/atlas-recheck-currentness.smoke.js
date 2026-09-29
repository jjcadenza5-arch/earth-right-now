import assert from "node:assert/strict";
import fs from "node:fs";
const app=fs.readFileSync(new URL("../src/app-lite.js",import.meta.url),"utf8");
assert.ok(app.includes('if(!currentTruthClaim(s)){mount.dataset.visualKind="reference";mount.append(scenicPoster(s));return}'),"non-current viewer media must fail closed to a reference visual");
assert.ok(app.includes('b.querySelector("small").textContent=publicTruth(alt)'),"alternate viewer labels must use currentness-aware public truth");
assert.ok(app.includes('openViewer(alt,{record:current,updateHash:current})'),"non-current alternates must not record interest or create stale deep links");
assert.ok(app.includes('p.onclick=()=>openViewer(s,{record:current,updateHash:current})'),"Atlas recheck pins must not record interest or create stale deep links");
console.log("Atlas and alternate recheck views remain reference-only and non-stateful");
