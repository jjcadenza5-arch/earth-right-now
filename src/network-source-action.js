import { playbackNetworkDecision } from "./connection-policy.js";
import { playbackCapability } from "./playback-capability.js";
export function sourceActionForNetwork(source,networkState,{now=new Date()}={}){
 const capability=playbackCapability(source,{now}),decision=playbackNetworkDecision(source,networkState);
 if(capability.action!=="PLAY"||decision.allow)return{...capability,networkReason:null};
 if(decision.reason==="OFFLINE")return{action:"UNAVAILABLE",label:"Offline",networkReason:decision.reason};
 if(decision.reason==="CONSTRAINED_EMBED"){
  const hasExternal=Boolean(source?.sourceUrl||source?.officialUrl);
  return hasExternal?{action:"EXTERNAL",label:"Open source",networkReason:decision.reason}:{action:"UNAVAILABLE",label:"Data-saving mode",networkReason:decision.reason};
 }
 return capability;
}
