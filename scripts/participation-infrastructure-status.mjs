import {readFile} from "node:fs/promises";

async function text(path){return readFile(new URL("../"+path,import.meta.url),"utf8")}
async function json(path){return JSON.parse(await text(path))}
const [signalsCfg,submissionCfg,mediaCfg,mediaWorker,mediaState,deployWorkflow,signalsDeployment,submissionTransport,mediaDeployment]=await Promise.all([
  text("signals-worker/wrangler.jsonc"),
  text("submission-worker/wrangler.jsonc"),
  text("media-worker/wrangler.jsonc"),
  text("media-worker/src/index.js"),
  text("media-worker/src/media-state.js"),
  text(".github/workflows/deploy-participation-workers.yml"),
  json("data/earth-signal-deployment.json"),
  json("data/submission-transport.json"),
  json("data/now-moment-media-deployment.json")
]);

const checks={
  earthSignalsWorkerPrepared:signalsCfg.includes('"name": "ern-signals-api"')&&signalsCfg.includes('"ERN_EARTH_SIGNALS_ENABLED": "false"')&&signalsCfg.includes('"class_name": "SignalState"'),
  submissionWorkerPrepared:submissionCfg.includes('"name": "ern-submission-api"')&&submissionCfg.includes('"ERN_SUBMISSION_ENABLED": "false"')&&submissionCfg.includes('"class_name": "SubmissionInbox"'),
  mediaWorkerPrepared:mediaCfg.includes('"name": "ern-now-moment-media"')&&mediaCfg.includes('"ERN_NOW_MOMENT_PHOTO_ENABLED": "false"')&&mediaCfg.includes('"class_name": "MediaState"')&&mediaCfg.includes('"bucket_name": "ern-now-moment-media"')&&mediaWorker.includes("automaticPublicationAllowed:false")&&mediaWorker.includes("directBucketPublicAccess:false")&&mediaState.includes("MAX_RETAINED_MEDIA=500"),
  manualDeploymentOnly:deployWorkflow.includes("workflow_dispatch:")&&!deployWorkflow.includes("\n  push:"),
  deploymentRechecksFailClosed:deployWorkflow.includes("ERN_EARTH_SIGNALS_ENABLED")&&deployWorkflow.includes("ERN_SUBMISSION_ENABLED")&&deployWorkflow.includes("ERN_NOW_MOMENT_PHOTO_ENABLED")&&deployWorkflow.includes("Deployment may create infrastructure only; public activation remains off."),
  earthSignalsPublicOff:signalsDeployment.status==="NOT_DEPLOYED"&&signalsDeployment.endpointUrl==null&&signalsDeployment.publicActivationAllowed===false,
  submissionPublicOff:submissionTransport.enabled===false&&!submissionTransport.endpoint,
  mediaPublicOff:mediaDeployment.status==="NOT_DEPLOYED"&&mediaDeployment.endpointUrl==null&&mediaDeployment.publicActivationAllowed===false&&mediaDeployment.videoEnabled===false
};
const prepared=checks.earthSignalsWorkerPrepared&&checks.submissionWorkerPrepared&&checks.mediaWorkerPrepared&&checks.manualDeploymentOnly&&checks.deploymentRechecksFailClosed;
const publicActivationOff=checks.earthSignalsPublicOff&&checks.submissionPublicOff&&checks.mediaPublicOff;
const next=prepared&&publicActivationOff?"CONTROLLED_INFRASTRUCTURE_DEPLOYMENT":"REPAIR_PREPARATION_BOUNDARY";

console.log(JSON.stringify({
  phase:"PHASE_J_TO_L_PARTICIPATION_INFRASTRUCTURE",
  state:prepared?"PREPARED_FOR_CONTROLLED_DEPLOYMENT":"PREPARATION_INCOMPLETE",
  prepared,
  publicActivationOff,
  checks,
  workers:{
    earthSignals:{prepared:checks.earthSignalsWorkerPrepared,publicEnabled:false,deploymentEvidence:signalsDeployment.status},
    submissions:{prepared:checks.submissionWorkerPrepared,publicEnabled:false,transportEnabled:submissionTransport.enabled===true},
    nowMomentMedia:{prepared:checks.mediaWorkerPrepared,publicEnabled:false,deploymentEvidence:mediaDeployment.status,videoEnabled:false,ttlMinutes:mediaDeployment.ttlMinutes}
  },
  safety:{
    automaticPublicActivationAllowed:false,
    automaticPublicationAllowed:false,
    automaticCatalogMutationAllowed:false,
    pushTriggeredInfrastructureDeploymentAllowed:false,
    visitorMediaMayUpgradeSourceTruth:false
  },
  next,
  note:"Repository preparation is not production deployment evidence. Earth Signals, submissions and Now Moment media may be deployed only through the manual workflow; visitor-facing activation remains a separate explicit gate."
},null,2));
