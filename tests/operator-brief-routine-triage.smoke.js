import assert from "node:assert/strict";import {operationsOperatorBrief} from "../src/operations-operator-brief.js";
const text=operationsOperatorBrief({snapshot:{generatedAt:"2026-09-24T15:00:00Z",catalog:{},watchEarth:{},insideERN:{readyShortfall:0},providers:{families:2,targetFamilies:2},release:{blockers:0},maintenance:{sourceRevalidation:12}},sourceRevalidationTriage:{summary:{},immediate:[]}});
assert.ok(!text.includes("Work the highest-priority source revalidation items."));
console.log("ERN operator brief does not create false source urgency when triage is routine-only");
