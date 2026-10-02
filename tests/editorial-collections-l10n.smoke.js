import fs from "node:fs";import assert from "node:assert/strict";
const src=fs.readFileSync("src/home-i18n.js","utf8");
for(const lang of ["en","th","de","fr","ja","zh","es"])assert.match(src,new RegExp("\\b"+lang+":\\{"),"missing language "+lang);
for(const key of ["collectionsEyebrow","collectionsHeading","collectionsDeck","collectionWater","collectionWaterDeck","collectionMountains","collectionMountainsDeck","collectionCities","collectionCitiesDeck","collectionWildlife","collectionWildlifeDeck","collectionCalm","collectionCalmDeck","collectionBrowseAll"]){
  const count=(src.match(new RegExp(key+":","g"))||[]).length;
  assert.equal(count,7,key+" should exist in all seven ERN languages");
}
console.log("Phase 8 editorial collection copy is present across all seven ERN languages");
