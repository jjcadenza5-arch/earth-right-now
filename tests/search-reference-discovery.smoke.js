import assert from "node:assert/strict";import fs from "node:fs";
const app=fs.readFileSync("src/app-lite.js","utf8");
assert.ok(app.includes("s.title,s.placeId,s.city,s.state,s.region,s.country,s.provider,s.story,s.categories,s.tags,s.aliases"),"browser search document must include destination metadata, tags and aliases");
assert.ok(app.includes("function sourceSearchText("),"browser search must use the shared searchable destination document");
assert.ok(app.includes('matches=catalogMatches.filter(s=>guideEligible(s)||(s.health==="HEALTHY"&&!!safeExternalUrl(s.sourceUrl||s.officialUrl)))'),"known healthy destinations must remain discoverable when current verification lapses");
assert.ok(app.includes('reference-only'),"search status must disclose reference-only fallback");
assert.ok(app.includes("(guideEligible(b)?1:0)-(guideEligible(a)?1:0)"),"current source must win within a mixed destination group");
console.log("ERN browser search preserves destination discovery without faking currentness");
