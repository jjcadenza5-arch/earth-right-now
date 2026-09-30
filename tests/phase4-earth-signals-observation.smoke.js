import assert from "node:assert/strict";
import {assessPhase4EarthSignalsObservation,PHASE4_EARTH_SIGNALS_MIN_OBSERVATION_HOURS} from "../src/phase4-earth-signals-observation.js";

const pilot={state:"PUBLIC_PILOT_ACTIVE",publicManifestActivationAllowed:true,publicActivatedAt:"2026-09-30T06:53:05Z"};
const deployment={publicActivationAllowed:true,liveHealthVerified:true};
const health={healthy:true,pilotActive:true,contributionsEnabled:true,privacy:{rawNetworkIdentifiersStored:false,secretValuesExposed:false}};

let r=assessPhase4EarthSignalsObservation({pilot,deployment,liveHealth:health,now:new Date("2026-09-30T12:53:05Z")});
assert.equal(r.healthyNow,true);
assert.equal(r.observationWindowComplete,false);
assert.equal(r.reviewEligible,false);
assert.equal(r.state,"EARLY_OBSERVATION");
assert.equal(r.automaticExpansionAllowed,false);

r=assessPhase4EarthSignalsObservation({pilot,deployment,liveHealth:health,now:new Date("2026-10-01T06:53:05Z")});
assert.equal(r.observationWindowComplete,true);
assert.equal(r.reviewEligible,true);
assert.equal(r.state,"OBSERVATION_WINDOW_COMPLETE_REVIEW_ELIGIBLE");
assert.equal(r.minimumObservationHours,PHASE4_EARTH_SIGNALS_MIN_OBSERVATION_HOURS);

r=assessPhase4EarthSignalsObservation({pilot,deployment,liveHealth:{...health,healthy:false},now:new Date("2026-10-01T07:00:00Z")});
assert.equal(r.healthyNow,false);
assert.equal(r.reviewEligible,false);
assert.equal(r.state,"HOLD_AND_REVIEW_HEALTH");
assert.ok(r.issues.includes("CURRENT_LIVE_HEALTH_NOT_GREEN"));

console.log("Phase 4 Earth Signals observation gate prevents premature Pilot 2 expansion");
