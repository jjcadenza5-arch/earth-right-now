import { readFile } from "node:fs/promises";
import { validateEmbedRegistry } from "../src/embed-registry-guard.js";
const rows=JSON.parse(await readFile(new URL("../data/sources.json",import.meta.url),"utf8")),errors=validateEmbedRegistry(rows);
console.log(`ERN embed registry: ${rows.filter(x=>x.playback==="EMBED").length} embedded source(s), ${errors.length} violation(s)`);
if(errors.length){console.error(JSON.stringify(errors,null,2));process.exitCode=1}
