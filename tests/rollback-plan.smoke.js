import { rollbackRecord,rollbackReady } from "../src/rollback-plan.js";
const stamp="2026-09-19T06:00:00.000Z";
console.assert(!rollbackReady(rollbackRecord()),"empty rollback record must fail closed");
const r=rollbackRecord({candidate:{commitSha:"a".repeat(40)},previous:{commitSha:"b".repeat(40)},procedure:"Redeploy previous known-good commit through hosting provider.",verified:true,checkedAt:stamp});
console.assert(rollbackReady(r),"complete verified rollback record should be structurally ready");
console.assert(!rollbackReady({...r,verified:false}),"unverified rollback procedure must not pass");
console.log("ERN rollback plan smoke checks passed");

console.assert(!rollbackReady({...r,candidate:{commitSha:"abc"}}),"short candidate SHA must not certify rollback");
console.assert(!rollbackReady({...r,previous:{commitSha:r.candidate.commitSha}}),"rollback target must differ from candidate");
