const HTTPS=/^https:\/\//i;
function ageDays(iso,now){
  const t=Date.parse(iso||""),n=now instanceof Date?now.getTime():Number(now);
  return Number.isFinite(t)&&Number.isFinite(n)?Math.max(0,(n-t)/864e5):Infinity;
}
export function providerFamilyResearchStatus(rows=[],{now=new Date(),maxTermsAgeDays=30}={}){
  const items=(rows||[]).map(raw=>{
    const termsAgeDays=ageDays(raw?.termsReviewedAt,now);
    const termsEvidenceState=!Number.isFinite(termsAgeDays)?"MISSING":termsAgeDays>maxTermsAgeDays?"STALE":"CURRENT";
    const valid=Boolean(raw?.id&&raw?.provider&&raw?.status==="RESEARCH_ONLY"&&HTTPS.test(String(raw?.researchUrl||""))&&HTTPS.test(String(raw?.termsUrl||"")));
    const brandedPlayerSafe=raw?.restreamAllowed===false&&raw?.playerBrandingRequired===true&&raw?.usageMode==="PROVIDER_BRANDED_PLAYER_ONLY";
    const linkOnlySafe=raw?.restreamAllowed===false&&raw?.usageMode==="LINK_ONLY_UNLESS_LICENSED";
    const safeUsage=brandedPlayerSafe||linkOnlySafe;
    const candidateEligible=brandedPlayerSafe&&raw?.embeddingCondition!=="LICENSE_REQUIRED"&&raw?.technicalStatus!=="DO_NOT_STAGE_PLAYER";
    return{
      id:String(raw?.id||""),
      provider:String(raw?.provider||""),
      familyLabel:String(raw?.familyLabel||""),
      valid,
      status:raw?.status||null,
      permissionStatus:raw?.permissionStatus||null,
      permissionEvidence:raw?.permissionEvidence||null,
      technicalStatus:raw?.technicalStatus||null,
      humanPlaybackStatus:raw?.humanPlaybackStatus||null,
      promotion:raw?.promotion||null,
      nextAction:raw?.nextAction||null,
      verifiedAt:raw?.verifiedAt||null,
      researchUrl:raw?.researchUrl||null,
      termsUrl:raw?.termsUrl||null,
      communityGuidelinesUrl:raw?.communityGuidelinesUrl||null,
      termsEffectiveAt:raw?.termsEffectiveAt||null,
      termsReviewedAt:raw?.termsReviewedAt||null,
      termsAgeDays:Number.isFinite(termsAgeDays)?Number(termsAgeDays.toFixed(1)):null,
      termsEvidenceState,
      maxTermsAgeDays,
      usageMode:raw?.usageMode||null,
      embeddingCondition:raw?.embeddingCondition||null,
      playerBrandingRequired:raw?.playerBrandingRequired===true,
      restreamAllowed:raw?.restreamAllowed===true,
      safeUsage,
      candidateEligible,
      networkFamily:raw?.networkFamily||null,
      permissionConfirmed:false,
      humanPlaybackConfirmed:false,
      promotionAllowed:false
    };
  });
  const unsafe=items.filter(x=>!x.valid||!x.safeUsage||x.permissionConfirmed!==false||x.humanPlaybackConfirmed!==false||x.promotionAllowed!==false);
  const needsTermsReview=items.filter(x=>x.termsEvidenceState!=="CURRENT");
  return{
    generatedAt:now instanceof Date?now.toISOString():new Date(now).toISOString(),
    maxTermsAgeDays,
    total:items.length,
    valid:items.filter(x=>x.valid).length,
    currentTermsEvidence:items.filter(x=>x.termsEvidenceState==="CURRENT").length,
    needsTermsReview:needsTermsReview.length,
    unresolvedNetworkFamily:items.filter(x=>!x.networkFamily).length,
    unsafe,
    attention:needsTermsReview.map(x=>({id:x.id,provider:x.provider,reason:x.termsEvidenceState==="MISSING"?"TERMS_REVIEW_MISSING":"TERMS_REVIEW_STALE",termsReviewedAt:x.termsReviewedAt})),
    items,
    safety:{catalogMutationAllowed:false,automaticPermissionApprovalAllowed:false,automaticPromotionAllowed:false,restreamAllowed:false,providerBrandingRemovalAllowed:false},
    note:"Provider-family research only. Current terms evidence can guide review, but it does not confirm a specific camera/player or deployed playback. Families may resolve to provider-branded-player research or conservative link-only use; ERN never restreams/rebroadcasts provider video."
  };
}
