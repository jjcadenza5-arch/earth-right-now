const INTENTS=new Set(["stay","eat","transport","activities","tickets","services"]);
function https(raw){try{const u=new URL(String(raw||""));return u.protocol==="https:"&&!u.username&&!u.password&&Boolean(u.hostname)}catch{return false}}
export function affiliatePlatformResearchStatus(rows=[],{now=Date.now(),maxAgeDays=30}={}){
 const items=(rows||[]).map(raw=>{
  const reasons=[],reviewed=Date.parse(raw?.termsReviewedAt||""),ageDays=Number.isFinite(reviewed)?Math.max(0,(Number(now)-reviewed)/864e5):Infinity;
  if(!raw?.id||!raw?.name)reasons.push("MISSING_ID_OR_NAME");
  if(!Array.isArray(raw?.intents)||!raw.intents.length||raw.intents.some(x=>!INTENTS.has(x)))reasons.push("INVALID_INTENTS");
  if(!https(raw?.programUrl)||!https(raw?.termsUrl))reasons.push("INVALID_URL");
  if(!String(raw?.programStatus||"").startsWith("AVAILABLE_"))reasons.push("PROGRAM_NOT_RESEARCH_AVAILABLE");
  if(raw?.applicationRequired!==true)reasons.push("APPLICATION_REQUIRED_MUST_BE_TRUE");
  if(raw?.relationshipActive!==false)reasons.push("RELATIONSHIP_MUST_BE_INACTIVE");
  if(raw?.credentialsConfigured!==false)reasons.push("CREDENTIALS_MUST_BE_FALSE");
  if(raw?.publicActivationAllowed!==false)reasons.push("PUBLIC_ACTIVATION_MUST_BE_FALSE");
  if(raw?.trackedLinksAllowed!==false)reasons.push("TRACKED_LINKS_MUST_BE_FALSE");
  if(raw?.paidRankingAllowed!==false)reasons.push("PAID_RANKING_MUST_BE_FALSE");
  if(!Number.isFinite(reviewed))reasons.push("INVALID_TERMS_REVIEW");
  else if(reviewed>Number(now)+5*60*1000)reasons.push("FUTURE_TERMS_REVIEW");
  else if(ageDays>maxAgeDays)reasons.push("TERMS_REVIEW_STALE");
  return{...raw,ageDays:Number.isFinite(ageDays)?Number(ageDays.toFixed(2)):null,valid:reasons.length===0,reasons};
 });
 return{
  generatedAt:new Date(Number(now)).toISOString(),total:items.length,valid:items.filter(x=>x.valid).length,invalid:items.filter(x=>!x.valid).length,
  intentCoverage:Object.fromEntries([...INTENTS].map(k=>[k,items.filter(x=>x.valid&&x.intents.includes(k)).length])),
  items,publicActivationAllowed:false,
  safety:{automaticApplicationAllowed:false,automaticRelationshipClaimAllowed:false,credentialsStored:false,trackedLinksAllowed:false,paidRankingAllowed:false,revenueForecast:false},
  next:items.some(x=>x.valid)?"CHOOSE_PROGRAMS_FOR_APPLICATION_LATER":"REFRESH_PLATFORM_RESEARCH",
  note:"Research-only affiliate-platform registry. Program availability or stated commission terms do not create an ERN affiliate relationship, tracked link permission, public offer, or revenue forecast."
 };
}
