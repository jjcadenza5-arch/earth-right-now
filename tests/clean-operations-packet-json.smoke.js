import fs from "node:fs";import assert from "node:assert/strict";
const yml=fs.readFileSync(".github/workflows/operations-watch.yml","utf8");
assert.equal((yml.match(/npm run /g)||[]).length,0);
assert.ok((yml.match(/npm --silent run /g)||[]).length>=8);
console.log("ERN clean operations JSON packet commands passed");
