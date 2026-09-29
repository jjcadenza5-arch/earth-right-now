import {readFile} from "node:fs/promises";
import {publicGuideAiDeploymentEvidence} from "../src/guide-ai-deployment-manifest.js";
import {GUIDE_AI_CAPABILITIES} from "../src/guide-ai-capabilities.js";
import {guideAiStatusReport} from "../src/guide-ai-status-report.js";

const manifest=JSON.parse(await readFile(new URL("../data/guide-ai-deployment.json",import.meta.url),"utf8"));
const parsed=publicGuideAiDeploymentEvidence(manifest);
if(!parsed.ok){
  console.error(JSON.stringify({feature:"Generative ERN Guide",mode:"DETERMINISTIC_ONLY",manifestValid:false,issues:parsed.issues},null,2));
  process.exit(1);
}
const report=guideAiStatusReport(GUIDE_AI_CAPABILITIES,{deploymentEvidence:parsed.evidence});
console.log(JSON.stringify({...report,manifestValid:true,manifestCheckedAt:parsed.evidence.checkedAt||null},null,2));
if(report.mode==="GENERATIVE_ENABLED"&&!report.ready)process.exitCode=1;
