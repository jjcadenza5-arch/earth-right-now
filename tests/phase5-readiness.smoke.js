import assert from "node:assert/strict";
import {assessPhase5Readiness,PHASE5_MIN_PHASE4_OBSERVATION_HOURS} from "../src/phase5-readiness.js";

const core={conclusion:"STABLE_BETA_READY"};
const participation={
  phase4PilotActive:true,
  workers:{
    submissions:{publicEnabled:false},
    nowMomentMedia:{publicEnabled:false}
  }
};
const media={publicActivationAllowed:false};
const guide={publicGenerativeActive:false};
const gates={};

let r=assessPhase5Readiness({
  core,
  phase4Observation:{healthyNow:true,observationWindowComplete:false},
  participation,media,guide,gates
});
assert.equal(r.technicallyReviewEligible,false);
assert.equal(r.phase5EntryApproved,false);
assert.equal(r.state,"PHASE4_OBSERVATION_CONTINUES");
assert.ok(r.blockers.includes("PHASE4_MINIMUM_OBSERVATION_WINDOW_INCOMPLETE"));
assert.equal(r.minimumPhase4ObservationHours,PHASE5_MIN_PHASE4_OBSERVATION_HOURS);
assert.equal(r.automaticPhase5EntryAllowed,false);

r=assessPhase5Readiness({
  core,
  phase4Observation:{healthyNow:true,observationWindowComplete:true},
  participation,media,guide,gates
});
assert.equal(r.technicallyReviewEligible,true);
assert.equal(r.phase5EntryApproved,false);
assert.equal(r.state,"PHASE5_HUMAN_REVIEW_ELIGIBLE");
assert.equal(r.next,"HUMAN_REVIEW_BEFORE_PHASE5_ENTRY");

r=assessPhase5Readiness({
  core,
  phase4Observation:{healthyNow:true,observationWindowComplete:true},
  participation,media,guide,gates,
  explicitHumanReviewApproved:true
});
assert.equal(r.phase5EntryApproved,true);
assert.equal(r.state,"PHASE5_ENTRY_APPROVED");
assert.equal(r.automaticPilot2ActivationAllowed,false);assert.equal(r.next,"OPERATE_PHASE5_WITH_SEPARATE_FEATURE_GATES_OFF");

r=assessPhase5Readiness({
  core,
  phase4Observation:{healthyNow:true,observationWindowComplete:true},
  participation:{
    ...participation,
    workers:{submissions:{publicEnabled:true},nowMomentMedia:{publicEnabled:false}}
  },
  media,guide,gates,
  explicitHumanReviewApproved:true
});
assert.equal(r.phase5EntryApproved,false);
assert.ok(r.blockers.includes("SUBMISSION_PREMATURELY_PUBLIC"));

console.log("Phase 5 readiness requires healthy Phase 4 observation plus explicit human review");
