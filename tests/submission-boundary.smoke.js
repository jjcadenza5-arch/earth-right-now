import { submissionPrivacyNotice,submissionBoundary } from "../src/submission-boundary.js";
console.assert(submissionPrivacyNotice().includes("does not publish")&&submissionPrivacyNotice().includes("does not send"));const x=submissionBoundary({status:"PENDING_REVIEW"});console.assert(x.prepared&&!x.published&&!x.transmitted&&x.status==="PENDING_REVIEW");
console.log("ERN submission boundary smoke checks passed");
