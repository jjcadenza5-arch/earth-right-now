import fs from "node:fs";
import { watchEarthSnapshot,buildWatchEarth,watchEarthEligible } from "../src/watch-earth.js";

const sources=JSON.parse(fs.readFileSync(new URL("../data/sources.json",import.meta.url),"utf8"));
const checks=sources.flatMap(s=>[s.lastSuccessfulCheck,s.checkedAt]).map(Date.parse).filter(Number.isFinite);
if(!checks.length){
  console.error("Watch Earth audit: catalog has no parseable check timestamps.");
  process.exit(1);
}
const anchor=new Date(Math.max(...checks)),day=anchor.toISOString().slice(0,10);
const hours=[0,6,12,18];
const rows=hours.map(hour=>{
  const now=new Date(`${day}T${String(hour).padStart(2,"0")}:00:00Z`);
  const items=buildWatchEarth(sources,{limit:20,now}),snap=watchEarthSnapshot(sources,{limit:20,now});
  const ids=items.map(s=>s.id),uniqueIds=new Set(ids),eligible=items.filter(s=>watchEarthEligible(s,{now})).length;
  const previews=items.filter(s=>s.truth==="PREVIEW").length;
  return{utc:now.toISOString(),...snap,eligible,duplicateIds:ids.length-uniqueIds.size,previews,titles:items.map(s=>s.title)};
});
const violations=[];
for(const row of rows){
  if(row.count<1)violations.push(`${row.utc}: no Watch Earth windows`);
  if(row.eligible!==row.count)violations.push(`${row.utc}: ${row.count-row.eligible} ineligible window(s)`);
  if(row.duplicateIds)violations.push(`${row.utc}: ${row.duplicateIds} duplicate source id(s)`);
  if(row.previews)violations.push(`${row.utc}: ${row.previews} PREVIEW item(s) leaked into Watch Earth`);
  if(row.places!==row.count)violations.push(`${row.utc}: journey repeats a place before reaching its available breadth`);
}
console.log(JSON.stringify({anchorCheck:anchor.toISOString(),audits:rows,violations},null,2));
if(violations.length){
  console.error(`Watch Earth audit failed with ${violations.length} invariant violation(s).`);
  process.exit(1);
}
console.log("Watch Earth audit passed across four UTC dayparts.");
