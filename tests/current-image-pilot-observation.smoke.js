import assert from "node:assert/strict";import {pilotObservationStatus} from "../src/current-image-pilot-observation.js";
const base={requiredSuccessfulRenewalDates:2,allowedSourceIds:["a","b"],observations:[]};
let s=pilotObservationStatus(base,{now:new Date("2026-10-07T01:00:00Z")});assert.equal(s.expansionReady,false);
const obs=d=>({observedAt:d+"T00:37:00Z",utcDate:d,event:"schedule",state:"RENEWED",items:[{id:"a",evidenceAgeMinutes:5},{id:"b",evidenceAgeMinutes:6}]});
s=pilotObservationStatus({...base,observations:[obs("2026-10-06"),obs("2026-10-07")]},{now:new Date("2026-10-07T01:00:00Z")});
assert.equal(s.expansionReady,true);assert.equal(s.safety.automaticExpansionAllowed,false);
s=pilotObservationStatus({...base,observations:[{...obs("2026-10-06"),event:"workflow_dispatch"},obs("2026-10-07")]},{now:new Date("2026-10-07T01:00:00Z")});
assert.equal(s.expansionReady,false);
console.log("Current-image pilot expansion requires distinct successful scheduled renewal dates and remains editorial-only");
