import assert from "node:assert/strict";import {operationsOperatorBrief} from "../src/operations-operator-brief.js";
const snapshot={generatedAt:"2026-09-24T11:00:00Z",catalog:{},watchEarth:{},insideERN:{},providers:{},release:{},maintenance:{}};
const continuity={summary:{persistentMissing:1,repeatedTransient:1,repeatedAccessLimitation:1,newMissing:0,recovered:1},incidents:[{id:"x",state:"PERSISTENT_MISSING_REVIEW",action:"MANUAL_SOURCE_REVIEW"}]};
const md=operationsOperatorBrief({snapshot,delta:{direction:"UNCHANGED",score:0,improved:[],regressed:[]},availabilityContinuity:continuity});
assert.match(md,/Availability continuity/);assert.match(md,/PERSISTENT_MISSING_REVIEW/);assert.match(md,/manual-review evidence only/);assert.match(md,/Review persistent PAGE_MISSING incidents manually/);
console.log("ERN availability continuity operator brief passed");
