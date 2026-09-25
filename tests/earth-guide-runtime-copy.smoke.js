import assert from "node:assert/strict";import { guideRuntimeCopy } from "../src/earth-guide-runtime-copy.js";
for(const language of ["en","th","de","fr","es","ja","zh"]){assert.ok(guideRuntimeCopy("WINDOWS",{language,place:"Chiang Mai"}).includes("Chiang Mai"));assert.ok(guideRuntimeCopy("LIVE",{language,source:"Reykjavík"}).includes("Reykjavík"));assert.ok(guideRuntimeCopy("NO_LIVE",{language}).length>20)}
assert.match(guideRuntimeCopy("NEARBY",{language:"en",place:"Paris",count:1}),/1 nearby place /);assert.match(guideRuntimeCopy("NEARBY",{language:"en",place:"Paris",count:2}),/2 nearby places /);assert.equal(guideRuntimeCopy("WINDOWS",{language:"xx",place:"Rome"}),guideRuntimeCopy("WINDOWS",{language:"en",place:"Rome"}));console.log("ERN guide runtime localization passed");

for(const language of ["en","th","de","fr","es","ja","zh"]){
  assert.ok(/[?？]/.test(guideRuntimeCopy("LIVE",{language,source:"Reykjavík"})),"LIVE Guide copy should create curiosity in "+language);
  assert.ok(/[?？]/.test(guideRuntimeCopy("SURPRISE",{language,source:"Kyoto"})),"SURPRISE Guide copy should create curiosity in "+language);
}
