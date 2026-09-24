import assert from "node:assert/strict";import {mkdtemp,writeFile} from "node:fs/promises";import os from "node:os";import path from "node:path";import {validateOperationsPacket} from "../src/operations-packet-integrity.js";
const dir=await mkdtemp(path.join(os.tmpdir(),"ern-packet-"));
const files={
 "verification-horizon.json":{},
 "source-availability.json":{results:[{id:"a",provesLive:false}]},
 "source-availability-continuity.json":{rows:[{id:"a",catalogMutationAllowed:false,automaticHealthChangeAllowed:false}]},
 "source-revalidation-triage.json":{items:[{id:"a",catalogMutationAllowed:false,automaticHealthChangeAllowed:false,availabilityProvesLive:false}],safety:{catalogMutationAllowed:false,automaticHealthChangeAllowed:false,availabilityProvesLive:false}},
 "watch-earth-now.json":{},
 "watch-earth-balance.json":{},
 "provider-worklist.json":{},
 "inside-recovery.json":{},
 "inside-playback-horizon.json":{},
 "operator-review-queue.json":{items:[{id:"a",reviewMode:"RESTORE"}],safety:{catalogMutationAllowed:false,automaticPlaybackVerificationAllowed:false}},
 "playback-evidence-consistency.json":{summary:{issues:0},safety:{catalogMutationAllowed:false,automaticHealthChangeAllowed:false,automaticPlaybackVerificationAllowed:false}},
 "inside-provider-resilience.json":{},
 "embed-research.json":{},
 "embed-research-preflight.json":{rows:[{id:"y",permissionConfirmed:false,humanPlaybackConfirmed:false,promotionAllowed:false}]},
 "provider-family-research.json":{unsafe:[],safety:{catalogMutationAllowed:false,automaticPermissionApprovalAllowed:false,automaticPromotionAllowed:false}},
 "research-review-queue.json":{primary:[{id:"r",promotionAllowed:false}],alternates:[],safety:{catalogPromotionAllowed:false,automaticPermissionApprovalAllowed:false,automaticPlaybackConfirmationAllowed:false}},
 "commercial-inventory.json":{stage:"EMPTY_STAGING",publicActivationAllowed:false,safety:{inventPartnersAllowed:false,unverifiedOffersVisible:false,undisclosedAffiliateLinksAllowed:false,paidRankingAllowed:false}},
 "commercial-verification-horizon.json":{summary:{attention:0},safety:{automaticActivationAllowed:false,automaticRenewalAllowed:false,publicRankingAffected:false,inventedInventoryAllowed:false}},
 "commercial-onboarding-plan.json":{safety:{publicRankingAffected:false,demandForecast:false,revenueForecast:false,paidPriorityAllowed:false,inventOffersAllowed:false}},
 "submission-transport-readiness.json":{status:"DISABLED",active:false,safety:{automaticPublishAllowed:false,automaticApprovalAllowed:false,silentBackgroundSubmissionAllowed:false,credentialsIncluded:false,retentionBeyondPolicyAllowed:false}},
 "trend-current.json":{schemaVersion:1},
 "trend-delta.json":{direction:"BASELINE"},
 "operations-status.json":{providerReview:{unsafe:[]}}
};
for(const [name,value] of Object.entries(files))await writeFile(path.join(dir,name),JSON.stringify(value));
await writeFile(path.join(dir,"operator-brief.md"),"_Read-only operational summary._");
let r=await validateOperationsPacket(dir);assert.equal(r.valid,true);assert.equal(r.issueCount,0);

