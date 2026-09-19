import { recheckPriority,prioritizedRechecks } from "../src/recheck-priority.js";
const now=Date.parse("2026-09-19T12:00:00Z"),old={id:"old",checkedAt:"2026-09-10T12:00:00Z",health:"HEALTHY",truth:"EXTERNAL_LIVE",quality:70},important={id:"live",checkedAt:"2026-09-18T12:00:00Z",health:"DEGRADED",truth:"LIVE_VIDEO",quality:95};
console.assert(recheckPriority(important,{now}).reasons.includes("DEGRADED"));
const q=prioritizedRechecks([old,important],{now});console.assert(q[0].score>=q[1].score&&q.length===2);console.assert(recheckPriority({id:"never"},{now}).score>=100);
console.log("ERN recheck priority smoke checks passed");
