import fs from "node:fs";
const d=JSON.parse(fs.readFileSync("data/analytics-deployment.json","utf8"));
const url=d.healthUrl;
let out={ok:false,state:"UNREACHABLE",url};
try{
 const r=await fetch(url,{headers:{accept:"application/json","user-agent":"ERN-Operations/1.0"}});
 const x=await r.json();
 out={ok:r.ok&&x?.ok===true&&x?.analyticsEnabled===true&&x?.durableStorage===true&&x?.rawNetworkIdentifiersStored===false&&x?.eventRowsStored===false,
   state:r.ok&&x?.analyticsEnabled===true?"OK":"NOT_READY",url,service:x?.service||null,analyticsEnabled:x?.analyticsEnabled===true,
   durableStorage:x?.durableStorage===true,rawNetworkIdentifiersStored:x?.rawNetworkIdentifiersStored===true,eventRowsStored:x?.eventRowsStored===true};
}catch(error){out.error=String(error?.message||error)}
console.log(JSON.stringify(out,null,2));if(!out.ok)process.exitCode=1;
