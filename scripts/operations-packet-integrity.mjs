import {validateOperationsPacket} from "../src/operations-packet-integrity.js";
const dir=process.argv[2]||"ern-ops";
const report=await validateOperationsPacket(dir);
console.log(JSON.stringify(report,null,2));
if(!report.valid)process.exitCode=1;
