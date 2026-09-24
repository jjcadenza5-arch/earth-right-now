const OUTCOMES=new Set(["HUMAN_PLAYBACK_CONFIRMED","PLAYBACK_FAILED","INCONCLUSIVE"]);
const TYPES=new Set(["restore","research"]);
function normalizeOriginPath(raw){
 try{
   const u=new URL(String(raw||""));
   if(u.protocol!=="https:")return null;
   const path=u.pathname.replace(/\/+$/,"")||"/";
   return u.origin+path;
 }catch{return null}
}
export function validateOperatorReviewEvidence(packet,{
 knownSourceIds=[],
 researchIds=[],
 expectedReviewOrigins=[],
 maxItemAgeHours=null,
 now=new Date(),
 futureSkewMinutes=5
}={}){
 const accepted=[],rejected=[],seen=new Set(),known=new Set([...knownSourceIds].map(String)),research=new Set([...researchIds].map(String));
 const expectedOrigins=new Set((expectedReviewOrigins||[]).map(normalizeOriginPath).filter(Boolean));
 const nowMs=now instanceof Date?now.getTime():Number(now);
 if(!packet||typeof packet!=="object")return{ok:false,accepted,rejected:[{reason:"INVALID_PACKET"}],sourceEvidence:[],researchEvidence:[]};
 if(packet.schemaVersion!==1)rejected.push({reason:"UNSUPPORTED_SCHEMA_VERSION"});
 if(packet.kind!=="ERN_OPERATOR_REVIEW_EVIDENCE")rejected.push({reason:"INVALID_PACKET_KIND"});
 if(packet.catalogMutationAllowed!==false)rejected.push({reason:"CATALOG_MUTATION_FLAG_MUST_BE_FALSE"});
 if(packet.networkStatus!=="UNKNOWN_NOT_RECORDED")rejected.push({reason:"PACKET_NETWORK_STATUS_MUST_BE_UNKNOWN"});
 const normalizedReviewOrigin=normalizeOriginPath(packet.reviewOrigin);
 if(expectedOrigins.size){
   if(!normalizedReviewOrigin)rejected.push({reason:"MISSING_OR_INVALID_REVIEW_ORIGIN"});
   else if(!expectedOrigins.has(normalizedReviewOrigin))rejected.push({reason:"UNTRUSTED_REVIEW_ORIGIN",reviewOrigin:normalizedReviewOrigin});
 }
 if(!Array.isArray(packet.items))rejected.push({reason:"ITEMS_MUST_BE_ARRAY"});
 for(const item of Array.isArray(packet.items)?packet.items:[]){
   const id=String(item?.id||"").trim(),type=String(item?.type||"").trim(),key=type+":"+id;
   if(!id){rejected.push({id:null,reason:"MISSING_ID"});continue}
   if(!TYPES.has(type)){rejected.push({id,reason:"INVALID_TYPE"});continue}
   if(seen.has(key)){rejected.push({id,reason:"DUPLICATE_ITEM"});continue}
   seen.add(key);
   if(type==="restore"&&!known.has(id)){rejected.push({id,reason:"UNKNOWN_SOURCE_ID"});continue}
   if(type==="research"&&!research.has(id)){rejected.push({id,reason:"UNKNOWN_RESEARCH_ID"});continue}
   if(!OUTCOMES.has(item.outcome)){rejected.push({id,reason:"INVALID_OUTCOME"});continue}
   const t=Date.parse(item.observedAt||"");if(!Number.isFinite(t)){rejected.push({id,reason:"INVALID_OBSERVED_AT"});continue}
   if(Number.isFinite(nowMs)){
     const ageHours=(nowMs-t)/36e5;
     if(ageHours<-(Math.max(0,Number(futureSkewMinutes)||0)/60)){rejected.push({id,reason:"OBSERVED_AT_IN_FUTURE"});continue}
     if(Number.isFinite(maxItemAgeHours)&&ageHours>Number(maxItemAgeHours)){rejected.push({id,reason:"REVIEW_EVIDENCE_EXPIRED",ageHours:Number(ageHours.toFixed(2))});continue}
   }
   if(item.evidenceKind!=="HUMAN_REVIEW"){rejected.push({id,reason:"INVALID_EVIDENCE_KIND"});continue}
   if(item.networkStatus!=="UNKNOWN_NOT_RECORDED"){rejected.push({id,reason:"ITEM_NETWORK_STATUS_MUST_BE_UNKNOWN"});continue}
   accepted.push({id,type,outcome:item.outcome,observedAt:new Date(t).toISOString(),title:item.title||null,provider:item.provider||null,sourceUrl:item.sourceUrl||null,embedUrl:item.embedUrl||null,evidenceKind:"HUMAN_REVIEW",networkStatus:"UNKNOWN_NOT_RECORDED"});
 }
 const sourceEvidence=accepted.filter(x=>x.type==="restore"),researchEvidence=accepted.filter(x=>x.type==="research");
 return{
   ok:rejected.length===0,
   accepted,rejected,sourceEvidence,researchEvidence,
   reviewOrigin:normalizedReviewOrigin,
   originTrusted:expectedOrigins.size?Boolean(normalizedReviewOrigin&&expectedOrigins.has(normalizedReviewOrigin)):null,
   summary:{accepted:accepted.length,rejected:rejected.length,confirmed:accepted.filter(x=>x.outcome==="HUMAN_PLAYBACK_CONFIRMED").length,failed:accepted.filter(x=>x.outcome==="PLAYBACK_FAILED").length,inconclusive:accepted.filter(x=>x.outcome==="INCONCLUSIVE").length},
   note:"Validation only. Optional deployed-origin and freshness checks can fail closed; human review evidence is never converted into source truth automatically."
 };
}
