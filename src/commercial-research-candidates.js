const INTENTS=new Set(["stay","eat","transport","activities","tickets","services"]);
function safeHttps(raw){try{const u=new URL(String(raw||""));return u.protocol==="https:"&&!u.username&&!u.password&&Boolean(u.hostname)}catch{return false}}
export function commercialResearchStatus(rows=[],{knownPlaceIds=[],now=Date.now(),maxAgeDays=30}={}){
 const known=new Set((knownPlaceIds||[]).map(String)),items=[],issues=[];
 for(const raw of rows||[]){
  const id=String(raw?.id||"").trim(),placeId=String(raw?.placeId||"").trim(),verified=Date.parse(raw?.verifiedAt||""),ageDays=Number.isFinite(verified)?Math.max(0,(Number(now)-verified)/864e5):Infinity;
  const reasons=[];
  if(!id)reasons.push("MISSING_ID");
  if(!known.has(placeId))reasons.push("UNKNOWN_PLACE");
  if(!INTENTS.has(raw?.intent))reasons.push("INVALID_INTENT");
  if(!safeHttps(raw?.url))reasons.push("INVALID_URL");
  if(raw?.researchStatus!=="RESEARCH_ONLY")reasons.push("NOT_RESEARCH_ONLY");
  if(raw?.publicActivationAllowed!==false)reasons.push("PUBLIC_ACTIVATION_MUST_BE_FALSE");
  if(raw?.affiliateStatus!=="NOT_REVIEWED")reasons.push("AFFILIATE_STATUS_MUST_BE_NOT_REVIEWED");
  if(raw?.sponsored!==false)reasons.push("SPONSORED_MUST_BE_FALSE");
  if(raw?.paidPriorityAllowed!==false)reasons.push("PAID_PRIORITY_MUST_BE_FALSE");
  if(raw?.contacted!==false)reasons.push("CONTACTED_MUST_BE_FALSE");
  if(!Number.isFinite(verified))reasons.push("INVALID_VERIFIED_AT");
  else if(verified>Number(now)+5*60*1000)reasons.push("FUTURE_VERIFIED_AT");
  else if(ageDays>maxAgeDays)reasons.push("RESEARCH_EVIDENCE_STALE");
  const row={...raw,ageDays:Number.isFinite(ageDays)?Number(ageDays.toFixed(2)):null,valid:reasons.length===0,reasons};
  items.push(row);for(const reason of reasons)issues.push({id:id||null,reason});
 }
 return{
  generatedAt:new Date(Number(now)).toISOString(),
  total:items.length,
  valid:items.filter(x=>x.valid).length,
  invalid:items.filter(x=>!x.valid).length,
  placeCoverage:new Set(items.filter(x=>x.valid).map(x=>x.placeId)).size,
  byIntent:Object.fromEntries([...INTENTS].map(k=>[k,items.filter(x=>x.valid&&x.intent===k).length])),
  items,issues,
  publicActivationAllowed:false,
  safety:{inventOptionsAllowed:false,automaticAffiliateActivationAllowed:false,automaticPublicVisibilityAllowed:false,contactWithoutReviewAllowed:false,paidRankingAllowed:false,demandForecast:false,revenueForecast:false},
  next:items.some(x=>x.valid)?"REVIEW_PARTNER_OR_AFFILIATE_TERMS":"RESEARCH_REAL_OPTIONS",
  note:"Private real-option research only. A current official business page proves the option exists; it does not create an affiliate relationship, sponsorship, public offer, demand forecast or ranking signal."
 };
}
