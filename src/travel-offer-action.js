export function travelOfferTelemetry(offer){
 if(!offer?.id||!offer?.placeId||!offer?.intent)return null;
 return{event:"travel_option_opened",offerId:String(offer.id),placeId:String(offer.placeId),intent:String(offer.intent),affiliate:Boolean(offer.affiliate),sponsored:Boolean(offer.sponsored)};
}
export function travelOfferDisclosureText(offer){
 if(offer?.sponsored)return"Sponsored";
 if(offer?.affiliate)return"Affiliate link";
 return"External travel link";
}
