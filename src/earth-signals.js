export const EARTH_SIGNAL_TTL_MINUTES=45;
export const EARTH_SIGNAL_TYPES=["RAINING","BEAUTIFUL_LIGHT","BUSY","PEACEFUL","SOMETHING_HAPPENING","WORTH_SEEING"];
export function earthSignalState(signal,{now=new Date()}={}){
 const created=new Date(signal?.createdAt||0),age=now-created,ttl=EARTH_SIGNAL_TTL_MINUTES*60000;
 const visible=EARTH_SIGNAL_TYPES.includes(signal?.type)&&Number.isFinite(created.getTime())&&age>=0&&age<ttl;
 return{visible,ageMinutes:visible?Math.floor(age/60000):null,expiresInMinutes:visible?Math.max(1,Math.ceil((ttl-age)/60000)):0};
}
export function publicEarthSignal(signal={}){
 return{type:signal.type||null,placeId:signal.placeId||null,placeLabel:signal.placeLabel||null,createdAt:signal.createdAt||null,nearPlaceVerified:signal.locationEvidence==="NEAR_PLACE"};
}
export function earthSignalGuideEvidence(signal,{now=new Date()}={}){
 const state=earthSignalState(signal,{now});return state.visible?{kind:"VISITOR_SIGNAL",type:signal.type,placeId:signal.placeId||null,ageMinutes:state.ageMinutes,wording:"Visitors are reporting"}:null;
}
