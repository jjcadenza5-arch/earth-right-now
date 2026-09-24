import assert from "node:assert/strict";import {insideProviderResilience} from "../src/inside-provider-resilience.js";
const base={playback:"EMBED",permission:"EMBED_ALLOWED",health:"HEALTHY"};
let r=insideProviderResilience([{...base,id:"a",embedUrl:"https://couchtourist.com/embed/cam/1/"},{...base,id:"b",embedUrl:"https://couchtourist.com/embed/cam/2/"}]);
assert.equal(r.providerFamilies,1);assert.equal(r.singleProvider,true);assert.equal(r.resilient,false);assert.equal(r.nextGoal,"REVIEW_SECOND_EMBED_PROVIDER");
r=insideProviderResilience([{...base,id:"a",embedUrl:"https://couchtourist.com/embed/cam/1/"},{...base,id:"b",embedUrl:"https://www.youtube.com/embed/abc"}]);
assert.equal(r.providerFamilies,2);assert.equal(r.singleProvider,false);assert.equal(r.resilient,true);
console.log("ERN inside provider resilience passed");
