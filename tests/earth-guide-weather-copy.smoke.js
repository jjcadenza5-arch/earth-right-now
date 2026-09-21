import assert from "node:assert/strict";import {earthGuideReply} from "../src/earth-guide.js";
const base={count:1,nearNowCount:1,availableNonCurrentCount:0,referenceCount:0,items:[{title:"Alpine Window"}]};
assert.match(earthGuideReply({...base,query:"snow now"}).text,/for snow/);
assert.match(earthGuideReply({...base,query:"rain now"}).text,/for rain/);
assert.doesNotMatch(earthGuideReply({...base,query:"snow now"}).text,/for mountains and snow/);
console.log("ERN Guide weather copy checks passed");
