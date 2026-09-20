import fs from "node:fs";import assert from "node:assert/strict";
const m=JSON.parse(fs.readFileSync(new URL("../manifest.webmanifest",import.meta.url),"utf8"));
assert.equal(m.id,"/");assert.equal(m.start_url,"/");assert.equal(m.scope,"/");assert.equal(m.display,"standalone");
assert.equal(m.prefer_related_applications,false);assert.ok(m.categories.includes("travel"));
assert.ok(m.shortcuts.some(x=>x.name==="Watch Earth"));assert.ok(m.shortcuts.some(x=>x.name==="Explore Earth"));
assert.ok(m.icons.every(x=>!/^https?:/.test(x.src)));
console.log("install manifest smoke passed");
