import {readFile} from "node:fs/promises";
import {providerFamilyResearchStatus} from "../src/provider-family-research.js";
const rows=JSON.parse(await readFile(new URL("../data/embed-provider-families.json",import.meta.url),"utf8"));
console.log(JSON.stringify(providerFamilyResearchStatus(rows),null,2));
