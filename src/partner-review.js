import { SUBMISSION_REVIEW_CHECK_IDS } from "./submission-review-contract.js";
const STATES=["PENDING_REVIEW","NEEDS_INFO","APPROVED","REJECTED"];
function reviewReady(record){if(record?.reviewChecks)return SUBMISSION_REVIEW_CHECK_IDS.every(k=>record.reviewChecks[k]===true);return record?.truthReviewed===true&&record?.permissionReviewed===true&&record?.healthReviewed===true}
export function partnerReview(record,{decision="PENDING_REVIEW",reviewedAt="",reviewNote=""}={}){
 if(!record)throw new Error("Submission record required");if(!STATES.includes(decision))throw new Error("Unknown review decision");const eligible=reviewReady(record);if(decision==="APPROVED"&&!eligible)return{ok:false,status:"PENDING_REVIEW",reason:"SOURCE_REVIEW_INCOMPLETE",eligible:false};return{ok:true,status:decision,eligible,reviewedAt:String(reviewedAt||new Date().toISOString()),reviewNote:String(reviewNote||"").trim(),commercialStatus:record.commercialStatus||"UNSET"};
}
export function partnerPublishable(review){return Boolean(review?.ok&&review.status==="APPROVED"&&review.eligible)}
