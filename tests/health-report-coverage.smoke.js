import { healthCheckReport,healthReportAudit,safeHealthPatch } from "../src/health-report.js";

const source={id:"camera-a",health:"HEALTHY",truth:"LIVE_VIDEO",permission:"LINK_ONLY",playback:"EXTERNAL",lastSuccessfulCheck:"2026-09-19T00:00:00.000Z"};
const report=healthCheckReport([source],{
  "camera-a":{httpOk:true,providerConfirmed:true},
  "typo-camera":{httpOk:true,providerConfirmed:true}
},{checkedAt:"2026-09-19T04:30:00.000Z"});

console.assert(report.proposals.length===1,"known source should receive one proposal");
console.assert(report.unknownObservationIds.length===1&&report.unknownObservationIds[0]==="typo-camera","unknown observation IDs must be surfaced");
console.assert(healthReportAudit(report).ok===false,"coverage audit must fail on unknown observation IDs");
console.assert(safeHealthPatch(report).every(row=>!("next" in row)),"safe patch must not expose full mutable source objects");

const incomplete=healthCheckReport([source],{}, {checkedAt:"2026-09-19T04:30:00.000Z"});
console.assert(healthReportAudit(incomplete).issues.includes("UNOBSERVED_SOURCES"),"missing source observations must remain visible");
console.log("ERN health report coverage smoke checks passed");
