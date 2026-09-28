import fs from "node:fs";
const data=JSON.parse(fs.readFileSync(new URL("../data/realtime-context-sources.json",import.meta.url),"utf8"));
const fail=[];
if(data.publicActivationAllowed!==false) fail.push("context sources must remain public-OFF until explicit activation");
if(data.invariants?.contextIsNotCameraTruth!==true) fail.push("context/camera truth separation missing");
if(data.invariants?.staleContextMayNotBePresentedAsCurrent!==true) fail.push("stale-context guard missing");
if(data.invariants?.automaticPublicActivation!==false) fail.push("automatic context activation must remain disabled");
for(const s of data.sources||[]){
 if(s.ERNUse?.visualTruthSource!==false) fail.push(`${s.id}: visualTruthSource must be false`);
 if(s.ERNUse?.mayCreateLiveLabel!==false) fail.push(`${s.id}: context may not create LIVE label`);
 if(s.ERNUse?.mayAffectWatchEarthRanking!==false) fail.push(`${s.id}: context may not affect Watch Earth ranking`);
 if(!Array.isArray(s.activationGates)||s.activationGates.length<5) fail.push(`${s.id}: activation gates incomplete`);
 if(s.rights?.attributionRequired!==true) fail.push(`${s.id}: attribution requirement must be explicit`);
 const kind=s.acquisition?.kind;
 if(!["API","OFFICIAL_PAGE_MANUAL_REFRESH"].includes(kind)) fail.push(`${s.id}: unsupported/missing acquisition kind`);
 if(kind==="API"){
   if(!s.api?.service||!s.api?.auth||!s.api?.officialDatasetUrl) fail.push(`${s.id}: verified API contract incomplete`);
   if(s.api?.auth==="NONE") fail.push(`${s.id}: auth state must not be guessed as NONE`);
   if(s.freshnessPolicy?.serverTimestampRequired!==true) fail.push(`${s.id}: server/source timestamp requirement missing`);
 }
 if(kind==="OFFICIAL_PAGE_MANUAL_REFRESH"){
   if(!s.acquisition?.officialUrl) fail.push(`${s.id}: official manual-refresh URL missing`);
   if(s.acquisition?.automaticScrapingAllowed!==false) fail.push(`${s.id}: manual-refresh sources must not imply automatic scraping`);
   if(!s.freshnessPolicy?.manualVerificationRequired) fail.push(`${s.id}: manual verification rule missing`);
 }
 if(s.freshnessPolicy?.staleBehavior!=="HIDE_CURRENT_CONTEXT_AND_KEEP_CAMERA_SOURCE_VISIBLE") fail.push(`${s.id}: stale behavior must fail closed without hiding camera truth`);
}
console.log(JSON.stringify({ok:fail.length===0,total:data.sources?.length||0,states:(data.sources||[]).map(s=>({id:s.id,state:s.state,acquisition:s.acquisition?.kind,service:s.api?.service||null,auth:s.api?.auth||null})),fail},null,2));
if(fail.length) process.exit(1);
