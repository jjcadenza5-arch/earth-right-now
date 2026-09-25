const HTTPS=/^https:\/\//i;
function clean(v){return String(v||"").trim()}
function validTime(v){const t=Date.parse(v||"");return Number.isFinite(t)?t:null}
export function localDirectoryStatus(rows=[],{knownPlaceIds=[],targetApproved=10,now=new Date(),futureSkewMinutes=5}={}){
  const known=new Set((knownPlaceIds||[]).map(String));
  const n=now instanceof Date?now.getTime():Number(now);
  const seenIds=new Set(),seenUrls=new Set(),items=[];
  for(const raw of rows||[]){
    const id=clean(raw?.id),url=clean(raw?.url),placeId=clean(raw?.placeId);
    const reasons=[];
    if(!id)reasons.push("MISSING_ID");
    if(id&&seenIds.has(id))reasons.push("DUPLICATE_ID"); else if(id)seenIds.add(id);
    if(!clean(raw?.name))reasons.push("MISSING_NAME");
    if(!clean(raw?.type))reasons.push("MISSING_TYPE");
    if(!clean(raw?.place))reasons.push("MISSING_PLACE");
    if(!clean(raw?.country))reasons.push("MISSING_COUNTRY");
    if(!clean(raw?.summary))reasons.push("MISSING_SUMMARY");
    if(!HTTPS.test(url))reasons.push("INVALID_PUBLIC_URL");
    if(url&&seenUrls.has(url))reasons.push("DUPLICATE_URL"); else if(url)seenUrls.add(url);
    const verifiedMs=validTime(raw?.verifiedAt);
    if(verifiedMs===null)reasons.push("INVALID_VERIFIED_AT");
    else if(Number.isFinite(n)&&verifiedMs>n+Math.max(0,Number(futureSkewMinutes)||0)*60000)reasons.push("VERIFIED_AT_IN_FUTURE");
    if(raw?.status!=="APPROVED")reasons.push("NOT_APPROVED");
    if(raw?.paidPlacement!==false)reasons.push("PAID_PLACEMENT_NOT_FALSE");
    if(raw?.affiliate!==false)reasons.push("AFFILIATE_NOT_FALSE");
    if(placeId&&known.size&&!known.has(placeId))reasons.push("UNKNOWN_PLACE_ID");
    items.push({
      id:id||null,name:clean(raw?.name)||null,type:clean(raw?.type)||null,place:clean(raw?.place)||null,country:clean(raw?.country)||null,
      placeId:placeId||null,url:url||null,verifiedAt:verifiedMs===null?null:new Date(verifiedMs).toISOString(),
      status:raw?.status||null,paidPlacement:raw?.paidPlacement,affiliate:raw?.affiliate,
      valid:reasons.length===0,reasons
    });
  }
  const valid=items.filter(x=>x.valid),invalid=items.filter(x=>!x.valid);
  const approvedValid=valid.filter(x=>x.status==="APPROVED");
  const complete=invalid.length===0&&approvedValid.length>=targetApproved;
  return{
    generatedAt:new Date(Number.isFinite(n)?n:Date.now()).toISOString(),
    targetApproved,total:items.length,valid:valid.length,invalid:invalid.length,approved:approvedValid.length,
    uniquePlaces:new Set(valid.map(x=>x.placeId||x.place).filter(Boolean)).size,
    state:invalid.length?"INVALID_DIRECTORY":complete?"PILOT_COMPLETE":"PILOT_BUILDING",
    nextAction:invalid.length?"FIX_INVALID_DIRECTORY_ENTRIES":complete?"HOLD_UNTIL_MATERIAL_LOCAL_EVIDENCE_OR_PRODUCT_DECISION":"REVIEW_REAL_EDITORIAL_LOCAL_PLACES",
    items,
    safety:{paidRankingAllowed:false,affiliateRelationshipImplied:false,automaticApprovalAllowed:false,automaticDirectoryMutationAllowed:false,commercialPriorityAllowed:false},
    note:"Read-only Local Earth editorial directory status. Ten approved unpaid/non-affiliate entries complete the current pilot; expansion then stays on hold until materially useful local evidence or a product decision appears."
  };
}
