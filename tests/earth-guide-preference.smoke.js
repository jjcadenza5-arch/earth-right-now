import assert from "node:assert/strict";import {earthGuidePreferenceAction,earthGuidePreferenceReply} from "../src/earth-guide-preference.js";
assert.equal(earthGuidePreferenceAction("Something less expensive?",{placeId:"z"}).type,"PRICE");
assert.equal(earthGuidePreferenceAction("Is there a quieter place?",{placeId:"z"}).type,"QUIET");
for(const q of ["Something less expensive?","Is there a quieter place?"]){const a=earthGuidePreferenceAction(q,{placeId:null});assert.equal(a.type,"MISSING_CONTEXT");assert.match(earthGuidePreferenceReply(a).text,/place first/);assert.match(earthGuidePreferenceReply(a).text,/won’t guess/)}
assert.equal(earthGuidePreferenceReply({type:"PRICE"},{placeTitle:"Zermatt"}).canAnswer,false);
assert.match(earthGuidePreferenceReply({type:"PRICE"},{placeTitle:"Zermatt"}).text,/Zermatt/);
assert.equal(earthGuidePreferenceReply({type:"QUIET"},{placeTitle:"Zermatt"}).canAnswer,false);
assert.equal(earthGuidePreferenceReply({type:"PRICE"},{hasVerifiedPriceData:true,placeTitle:"Zermatt"}).canAnswer,true);
assert.equal(earthGuidePreferenceAction("Show me now"),null);
console.log("ERN Guide preference truth checks passed");
