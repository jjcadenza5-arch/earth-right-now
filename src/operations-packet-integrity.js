import {readFile,stat} from "node:fs/promises";import path from "node:path";

const requiredJson=[
 "verification-horizon.json",
 "source-availability.json",
 "source-availability-continuity.json",
 "source-revalidation-triage.json",
 "watch-earth-now.json",
 "watch-earth-balance.json",
 "provider-worklist.json",
 "inside-recovery.json",
 "inside-playback-horizon.json",
 "operator-review-queue.json",
 "playback-evidence-consistency.json",
 "inside-provider-resilience.json",
 "embed-research.json",
 "embed-research-preflight.json",
 "provider-family-research.json",
 "research-review-queue.json",
 "commercial-inventory.json",
 "commercial-verification-horizon.json",
 "commercial-onboarding-plan.json",
 "commercial-research.json",
 "affiliate-platform-research.json",
 "affiliate-application-readiness.json",
 "submission-transport-readiness.json",
 "trend-current.json",
 "trend-delta.json",
 "operations-status.json"
];
const requiredText=["operator-brief.md"];

async function readJsonFile(file){
  try{return{ok:true,value:JSON.parse(await readFile(file,"utf8"))}}
  catch(error){return{ok:false,error:String(error?.message||error)}}
}
async function fileExists(file){try{const s=await stat(file);return s.isFile()&&s.size>0}catch{return false}}

