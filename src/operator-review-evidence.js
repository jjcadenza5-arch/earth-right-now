const OUTCOMES=new Set(["HUMAN_PLAYBACK_CONFIRMED","PLAYBACK_FAILED","INCONCLUSIVE"]);
const TYPES=new Set(["restore","research"]);
export function validateOperatorReviewEvidence(packet,{knownSourceIds=[],researchIds=[]}={}){
 const accepted=[],rejected=[],seen=new Set(),known=new Set([...knownSourceIds].map(String)),research=new Set([...researchIds].map(String));
 if(!packet||typeof packet!=="object")return{ok:false,accepted,rejected:[{reason:"INVALID_PACKET"}],sourceEvidence:[],researchEvidence:[]};
 if(packet.schemaVersion!==1)rejected.push({reason:"UNSUPPORTED_SCHEMA_VERSION"});
 if(packet.kind!=="ERN_OPERATOR_REVIEW_EVIDENCE")rejected.push({reason:"INVALID_PACKET_KIND"});
 if(packet.catalogMutationAllowed!==false)rejected.push({reason:"CATALOG_MUTATION_FLAG_MUST_BE_FALSE"});
 if(packet.networkStatus!=="UNKNOWN_NOT_RECORDED")rejected.push({reason:"PACKET_NETWORK_STATUS_MUST_BE_UNKNOWN"});
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
   if(item.evidenceKind!=="HUMAN_REVIEW"){rejected.push({id,reason:"INVALID_EVIDENCE_KIND"});continue}
   if(item.networkStatus!=="UNKNOWN_NOT_RECORDED"){rejected.push({id,reason:"ITEM_NETWORK_STATUS_MUST_BE_UNKNOWN"});continue}
   accepted.push({id,type,outcome:item.outcome,observedAt:new Date(t).toISOString(),title:item.title||null,provider:item.provider||null,sourceUrl:item.sourceUrl||null,embedUrl:item.embedUrl||null,evidenceKind:"HUMAN_REVIEW",networkStatus:"UNKNOWN_NOT_RECORDED"});
 }
 const sourceEvidence=accepted.filter(x=>x.type==="restore"),researchEvidence=accepted.filter(x=>x.type==="research");
 return{ok:rejected.length===0,accepted,rejected,sourceEvidence,researchEvidence,summary:{accepted:accepted.length,rejected:rejected.length,confirmed:accepted.filter(x=>x.outcome==="HUMAN_PLAYBACK_CONFIRMED").length,failed:accepted.filter(x=>x.outcome==="PLAYBACK_FAILED").length,inconclusive:accepted.filter(x=>x.outcome==="INCONCLUSIVE").length},note:"Validation only. Human review evidence is not converted into source health, HTTP evidence, permission approval, or catalog mutation automatically."};
}
