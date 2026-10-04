import assert from "node:assert/strict";import fs from "node:fs";
const a=fs.readFileSync("scripts/ai-search-readiness.mjs","utf8"),b=fs.readFileSync("scripts/build-destination-pages.mjs","utf8");
for(const x of ["OAI_SEARCHBOT_NOT_EXPLICITLY_ALLOWED","DESTINATION_AI_CONTEXT_MISSING","AI_GUIDE_NOT_IN_SITEMAP","PUBLIC_IDENTITY_INCOMPLETE","PLACE_ALIAS_SIDECAR_MISSING","DESTINATION_ALTERNATE_NAME_SCHEMA_MISSING"])assert.ok(a.includes(x),x+" guard missing");
for(const x of ["Provider: ","Source type: ","Playback: ","ERN source provider","ERN playback mode","relatedLink","how-ern-works.html","source-policy.html","editorial-principles.html"])assert.ok(b.includes(x),x+" destination context missing");
console.log("ERN AI-search discovery readiness contract passed");
