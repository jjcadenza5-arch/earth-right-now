import { providerHealthObservation } from "./provider-health-observation.js";

export function providerObservationBatch(entries=[],{observedAt=new Date().toISOString(),knownSourceIds=null}={}){
 const observations={},rejected=[],superseded=[];
 const known=knownSourceIds?new Set([...knownSourceIds].map(String)):null;
 for(const entry of entries||[]){
  const id=String(entry?.id||"").trim();
  if(!id){rejected.push({id:null,reason:"MISSING_SOURCE_ID"});continue}
  if(known&&!known.has(id)){rejected.push({id,reason:"UNKNOWN_SOURCE_ID"});continue}
  const observation=providerHealthObservation(entry,{observedAt:entry?.observedAt||observedAt});
  if(!observation){rejected.push({id,reason:"INVALID_OBSERVATION"});continue}
  const previous=observations[id];
  if(!previous){observations[id]=observation;continue}
  const nextMs=Date.parse(observation.observedAt||""),prevMs=Date.parse(previous.observedAt||"");
  if(Number.isFinite(nextMs)&&(!Number.isFinite(prevMs)||nextMs>prevMs)){
    superseded.push({id,observedAt:previous.observedAt||null,replacedBy:observation.observedAt||null});
    observations[id]=observation;
  }else{
    superseded.push({id,observedAt:observation.observedAt||null,replacedBy:previous.observedAt||null});
  }
 }
 return{observations,rejected,superseded,total:Object.keys(observations).length};
}
