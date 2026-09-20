const STATUS={PENDING_REVIEW:"PENDING_REVIEW",NEEDS_INFO:"NEEDS_INFO",APPROVED:"APPROVED",REJECTED:"REJECTED"};
export function reviewSubmission(record,{decision,reviewedAt=new Date().toISOString(),note="",checks={}}={}){
 if(!record||![STATUS.PENDING_REVIEW,STATUS.NEEDS_INFO].includes(record.status))return{ok:false,error:"Submission is not pending review"};
 if(!["NEEDS_INFO","APPROVED","REJECTED"].includes(decision))return{ok:false,error:"Review decision must be NEEDS_INFO, APPROVED or REJECTED"};
 const required=["rights","public","truth","quality","embed","currentness"],missing=required.filter(k=>checks?.[k]!==true),cleanNote=String(note||"").trim().slice(0,500);
 if(decision==="APPROVED"&&missing.length)return{ok:false,error:"Required source review checks are incomplete",missing};
 return{ok:true,record:{...record,status:decision,reviewedAt,note:cleanNote||null,reviewChecks:Object.fromEntries(required.map(k=>[k,checks?.[k]===true]))}};
}
export function submissionCanPublish(record){return Boolean(record?.status===STATUS.APPROVED&&record?.rightsConfirmed===true&&record?.sourceUrl&&["rights","public","truth","quality","embed","currentness"].every(k=>record?.reviewChecks?.[k]===true));}
export { STATUS as SUBMISSION_STATUS };
