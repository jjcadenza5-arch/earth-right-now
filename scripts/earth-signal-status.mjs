import { earthSignalStatusReport } from "../src/earth-signal-status-report.js";
const report=earthSignalStatusReport();
console.log(JSON.stringify(report,null,2));
if(report.mode!=="READ_ONLY"&&!report.ready)process.exitCode=1;
