import fs from "node:fs";import assert from "node:assert/strict";
const offers=JSON.parse(fs.readFileSync("data/travel-offers.json","utf8"));assert.deepEqual(offers,[]);
const app=fs.readFileSync("src/app-lite.js","utf8");
assert.match(app,/state\.travelOffers=Array\.isArray\(travelRows\)\?travelRows:\[\]/);
assert.match(app,/https:\/\/www\.google\.com\/search\?q=/);
assert.match(app,/disclosure\.hidden=true;disclosure\.textContent=""/);
assert.match(app,/Partner links can be added later without changing the ERN experience/);
console.log("ERN empty travel inventory preserves current public fallback");
