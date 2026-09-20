export const COMMERCIAL_PRINCIPLES=Object.freeze({utilityFirst:true,noPayToRank:true,discloseAffiliate:true,discloseSponsored:true,verifiedDestinationsOnly:true});
export function commercialPlacementAllowed({offer,place}={}){return Boolean(offer?.verified&&offer?.url&&place?.id&&offer.placeId===place.id)}
export function commercialLabel(offer){if(!offer)return null;if(offer.sponsored)return"Sponsored · Affiliate";if(offer.affiliate)return"Affiliate link";return"Travel option"}
export function rankingMayUsePayment(){return false}
