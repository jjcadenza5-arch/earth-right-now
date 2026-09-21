import assert from "node:assert/strict";import {earthGuideAction,differentFrom} from "../src/earth-guide-actions.js";
for(const q of ["Surprise me","Take me somewhere unexpected"])assert.equal(earthGuideAction(q).type,"SURPRISE");
for(const q of ["Show me what is live right now","What's happening right now?","What can I see right now?","Show me Earth right now","Life happening right now","Show me people happening on Earth right now"])assert.equal(earthGuideAction(q).type,"LIVE_NOW");
assert.equal(earthGuideAction("Show me somewhere completely different").type,"DIFFERENT");
assert.equal(earthGuideAction("Show me a peaceful beach").type,"SEARCH");
assert.equal(earthGuideAction("Show me snow right now").type,"SEARCH","specific current intent must stay in truthful filtered search");
assert.equal(earthGuideAction("Show me street life in Chiang Mai right now").type,"SEARCH","place-specific local-life requests must stay in filtered search");
const a={id:"a",country:"Japan",region:"Tokyo"},b={id:"b",country:"Japan",region:"Kyoto"},c={id:"c",country:"Kenya",region:"Laikipia"};assert.equal(differentFrom([a,b,c],a)[0],c);
console.log("ERN Earth Guide action smoke checks passed");
