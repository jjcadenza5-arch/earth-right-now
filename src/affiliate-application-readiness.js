export function affiliateApplicationReadiness(platforms=[],{
 publicSite=true,privacyNotice=true,affiliateDisclosurePolicy=true,noPaidRankingPolicy=true,verifiedTravelResearch=true
}={}){
 const ernChecks={publicSite,privacyNotice,affiliateDisclosurePolicy,noPaidRankingPolicy,verifiedTravelResearch};
 const ernReady=Object.values(ernChecks).every(Boolean);
 const rows=(platforms||[]).filter(x=>x?.valid!==false).map(p=>{
  const active=p.state==="ACTIVE_OPERATOR_CONFIRMED"||String(p.programStatus||"").startsWith("ACTIVE_");
  const deferred=Boolean(p.lastApplicationDecision)||["agoda","skyscanner"].includes(String(p.id||""));
  const external=[];
  if(!active){if(p.applicationRequired)external.push("CREATE_OR_USE_PROGRAM_ACCOUNT","SUBMIT_PROGRAM_APPLICATION_OR_ENROLLMENT");if(!p.relationshipActive)external.push("WAIT_FOR_OR_CONFIRM_PROGRAM_ACCEPTANCE");if(!p.credentialsConfigured)external.push("CONFIGURE_APPROVED_TRACKING_CREDENTIALS_OR_LINK_TOOLS");external.push("REVIEW_FINAL_PROGRAM_TERMS_AND_DISCLOSURE_PLACEMENT","VERIFY_TRACKED_LINK_IN_PRIVATE_STAGING")}else{external.push("MAINTAIN_OPERATOR_TERMS_REVIEW","VERIFY_TRACKED_LINK_BEFORE_EACH_NEW_PUBLIC_PLACEMENT","CONFIGURE_PAYOUT_METHOD_IF_NEEDED")}
  return{
   id:p.id,name:p.name,intents:p.intents||[],
   ernSideReady:ernReady,
   externalActionRequired:external.length>0,
   relationshipActive:p.relationshipActive===true,
   credentialsConfigured:p.credentialsConfigured===true,
   publicActivationAllowed:active&&p.publicActivationAllowed===true,
   trackedLinksAllowed:active&&p.trackedLinksAllowed===true,
   remainingExternalActions:[...new Set(external)],
   state:!ernReady?"ERN_PREREQUISITES_INCOMPLETE":active?"ACTIVE_OPERATOR_CONFIRMED":deferred?"DEFERRED_NO_ACTION":"READY_FOR_USER_APPLICATION_DECISION"
  };
 });
 return{
  ernReady,ernChecks,total:rows.length,
  readyForDecision:rows.filter(x=>x.state==="READY_FOR_USER_APPLICATION_DECISION").length,
  activePlatforms:rows.filter(x=>x.state==="ACTIVE_OPERATOR_CONFIRMED").length,
  deferredPlatforms:rows.filter(x=>x.state==="DEFERRED_NO_ACTION").length,
  rows,
  safety:{automaticApplicationAllowed:false,automaticCredentialSetupAllowed:false,automaticTrackedLinkActivationAllowed:false,automaticPublicActivationAllowed:false,paidRankingAllowed:false},
  next:!ernReady?"COMPLETE_ERN_PREREQUISITES":rows.some(x=>x.state==="READY_FOR_USER_APPLICATION_DECISION")?"USER_CHOOSES_WHETHER_TO_APPLY":rows.some(x=>x.state==="ACTIVE_OPERATOR_CONFIRMED")?"OPERATE_ACTIVE_PLATFORM_MANUALLY":"NO_PLATFORM_ACTION",
  note:"Phase 5 readiness plan only. Research candidates require explicit application/account actions. Rejected/deferred platforms do not create recurring autonomous work. Operator-confirmed active platforms remain manual, disclosure-bound and excluded from paid ranking or automatic placement."
 };
}
