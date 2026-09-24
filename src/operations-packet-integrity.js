import {readFile,stat} from "node:fs/promises";import path from "node:path";

const requiredJson=[
 "verification-horizon.json",
 "source-availability.json",
 "source-availability-continuity.json",
 "watch-earth-now.json",
 "watch-earth-balance.json",
 "provider-worklist.json",
 "inside-recovery.json",
 "inside-playback-horizon.json",
 "inside-provider-resilience.json",
 "embed-research.json",
 "embed-research-preflight.json",
 "commercial-inventory.json",
 "commercial-onboarding-plan.json",
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

  const continuity=files["source-availability-continuity.json"];
  if(continuity){
    if(!Array.isArray(continuity.rows))issues.push({file:"source-availability-continuity.json",code:"ROWS_NOT_ARRAY"});
    for(const row of continuity.rows||[]){
      if(row?.catalogMutationAllowed!==false)issues.push({file:"source-availability-continuity.json",code:"CONTINUITY_MUTATION_BOUNDARY_VIOLATION",id:row?.id||null});
      if(row?.automaticHealthChangeAllowed!==false)issues.push({file:"source-availability-continuity.json",code:"CONTINUITY_HEALTH_BOUNDARY_VIOLATION",id:row?.id||null});
    }
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

  const onboarding=files["commercial-onboarding-plan.json"];
  if(onboarding){
    if(onboarding?.safety?.publicRankingAffected!==false)issues.push({file:"commercial-onboarding-plan.json",code:"ONBOARDING_PUBLIC_RANKING_BOUNDARY_VIOLATION"});
    if(onboarding?.safety?.demandForecast!==false)issues.push({file:"commercial-onboarding-plan.json",code:"ONBOARDING_DEMAND_FORECAST_BOUNDARY_VIOLATION"});
    if(onboarding?.safety?.revenueForecast!==false)issues.push({file:"commercial-onboarding-plan.json",code:"ONBOARDING_REVENUE_FORECAST_BOUNDARY_VIOLATION"});
    if(onboarding?.safety?.paidPriorityAllowed!==false)issues.push({file:"commercial-onboarding-plan.json",code:"ONBOARDING_PAID_PRIORITY_BOUNDARY_VIOLATION"});
    if(onboarding?.safety?.inventOffersAllowed!==false)issues.push({file:"commercial-onboarding-plan.json",code:"ONBOARDING_INVENTION_BOUNDARY_VIOLATION"});
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
