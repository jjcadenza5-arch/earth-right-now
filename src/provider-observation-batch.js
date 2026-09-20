import { providerHealthObservation } from "./provider-health-observation.js";

export function providerObservationBatch(entries=[],{observedAt=new Date().toISOString()}={}){
 const observations={},rejected=[];
 for(const entry of entries||[]){
  const id=String(entry?.id||"").trim();
  if(!id){rejected.push({id:null,reason:"MISSING_SOURCE_ID"});continue}
  if(Object.hasOwn(observations,id)){rejected.push({id,reason:"DUPLICATE_SOURCE_ID"});continue}
  const observation=providerHealthObservation(entry,{observedAt:entry?.observedAt||observedAt});
  if(!observation){rejected.push({id,reason:"INVALID_OBSERVATION"});continue}
  observations[id]=observation;
 }
 return{observations,rejected,total:Object.keys(observations).length};
}
