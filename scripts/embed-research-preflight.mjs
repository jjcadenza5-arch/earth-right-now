import {readFile} from "node:fs/promises";import {runEmbedResearchPreflight} from "../src/embed-research-preflight.js";
const rows=JSON.parse(await readFile(new URL("../data/embed-research-candidates.json",import.meta.url),"utf8"));
console.log(JSON.stringify(await runEmbedResearchPreflight(rows,{timeoutMs:7000}),null,2));
