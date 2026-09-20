import assert from"node:assert/strict";import{reviewSubmission}from"../src/submission-review.js";import{SUBMISSION_REVIEW_CHECK_IDS}from"../src/submission-review-contract.js";
const record={status:"PENDING_REVIEW",rightsConfirmed:true,sourceUrl:"https://example.com/live"};
const checks=Object.fromEntries(SUBMISSION_REVIEW_CHECK_IDS.map(k=>[k,true]));
assert.equal(reviewSubmission(record,{decision:"APPROVED",reviewedAt:"not-a-date",checks}).ok,false);
const good=reviewSubmission(record,{decision:"APPROVED",reviewedAt:"2026-09-20T12:00:00Z",checks});assert.equal(good.ok,true);assert.equal(good.record.reviewedAt,"2026-09-20T12:00:00.000Z");
console.log("submission review timestamp integrity passed");