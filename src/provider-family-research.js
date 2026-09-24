const HTTPS=/^https:\/\//i;
export function providerFamilyResearchStatus(rows=[]){
  const items=(rows||[]).map(raw=>{
    const valid=Boolean(raw?.id&&raw?.provider&&raw?.status==="RESEARCH_ONLY"&&HTTPS.test(String(raw?.researchUrl||""))&&HTTPS.test(String(raw?.termsUrl||"")));
    return{
      id:String(raw?.id||""),
      provider:String(raw?.provider||""),
      familyLabel:String(raw?.familyLabel||""),
      valid,
      status:raw?.status||null,
      permissionStatus:raw?.permissionStatus||null,
      technicalStatus:raw?.technicalStatus||null,
      humanPlaybackStatus:raw?.humanPlaybackStatus||null,
      promotion:raw?.promotion||null,
      nextAction:raw?.nextAction||null,
      verifiedAt:raw?.verifiedAt||null,
      researchUrl:raw?.researchUrl||null,
      termsUrl:raw?.termsUrl||null,
      networkFamily:raw?.networkFamily||null,
      permissionConfirmed:false,
      humanPlaybackConfirmed:false,
      promotionAllowed:false
    };
  });
  const unsafe=items.filter(x=>!x.valid||x.permissionConfirmed!==false||x.humanPlaybackConfirmed!==false||x.promotionAllowed!==false);
  return{
    generatedAt:new Date().toISOString(),
    total:items.length,
    valid:items.filter(x=>x.valid).length,
    unresolvedNetworkFamily:items.filter(x=>!x.networkFamily).length,
    unsafe,
    items,
    safety:{catalogMutationAllowed:false,automaticPermissionApprovalAllowed:false,automaticPromotionAllowed:false},
    note:"Provider-family research only. A promising terms path does not confirm a specific camera embed, network family, deployed playback, or catalog eligibility."
  };
}
