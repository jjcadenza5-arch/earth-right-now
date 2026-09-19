const STATUS={PENDING_REVIEW:"PENDING_REVIEW",APPROVED:"APPROVED",REJECTED:"REJECTED"};
export function reviewSubmission(record,{decision,reviewedAt=new Date().toISOString(),note=""}={}){
 if(!record||record.status!==STATUS.PENDING_REVIEW)return{ok:false,error:"Submission is not pending review"};
 if(!["APPROVED","REJECTED"].includes(decision))return{ok:false,error:"Review decision must be APPROVED or REJECTED"};
 const cleanNote=String(note||"").trim().slice(0,500);
 return{ok:true,record:{...record,status:decision,reviewedAt,note:cleanNote||null}};
}
export function submissionCanPublish(record){
 return Boolean(record?.status===STATUS.APPROVED&&record?.rightsConfirmed===true&&record?.sourceUrl);
}
export { STATUS as SUBMISSION_STATUS };