const bad=await mkdtemp(path.join(os.tmpdir(),"ern-packet-bad-"));
for(const [name,value] of Object.entries(files))await writeFile(path.join(bad,name),JSON.stringify(value));
await writeFile(path.join(bad,"operator-brief.md"),"no boundary");
await writeFile(path.join(bad,"source-availability-continuity.json"),JSON.stringify({rows:[{id:"a",catalogMutationAllowed:true,automaticHealthChangeAllowed:false}]}));
await writeFile(path.join(bad,"source-revalidation-triage.json"),JSON.stringify({items:[{id:"a",catalogMutationAllowed:true,automaticHealthChangeAllowed:true,availabilityProvesLive:true}],safety:{catalogMutationAllowed:true,automaticHealthChangeAllowed:true,availabilityProvesLive:true}}));
await writeFile(path.join(bad,"research-review-queue.json"),JSON.stringify({primary:[{id:"r",promotionAllowed:true},{id:"r2",promotionAllowed:false}],alternates:[],safety:{catalogPromotionAllowed:true,automaticPermissionApprovalAllowed:true,automaticPlaybackConfirmationAllowed:true}}));
await writeFile(path.join(bad,"operator-review-queue.json"),JSON.stringify({items:[{id:"a",reviewMode:"AUTO"}],safety:{catalogMutationAllowed:true,automaticPlaybackVerificationAllowed:true}}));
await writeFile(path.join(bad,"provider-family-research.json"),JSON.stringify({unsafe:[{id:"x"}],safety:{catalogMutationAllowed:true,automaticPermissionApprovalAllowed:true,automaticPromotionAllowed:true}}));
await writeFile(path.join(bad,"playback-evidence-consistency.json"),JSON.stringify({safety:{catalogMutationAllowed:true,automaticHealthChangeAllowed:true,automaticPlaybackVerificationAllowed:true}}));
await writeFile(path.join(bad,"embed-research-preflight.json"),JSON.stringify({rows:[{id:"y",permissionConfirmed:true,humanPlaybackConfirmed:false,promotionAllowed:false}]}));
await writeFile(path.join(bad,"commercial-inventory.json"),JSON.stringify({stage:"EMPTY_STAGING",publicActivationAllowed:true,safety:{inventPartnersAllowed:false,unverifiedOffersVisible:false,undisclosedAffiliateLinksAllowed:false,paidRankingAllowed:true}}));
await writeFile(path.join(bad,"commercial-verification-horizon.json"),JSON.stringify({safety:{automaticActivationAllowed:true,automaticRenewalAllowed:true,publicRankingAffected:true,inventedInventoryAllowed:true}}));
await writeFile(path.join(bad,"commercial-onboarding-plan.json"),JSON.stringify({safety:{publicRankingAffected:true,demandForecast:true,revenueForecast:false,paidPriorityAllowed:true,inventOffersAllowed:true}}));
await writeFile(path.join(bad,"submission-transport-readiness.json"),JSON.stringify({status:"READY",active:true,safety:{automaticPublishAllowed:true,automaticApprovalAllowed:true,silentBackgroundSubmissionAllowed:true,credentialsIncluded:true,retentionBeyondPolicyAllowed:true}}));
r=await validateOperationsPacket(bad);assert.equal(r.valid,false);assert.ok(r.issues.some(x=>x.code==="CONTINUITY_MUTATION_BOUNDARY_VIOLATION"));assert.ok(r.issues.some(x=>x.code==="REVALIDATION_TRIAGE_MUTATION_BOUNDARY_VIOLATION"));assert.ok(r.issues.some(x=>x.code==="REVALIDATION_TRIAGE_HEALTH_BOUNDARY_VIOLATION"));assert.ok(r.issues.some(x=>x.code==="REVALIDATION_TRIAGE_LIVE_BOUNDARY_VIOLATION"));assert.ok(r.issues.some(x=>x.code==="REVALIDATION_TRIAGE_ITEM_BOUNDARY_VIOLATION"));assert.ok(r.issues.some(x=>x.code==="RESEARCH_QUEUE_PROMOTION_BOUNDARY_VIOLATION"));assert.ok(r.issues.some(x=>x.code==="RESEARCH_QUEUE_PERMISSION_BOUNDARY_VIOLATION"));assert.ok(r.issues.some(x=>x.code==="RESEARCH_QUEUE_PLAYBACK_BOUNDARY_VIOLATION"));assert.ok(r.issues.some(x=>x.code==="RESEARCH_QUEUE_PRIMARY_INVALID"));assert.ok(r.issues.some(x=>x.code==="RESEARCH_QUEUE_ITEM_PROMOTION_VIOLATION"));assert.ok(r.issues.some(x=>x.code==="OPERATOR_QUEUE_MUTATION_BOUNDARY_VIOLATION"));assert.ok(r.issues.some(x=>x.code==="OPERATOR_QUEUE_AUTO_VERIFY_BOUNDARY_VIOLATION"));assert.ok(r.issues.some(x=>x.code==="OPERATOR_QUEUE_INVALID_MODE"));assert.ok(r.issues.some(x=>x.code==="PROVIDER_FAMILY_MUTATION_BOUNDARY_VIOLATION"));assert.ok(r.issues.some(x=>x.code==="PROVIDER_FAMILY_PERMISSION_BOUNDARY_VIOLATION"));assert.ok(r.issues.some(x=>x.code==="PROVIDER_FAMILY_PROMOTION_BOUNDARY_VIOLATION"));assert.ok(r.issues.some(x=>x.code==="UNSAFE_PROVIDER_FAMILY_RESEARCH"));assert.ok(r.issues.some(x=>x.code==="PLAYBACK_CONSISTENCY_MUTATION_BOUNDARY_VIOLATION"));assert.ok(r.issues.some(x=>x.code==="PLAYBACK_CONSISTENCY_HEALTH_BOUNDARY_VIOLATION"));assert.ok(r.issues.some(x=>x.code==="PLAYBACK_CONSISTENCY_AUTO_VERIFY_BOUNDARY_VIOLATION"));assert.ok(r.issues.some(x=>x.code==="PREFLIGHT_PERMISSION_BOUNDARY_VIOLATION"));assert.ok(r.issues.some(x=>x.code==="PREMATURE_COMMERCIAL_ACTIVATION"));assert.ok(r.issues.some(x=>x.code==="COMMERCIAL_RANKING_BOUNDARY_VIOLATION"));assert.ok(r.issues.some(x=>x.code==="COMMERCIAL_HORIZON_AUTO_ACTIVATION_BOUNDARY_VIOLATION"));assert.ok(r.issues.some(x=>x.code==="COMMERCIAL_HORIZON_AUTO_RENEWAL_BOUNDARY_VIOLATION"));assert.ok(r.issues.some(x=>x.code==="COMMERCIAL_HORIZON_RANKING_BOUNDARY_VIOLATION"));assert.ok(r.issues.some(x=>x.code==="COMMERCIAL_HORIZON_INVENTION_BOUNDARY_VIOLATION"));assert.ok(r.issues.some(x=>x.code==="ONBOARDING_PUBLIC_RANKING_BOUNDARY_VIOLATION"));assert.ok(r.issues.some(x=>x.code==="ONBOARDING_DEMAND_FORECAST_BOUNDARY_VIOLATION"));assert.ok(r.issues.some(x=>x.code==="ONBOARDING_PAID_PRIORITY_BOUNDARY_VIOLATION"));assert.ok(r.issues.some(x=>x.code==="ONBOARDING_INVENTION_BOUNDARY_VIOLATION"));assert.ok(r.issues.some(x=>x.code==="TRANSPORT_AUTO_PUBLISH_BOUNDARY_VIOLATION"));assert.ok(r.issues.some(x=>x.code==="TRANSPORT_AUTO_APPROVAL_BOUNDARY_VIOLATION"));assert.ok(r.issues.some(x=>x.code==="TRANSPORT_SILENT_SUBMISSION_BOUNDARY_VIOLATION"));assert.ok(r.issues.some(x=>x.code==="TRANSPORT_CREDENTIAL_BOUNDARY_VIOLATION"));assert.ok(r.issues.some(x=>x.code==="TRANSPORT_RETENTION_BOUNDARY_VIOLATION"));assert.ok(r.issues.some(x=>x.code==="READ_ONLY_BOUNDARY_MISSING"));
console.log("ERN operations packet integrity passed");
