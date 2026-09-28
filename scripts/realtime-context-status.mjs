import fs from "node:fs";
const data=JSON.parse(fs.readFileSync(new URL("../data/realtime-context-sources.json",import.meta.url),"utf8"));
const fail=[];
if(data.publicActivationAllowed!==false) fail.push("context sources must remain public-OFF until explicit activation");
if(data.invariants?.contextIsNotCameraTruth!==true) fail.push("context/camera truth separation missing");
if(data.invariants?.staleContextMayNotBePresentedAsCurrent!==true) fail.push("stale-context guard missing");
for(const s of data.sources||[]){
 if(s.ERNUse?.visualTruthSource!==false) fail.push(`${s.id}: visualTruthSource must be false`);
 if(s.ERNUse?.mayCreateLiveLabel!==false) fail.push(`${s.id}: context may not create LIVE label`);
 if(!Array.isArray(s.activationGates)||s.activationGates.length<5) fail.push(`${s.id}: activation gates incomplete`);
 if(s.rights?.attributionRequired!==true) fail.push(`${s.id}: attribution requirement must be explicit`);
}
console.log(JSON.stringify({ok:fail.length===0,total:data.sources?.length||0,states:(data.sources||[]).map(s=>({id:s.id,state:s.state})),fail},null,2));
if(fail.length) process.exit(1);