export async function validateOperationsPacket(dir="ern-ops"){
  const issues=[],files={};
  for(const name of requiredJson){
    const file=path.join(dir,name);
    if(!(await fileExists(file))){issues.push({file:name,code:"MISSING_OR_EMPTY"});continue}
    const parsed=await readJsonFile(file);if(!parsed.ok){issues.push({file:name,code:"INVALID_JSON",detail:parsed.error});continue}
    files[name]=parsed.value;
  }
  for(const name of requiredText){
    const file=path.join(dir,name);
    if(!(await fileExists(file))){issues.push({file:name,code:"MISSING_OR_EMPTY"});continue}
    files[name]=await readFile(file,"utf8");
  }

  const availability=files["source-availability.json"];
  if(availability){
    if(!Array.isArray(availability.results))issues.push({file:"source-availability.json",code:"RESULTS_NOT_ARRAY"});
    for(const row of availability.results||[])if(row?.provesLive!==false)issues.push({file:"source-availability.json",code:"AVAILABILITY_MUST_NOT_PROVE_LIVE",id:row?.id||null});
  }

  const revalidationTriage=files["source-revalidation-triage.json"];
  if(revalidationTriage){
    if(revalidationTriage?.safety?.catalogMutationAllowed!==false)issues.push({file:"source-revalidation-triage.json",code:"REVALIDATION_TRIAGE_MUTATION_BOUNDARY_VIOLATION"});
    if(revalidationTriage?.safety?.automaticHealthChangeAllowed!==false)issues.push({file:"source-revalidation-triage.json",code:"REVALIDATION_TRIAGE_HEALTH_BOUNDARY_VIOLATION"});
    if(revalidationTriage?.safety?.availabilityProvesLive!==false)issues.push({file:"source-revalidation-triage.json",code:"REVALIDATION_TRIAGE_LIVE_BOUNDARY_VIOLATION"});
    for(const item of revalidationTriage?.items||[]){
      if(item?.catalogMutationAllowed!==false||item?.automaticHealthChangeAllowed!==false||item?.availabilityProvesLive!==false)issues.push({file:"source-revalidation-triage.json",code:"REVALIDATION_TRIAGE_ITEM_BOUNDARY_VIOLATION",id:item?.id||null});
    }
  }

  const continuity=files["source-availability-continuity.json"];
  if(continuity){
    if(!Array.isArray(continuity.rows))issues.push({file:"source-availability-continuity.json",code:"ROWS_NOT_ARRAY"});
    for(const row of continuity.rows||[]){
      if(row?.catalogMutationAllowed!==false)issues.push({file:"source-availability-continuity.json",code:"CONTINUITY_MUTATION_BOUNDARY_VIOLATION",id:row?.id||null});
      if(row?.automaticHealthChangeAllowed!==false)issues.push({file:"source-availability-continuity.json",code:"CONTINUITY_HEALTH_BOUNDARY_VIOLATION",id:row?.id||null});
    }
  }

  const researchQueue=files["research-review-queue.json"];
  if(researchQueue){
    if(researchQueue?.safety?.catalogPromotionAllowed!==false)issues.push({file:"research-review-queue.json",code:"RESEARCH_QUEUE_PROMOTION_BOUNDARY_VIOLATION"});
    if(researchQueue?.safety?.automaticPermissionApprovalAllowed!==false)issues.push({file:"research-review-queue.json",code:"RESEARCH_QUEUE_PERMISSION_BOUNDARY_VIOLATION"});
    if(researchQueue?.safety?.automaticPlaybackConfirmationAllowed!==false)issues.push({file:"research-review-queue.json",code:"RESEARCH_QUEUE_PLAYBACK_BOUNDARY_VIOLATION"});
    if(!Array.isArray(researchQueue?.primary)||researchQueue.primary.length>1)issues.push({file:"research-review-queue.json",code:"RESEARCH_QUEUE_PRIMARY_INVALID"});
    for(const item of [...(researchQueue?.primary||[]),...(researchQueue?.alternates||[])])if(item?.promotionAllowed!==false)issues.push({file:"research-review-queue.json",code:"RESEARCH_QUEUE_ITEM_PROMOTION_VIOLATION",id:item?.id||null});
  }

  const operatorReview=files["operator-review-queue.json"];
  if(operatorReview){
    if(operatorReview?.safety?.catalogMutationAllowed!==false)issues.push({file:"operator-review-queue.json",code:"OPERATOR_QUEUE_MUTATION_BOUNDARY_VIOLATION"});
    if(operatorReview?.safety?.automaticPlaybackVerificationAllowed!==false)issues.push({file:"operator-review-queue.json",code:"OPERATOR_QUEUE_AUTO_VERIFY_BOUNDARY_VIOLATION"});
    if(!Array.isArray(operatorReview?.items))issues.push({file:"operator-review-queue.json",code:"OPERATOR_QUEUE_ITEMS_NOT_ARRAY"});
    for(const item of operatorReview?.items||[])if(!["RENEW","RESTORE"].includes(item?.reviewMode))issues.push({file:"operator-review-queue.json",code:"OPERATOR_QUEUE_INVALID_MODE",id:item?.id||null});
  }

  const providerFamilyResearch=files["provider-family-research.json"];
  if(providerFamilyResearch){
    if(providerFamilyResearch?.safety?.catalogMutationAllowed!==false)issues.push({file:"provider-family-research.json",code:"PROVIDER_FAMILY_MUTATION_BOUNDARY_VIOLATION"});
    if(providerFamilyResearch?.safety?.automaticPermissionApprovalAllowed!==false)issues.push({file:"provider-family-research.json",code:"PROVIDER_FAMILY_PERMISSION_BOUNDARY_VIOLATION"});
    if(providerFamilyResearch?.safety?.automaticPromotionAllowed!==false)issues.push({file:"provider-family-research.json",code:"PROVIDER_FAMILY_PROMOTION_BOUNDARY_VIOLATION"});
    if(providerFamilyResearch?.unsafe?.length)issues.push({file:"provider-family-research.json",code:"UNSAFE_PROVIDER_FAMILY_RESEARCH",count:providerFamilyResearch.unsafe.length});
  }

  const playbackConsistency=files["playback-evidence-consistency.json"];
  if(playbackConsistency){
    if(playbackConsistency?.safety?.catalogMutationAllowed!==false)issues.push({file:"playback-evidence-consistency.json",code:"PLAYBACK_CONSISTENCY_MUTATION_BOUNDARY_VIOLATION"});
    if(playbackConsistency?.safety?.automaticHealthChangeAllowed!==false)issues.push({file:"playback-evidence-consistency.json",code:"PLAYBACK_CONSISTENCY_HEALTH_BOUNDARY_VIOLATION"});
    if(playbackConsistency?.safety?.automaticPlaybackVerificationAllowed!==false)issues.push({file:"playback-evidence-consistency.json",code:"PLAYBACK_CONSISTENCY_AUTO_VERIFY_BOUNDARY_VIOLATION"});
  }

  const preflight=files["embed-research-preflight.json"];
  if(preflight){
    if(!Array.isArray(preflight.rows))issues.push({file:"embed-research-preflight.json",code:"ROWS_NOT_ARRAY"});
    for(const row of preflight.rows||[]){
      if(row?.permissionConfirmed!==false)issues.push({file:"embed-research-preflight.json",code:"PREFLIGHT_PERMISSION_BOUNDARY_VIOLATION",id:row?.id||null});
      if(row?.humanPlaybackConfirmed!==false)issues.push({file:"embed-research-preflight.json",code:"PREFLIGHT_PLAYBACK_BOUNDARY_VIOLATION",id:row?.id||null});
      if(row?.promotionAllowed!==false)issues.push({file:"embed-research-preflight.json",code:"PREFLIGHT_PROMOTION_BOUNDARY_VIOLATION",id:row?.id||null});
    }
  }

  const commercial=files["commercial-inventory.json"];
  if(commercial){
    if(commercial?.safety?.inventPartnersAllowed!==false)issues.push({file:"commercial-inventory.json",code:"COMMERCIAL_INVENTION_BOUNDARY_VIOLATION"});
    if(commercial?.safety?.unverifiedOffersVisible!==false)issues.push({file:"commercial-inventory.json",code:"COMMERCIAL_VERIFICATION_BOUNDARY_VIOLATION"});
    if(commercial?.safety?.undisclosedAffiliateLinksAllowed!==false)issues.push({file:"commercial-inventory.json",code:"COMMERCIAL_DISCLOSURE_BOUNDARY_VIOLATION"});
    if(commercial?.safety?.paidRankingAllowed!==false)issues.push({file:"commercial-inventory.json",code:"COMMERCIAL_RANKING_BOUNDARY_VIOLATION"});
    if(commercial.stage!=="ACTIVE"&&commercial.publicActivationAllowed!==false)issues.push({file:"commercial-inventory.json",code:"PREMATURE_COMMERCIAL_ACTIVATION"});
  }

  const commercialHorizon=files["commercial-verification-horizon.json"];
  if(commercialHorizon){
    if(commercialHorizon?.safety?.automaticActivationAllowed!==false)issues.push({file:"commercial-verification-horizon.json",code:"COMMERCIAL_HORIZON_AUTO_ACTIVATION_BOUNDARY_VIOLATION"});
    if(commercialHorizon?.safety?.automaticRenewalAllowed!==false)issues.push({file:"commercial-verification-horizon.json",code:"COMMERCIAL_HORIZON_AUTO_RENEWAL_BOUNDARY_VIOLATION"});
    if(commercialHorizon?.safety?.publicRankingAffected!==false)issues.push({file:"commercial-verification-horizon.json",code:"COMMERCIAL_HORIZON_RANKING_BOUNDARY_VIOLATION"});
    if(commercialHorizon?.safety?.inventedInventoryAllowed!==false)issues.push({file:"commercial-verification-horizon.json",code:"COMMERCIAL_HORIZON_INVENTION_BOUNDARY_VIOLATION"});
  }

  const onboarding=files["commercial-onboarding-plan.json"];
  if(onboarding){
    if(onboarding?.safety?.publicRankingAffected!==false)issues.push({file:"commercial-onboarding-plan.json",code:"ONBOARDING_PUBLIC_RANKING_BOUNDARY_VIOLATION"});
    if(onboarding?.safety?.demandForecast!==false)issues.push({file:"commercial-onboarding-plan.json",code:"ONBOARDING_DEMAND_FORECAST_BOUNDARY_VIOLATION"});
    if(onboarding?.safety?.revenueForecast!==false)issues.push({file:"commercial-onboarding-plan.json",code:"ONBOARDING_REVENUE_FORECAST_BOUNDARY_VIOLATION"});
    if(onboarding?.safety?.paidPriorityAllowed!==false)issues.push({file:"commercial-onboarding-plan.json",code:"ONBOARDING_PAID_PRIORITY_BOUNDARY_VIOLATION"});
    if(onboarding?.safety?.inventOffersAllowed!==false)issues.push({file:"commercial-onboarding-plan.json",code:"ONBOARDING_INVENTION_BOUNDARY_VIOLATION"});
  }

  const commercialResearch=files["commercial-research.json"];
  if(commercialResearch){
    if(commercialResearch?.publicActivationAllowed!==false)issues.push({file:"commercial-research.json",code:"COMMERCIAL_RESEARCH_PUBLIC_ACTIVATION_VIOLATION"});
    if(commercialResearch?.safety?.inventOptionsAllowed!==false)issues.push({file:"commercial-research.json",code:"COMMERCIAL_RESEARCH_INVENTION_BOUNDARY_VIOLATION"});
    if(commercialResearch?.safety?.automaticAffiliateActivationAllowed!==false)issues.push({file:"commercial-research.json",code:"COMMERCIAL_RESEARCH_AFFILIATE_BOUNDARY_VIOLATION"});
    if(commercialResearch?.safety?.automaticPublicVisibilityAllowed!==false)issues.push({file:"commercial-research.json",code:"COMMERCIAL_RESEARCH_VISIBILITY_BOUNDARY_VIOLATION"});
    if(commercialResearch?.safety?.paidRankingAllowed!==false)issues.push({file:"commercial-research.json",code:"COMMERCIAL_RESEARCH_RANKING_BOUNDARY_VIOLATION"});
    if(commercialResearch?.invalid)issues.push({file:"commercial-research.json",code:"INVALID_COMMERCIAL_RESEARCH_ROWS",count:commercialResearch.invalid});
  }

  const affiliateResearch=files["affiliate-platform-research.json"];
  if(affiliateResearch){
    if(affiliateResearch?.publicActivationAllowed!==false)issues.push({file:"affiliate-platform-research.json",code:"AFFILIATE_RESEARCH_PUBLIC_ACTIVATION_VIOLATION"});
    if(affiliateResearch?.safety?.automaticApplicationAllowed!==false)issues.push({file:"affiliate-platform-research.json",code:"AFFILIATE_RESEARCH_AUTO_APPLICATION_VIOLATION"});
    if(affiliateResearch?.safety?.automaticRelationshipClaimAllowed!==false)issues.push({file:"affiliate-platform-research.json",code:"AFFILIATE_RESEARCH_RELATIONSHIP_VIOLATION"});
    if(affiliateResearch?.safety?.credentialsStored!==false)issues.push({file:"affiliate-platform-research.json",code:"AFFILIATE_RESEARCH_CREDENTIAL_VIOLATION"});
    if(affiliateResearch?.safety?.trackedLinksAllowed!==false)issues.push({file:"affiliate-platform-research.json",code:"AFFILIATE_RESEARCH_TRACKING_VIOLATION"});
    if(affiliateResearch?.safety?.paidRankingAllowed!==false)issues.push({file:"affiliate-platform-research.json",code:"AFFILIATE_RESEARCH_RANKING_VIOLATION"});
    if(affiliateResearch?.invalid)issues.push({file:"affiliate-platform-research.json",code:"INVALID_AFFILIATE_RESEARCH_ROWS",count:affiliateResearch.invalid});
  }

  const affiliateReadiness=files["affiliate-application-readiness.json"];
  if(affiliateReadiness){
    if(affiliateReadiness?.safety?.automaticApplicationAllowed!==false)issues.push({file:"affiliate-application-readiness.json",code:"AFFILIATE_READINESS_AUTO_APPLICATION_VIOLATION"});
    if(affiliateReadiness?.safety?.automaticCredentialSetupAllowed!==false)issues.push({file:"affiliate-application-readiness.json",code:"AFFILIATE_READINESS_CREDENTIAL_VIOLATION"});
    if(affiliateReadiness?.safety?.automaticTrackedLinkActivationAllowed!==false)issues.push({file:"affiliate-application-readiness.json",code:"AFFILIATE_READINESS_TRACKING_VIOLATION"});
    if(affiliateReadiness?.safety?.automaticPublicActivationAllowed!==false)issues.push({file:"affiliate-application-readiness.json",code:"AFFILIATE_READINESS_PUBLIC_ACTIVATION_VIOLATION"});
    if(affiliateReadiness?.safety?.paidRankingAllowed!==false)issues.push({file:"affiliate-application-readiness.json",code:"AFFILIATE_READINESS_RANKING_VIOLATION"});
  }

  const transport=files["submission-transport-readiness.json"];
  if(transport){
    if(transport?.safety?.automaticPublishAllowed!==false)issues.push({file:"submission-transport-readiness.json",code:"TRANSPORT_AUTO_PUBLISH_BOUNDARY_VIOLATION"});
    if(transport?.safety?.automaticApprovalAllowed!==false)issues.push({file:"submission-transport-readiness.json",code:"TRANSPORT_AUTO_APPROVAL_BOUNDARY_VIOLATION"});
    if(transport?.safety?.silentBackgroundSubmissionAllowed!==false)issues.push({file:"submission-transport-readiness.json",code:"TRANSPORT_SILENT_SUBMISSION_BOUNDARY_VIOLATION"});
    if(transport?.safety?.credentialsIncluded!==false)issues.push({file:"submission-transport-readiness.json",code:"TRANSPORT_CREDENTIAL_BOUNDARY_VIOLATION"});
    if(transport?.safety?.retentionBeyondPolicyAllowed!==false)issues.push({file:"submission-transport-readiness.json",code:"TRANSPORT_RETENTION_BOUNDARY_VIOLATION"});
    if(transport.status==="READY"&&transport.active!==true)issues.push({file:"submission-transport-readiness.json",code:"TRANSPORT_READY_STATE_INCONSISTENT"});
  }

  const trend=files["trend-current.json"];
  if(trend&&trend.schemaVersion!==1)issues.push({file:"trend-current.json",code:"UNSUPPORTED_SCHEMA_VERSION",value:trend.schemaVersion??null});

  const delta=files["trend-delta.json"];
  if(delta&&!["BASELINE","IMPROVING","REGRESSING","MIXED","UNCHANGED"].includes(delta.direction))issues.push({file:"trend-delta.json",code:"INVALID_TREND_DIRECTION",value:delta.direction??null});

  const brief=files["operator-brief.md"];
  if(typeof brief==="string"&&!/Read-only operational summary/i.test(brief))issues.push({file:"operator-brief.md",code:"READ_ONLY_BOUNDARY_MISSING"});

  const status=files["operations-status.json"];
  if(status&&status?.providerReview?.unsafe?.length)issues.push({file:"operations-status.json",code:"UNSAFE_PROVIDER_REVIEW_PRESENT",count:status.providerReview.unsafe.length});

  return{
    schemaVersion:1,
    checkedAt:new Date().toISOString(),
    directory:dir,
    requiredFiles:[...requiredJson,...requiredText],
    valid:issues.length===0,
    issueCount:issues.length,
    issues,
    safety:{
      catalogMutationAllowed:false,
      automaticHealthChangeAllowed:false,
      automaticPermissionApprovalAllowed:false,
      automaticPromotionAllowed:false
    },
    note:"Packet-integrity preflight only. It validates retained diagnostics and safety boundaries; it does not modify ERN."
  };
}
