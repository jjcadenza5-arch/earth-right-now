import assert from "node:assert/strict";
import {guideAiTrustedContext,validateGuideAiModelResult} from "../src/guide-ai-trusted-context.js";

const catalog=[
 {id:"a",placeId:"p",title:"A",truth:"LIVE_VIDEO",permission:"EMBED_ALLOWED",health:"HEALTHY",playback:"EMBED",checkedAt:"2026-09-25T00:00:00Z"},
 {id:"b",placeId:"q",title:"B",truth:"LIVE_IMAGE",permission:"LINK_ONLY",health:"HEALTHY",playback:"EXTERNAL",checkedAt:"2026-09-25T00:00:00Z"}
];
const trusted=guideAiTrustedContext({placeId:"p",action:"SHOW_PLACE",sourceIds:["a","b","fake"]},catalog);
assert.equal(trusted.serverRehydrated,true);assert.equal(trusted.selectionOrigin,"DETERMINISTIC_ERN_RESOLVER");
assert.deepEqual(new Set(trusted.sourceIds),new Set(["a","b"]));

const accepted=validateGuideAiModelResult({
 segments:[
  {text:"Try A.",sourceIds:["a"]},
  {text:"B is another ERN view.",sourceIds:["b"]}
 ],
 placeId:"fake-place",action:"DELETE_EARTH"
},trusted);
assert.equal(accepted.ok,true);
assert.equal(accepted.result.answer,"Try A. B is another ERN view.");
assert.equal(accepted.result.placeId,"p");
assert.equal(accepted.result.action,"SHOW_PLACE");
assert.deepEqual(new Set(accepted.result.sourceIds),new Set(["a","b"]));

assert.equal(validateGuideAiModelResult({answer:"Free-form text",sourceIds:["a"]},trusted).reason,"GROUNDED_SEGMENTS_REQUIRED");
assert.equal(validateGuideAiModelResult({segments:[{text:"Invented",sourceIds:["fake"]}]},trusted).reason,"UNTRUSTED_SOURCE_REFERENCE");
assert.equal(validateGuideAiModelResult({segments:[{text:"No source",sourceIds:[]}]},trusted).reason,"SEGMENT_SOURCE_REQUIRED");

console.log("Generative Guide public prose is assembled only from server-trusted source-grounded segments");
