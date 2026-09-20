import { readFile,writeFile } from "node:fs/promises";
import { evidencePatch } from "../src/evidence-capture.js";
const [key,status,commit,...noteParts]=process.argv.slice(2),note=noteParts.join(" ").trim();
if(!key||!status||!commit||!note){console.error("Usage: npm run release:record -- <key> <pass|fail> <40-char candidate commit> <evidence note>");process.exit(2)}
const ok=status==="pass"?true:status==="fail"?false:null;if(ok===null){console.error("Status must be pass or fail");process.exit(2)}
const url=new URL("../data/release-evidence.json",import.meta.url),ledger=JSON.parse(await readFile(url,"utf8"));
const next=evidencePatch(ledger,key,{ok,note,commit});
await writeFile(url,JSON.stringify(next,null,2)+"\n","utf8");
console.log(`Recorded ${key}: ${ok?"PASS":"FAIL"} for ${commit}`);
console.log("Run npm run release:evidence and npm run release:status before committing.");
