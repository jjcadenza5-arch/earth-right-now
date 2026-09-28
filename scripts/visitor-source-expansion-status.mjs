import fs from "node:fs";
const data=JSON.parse(fs.readFileSync(new URL("../data/visitor-source-expansion-candidates.json",import.meta.url),"utf8"));
const fail=[];
if(data.publicPromotionAllowed!==false) fail.push("research queue must remain non-public");
if(!Array.isArray(data.candidates)||data.candidates.length<5) fail.push("research queue unexpectedly small");
for(const c of data.candidates||[]){
  if(!c.id||!c.state||!c.why||!c.next) fail.push(`candidate incomplete: ${c.id||"UNKNOWN"}`);
  if(!Array.isArray(c.evidenceUrls)||!c.evidenceUrls.length) fail.push(`candidate lacks evidence URLs: ${c.id}`);
}
for(const [k,v] of Object.entries(data.guardrails||{})){
  if(k==="commercialSignalCannotPromoteCandidate" && v!==true) fail.push("commercial promotion guardrail missing");
}
const counts={};
for(const c of data.candidates||[]) counts[c.state]=(counts[c.state]||0)+1;
console.log(JSON.stringify({ok:fail.length===0,total:data.candidates?.length||0,states:counts,fail},null,2));
if(fail.length) process.exit(1);
