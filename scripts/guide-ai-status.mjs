import {readFile} from "node:fs/promises";
import {publicGuideAiDeploymentEvidence} from "../src/guide-ai-deployment-manifest.js";
import {guideAiCapabilitiesFromDeployment} from "../src/guide-ai-deployment-readiness.js";
import {guideAiStatusReport} from "../src/guide-ai-status-report.js";

const manifest=JSON.parse(await readFile(new URL("../data/guide-ai-deployment.json",import.meta.url),"utf8"));
const parsed=publicGuideAiDeploymentEvidence(manifest);
if(!parsed.ok){
  console.error(JSON.stringify({feature:"Generative ERN Guide",mode:"DETERMINISTIC_ONLY",manifestValid:false,issues:parsed.issues},null,2));
  process.exit(1);
}
const capabilities=guideAiCapabilitiesFromDeployment(parsed.evidence);
const report=guideAiStatusReport(capabilities,{deploymentEvidence:parsed.evidence});
console.log(JSON.stringify({...report,manifestValid:true,manifestCheckedAt:parsed.evidence.checkedAt||null},null,2));
if(report.mode==="GENERATIVE_ENABLED"&&!report.ready)process.exitCode=1;
