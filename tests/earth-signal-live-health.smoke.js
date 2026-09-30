import assert from "node:assert/strict";
import {assessEarthSignalLiveHealth} from "../src/earth-signal-live-health.js";

const healthy={
  ok:true,
  contributionsEnabled:true,
  durableStorage:true,
  rateSubjectSecretConfigured:true,
  reviewTokenConfigured:true,
  rawNetworkIdentifiersStored:false,
  secretValuesExposed:false,
  state:{ok:true,signals:3,reports:1,limits:{maxActiveSignals:5000,maxRetainedReports:1000}}
};
let r=assessEarthSignalLiveHealth(healthy,{pilotActive:true});
assert.equal(r.healthy,true);
assert.equal(r.metrics.signals,3);
assert.equal(r.metrics.reports,1);

r=assessEarthSignalLiveHealth({...healthy,contributionsEnabled:false},{pilotActive:true});
assert.equal(r.healthy,false);
assert.ok(r.issues.includes("PILOT_RUNTIME_NOT_ENABLED"));

r=assessEarthSignalLiveHealth({...healthy,rawNetworkIdentifiersStored:true},{pilotActive:true});
assert.ok(r.issues.includes("RAW_NETWORK_IDENTIFIER_POLICY_VIOLATION"));

r=assessEarthSignalLiveHealth({...healthy,secretValuesExposed:true},{pilotActive:true});
assert.ok(r.issues.includes("SECRET_EXPOSURE_POLICY_VIOLATION"));

r=assessEarthSignalLiveHealth({...healthy,state:{...healthy.state,signals:5001}},{pilotActive:true});
assert.ok(r.issues.includes("SIGNAL_CAP_EXCEEDED"));

console.log("Earth Signals live-health assessment preserves Phase 4 pilot safety boundaries");
