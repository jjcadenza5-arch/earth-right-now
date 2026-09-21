import assert from "node:assert/strict";import {interpretEarthIntent} from "../src/earth-intent.js";import {earthGuideWeatherBoundary} from "../src/earth-guide-weather.js";
assert.equal(interpretEarthIntent("Where can I see snow?").intents.includes("snow"),true);
assert.equal(interpretEarthIntent("Show me somewhere raining now").intents.includes("rain"),true);
assert.equal(earthGuideWeatherBoundary("Where can I see snow?",{nearNowCount:0}).canClaimCurrent,false);
assert.match(earthGuideWeatherBoundary("Where can I see snow?",{nearNowCount:0}).text,/won’t claim/);
assert.equal(earthGuideWeatherBoundary("Show me snow now",{nearNowCount:2}).canClaimCurrent,true);
assert.equal(earthGuideWeatherBoundary("beautiful beach",{}),null);
console.log("ERN Guide weather truth checks passed");
