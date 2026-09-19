export function submissionPrivacyNotice(){
 return"Contact details are used only to review this camera submission. Preparing this form does not publish the camera, and ERN does not send it anywhere until a submission service is explicitly connected.";
}
export function submissionBoundary(record){return{prepared:Boolean(record),published:false,transmitted:false,status:record?.status||"NOT_PREPARED"}}
