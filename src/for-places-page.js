import {loadParticipationPublicConfig} from "./participation-public-config.js";
import {submissionRecord} from "./business-submission.js";
import {createSubmissionClient} from "./submission-client.js";

const form=document.getElementById("cameraDraftForm");
const output=document.getElementById("cameraDraftOutput");
const text=document.getElementById("cameraDraftText");
const copy=document.getElementById("copyCameraDraft");
const mode=document.getElementById("cameraTransportMode");
const consentWrap=document.getElementById("cameraConsentWrap");
const consent=document.getElementById("cameraConsent");
const button=document.getElementById("cameraSubmit");
const result=document.getElementById("cameraSubmitResult");
let client=createSubmissionClient({});

async function boot(){
  const cfg=await loadParticipationPublicConfig();
  client=createSubmissionClient({endpoint:cfg.submissions?.endpoint||"",enabled:cfg.submissions?.publicActive===true});
  if(client.config.enabled){
    mode.textContent="Secure camera/place review intake is available.";
    consentWrap.hidden=false;
    button.textContent="Send for ERN review";
  }else{
    mode.textContent="Submission delivery is not open yet. This preparation tool stays local until verified transport is explicitly activated.";
    consentWrap.hidden=true;
    button.textContent="Prepare review draft";
  }
}
form?.addEventListener("submit",async e=>{
  e.preventDefault();
  result.textContent="";
  const input={
    businessName:document.getElementById("cameraBusiness").value,
    placeName:document.getElementById("cameraPlace").value,
    sourceUrl:document.getElementById("cameraUrl").value,
    contact:document.getElementById("cameraContact").value,
    rightsConfirmed:document.getElementById("cameraRights").checked
  };
  const prepared=submissionRecord(input);
  if(!prepared.ok){
    text.textContent=prepared.errors.join("\n");
    output.hidden=false;
    return;
  }
  if(!client.config.enabled){
    text.textContent=JSON.stringify({...prepared.record,status:"LOCAL_DRAFT_ONLY",nextStep:"ERN human review required before any publication"},null,2);
    output.hidden=false;
    return;
  }
  if(consent?.checked!==true){
    result.textContent="Please confirm that you want to send this information to ERN for review.";
    return;
  }
  button.disabled=true;
  try{
    const response=await client.submit(prepared.record,{consent:true});
    if(response.ok){
      text.textContent=JSON.stringify({submissionId:response.id,status:response.status,published:response.published,expiresAt:response.expiresAt},null,2);
      output.hidden=false;
      result.textContent="Received for human review. Approval and publication are separate.";
    }else{
      result.textContent="Submission was not sent: "+(response.reason||"request failed");
    }
  }finally{button.disabled=false}
});
copy?.addEventListener("click",async()=>{try{await navigator.clipboard.writeText(text.textContent);copy.textContent="Copied";setTimeout(()=>copy.textContent="Copy draft",1200)}catch{copy.textContent="Select and copy above"}});
boot();
