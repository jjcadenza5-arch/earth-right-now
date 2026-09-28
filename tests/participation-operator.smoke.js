import fs from "node:fs";
const state=fs.readFileSync("signals-worker/src/signal-state.js","utf8");
const worker=fs.readFileSync("signals-worker/src/index.js","utf8");
const cli=fs.readFileSync("scripts/participation-operator.mjs","utf8");

console.assert(state.includes('b.op==="list-reports"')&&state.includes('b.op==="resolve-report"'),"Signal report review state operations missing");
console.assert(state.includes('"RESTORE"')&&state.includes('"REMOVE"'),"Signal moderation resolutions must be explicit");
console.assert(worker.includes("ERN_SIGNAL_REVIEW_TOKEN")&&worker.includes("/internal/earth-signals/reports"),"Protected Earth Signal operator endpoint missing");
console.assert(worker.includes("published:false"),"Signal operator resolution must not imply publication");
console.assert(cli.includes("ERN_OPERATOR_TOKEN")&&cli.includes("ERN_OPERATOR_ENDPOINT"),"Operator CLI must source credentials from environment");
console.assert(!cli.includes("process.argv[4]")&&!cli.includes("token=args"),"Operator token must never be passed as a CLI argument");
console.assert(cli.includes('["NEEDS_INFO","APPROVED","REJECTED"]')&&cli.includes('["RESTORE","REMOVE"]'),"Operator decisions must be bounded");
console.log("participation operator control stays private and explicit");
