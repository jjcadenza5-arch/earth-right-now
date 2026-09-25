import fs from "node:fs";import assert from "node:assert/strict";
const copy=fs.readFileSync("src/guide-public-copy.js","utf8"),app=fs.readFileSync("src/app-lite.js","utf8");
for(const key of ["forPlaces","aboutMoments"])assert.equal((copy.match(new RegExp(key+':',"g"))||[]).length,7,key);
assert.match(app,/label:guideMsg\("forPlaces"\)/);assert.match(app,/label:guideMsg\("aboutMoments"\)/);
assert.ok(!app.includes('label:"For places & cameras"'));assert.ok(!app.includes('label:"About Now Moments"'));
console.log("ERN Guide action-link labels are localized across all seven public languages");
