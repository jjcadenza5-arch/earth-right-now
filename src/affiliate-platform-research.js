const INTENTS=new Set(["stay","eat","transport","activities","tickets","services","connectivity"]);
function https(raw){try{const u=new URL(String(raw||""));return u.protocol==="https:"&&!u.username&&!u.password&&Boolean(u.hostname)}catch{return false}}
function commonReasons(raw,now,maxAgeDays){
 const reasons=[],reviewed=Date.parse(raw?.termsReviewedAt||""),ageDays=Number.isFinite(reviewed)?Math.max(0,(Number(now)-reviewed)/864e5):Infinity;
 if(!raw?.id||!raw?.name)reasons.push("MISSING_ID_OR_NAME");
 if(!Array.isArray(raw?.intents)||!raw.intents.length||raw.intents.some(x=>!INTENTS.has(x)))reasons.push("INVALID_INTENTS");
 if(!https(raw?.programUrl)||!https(raw?.termsUrl))reasons.push("INVALID_URL");
 if(raw?.paidRankingAllowed!==false)reasons.push("PAID_RANKING_MUST_BE_FALSE");
 if(!Number.isFinite(reviewed))reasons.push("INVALID_TERMS_REVIEW");
 else if(reviewed>Number(now)+5*60*1000)reasons.push("FUTURE_TERMS_REVIEW");
 else if(ageDays>maxAgeDays)reasons.push("TERMS_REVIEW_STALE");
 return{reasons,ageDays};
}
function researchReasons(raw){
 const reasons=[],status=String(raw?.programStatus||""),projectCheck=status.startsWith("AVAILABLE_PROJECT_");
 if(!status.startsWith("AVAILABLE_"))reasons.push("PROGRAM_NOT_RESEARCH_AVAILABLE");
 if(projectCheck?raw?.applicationRequired!==false:raw?.applicationRequired!==true)reasons.push(projectCheck?"PROJECT_STATUS_CHECK_MUST_NOT_REQUIRE_APPLICATION":"APPLICATION_REQUIRED_MUST_BE_TRUE");
 if(raw?.relationshipActive!==false)reasons.push("RELATIONSHIP_MUST_BE_INACTIVE");
 if(raw?.credentialsConfigured!==false)reasons.push("CREDENTIALS_MUST_BE_FALSE");
 if(raw?.publicActivationAllowed!==false)reasons.push("PUBLIC_ACTIVATION_MUST_BE_FALSE");
 if(raw?.trackedLinksAllowed!==false)reasons.push("TRACKED_LINKS_MUST_BE_FALSE");
 return reasons;
}
function linkToolReasons(raw){
 const reasons=[];
 if(String(raw?.programStatus||"")!=="OWNER_ACCOUNT_LINK_GENERATION_AVAILABLE")reasons.push("LINK_TOOL_STATUS_REQUIRED");
 if(raw?.applicationRequired!==false)reasons.push("LINK_TOOL_APPLICATION_MUST_BE_FALSE");
 if(raw?.relationshipActive!==true)reasons.push("LINK_TOOL_RELATIONSHIP_REQUIRED");
 if(raw?.credentialsConfigured!==true)reasons.push("LINK_TOOL_CREDENTIALS_REQUIRED");
 if(raw?.publicActivationAllowed!==false)reasons.push("LINK_TOOL_PUBLIC_ACTIVATION_MUST_BE_FALSE");
 if(raw?.trackedLinksAllowed!==true)reasons.push("LINK_TOOL_TRACKED_LINKS_REQUIRED");
 if(!String(raw?.operatorEvidence||raw?.commissionEvidence||"").trim())reasons.push("LINK_TOOL_OPERATOR_EVIDENCE_REQUIRED");
 if(raw?.manualToolsOnly!==true)reasons.push("LINK_TOOL_MANUAL_TOOLS_ONLY_REQUIRED");
 if(raw?.driveAutomationAllowed!==false)reasons.push("LINK_TOOL_DRIVE_AUTOMATION_MUST_BE_FALSE");
 if(raw?.automaticLinkRewritingAllowed!==false)reasons.push("LINK_TOOL_AUTO_REWRITE_MUST_BE_FALSE");
 if(raw?.automaticPlacementAllowed!==false)reasons.push("LINK_TOOL_AUTO_PLACEMENT_MUST_BE_FALSE");
 if(raw?.rankingAffectedByCommission!==false)reasons.push("LINK_TOOL_COMMISSION_RANKING_MUST_BE_FALSE");
 return reasons;
}
function activeReasons(raw){
 const reasons=[];
 if(!String(raw?.programStatus||"").startsWith("ACTIVE_"))reasons.push("ACTIVE_STATUS_REQUIRED");
 if(raw?.applicationRequired!==false)reasons.push("ACTIVE_APPLICATION_REQUIRED_MUST_BE_FALSE");
 if(raw?.relationshipActive!==true)reasons.push("ACTIVE_RELATIONSHIP_REQUIRED");
 if(raw?.credentialsConfigured!==true)reasons.push("ACTIVE_CREDENTIALS_REQUIRED");
 if(raw?.publicActivationAllowed!==true)reasons.push("ACTIVE_PUBLIC_ACTIVATION_REQUIRED");
 if(raw?.trackedLinksAllowed!==true)reasons.push("ACTIVE_TRACKED_LINKS_REQUIRED");
 if(!String(raw?.operatorEvidence||"").trim())reasons.push("ACTIVE_OPERATOR_EVIDENCE_REQUIRED");
 if(raw?.manualToolsOnly!==true)reasons.push("ACTIVE_MANUAL_TOOLS_ONLY_REQUIRED");
 if(raw?.driveAutomationAllowed!==false)reasons.push("ACTIVE_DRIVE_AUTOMATION_MUST_BE_FALSE");
 if(raw?.automaticLinkRewritingAllowed!==false)reasons.push("ACTIVE_AUTO_REWRITE_MUST_BE_FALSE");
 if(raw?.automaticPlacementAllowed!==false)reasons.push("ACTIVE_AUTO_PLACEMENT_MUST_BE_FALSE");
 if(raw?.rankingAffectedByCommission!==false)reasons.push("ACTIVE_COMMISSION_RANKING_MUST_BE_FALSE");
 return reasons;
}
export function affiliatePlatformResearchStatus(rows=[],{now=Date.now(),maxAgeDays=30}={}){
 const items=(rows||[]).map(raw=>{
  const common=commonReasons(raw,now,maxAgeDays);
  const status=String(raw?.programStatus||""),state=status.startsWith("ACTIVE_")?"ACTIVE_OPERATOR_CONFIRMED":status==="OWNER_ACCOUNT_LINK_GENERATION_AVAILABLE"?"LINK_GENERATION_AVAILABLE":"RESEARCH_CANDIDATE";
  const reasons=[...common.reasons,...(state==="ACTIVE_OPERATOR_CONFIRMED"?activeReasons(raw):state==="LINK_GENERATION_AVAILABLE"?linkToolReasons(raw):researchReasons(raw))];
  return{...raw,state,ageDays:Number.isFinite(common.ageDays)?Number(common.ageDays.toFixed(2)):null,valid:reasons.length===0,reasons};
 });
 const validItems=items.filter(x=>x.valid),researchCandidates=validItems.filter(x=>x.state==="RESEARCH_CANDIDATE"),linkToolPlatforms=validItems.filter(x=>x.state==="LINK_GENERATION_AVAILABLE"),activePlatforms=validItems.filter(x=>x.state==="ACTIVE_OPERATOR_CONFIRMED");
 return{
  generatedAt:new Date(Number(now)).toISOString(),total:items.length,valid:validItems.length,invalid:items.length-validItems.length,
  researchCandidates:researchCandidates.length,linkToolPlatforms:linkToolPlatforms.length,activePlatforms:activePlatforms.length,
  intentCoverage:Object.fromEntries([...INTENTS].map(k=>[k,validItems.filter(x=>x.intents.includes(k)).length])),
  items,publicActivationAllowed:false,
  safety:{automaticApplicationAllowed:false,automaticRelationshipClaimAllowed:false,credentialsStored:false,trackedLinksAllowed:false,automaticPlacementAllowed:false,automaticLinkRewritingAllowed:false,paidRankingAllowed:false,revenueForecast:false},
  next:linkToolPlatforms.length?"PREPARE_VERIFIED_LINKS_FROM_AVAILABLE_TOOLS":researchCandidates.length?"CHOOSE_RESEARCH_CANDIDATES_FOR_APPLICATION_LATER":activePlatforms.length?"OPERATE_ACTIVE_PLATFORMS_MANUALLY":"REFRESH_PLATFORM_RESEARCH",
  note:"Mixed affiliate-platform registry. Research candidates remain inactive/fail-closed. Account-side link-generation programs are usable only through manual verified links and remain fail-closed for public placement until ERN verifies each exact link. Explicit operator-confirmed active platforms retain their existing manual/disclosure safeguards."
 };
}
