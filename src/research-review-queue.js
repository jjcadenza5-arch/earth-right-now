function rows(report){return Array.isArray(report?.items)?report.items:[]}
function preflightById(report){return new Map((report?.rows||[]).map(x=>[String(x.id),x]))}
function familyByProvider(report){return new Map(rows(report).filter(x=>x?.provider).map(x=>[String(x.provider),x]))}
function normalized(value){return String(value||"").trim()}
function stagedProviderKeys(candidates=[]){
  const keys=new Set();
  for(const c of candidates||[]){
    const p=normalized(c?.provider);if(p)keys.add(p);
  }
  return keys;
}
function providerPreparation(providerFamilyReport,candidates=[]){
  const staged=stagedProviderKeys(candidates);
  return rows(providerFamilyReport).filter(f=>{
    if(f?.candidateEligible!==true)return false;
    if(!String(f?.technicalStatus||"").includes("GENERATED_"))return false;
    const aliases=[normalized(f?.provider),...(f?.discoveryProviderAliases||[]).map(normalized)].filter(Boolean);
    return !aliases.some(x=>staged.has(x));
  }).map(f=>({
    id:f.id,
    provider:f.provider,
    familyLabel:f.familyLabel,
    usageMode:f.usageMode,
    technicalStatus:f.technicalStatus,
    permissionStatus:f.permissionStatus,
    nextAction:f.nextAction,
    familyTermsState:f.termsEvidenceState,
    familySafeUsage:f.safeUsage===true,
    familyNetwork:f.networkFamily||null,
    requiredHumanAction:"NONE_YET_PREPARE_EXACT_PROVIDER_GENERATED_TARGET",
    permissionStillRequired:true,
    playbackStillRequired:true,
    promotionAllowed:false
  })).sort((a,b)=>String(a.provider).localeCompare(String(b.provider)));
}

export function researchReviewQueue(candidates=[],{preflightReport=null,providerFamilyReport=null,primaryCount=1}={}){
  const preflight=preflightById(preflightReport),families=familyByProvider(providerFamilyReport);
  const approved=(candidates||[]).filter(c=>c.status==="APPROVED"&&c.promotion==="APPROVED_FOR_CATALOG"&&c.playbackReview==="HUMAN_PLAYBACK_CONFIRMED"&&c.permissionReview==="PER_VIDEO_EMBED_CONFIRMED");
  const failedPlayback=(candidates||[]).filter(c=>c.playbackReview==="HUMAN_PLAYBACK_FAILED");
  const reviewable=(candidates||[]).filter(c=>!approved.includes(c)&&c.playbackReview!=="HUMAN_PLAYBACK_FAILED");

  const ranked=reviewable.map(c=>{
    const p=preflight.get(String(c.id))||null,f=families.get(String(c.provider))||null;
    let score=0;
    if(p?.technicalReady===true)score+=100;
    else if(p?.outcome==="PARTIAL_TECHNICAL_EVIDENCE")score+=30;
    if(f?.termsEvidenceState==="CURRENT")score+=50;
    if(f?.safeUsage===true)score+=30;
    if(f?.networkFamily)score+=20;
    if(String(f?.permissionStatus||"").includes("ENABLED_BRANDED_PLAYER"))score+=20;
    if(c.playbackReview==="HUMAN_PLAYBACK_REQUIRED")score+=5;
    return{
      ...c,
      technicalReady:p?.technicalReady===true,
      technicalOutcome:p?.outcome||null,
      familyTermsState:f?.termsEvidenceState||null,
      familySafeUsage:f?.safeUsage===true,
      familyNetwork:f?.networkFamily||null,
      reviewPriority:score,
      requiredHumanAction:"DEPLOYED_HUMAN_PLAYBACK",
      permissionStillRequired:true,
      promotionAllowed:false
    };
  }).sort((a,b)=>b.reviewPriority-a.reviewPriority||String(a.provider).localeCompare(String(b.provider))||String(a.id).localeCompare(String(b.id)));

  const preparation=providerPreparation(providerFamilyReport,candidates);
  const count=Math.max(0,Math.min(Number(primaryCount)||0,ranked.length));
  const primary=ranked.slice(0,count);
  const alternates=[
    ...ranked.slice(count),
    ...failedPlayback.map(c=>({
      ...c,
      reviewPriority:-1,
      requiredHumanAction:"WAIT_FOR_TARGET_OR_PROVIDER_CHANGE",
      permissionStillRequired:true,
      promotionAllowed:false,
      technicalReady:false,
      technicalOutcome:"HUMAN_PLAYBACK_FAILED"
    }))
  ];
  const exhausted=ranked.length===0&&preparation.length===0&&(candidates||[]).length>0;
  const state=primary.length?"HUMAN_REVIEW_READY":preparation.length?"PROVIDER_PREPARATION_READY":exhausted?"EXHAUSTED_RESEARCH_NEW_PROVIDER":"NO_CANDIDATES";
  return{
    generatedAt:new Date().toISOString(),
    state,
    exhausted,
    total:(candidates||[]).length,
    approved:approved.length,
    failedPlayback:failedPlayback.length,
    reviewable:ranked.length,
    primaryCount:primary.length,
    primary,
    preparation,
    alternates,
    nextAction:primary.length?"RUN_DEPLOYED_HUMAN_PLAYBACK":preparation.length?"PREPARE_PROVIDER_GENERATED_TARGET":exhausted?"RESEARCH_NEW_PROVIDER_FAMILY":"STAGE_PROVIDER_RESEARCH",
    safety:{
      catalogPromotionAllowed:false,
      automaticPermissionApprovalAllowed:false,
      automaticPlaybackConfirmationAllowed:false,
      failedCandidateRetestAllowed:false,
      automaticWidgetGenerationAllowed:false
    },
    note:preparation.length&&!primary.length
      ?"A provider-generated integration path is documented, but the exact provider-generated target/code has not been staged. Prepare that exact target before requesting deployed rendering/playback review; do not infer permission or promote a source from family-level research."
      :exhausted
      ?"All staged candidates have failed deployed HUMAN_PLAYBACK review. Do not recycle them as active work. Research a genuinely new provider family or materially changed target before another human playback request."
      :"Review the strongest provider-diversification candidates in the current batch. Failed candidates remain deferred until their target/provider materially changes. Technical readiness and current terms evidence never confirm permission, playback or catalog eligibility."
  };
}
