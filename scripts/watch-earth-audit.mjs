import fs from "node:fs";
import { watchEarthSnapshot,watchEarthEligible } from "../src/watch-earth.js";
import { buildDynamicWatchEarth } from "../src/dynamic-watch-earth.js";
import { watchEarthSequenceDiagnostics } from "../src/watch-earth-sequence-diagnostics.js";

const sources=JSON.parse(fs.readFileSync(new URL("../data/sources.json",import.meta.url),"utf8"));
const checks=sources.flatMap(s=>[s.lastSuccessfulCheck,s.checkedAt]).map(Date.parse).filter(Number.isFinite);
if(!checks.length){
  console.error("Watch Earth audit: catalog has no parseable check timestamps.");
  process.exit(1);
}
const anchor=new Date(Math.max(...checks)),day=anchor.toISOString().slice(0,10);
const hours=[0,6,12,18];
const auditMoments=[new Date(),...hours.map(hour=>new Date(`${day}T${String(hour).padStart(2,"0")}:00:00Z`))];
const rows=auditMoments.map(now=>{
  const items=buildDynamicWatchEarth(sources,{limit:5,now}),snap=watchEarthSnapshot(items,{limit:5,now});
  const ids=items.map(s=>s.id),uniqueIds=new Set(ids),eligible=items.filter(s=>watchEarthEligible(s,{now})).length;
  const previews=items.filter(s=>s.truth==="PREVIEW").length;
  const nonLiveVideo=items.filter(s=>s.truth!=="LIVE_VIDEO"||s.playback!=="EMBED"||s.permission!=="EMBED_ALLOWED").map(s=>s.id);
  const sequence=watchEarthSequenceDiagnostics(items);
  const weakFirstFive=items.slice(0,5).filter(s=>(Number(s.quality)||0)<84||(Number(s.moment)||0)<80).map(s=>s.id);
  return{utc:now.toISOString(),actualNow:Math.abs(Date.now()-now.getTime())<60000,...snap,...sequence,target:5,shortfall:Math.max(0,5-items.length),eligible,duplicateIds:ids.length-uniqueIds.size,previews,nonLiveVideo,weakFirstFive,titles:items.map(s=>s.title)};
});
const violations=[];
for(const row of rows){
  if(row.count<1)violations.push(`${row.utc}: no Watch Earth windows`);if(row.actualNow&&row.count<5)violations.push(`${row.utc}: actual-current Watch Earth below five eligible live cameras`);
  if(row.actualNow&&row.count>=5&&row.countries<3)violations.push(`${row.utc}: actual-current Watch Earth live-camera country breadth below (3)`);
  if(row.actualNow&&row.count>=5&&row.providers<3)violations.push(`${row.utc}: actual-current Watch Earth live-camera provider breadth below (3)`);
  if(row.actualNow&&row.count>=5&&row.dominantProviderShare>.6)violations.push(`${row.utc}: actual-current Watch Earth provider concentration above first-impression ceiling (60%)`);
  if(row.actualNow&&row.weakFirstFive.length)violations.push(`${row.utc}: weak first-impression window(s): ${row.weakFirstFive.join(", ")}`);
  if(row.eligible!==row.count)violations.push(`${row.utc}: ${row.count-row.eligible} ineligible window(s)`);
  if(row.duplicateIds)violations.push(`${row.utc}: ${row.duplicateIds} duplicate source id(s)`);
  if(row.previews)violations.push(`${row.utc}: ${row.previews} PREVIEW item(s) leaked into Watch Earth`);
  if(row.nonLiveVideo.length)violations.push(`${row.utc}: non-stream source(s) leaked into Watch Earth: ${row.nonLiveVideo.join(", ")}`);
  if(row.count>5)violations.push(`${row.utc}: more than five Watch Earth items`);
  if(row.places!==row.count)violations.push(`${row.utc}: journey repeats a place before reaching its available breadth`);
  if(row.count>=3&&row.resilience==="LIMITED")violations.push(`${row.utc}: provider resilience diagnostics unexpectedly limited for a full journey`);
}
console.log(JSON.stringify({anchorCheck:anchor.toISOString(),audits:rows,violations},null,2));
if(violations.length){
  console.error(`Watch Earth audit failed with ${violations.length} invariant violation(s).`);
  process.exit(1);
}
console.log("Watch Earth audit passed for the actual current clock and four anchored UTC dayparts.");
