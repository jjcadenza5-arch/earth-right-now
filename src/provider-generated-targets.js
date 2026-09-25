const HTTPS=/^https:\/\//i;
function clean(v){return String(v||"").trim()}
export function providerGeneratedTargetStatus(rows=[]){
  const items=(rows||[]).map(raw=>{
    const hasExactCode=clean(raw?.exactCode).length>0;
    const hasExactTarget=HTTPS.test(clean(raw?.exactTargetUrl));
    const generated=hasExactCode||hasExactTarget;
    const reviewed=Boolean(raw?.reviewedAt&&raw?.reviewOutcome);
    const valid=Boolean(raw?.id&&raw?.providerFamilyId&&raw?.provider&&raw?.sourceId&&["PROVIDER_GENERATED_WIDGET","PROVIDER_GENERATED_CURRENT_IMAGE","PROVIDER_AUTHORIZED_CURRENT_IMAGE"].includes(raw?.integrationKind)&&HTTPS.test(clean(raw?.generatorUrl)));
    const safetyOk=raw?.promotionAllowed===false&&raw?.catalogMutationAllowed===false&&raw?.automaticGenerationAllowed===false;
    const exactTargetState=raw?.integrationKind==="PROVIDER_AUTHORIZED_CURRENT_IMAGE"?"EXACT_PROVIDER_TARGET_URL_REQUIRED":"EXACT_PROVIDER_CODE_REQUIRED";
    let state="INVALID";
    if(valid&&safetyOk&&!generated)state=exactTargetState;
    else if(valid&&safetyOk&&generated&&!reviewed)state="DEPLOYED_REVIEW_REQUIRED";
    else if(valid&&safetyOk&&generated&&reviewed)state=raw.reviewOutcome==="APPROVED"?"REVIEW_APPROVED_NOT_PROMOTED":"REVIEW_FAILED";
    return{
      id:clean(raw?.id),providerFamilyId:clean(raw?.providerFamilyId),provider:clean(raw?.provider),sourceId:clean(raw?.sourceId),
      integrationKind:raw?.integrationKind||null,truthIfApproved:raw?.truthIfApproved||null,refreshSemantics:raw?.refreshSemantics||null,
      generatorUrl:raw?.generatorUrl||null,hasExactCode,hasExactTarget,generated,reviewed,reviewOutcome:raw?.reviewOutcome||null,
      state,valid,safetyOk,promotionAllowed:false,catalogMutationAllowed:false,automaticGenerationAllowed:false,
      nextAction:state==="EXACT_PROVIDER_CODE_REQUIRED"?"GENERATE_EXACT_CODE_ON_OFFICIAL_PROVIDER_SURFACE":
        state==="EXACT_PROVIDER_TARGET_URL_REQUIRED"?"IDENTIFY_EXACT_AUTHORIZED_CURRENT_IMAGE_URL":
        state==="DEPLOYED_REVIEW_REQUIRED"?"STAGE_EXACT_TARGET_FOR_DEPLOYED_RENDERING_REVIEW":
        state==="REVIEW_APPROVED_NOT_PROMOTED"?"EDITORIAL_AND_CATALOG_PROMOTION_REVIEW":
        state==="REVIEW_FAILED"?"KEEP_RESEARCH_ONLY_OR_REGENERATE_MATERIALLY_CHANGED_TARGET":"FIX_INVALID_STAGING_RECORD"
    };
  });
  const invalid=items.filter(x=>!x.valid||!x.safetyOk);
  const preparation=items.filter(x=>["EXACT_PROVIDER_CODE_REQUIRED","EXACT_PROVIDER_TARGET_URL_REQUIRED"].includes(x.state));
  const reviewReady=items.filter(x=>x.state==="DEPLOYED_REVIEW_REQUIRED");
  return{
    generatedAt:new Date().toISOString(),
    total:items.length,
    valid:items.filter(x=>x.valid).length,
    preparation:preparation.length,
    reviewReady:reviewReady.length,
    invalid:invalid.length,
    state:invalid.length?"INVALID_STAGING":reviewReady.length?"DEPLOYED_REVIEW_READY":preparation.length?"PREPARATION_REQUIRED":"NO_ACTIVE_PREPARATION",
    items,
    safety:{catalogMutationAllowed:false,automaticGenerationAllowed:false,automaticPromotionAllowed:false,permissionInferred:false,playbackInferred:false},
    note:"Provider-generated target staging only. Family-level permission evidence never promotes a source. Exact generated code/targets require deployed review before any catalog change."
  };
}
