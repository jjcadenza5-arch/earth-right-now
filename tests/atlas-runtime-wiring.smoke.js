import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
const app=await readFile(new URL("../src/app.js",import.meta.url),"utf8");
for(const needle of ["buildAtlas(all,filters","renderAtlas({mount:$(\"#atlasMap\")","readAtlasControls(document)","atlasDestinationResults(all,filters","showAtlasCluster"])assert.ok(app.includes(needle),`Atlas runtime wiring missing: ${needle}`);
console.log("ERN rendered Atlas wiring checks passed");
