import fs from "node:fs";import assert from "node:assert/strict";
const schema=JSON.parse(fs.readFileSync("data/sources.schema.json","utf8"));
assert.deepEqual(schema.properties.coordinateBasis.enum,["CAMERA_EXACT","PLACE_REFERENCE","REGION_REFERENCE",null]);
assert.equal(schema.properties.coordinateSourceUrl.pattern,"^https://");
const rules=JSON.stringify(schema.allOf);
assert.match(rules,/coordinateBasis/);assert.match(rules,/coordinateSourceUrl/);assert.match(rules,/"lat"/);assert.match(rules,/"lon"/);
console.log("ERN source coordinate schema contract passed");
