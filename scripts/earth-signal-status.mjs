import {readFile} from "node:fs/promises";
import {earthSignalStatusReport} from "../src/earth-signal-status-report.js";
import {earthSignalCapabilitiesFromDeployment} from "../src/earth-signal-deployment-readiness.js";
import {publicEarthSignalDeploymentEvidence} from "../src/earth-signal-deployment-manifest.js";

const manifest=JSON.parse(await readFile(new URL("../data/earth-signal-deployment.json",import.meta.url),"utf8"));
const parsed=publicEarthSignalDeploymentEvidence(manifest);
if(!parsed.ok){
  console.error(JSON.stringify({feature:"Earth Signals",mode:"READ_ONLY",manifestValid:false,issues:parsed.issues},null,2));
  process.exit(1);
}
const capabilities=earthSignalCapabilitiesFromDeployment(parsed.evidence);
const report=earthSignalStatusReport(capabilities,{deploymentEvidence:parsed.evidence});
console.log(JSON.stringify({...report,manifestValid:true,manifestCheckedAt:parsed.evidence.checkedAt||null},null,2));
if(report.mode==="CONTRIBUTION_ENABLED"&&!report.ready)process.exitCode=1;
