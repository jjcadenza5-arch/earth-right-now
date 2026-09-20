import fs from "node:fs";const rows=JSON.parse(fs.readFileSync("data/sources.json","utf8"));
const ids=["maui-hale-pau-hana","waikiki-south-shore","cold-lake-marina"];
for(const id of ids){const s=rows.find(x=>x.id===id);console.assert(s,"quarantined source must remain auditable: "+id);console.assert(s.health==="DEGRADED","visitor-rejected source must stay degraded: "+id);console.assert(s.moment===0,"visitor-rejected source must not retain promotion moment: "+id);console.assert(String(s.failureReason||"").startsWith("VISITOR_PLAYBACK_REJECTED"),"visitor evidence must remain attached: "+id)}
console.log("ERN visitor-quality catalog invariants passed");
