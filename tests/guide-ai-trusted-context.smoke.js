import assert from "node:assert/strict";
import {guideAiTrustedContext,validateGuideAiModelResult} from "../src/guide-ai-trusted-context.js";

const catalog=[
 {id:"a",placeId:"p",title:"A",truth:"LIVE_VIDEO",permission:"EMBED_ALLOWED",health:"HEALTHY",playback:"EMBED",checkedAt:"2026-09-25T00:00:00Z"},
 {id:"b",placeId:"q",title:"B",truth:"LIVE_IMAGE",permission:"LINK_ONLY",health:"HEALTHY",playback:"EXTERNAL",checkedAt:"2026-09-25T00:00:00Z"}
];
const trusted=guideAiTrustedContext({placeId:"p",sourceIds:["a","b","fake"]},catalog);
assert.equal(trusted.serverRehydrated,true);assert.equal(trusted.selectionOrigin,"DETERMINISTIC_ERN_RESOLVER");
assert.deepEqual(new Set(trusted.sourceIds),new Set(["a","b"]));
assert.equal(validateGuideAiModelResult({answer:"Try A",sourceIds:["a"]},trusted).ok,true);
assert.equal(validateGuideAiModelResult({answer:"Invented",sourceIds:["fake"]},trusted).reason,"UNTRUSTED_SOURCE_REFERENCE");
console.log("Generative Guide trusts only server-rehydrated ERN catalog sources");
