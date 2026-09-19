import { rollbackRecord,rollbackReady } from "../src/rollback-plan.js";
const stamp="2026-09-19T06:00:00.000Z";
console.assert(!rollbackReady(rollbackRecord()),"empty rollback record must fail closed");
const r=rollbackRecord({candidate:{commitSha:"abc"},previous:{commitSha:"def"},procedure:"Redeploy previous known-good commit through hosting provider.",verified:true,checkedAt:stamp});
console.assert(rollbackReady(r),"complete verified rollback record should be structurally ready");
console.assert(!rollbackReady({...r,verified:false}),"unverified rollback procedure must not pass");
console.log("ERN rollback plan smoke checks passed");
