import {readFile} from "node:fs/promises";
import {providerGeneratedTargetStatus} from "../src/provider-generated-targets.js";
const rows=JSON.parse(await readFile(new URL("../data/provider-generated-targets.json",import.meta.url),"utf8"));
console.log(JSON.stringify(providerGeneratedTargetStatus(rows),null,2));
