import {readFile} from "node:fs/promises";
import {assessEarthSignalLiveHealth} from "../src/earth-signal-live-health.js";

const deployment=JSON.parse(await readFile(new URL("../data/earth-signal-deployment.json",import.meta.url),"utf8"));
const pilot=JSON.parse(await readFile(new URL("../data/phase4-earth-signals-pilot.json",import.meta.url),"utf8"));
const pilotActive=pilot?.state==="PUBLIC_PILOT_ACTIVE"&&deployment?.publicActivationAllowed===true;
const base=String(deployment?.endpointUrl||"").replace(/\/$/,"");
if(!/^https:\/\//.test(base))throw new Error("Earth Signals HTTPS endpoint is missing");

const controller=new AbortController();
const timeout=setTimeout(()=>controller.abort(),8000);
let response,payload;
try{
  response=await fetch(base+"/health",{headers:{accept:"application/json","user-agent":"ERN-Phase4-Observer/1.0"},signal:controller.signal});
  payload=await response.json();
}finally{
  clearTimeout(timeout);
}
const assessment=assessEarthSignalLiveHealth(payload,{pilotActive});
const report={
  schemaVersion:1,
  generatedAt:new Date().toISOString(),
  endpoint:base+"/health",
  httpStatus:response.status,
  ...assessment
};
console.log(JSON.stringify(report,null,2));
if(!response.ok||!assessment.healthy)process.exitCode=1;
