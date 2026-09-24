import { submissionTransportConfig } from "./submission-transport.js";

function validPrivacyUrl(raw){
  try{
    const u=new URL(String(raw||"").trim());
    return u.protocol==="https:"&&!u.username&&!u.password&&Boolean(u.hostname);
  }catch{return false}
}
export function submissionTransportReadiness(raw={}){
  const transport=submissionTransportConfig({endpoint:raw?.endpoint||"",enabled:raw?.enabled===true});
  const privacyReady=validPrivacyUrl(raw?.privacyUrl);
  const retentionDays=Number(raw?.retentionDays),retentionReady=Number.isInteger(retentionDays)&&retentionDays>=1&&retentionDays<=365;
  const active=Boolean(transport.enabled&&transport.endpoint&&privacyReady&&retentionReady);
  const requested=raw?.enabled===true;
  const missing=[];
  if(!transport.endpoint)missing.push("HTTPS_REVIEW_ENDPOINT");
  if(!privacyReady)missing.push("PRIVACY_NOTICE");
  if(!retentionReady)missing.push("RETENTION_POLICY");
  return{
    status:active?"READY":requested?"CONFIG_INCOMPLETE":"DISABLED",
    requested,
    active,
    endpointReady:Boolean(transport.endpoint),
    endpoint:transport.endpoint,
    privacyReady,
    privacyUrl:privacyReady?String(raw.privacyUrl):null,
    retentionReady,
    retentionDays:retentionReady?retentionDays:null,
    missing,
    safety:{
      automaticPublishAllowed:false,
      automaticApprovalAllowed:false,
      silentBackgroundSubmissionAllowed:false,
      credentialsIncluded:false,
      retentionBeyondPolicyAllowed:false
    },
    note:"Submission transport remains off until a real HTTPS review endpoint, privacy notice, and explicit retention window are configured. Delivery never implies approval or publication."
  };
}
