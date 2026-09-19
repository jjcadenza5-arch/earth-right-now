import { guardCatalog } from "./catalog-guard.js";import { catalogHealthSummary } from "./catalog-health-summary.js";import { currentSource } from "./discovery-eligibility.js";import { playbackCapability } from "./playback-capability.js";
export function catalogReleaseGate(rows,{minimumCurrentHealthy=1,minimumInsideERN=1,allowUnknown=true,now=Date.now(),...recencyOptions}={}){
 const{valid,rejected}=guardCatalog(rows),health=catalogHealthSummary(valid),currentOptions={now,...recencyOptions};
 const currentHealthy=valid.filter(s=>currentSource(s,currentOptions)).length,currentInsideERN=valid.filter(s=>currentSource(s,currentOptions)&&playbackCapability(s,currentOptions).action==="PLAY").length,unknown=valid.filter(s=>s.health==="UNKNOWN").length;
 const blockers=[];if(rejected.length)blockers.push("MALFORMED_SOURCE_RECORDS");if(!valid.length)blockers.push("EMPTY_CATALOG");if(currentHealthy<minimumCurrentHealthy)blockers.push("NO_CURRENT_HEALTHY_INVENTORY");if(currentInsideERN<minimumInsideERN)blockers.push("NO_CURRENT_INSIDE_ERN_PLAYBACK");if(!allowUnknown&&unknown)blockers.push("UNKNOWN_SOURCES_PRESENT");
 return{ready:blockers.length===0,blockers,valid:valid.length,rejected:rejected.length,currentHealthy,currentInsideERN,unknown,health}
}
