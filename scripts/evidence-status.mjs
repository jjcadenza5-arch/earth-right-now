import { readFile } from "node:fs/promises";
import { RELEASE_EVIDENCE_KEYS,evidenceExpiry } from "../src/release-evidence.js";
const evidence=JSON.parse(await readFile(new URL("../data/release-evidence.json",import.meta.url),"utf8"));
let invalid=0;
for(const key of RELEASE_EVIDENCE_KEYS){
 const row=evidence[key]||{},expiry=evidenceExpiry(row.checkedAt);
 const state=row.ok===true&&String(row.note||"").trim()&&expiry.valid&&!expiry.expired?"PASS":row.checkedAt&&expiry.expired?"EXPIRED":"PENDING";
 console.log(`${key.padEnd(18)} ${state}${row.note?" — "+row.note:""}`);
 if(row.ok===true&&state!=="PASS")invalid++;
}
if(invalid){console.error(`\n${invalid} evidence record(s) claim ok=true without fresh auditable evidence.`);process.exit(1)}
