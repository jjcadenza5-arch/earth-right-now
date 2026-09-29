import { visibleTravelOffer } from "./travel-bridge.js";
const MAX_AGE_DAYS=90;
export function offerVerificationState(offer,{now=Date.now(),maxAgeDays=MAX_AGE_DAYS}={}){
 if(!visibleTravelOffer(offer))return{visible:false,current:false,reason:"UNVERIFIED"};
 const t=Date.parse(offer.verifiedAt||"");
 if(!Number.isFinite(t))return{visible:false,current:false,reason:"MISSING_VERIFICATION_DATE"};
 if(t>now+5*60*1000)return{visible:false,current:false,reason:"FUTURE_VERIFICATION_DATE"};
 const ageDays=Math.max(0,(now-t)/864e5);
 if(ageDays>maxAgeDays)return{visible:false,current:false,reason:"VERIFICATION_EXPIRED",ageDays};
 const expires=Date.parse(offer.expiresAt||"");
 if(offer.expiresAt&&(!Number.isFinite(expires)||expires<=now))return{visible:false,current:false,reason:Number.isFinite(expires)?"OFFER_EXPIRED":"INVALID_EXPIRES_AT",ageDays};
 return{visible:true,current:true,reason:null,ageDays,expiresAt:Number.isFinite(expires)?new Date(expires).toISOString():null};
}
export function currentTravelOffer(offer,options={}){return offerVerificationState(offer,options).visible}
