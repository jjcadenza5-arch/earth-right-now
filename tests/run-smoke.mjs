import { spawnSync } from "node:child_process";
import { readdirSync } from "node:fs";
const files=readdirSync(new URL(".",import.meta.url)).filter(x=>x.endsWith(".smoke.js")).sort();
let failed=0;
for(const file of files){
  const r=spawnSync(process.execPath,[new URL(file,import.meta.url).pathname],{stdio:"inherit"});
  if(r.status!==0)failed++;
}
if(!files.length){console.error("No smoke tests found");process.exit(1)}
if(failed){console.error(`\n${failed} of ${files.length} smoke tests failed`);process.exit(1)}
console.log(`\nAll ${files.length} ERN smoke tests passed`);
