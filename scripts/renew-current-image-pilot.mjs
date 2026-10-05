import {readFile,writeFile} from "node:fs/promises";
import {assessCurrentImageProbe} from "../src/provider-current-image-verification.js";

const sourcesPath=new URL("../data/sources.json",import.meta.url);
const targetsPath=new URL("../data/provider-generated-targets.json",import.meta.url);
const rows=JSON.parse(await readFile(sourcesPath,"utf8"));
const targets=JSON.parse(await readFile(targetsPath,"utf8"));
const pilotIds=new Set(["yellowstone-biscuit-basin-current-image","nz-ruapehu-current-image"]);
const pilotTargets=targets.filter(t=>pilotIds.has(t.sourceId));
if(pilotTargets.length!==2)throw new Error("Expected exactly two controlled current-image pilot targets");

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
 if(!source||source.currentImagePilot!==true||source.playback!=="IMAGE_REFRESH"||source.permission!=="EMBED_ALLOWED"){blocked.push({id:t.sourceId,reason:"PILOT_CONTRACT_MISMATCH"});continue}
 let image;try{image=await getImage(t.exactTargetUrl)}catch(error){blocked.push({id:t.sourceId,reason:"FETCH_FAILED",error:String(error?.message||error)});continue}
 const probe=assessCurrentImageProbe(t,{image,now});
 if(probe.state!=="FETCH_OK_TEMPORAL_EVIDENCE_CURRENT"||probe.automatedReviewPassed!==true){blocked.push({id:t.sourceId,reason:probe.state,probe});continue}
 const stamp=now.toISOString();
 source.checkedAt=stamp;source.lastSuccessfulCheck=stamp;source.failureReason=null;
 renewed.push({id:source.id,checkedAt:stamp,evidenceTimestamp:probe.evidenceTimestamp,evidenceAgeMinutes:probe.evidenceAgeMinutes});
}
if(blocked.length)throw new Error("Pilot renewal blocked: "+JSON.stringify(blocked));
await writeFile(sourcesPath,JSON.stringify(rows)+"\n","utf8");
console.log(JSON.stringify({state:"RENEWED",renewed,blocked:[],safety:{allowedSourceIds:[...pilotIds],permissionMutationAllowed:false,playbackMutationAllowed:false,rankingMutationAllowed:false}},null,2));
