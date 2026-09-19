import { currentSource } from "./discovery-eligibility.js";
import { playbackCapability } from "./playback-capability.js";
import { recencyState } from "./source-recency.js";

export function publicationInventory(rows=[],options={}){
  const sources=(rows||[]).filter(Boolean);
  const current=sources.filter(currentSource);
  const inside=current.filter(source=>playbackCapability(source).action==="PLAY");
  const external=current.filter(source=>playbackCapability(source).action==="OPEN");
  const stale=sources.filter(source=>recencyState(source,options)==="STALE_CHECK");
  const expired=sources.filter(source=>recencyState(source,options)==="EXPIRED_CHECK");
  const unknown=sources.filter(source=>recencyState(source,options)==="UNKNOWN");
  return{
    total:sources.length,
    current:current.length,
    insideERN:inside.length,
    externalCurrent:external.length,
    stale:stale.length,
    expired:expired.length,
    unknownRecency:unknown.length,
    currentIds:current.map(source=>source.id),
    insideERNIds:inside.map(source=>source.id),
    recheckIds:[...new Set([...stale,...expired,...unknown].map(source=>source.id))]
  };
}

export function inventoryPublicationWarnings(rows=[]){
  const x=publicationInventory(rows),warnings=[];
  if(!x.current)warnings.push("NO_CURRENT_INVENTORY");
  if(!x.insideERN)warnings.push("NO_CURRENT_INSIDE_ERN_PLAYBACK");
  if(x.expired)warnings.push("EXPIRED_SOURCE_CHECKS");
  if(x.unknownRecency)warnings.push("UNKNOWN_SOURCE_RECENCY");
  return{ok:warnings.length===0,warnings,inventory:x};
}
