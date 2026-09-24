import { readFile } from "node:fs/promises";import { embedResearchStatus } from "../src/embed-research-status.js";
const rows=JSON.parse(await readFile(new URL("../data/embed-research-candidates.json",import.meta.url),"utf8"));
console.log(JSON.stringify(embedResearchStatus(rows),null,2));
