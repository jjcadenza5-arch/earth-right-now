import { visibleTravelOffer } from "./travel-bridge.js";
export function travelOffersForPlace(offers=[],placeId,intent=null){
 return offers.filter(o=>visibleTravelOffer(o)&&o.placeId===placeId&&(!intent||o.intent===intent));
}
export function travelOfferInventory(offers=[]){
 const visible=offers.filter(visibleTravelOffer),byIntent={stay:0,eat:0,transport:0,tickets:0};
 for(const o of visible)if(Object.hasOwn(byIntent,o.intent))byIntent[o.intent]++;
 return{total:visible.length,byIntent,placeCount:new Set(visible.map(o=>o.placeId)).size};
}
