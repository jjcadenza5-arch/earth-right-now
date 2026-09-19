const STATES=["PENDING_REVIEW","NEEDS_INFO","APPROVED","REJECTED"];
export function partnerReview(record,{decision="PENDING_REVIEW",reviewedAt="",reviewNote=""}={}){
 if(!record)throw new Error("Submission record required");
 if(!STATES.includes(decision))throw new Error("Unknown review decision");
 const truthReady=record.truthReviewed===true,permissionReady=record.permissionReviewed===true,healthReady=record.healthReviewed===true;
 const eligible=truthReady&&permissionReady&&healthReady;
 if(decision==="APPROVED"&&!eligible)return{ok:false,status:"PENDING_REVIEW",reason:"SOURCE_REVIEW_INCOMPLETE",eligible:false};
 return{ok:true,status:decision,eligible,reviewedAt:String(reviewedAt||new Date().toISOString()),reviewNote:String(reviewNote||"").trim(),commercialStatus:record.commercialStatus||"UNSET"};
}
export function partnerPublishable(review){
 return Boolean(review?.ok&&review.status==="APPROVED"&&review.eligible);
}
