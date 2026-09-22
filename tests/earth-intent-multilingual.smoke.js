import assert from "node:assert/strict";
import { interpretEarthIntent } from "../src/earth-intent.js";
const localCases=["หมู่บ้าน","kleiner Ort","petit village","pueblo local","小さな町","小镇"];
for(const q of localCases)assert.ok(interpretEarthIntent(q).intents.includes("local"),`local intent: ${q}`);
const currentCases=["jetzt","maintenant","ahora","今","现在"];
for(const q of currentCases)assert.equal(interpretEarthIntent(q).wantsCurrent,true,`current intent: ${q}`);
const liveCases=["en direct","en vivo","ライブ","直播"];
for(const q of liveCases)assert.equal(interpretEarthIntent(q).wantsCurrent,true,`live intent: ${q}`);
console.log("ERN multilingual Earth intent checks passed");
