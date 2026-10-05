function byId(rows=[]){return new Map(rows.map(x=>[x.id,x]))}
function openRights(family){return family?.permissionConfirmed===true||/PUBLIC_DOMAIN|CC_BY|OGDL|COMMERCIAL.*REUSE_ALLOWED|OPEN_INFORMATION_REUSE/i.test(String(family?.permissionStatus||""))}
export function currentImagePromotionPlan({targets=[],families=[],sources=[],verification={}}={}){
 const fm=byId(families),sm=byId(sources),vm=byId(verification.items||[]);
 const items=targets.filter(t=>["PROVIDER_AUTHORIZED_CURRENT_IMAGE","PROVIDER_GENERATED_CURRENT_IMAGE"].includes(t.integrationKind)&&t.exactTargetUrl).map(t=>{
   const family=fm.get(t.providerFamilyId),source=sm.get(t.sourceId),probe=vm.get(t.id);
   const rightsOk=openRights(family);
   const probeOk=probe?.state==="FETCH_OK_TEMPORAL_EVIDENCE_CURRENT"&&probe?.automatedReviewPassed===true;
   const sourceBound=Boolean(source&&source.truth==="LIVE_IMAGE");
   const currentlyPublicInside=source?.playback==="IMAGE_REFRESH"&&source?.permission!=="LINK_ONLY";
   let state="BLOCKED";
   if(rightsOk&&probeOk&&sourceBound&&!currentlyPublicInside)state="READY_FOR_EDITORIAL_PROMOTION_REVIEW";
   else if(rightsOk&&probeOk&&sourceBound&&currentlyPublicInside)state="PUBLIC_IMAGE_REFRESH_MAINTENANCE_ELIGIBLE";
   return{
     id:t.id,sourceId:t.sourceId,provider:t.provider,providerFamilyId:t.providerFamilyId,
     state,rightsOk,probeOk,sourceBound,currentlyPublicInside,
     publicSourceState:source?{truth:source.truth,permission:source.permission,playback:source.playback}:null,
     exactTargetUrl:t.exactTargetUrl,
     evidenceTimestamp:probe?.evidenceTimestamp||null,evidenceAgeMinutes:probe?.evidenceAgeMinutes??null,
     catalogMutationAllowed:false,automaticPromotionAllowed:false,
     nextAction:state==="READY_FOR_EDITORIAL_PROMOTION_REVIEW"?"REVIEW_PUBLIC_IMAGE_REFRESH_TRANSITION_WITH_ATTRIBUTION_AND_ROLLBACK_GUARDS":
       state==="PUBLIC_IMAGE_REFRESH_MAINTENANCE_ELIGIBLE"?"ALLOW_MACHINE_EVIDENCE_RENEWAL_ONLY_FOR_ALREADY_PROMOTED_SOURCE":
       !rightsOk?"RESOLVE_REUSE_RIGHTS":!probeOk?"RESTORE_MACHINE_CURRENTNESS_EVIDENCE":!sourceBound?"FIX_SOURCE_BINDING":"KEEP_FAIL_CLOSED"
   };
 });
 return{
   generatedAt:new Date().toISOString(),total:items.length,
   ready:items.filter(x=>x.state==="READY_FOR_EDITORIAL_PROMOTION_REVIEW").length,
   maintenanceEligible:items.filter(x=>x.state==="PUBLIC_IMAGE_REFRESH_MAINTENANCE_ELIGIBLE").length,
   blocked:items.filter(x=>x.state==="BLOCKED").length,
   state:items.some(x=>x.state==="READY_FOR_EDITORIAL_PROMOTION_REVIEW")?"EDITORIAL_REVIEW_READY":"NO_PUBLIC_TRANSITION_READY",
   items,
   safety:{catalogMutationAllowed:false,automaticPromotionAllowed:false,linkOnlyAutoUpgradeAllowed:false},
   note:"Readiness only. Machine currentness and reusable rights can make a candidate review-ready, but never change a public catalog source automatically."
 };
}
