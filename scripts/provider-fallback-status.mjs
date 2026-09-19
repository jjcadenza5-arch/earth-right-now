import { readFile } from "node:fs/promises";import { auditFallbackCoverage } from "../src/provider-fallback-audit.js";
const rows=JSON.parse(await readFile(new URL("../data/sources.json",import.meta.url),"utf8")),issues=auditFallbackCoverage(rows),embedded=rows.filter(x=>x.playback==="EMBED").length;
console.log(`ERN provider fallback audit: ${embedded} embedded source(s), ${issues.length} issue(s)`);
if(issues.length){console.error(JSON.stringify(issues,null,2));process.exitCode=1}
