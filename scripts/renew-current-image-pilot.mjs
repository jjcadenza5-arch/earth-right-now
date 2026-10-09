import {readFile,writeFile} from "node:fs/promises";
import {assessCurrentImageProbe} from "../src/provider-current-image-verification.js";

const sourcesPath=new URL("../data/sources.json",import.meta.url);
const targetsPath=new URL("../data/provider-generated-targets.json",import.meta.url);
const observationsPath=new URL("../data/current-image-pilot-observations.json",import.meta.url);
const rows=JSON.parse(await readFile(sourcesPath,"utf8"));
const targets=JSON.parse(await readFile(targetsPath,"utf8"));
const observationLedger=JSON.parse(await readFile(observationsPath,"utf8"));
const pilotIds=new Set(["yellowstone-biscuit-basin-current-image","nz-ruapehu-current-image"]);
const allowedLedgerIds=Array.isArray(observationLedger.allowedSourceIds)?observationLedger.allowedSourceIds.map(String).sort():[];
const expectedLedgerIds=[...pilotIds].sort();
if(observationLedger.schemaVersion!==1)throw new Error("Pilot observation ledger schema mismatch");
if(observationLedger.pilot!=="CONTROLLED_IMAGE_REFRESH_2_SOURCE")throw new Error("Pilot observation ledger identity mismatch");
if(!Number.isFinite(Date.parse(observationLedger.activatedAt||"")))throw new Error("Pilot observation ledger activation time invalid");
if(Number(observationLedger.requiredSuccessfulRenewalDates)!==2)throw new Error("Pilot observation ledger renewal requirement mismatch");
if(JSON.stringify(allowedLedgerIds)!==JSON.stringify(expectedLedgerIds))throw new Error("Pilot observation ledger allowed source ids mismatch");
if(!Array.isArray(observationLedger.observations))throw new Error("Pilot observation ledger observations must be an array");
const pilotTargets=targets.filter(t=>pilotIds.has(t.sourceId));
if(pilotTargets.length!==2||new Set(pilotTargets.map(t=>t.sourceId)).size!==2||pilotTargets.some(t=>!pilotIds.has(t.sourceId)))throw new Error("Expected exactly two distinct controlled current-image pilot targets");

async function getImage(url){
 const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),8000);
 try{
  const u=new URL(url);u.searchParams.set("_ern",Date.now());
  const res=await fetch(u,{redirect:"follow",cache:"no-store",signal:controller.signal,headers:{"user-agent":"EarthRightNow-Pilot-Renewal/1.0"}});
  const buf=await res.arrayBuffer(),b=new Uint8Array(buf);
  let magicType=null;if(b.length>=3&&b[0]===0xff&&b[1]===0xd8&&b[2]===0xff)magicType="image/jpeg";else if(b.length>=8&&b[0]===0x89&&b[1]===0x50&&b[2]===0x4e&&b[3]===0x47)magicType="image/png";
  return{status:res.status,contentType:res.headers.get("content-type"),magicType,bytes:buf.byteLength,etag:res.headers.get("etag"),lastModified:res.headers.get("last-modified"),cacheControl:res.headers.get("cache-control")};
 }finally{clearTimeout(timer)}
}
const now=new Date(),renewed=[],blocked=[];
for(const t of pilotTargets){
 const source=rows.find(s=>s.id===t.sourceId);
 if(!source||source.playback!=="IMAGE_REFRESH"||source.permission!=="EMBED_ALLOWED"||source.sourceUrl!==t.exactTargetUrl){blocked.push({id:t.sourceId,reason:"PILOT_CONTRACT_MISMATCH"});continue}
 let image;try{image=await getImage(t.exactTargetUrl)}catch(error){blocked.push({id:t.sourceId,reason:"FETCH_FAILED",error:String(error?.message||error)});continue}
 const probe=assessCurrentImageProbe(t,{image,now});
 if(probe.state!=="FETCH_OK_TEMPORAL_EVIDENCE_CURRENT"||probe.automatedReviewPassed!==true){blocked.push({id:t.sourceId,reason:probe.state,probe});continue}
 const stamp=now.toISOString();
 source.checkedAt=stamp;source.lastSuccessfulCheck=stamp;source.failureReason=null;
 renewed.push({id:source.id,checkedAt:stamp,evidenceTimestamp:probe.evidenceTimestamp,evidenceAgeMinutes:probe.evidenceAgeMinutes});
}
if(blocked.length)throw new Error("Pilot renewal blocked: "+JSON.stringify(blocked));
const stamp=now.toISOString(),date=stamp.slice(0,10),event=process.env.GITHUB_EVENT_NAME||"local";
observationLedger.observations.push({
  observedAt:stamp,
  utcDate:date,
  event,
  state:"RENEWED",
  items:renewed.map(x=>({id:x.id,evidenceTimestamp:x.evidenceTimestamp,evidenceAgeMinutes:x.evidenceAgeMinutes}))
});
observationLedger.observations=observationLedger.observations.slice(-30);
await writeFile(sourcesPath,JSON.stringify(rows)+"\n","utf8");
await writeFile(observationsPath,JSON.stringify(observationLedger,null,2)+"\n","utf8");
console.log(JSON.stringify({state:"RENEWED",renewed,blocked:[],observation:{utcDate:date,event,total:observationLedger.observations.length},safety:{allowedSourceIds:[...pilotIds],permissionMutationAllowed:false,playbackMutationAllowed:false,rankingMutationAllowed:false}},null,2));
