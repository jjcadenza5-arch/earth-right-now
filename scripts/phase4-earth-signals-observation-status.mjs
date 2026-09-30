import {readFile} from "node:fs/promises";
import {assessPhase4EarthSignalsObservation} from "../src/phase4-earth-signals-observation.js";

const deployment=JSON.parse(await readFile(new URL("../data/earth-signal-deployment.json",import.meta.url),"utf8"));
const pilot=JSON.parse(await readFile(new URL("../data/phase4-earth-signals-pilot.json",import.meta.url),"utf8"));
const healthPath=process.argv[2]||null;
let liveHealth={};
if(healthPath){
  liveHealth=JSON.parse(await readFile(healthPath,"utf8"));
}
const report=assessPhase4EarthSignalsObservation({pilot,deployment,liveHealth,now:new Date()});
console.log(JSON.stringify({schemaVersion:1,generatedAt:new Date().toISOString(),...report},null,2));
if(!report.healthyNow)process.exitCode=1;
