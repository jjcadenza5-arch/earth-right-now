export function affiliateApplicationReadiness(platforms=[],{
 publicSite=true,privacyNotice=true,affiliateDisclosurePolicy=true,noPaidRankingPolicy=true,verifiedTravelResearch=true
}={}){
 const ernChecks={publicSite,privacyNotice,affiliateDisclosurePolicy,noPaidRankingPolicy,verifiedTravelResearch};
 const ernReady=Object.values(ernChecks).every(Boolean);
 const rows=(platforms||[]).filter(x=>x?.valid!==false).map(p=>{
  const external=[];
  if(p.applicationRequired)external.push("CREATE_OR_USE_PROGRAM_ACCOUNT","SUBMIT_PROGRAM_APPLICATION_OR_ENROLLMENT");
  if(!p.relationshipActive)external.push("WAIT_FOR_OR_CONFIRM_PROGRAM_ACCEPTANCE");
  if(!p.credentialsConfigured)external.push("CONFIGURE_APPROVED_TRACKING_CREDENTIALS_OR_LINK_TOOLS");
  external.push("REVIEW_FINAL_PROGRAM_TERMS_AND_DISCLOSURE_PLACEMENT","VERIFY_TRACKED_LINK_IN_PRIVATE_STAGING");
  return{
   id:p.id,name:p.name,intents:p.intents||[],
   ernSideReady:ernReady,
   externalActionRequired:true,
   relationshipActive:p.relationshipActive===true,
   credentialsConfigured:p.credentialsConfigured===true,
   publicActivationAllowed:false,
   trackedLinksAllowed:false,
   remainingExternalActions:[...new Set(external)],
   state:ernReady?"READY_FOR_USER_APPLICATION_DECISION":"ERN_PREREQUISITES_INCOMPLETE"
  };
 });
 return{
  ernReady,ernChecks,total:rows.length,
  readyForDecision:rows.filter(x=>x.state==="READY_FOR_USER_APPLICATION_DECISION").length,
  rows,
  safety:{automaticApplicationAllowed:false,automaticCredentialSetupAllowed:false,automaticTrackedLinkActivationAllowed:false,automaticPublicActivationAllowed:false,paidRankingAllowed:false},
  next:ernReady&&rows.length?"USER_CHOOSES_WHETHER_TO_APPLY":"COMPLETE_ERN_PREREQUISITES",
  note:"Readiness plan only. ERN can prepare for affiliate enrollment, but account creation, program application, acceptance, credentials and tracked-link activation require an explicit later decision/action."
 };
}
