import { readFile } from "node:fs/promises";import { insideProviderResilience } from "../src/inside-provider-resilience.js";
const rows=JSON.parse(await readFile(new URL("../data/sources.json",import.meta.url),"utf8"));
console.log(JSON.stringify(insideProviderResilience(rows),null,2));
