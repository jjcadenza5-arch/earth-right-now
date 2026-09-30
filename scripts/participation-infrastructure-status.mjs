import {readFile} from "node:fs/promises";

async function text(path){return readFile(new URL("../"+path,import.meta.url),"utf8")}
async function json(path){return JSON.parse(await text(path))}
const [signalsCfg,submissionCfg,mediaCfg,mediaWorker,mediaState,signalsWorker,submissionWorker,boundedJson,earthSignalService,deployWorkflow,signalsDeployment,submissionTransport,mediaDeployment]=await Promise.all([
  text("signals-worker/wrangler.jsonc"),
  text("submission-worker/wrangler.jsonc"),
  text("media-worker/wrangler.jsonc"),
  text("media-worker/src/index.js"),
  text("media-worker/src/media-state.js"),
  text("signals-worker/src/index.js"),
  text("submission-worker/src/index.js"),
  text("src/bounded-json-body.js"),
  text("src/earth-signal-service.js"),
  text(".github/workflows/deploy-participation-workers.yml"),
  json("data/earth-signal-deployment.json"),
  json("data/submission-transport.json"),
  json("data/now-moment-media-deployment.json")
]);

const checks={
  earthSignalsWorkerPrepared:signalsCfg.includes('"name": "ern-signals-api"')&&signalsCfg.includes('"ERN_EARTH_SIGNALS_ENABLED": "false"')&&signalsCfg.includes('"class_name": "SignalState"'),
  submissionWorkerPrepared:submissionCfg.includes('"name": "ern-submission-api"')&&submissionCfg.includes('"ERN_SUBMISSION_ENABLED": "false"')&&submissionCfg.includes('"class_name": "SubmissionInbox"'),
  boundedJsonPrepared:boundedJson.includes("readJsonBodyBounded")&&boundedJson.includes("REQUEST_TOO_LARGE"),
  signalsAtomicRateLimit:!earthSignalService.includes("limiter.check(")&&earthSignalService.includes("limiter.commit("),
  submissionAtomicRateLimit:!submissionWorker.includes('op:"rate-check"')&&submissionWorker.includes('op:"rate-commit"'),
  signalsBoundedBodies:signalsWorker.includes("readJsonBodyBounded")&&signalsWorker.includes("4096"),
  submissionBoundedBodies:submissionWorker.includes("readJsonBodyBounded")&&submissionWorker.includes("8192"),
  mediaWorkerPrepared:mediaCfg.includes('"name": "ern-now-moment-media"')&&mediaCfg.includes('"ERN_NOW_MOMENT_PHOTO_ENABLED": "false"')&&mediaCfg.includes('"class_name": "MediaState"')&&mediaCfg.includes('"bucket_name": "ern-now-moment-media"')&&mediaWorker.includes("automaticPublicationAllowed:false")&&mediaWorker.includes("directBucketPublicAccess:false")&&mediaState.includes("MAX_RETAINED_MEDIA=500"),
  manualDeploymentOnly:deployWorkflow.includes("workflow_dispatch:")&&!deployWorkflow.includes("\n  push:"),
  deploymentRechecksFailClosed:deployWorkflow.includes("ERN_EARTH_SIGNALS_ENABLED")&&deployWorkflow.includes("ERN_SUBMISSION_ENABLED")&&deployWorkflow.includes("ERN_NOW_MOMENT_PHOTO_ENABLED")&&deployWorkflow.includes("Deployment may create infrastructure only; public activation remains off."),
  earthSignalsDeployedPublicOff:signalsDeployment.status==="DEPLOYED"&&/^https:\/\//.test(String(signalsDeployment.endpointUrl||""))&&signalsDeployment.publicActivationAllowed===false,
  submissionDeployedPublicOff:submissionTransport.status==="DEPLOYED"&&submissionTransport.enabled===false&&/^https:\/\//.test(String(submissionTransport.endpoint||"")),
  mediaPublicOff:mediaDeployment.status==="NOT_DEPLOYED"&&mediaDeployment.endpointUrl==null&&mediaDeployment.publicActivationAllowed===false&&mediaDeployment.videoEnabled===false
};
const prepared=checks.earthSignalsWorkerPrepared&&checks.submissionWorkerPrepared&&checks.mediaWorkerPrepared&&checks.boundedJsonPrepared&&checks.signalsAtomicRateLimit&&checks.submissionAtomicRateLimit&&checks.signalsBoundedBodies&&checks.submissionBoundedBodies&&checks.manualDeploymentOnly&&checks.deploymentRechecksFailClosed;
const publicActivationOff=checks.earthSignalsDeployedPublicOff&&checks.submissionDeployedPublicOff&&checks.mediaPublicOff;
const next=prepared&&publicActivationOff?"CONTROLLED_REMAINING_INFRASTRUCTURE_DEPLOYMENT":"REPAIR_PREPARATION_BOUNDARY";

console.log(JSON.stringify({
  phase:"PHASE_J_TO_L_PARTICIPATION_INFRASTRUCTURE",
  state:prepared?"EARTH_SIGNALS_AND_SUBMISSIONS_DEPLOYED_MEDIA_PREPARED":"PREPARATION_INCOMPLETE",
  prepared,
  publicActivationOff,
  checks,
  workers:{
    earthSignals:{prepared:checks.earthSignalsWorkerPrepared,deployed:signalsDeployment.status==="DEPLOYED",publicEnabled:false,deploymentEvidence:signalsDeployment.status,endpointUrl:signalsDeployment.endpointUrl||null},
    submissions:{prepared:checks.submissionWorkerPrepared,deployed:submissionTransport.status==="DEPLOYED",publicEnabled:submissionTransport.enabled===true,transportEnabled:submissionTransport.enabled===true,deploymentEvidence:submissionTransport.status||null,endpointUrl:submissionTransport.endpoint||null},
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
  note:"Earth Signals and Submission infrastructure are deployed and remain public-OFF. Now Moment media infrastructure remains a separate controlled deployment; visitor-facing activation remains a separate explicit gate."
},null,2));
