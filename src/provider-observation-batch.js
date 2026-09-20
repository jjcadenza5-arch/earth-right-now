import { providerHealthObservation } from "./provider-health-observation.js";

export function providerObservationBatch(entries=[],{observedAt=new Date().toISOString(),knownSourceIds=null}={}){
 const observations={},rejected=[];
 const known=knownSourceIds?new Set([...knownSourceIds].map(String)):null;
 for(const entry of entries||[]){
  const id=String(entry?.id||"").trim();
  if(!id){rejected.push({id:null,reason:"MISSING_SOURCE_ID"});continue}
  if(known&&!known.has(id)){rejected.push({id,reason:"UNKNOWN_SOURCE_ID"});continue}
  if(Object.hasOwn(observations,id)){rejected.push({id,reason:"DUPLICATE_SOURCE_ID"});continue}
  const observation=providerHealthObservation(entry,{observedAt:entry?.observedAt||observedAt});
  if(!observation){rejected.push({id,reason:"INVALID_OBSERVATION"});continue}
  observations[id]=observation;
 }
 return{observations,rejected,total:Object.keys(observations).length};
}
