import {readFile} from "node:fs/promises";

async function text(path){return readFile(new URL("../"+path,import.meta.url),"utf8")}
async function json(path){return JSON.parse(await text(path))}
const [signalsCfg,submissionCfg,deployWorkflow,signalsDeployment,submissionTransport]=await Promise.all([
  text("signals-worker/wrangler.jsonc"),
  text("submission-worker/wrangler.jsonc"),
  text(".github/workflows/deploy-participation-workers.yml"),
  json("data/earth-signal-deployment.json"),
  json("data/submission-transport.json")
]);

const checks={
  earthSignalsWorkerPrepared:signalsCfg.includes('"name": "ern-signals-api"')&&signalsCfg.includes('"ERN_EARTH_SIGNALS_ENABLED": "false"')&&signalsCfg.includes('"class_name": "SignalState"'),
  submissionWorkerPrepared:submissionCfg.includes('"name": "ern-submission-api"')&&submissionCfg.includes('"ERN_SUBMISSION_ENABLED": "false"')&&submissionCfg.includes('"class_name": "SubmissionInbox"'),
  manualDeploymentOnly:deployWorkflow.includes("workflow_dispatch:")&&!deployWorkflow.includes("\n  push:"),
  deploymentRechecksFailClosed:deployWorkflow.includes("ERN_EARTH_SIGNALS_ENABLED")&&deployWorkflow.includes("ERN_SUBMISSION_ENABLED")&&deployWorkflow.includes("Deployment may create infrastructure only; public activation remains off."),
  earthSignalsPublicOff:signalsDeployment.status==="NOT_DEPLOYED"&&signalsDeployment.endpointUrl==null,
  submissionPublicOff:submissionTransport.enabled===false&&!submissionTransport.endpoint
};
const prepared=checks.earthSignalsWorkerPrepared&&checks.submissionWorkerPrepared&&checks.manualDeploymentOnly&&checks.deploymentRechecksFailClosed;
const publicActivationOff=checks.earthSignalsPublicOff&&checks.submissionPublicOff;
const next=prepared&&publicActivationOff?"CONTROLLED_INFRASTRUCTURE_DEPLOYMENT":"REPAIR_PREPARATION_BOUNDARY";

console.log(JSON.stringify({
  phase:"PHASE_J_PARTICIPATION_INFRASTRUCTURE",
  state:prepared?"PREPARED_FOR_CONTROLLED_DEPLOYMENT":"PREPARATION_INCOMPLETE",
  prepared,
  publicActivationOff,
  checks,
  workers:{
    earthSignals:{prepared:checks.earthSignalsWorkerPrepared,publicEnabled:false,deploymentEvidence:signalsDeployment.status},
    submissions:{prepared:checks.submissionWorkerPrepared,publicEnabled:false,transportEnabled:submissionTransport.enabled===true}
  },
  safety:{
    automaticPublicActivationAllowed:false,
    automaticPublicationAllowed:false,
    automaticCatalogMutationAllowed:false,
    pushTriggeredInfrastructureDeploymentAllowed:false
  },
  next,
  note:"Repository preparation is not production deployment evidence. Controlled infrastructure deployment may occur only through the manual workflow; visitor-facing activation remains a separate explicit gate."
},null,2));
