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
const reviewQueue=run("scripts/operator-review-queue-status.mjs");

const localBlockers=[];
if(product.conclusion!=="STABLE_BETA_READY")localBlockers.push("core-stable-beta");
if(phase.currentStage!=="STAGE_R_EXTERNAL_GATE_TRIGGER_REGISTER")localBlockers.push("canonical-stage");
if(!Number.isInteger(phase.phaseNumber)||phase.phaseNumber<4)localBlockers.push("canonical-phase");
if(participation.prepared!==true||!(participation.publicActivationOff===true||participation.phase4PilotActive===true))localBlockers.push("participation-local-preparation");
if(media.prepared!==true||media.publicActivationAllowed!==false)localBlockers.push("now-moment-media-local-preparation");
if(guide.deterministicFallback!==true||!["DETERMINISTIC_ONLY","GENERATIVE_ENABLED"].includes(guide.mode))localBlockers.push("guide-local-foundation");
if(local.state!=="PILOT_COMPLETE")localBlockers.push("local-earth-pilot");
if(concentration.highRisk===true)localBlockers.push("provider-concentration");
if((recency.recheckDue?.routine||[]).length>0)localBlockers.push("routine-source-rechecks");
if((recency.outsideCurrentOrRecheck?.total||0)>0)localBlockers.push("expired-or-unknown-source-state");
const humanOnlyPlaybackDebt=(reviewQueue.primaryItems||[]).length>0&&reviewQueue.readyShortfall>0;

const eligible=(gates.eligibleNow||[]).map(x=>x.id);
const coreComplete=phase.coreComplete===true;
let activePhaseStatus=null;
try{
  const statusPath=`scripts/phase${phase.phaseNumber}-operating-status.mjs`;
  activePhaseStatus=run(statusPath);
}catch{}
const activePhaseOpen=phase.phaseNumber>=6&&Number(activePhaseStatus?.openNonGatedLaneCount||0)>0;
let state,next;
if(localBlockers.length){state="LOCAL_AUTONOMOUS_WORK_OPEN";next="WORK_ONLY_LOCAL_BLOCKERS"}
else if(activePhaseOpen){state=`PHASE${phase.phaseNumber}_AUTONOMOUS_WORK_OPEN`;next=activePhaseStatus?.next||`CONTINUE_PHASE${phase.phaseNumber}_NON_GATED_WORK`}
else if(eligible.length){state="EXTERNAL_REVIEW_ELIGIBLE";next="REVIEW_TRIGGER_EVIDENCE_WITHOUT_ASSUMING_SUCCESS"}
else{state="AUTONOMOUS_HOLD_EXTERNAL_WAIT";next="WAIT_FOR_MATERIAL_EXTERNAL_TRIGGER"}

console.log(JSON.stringify({
  schemaVersion:1,
  coreComplete,
  completionState:coreComplete?(phase.phaseNumber>=5?`CORE_COMPLETE_PHASE_${phase.phaseNumber}_ACTIVE`:participation.phase4PilotActive===true?"CORE_COMPLETE_PHASE_4_PILOT_ACTIVE":"CORE_COMPLETE_EXTERNAL_OPTIONAL"):"CORE_INCOMPLETE",
  state,
  localBlockers,
  externalEligibleNow:eligible,
  nextTimedReview:gates.nextTimedReview||null,
  untimedWaiting:gates.untimedWaiting||[],
  persistentStaleDebt:(recency.recheckDue?.persistentDebt||[]).map(x=>x.id),
  humanOnlyPlaybackDebt:{required:humanOnlyPlaybackDebt,ready:reviewQueue.ready,targetReady:reviewQueue.targetReady,primaryReviewCount:(reviewQueue.primaryItems||[]).length,automaticPlaybackVerificationAllowed:false},
  currentCatalog:recency.current,
  activePhase:activePhaseStatus?{phase:phase.phaseNumber,label:phase.phaseLabel,openNonGatedLaneCount:activePhaseStatus.openNonGatedLaneCount,activeLanes:activePhaseStatus.activeLanes,plannedLanes:activePhaseStatus.plannedLanes}:null,
  next:humanOnlyPlaybackDebt&&localBlockers.length===0&&!activePhaseOpen?"HUMAN_PLAYBACK_REVIEW_REQUIRED_NO_AUTOMATIC_SUBSTITUTE":next,
  safety:{
    inventWorkToAvoidHold:false,
    reopenCompletedLaneWithoutTrigger:false,
    automaticExternalActionAllowed:false,
    automaticPublicActivationAllowed:false,
    timePassingAloneCountsAsSuccess:false
  },
  note:coreComplete
    ?(phase.phaseNumber>=6
      ?`ERN core is complete and Phase ${phase.phaseNumber} — ${phase.phaseLabel} — is active. Continue its declared non-gated workplan before entering hold; external account actions and separate feature gates remain closed.`
      :participation.phase4PilotActive===true
        ?"ERN core is complete and the limited Earth Signals Phase 4 pilot is active. Autonomous work should observe the pilot and preserve remaining gates without inventing new construction."
        :"ERN core is complete. Autonomous hold is the correct state when no maintenance blocker or external trigger exists; optional activation gates must not be misreported as unfinished core work.")
    :"Autonomous work should address only the listed local blockers before core completion can be claimed."
},null,2));
