import { currentTravelOffer } from "./travel-offer-verification.js";
export function travelOffersForPlace(offers=[],placeId,intent=null,options={}){return offers.filter(o=>currentTravelOffer(o,options)&&o.placeId===placeId&&(!intent||o.intent===intent));}
export function travelOfferInventory(offers=[],options={}){const visible=offers.filter(o=>currentTravelOffer(o,options)),byIntent={stay:0,eat:0,transport:0,tickets:0};for(const o of visible)if(Object.hasOwn(byIntent,o.intent))byIntent[o.intent]++;return{total:visible.length,byIntent,placeCount:new Set(visible.map(o=>o.placeId)).size};}
