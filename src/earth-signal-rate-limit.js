export const EARTH_SIGNAL_RATE_POLICY=Object.freeze({windowMinutes:10,maxSubmissions:6,maxActivePerPlace:3});
export function earthSignalRateDecision(history=[],candidate={}, {now=new Date()}={}){
 const placeId=String(candidate.placeId||"");if(!placeId)return{allowed:false,reason:"INVALID_PLACE"};
 const start=now.getTime()-EARTH_SIGNAL_RATE_POLICY.windowMinutes*60000;
 const recent=(history||[]).filter(x=>new Date(x.createdAt).getTime()>=start&&new Date(x.createdAt).getTime()<=now.getTime());
 if(recent.length>=EARTH_SIGNAL_RATE_POLICY.maxSubmissions)return{allowed:false,reason:"RATE_LIMIT"};
 const activeAtPlace=recent.filter(x=>x.placeId===placeId&&!x.expired);
 if(activeAtPlace.length>=EARTH_SIGNAL_RATE_POLICY.maxActivePerPlace)return{allowed:false,reason:"PLACE_LIMIT"};
 return{allowed:true,reason:null,remaining:EARTH_SIGNAL_RATE_POLICY.maxSubmissions-recent.length-1};
}
