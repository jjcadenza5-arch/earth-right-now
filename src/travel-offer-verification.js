import { visibleTravelOffer } from "./travel-bridge.js";
const MAX_AGE_DAYS=90;
export function offerVerificationState(offer,{now=Date.now(),maxAgeDays=MAX_AGE_DAYS}={}){
 if(!visibleTravelOffer(offer))return{visible:false,current:false,reason:"UNVERIFIED"};
 const t=Date.parse(offer.verifiedAt||"");if(!Number.isFinite(t))return{visible:false,current:false,reason:"MISSING_VERIFICATION_DATE"};
 const ageDays=Math.max(0,(now-t)/864e5);if(ageDays>maxAgeDays)return{visible:false,current:false,reason:"VERIFICATION_EXPIRED",ageDays};
 return{visible:true,current:true,reason:null,ageDays};
}
export function currentTravelOffer(offer,options={}){return offerVerificationState(offer,options).visible}
