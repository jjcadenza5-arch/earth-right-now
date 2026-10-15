import fs from "node:fs";
import path from "node:path";
import {SUPPLEMENTAL_FILES,mergeSupplementalParts} from "../src/search-extra-catalog.js";
export function readSupplementalParts(dataDir="data"){
 return SUPPLEMENTAL_FILES.map(file=>JSON.parse(fs.readFileSync(path.join(dataDir,file),"utf8")));
}
export function readSearchSupplemental(dataDir="data"){
 return mergeSupplementalParts(readSupplementalParts(dataDir));
}
