import {execFileSync} from "node:child_process";
function run(path){return JSON.parse(execFileSync(process.execPath,[path],{encoding:"utf8"}))}
const product=run("scripts/whole-product-status.mjs");
const phase=run("scripts/project-phase-status.mjs");
const participation=run("scripts/participation-infrastructure-status.mjs");
const media=run("scripts/now-moment-media-status.mjs");
const guide=run("scripts/guide-ai-status.mjs");
const local=run("scripts/local-directory-status.mjs");
const recency=run("scripts/source-recency-summary.mjs");
const concentration=run("scripts/provider-concentration-status.mjs");
const gates=run("scripts/external-gate-register.mjs");

const localBlockers=[];
if(product.conclusion!=="STABLE_BETA_READY")localBlockers.push("core-stable-beta");
if(phase.currentStage!=="STAGE_R_EXTERNAL_GATE_TRIGGER_REGISTER")localBlockers.push("canonical-stage");
if(participation.prepared!==true||participation.publicActivationOff!==true)localBlockers.push("participation-local-preparation");
if(media.prepared!==true||media.publicActivationAllowed!==false)localBlockers.push("now-moment-media-local-preparation");
if(guide.deterministicFallback!==true||!["DETERMINISTIC_ONLY","GENERATIVE_ENABLED"].includes(guide.mode))localBlockers.push("guide-local-foundation");
if(local.state!=="PILOT_COMPLETE")localBlockers.push("local-earth-pilot");
if(concentration.highRisk===true)localBlockers.push("provider-concentration");
if((recency.recheckDue?.routine||[]).length>0)localBlockers.push("routine-source-rechecks");
if((recency.outsideCurrentOrRecheck?.total||0)>0)localBlockers.push("expired-or-unknown-source-state");

const eligible=(gates.eligibleNow||[]).map(x=>x.id);
let state,next;
if(localBlockers.length){state="LOCAL_AUTONOMOUS_WORK_OPEN";next="WORK_ONLY_LOCAL_BLOCKERS"}
else if(eligible.length){state="EXTERNAL_REVIEW_ELIGIBLE";next="REVIEW_TRIGGER_EVIDENCE_WITHOUT_ASSUMING_SUCCESS"}
else{state="AUTONOMOUS_HOLD_EXTERNAL_WAIT";next="WAIT_FOR_MATERIAL_EXTERNAL_TRIGGER"}

console.log(JSON.stringify({
  schemaVersion:1,
  state,
  localBlockers,
  externalEligibleNow:eligible,
  nextTimedReview:gates.nextTimedReview||null,
  untimedWaiting:gates.untimedWaiting||[],
  persistentStaleDebt:(recency.recheckDue?.persistentDebt||[]).map(x=>x.id),
  currentCatalog:recency.current,
  next,
  safety:{
    inventWorkToAvoidHold:false,
    reopenCompletedLaneWithoutTrigger:false,
    automaticExternalActionAllowed:false,
    automaticPublicActivationAllowed:false,
    timePassingAloneCountsAsSuccess:false
  },
  note:"Autonomous hold is a valid success state. Resume only for a failed local hold check, an eligible external trigger, a material source/catalog change, or an explicitly opened product phase."
},null,2));
