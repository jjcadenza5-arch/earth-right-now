import { affiliatePartner,activeAffiliatePartner } from "./affiliate-partners.js";
import { currentTravelOffer } from "./travel-offer-verification.js";
import { travelOfferDisclosureText } from "./travel-offer-action.js";

export function commercialInventoryStatus({sources=[],partners=[],offers=[]}={}, {now=Date.now()}={}){
  const sourceByPlaceId=new Map((sources||[]).map(s=>[String(s.placeId||s.id||""),s]).filter(([id])=>Boolean(id)));
  const placeIds=new Set(sourceByPlaceId.keys());
  const sourceEligible=s=>Boolean(s)&&s.health==="HEALTHY"&&["LIVE_VIDEO","LIVE_IMAGE","EXTERNAL_LIVE"].includes(s.truth);

  const partnerRows=(partners||[]).map(raw=>{
    const parsed=affiliatePartner(raw);
    const valid=Boolean(parsed);
    const active=valid&&activeAffiliatePartner(parsed,{now});
    return{
      id:String(raw?.id||""),
      valid,
      active,
      enabled:Boolean(parsed?.enabled),
      affiliate:Boolean(parsed?.affiliate),
      sponsored:Boolean(parsed?.sponsored),
      intent:parsed?.intent||raw?.intent||null,
      reason:valid?(active?null:"INACTIVE_OR_EXPIRED"):"INVALID_PARTNER_RECORD"
    };
  });

  const partnerById=new Map(partnerRows.map(x=>[x.id,x]));

  const offerRows=(offers||[]).map(raw=>{
    const placeId=String(raw?.placeId||"");
    const knownPlace=placeIds.has(placeId);
    const placeSource=sourceByPlaceId.get(placeId);
    const eligiblePlace=knownPlace&&sourceEligible(placeSource);
    const partnerId=String(raw?.partnerId||"");
    const partnerRow=partnerById.get(partnerId)||null;
    const partnerActive=Boolean(partnerRow?.active);
    const current=eligiblePlace&&partnerActive&&currentTravelOffer(raw,{now});
    return{
      id:String(raw?.id||""),
      placeId,
      knownPlace,
      eligiblePlace,
      partnerId,
      partnerActive,
      sourceHealth:placeSource?.health||null,
      sourceTruth:placeSource?.truth||null,
      current,
      affiliate:Boolean(raw?.affiliate),
      sponsored:Boolean(raw?.sponsored),
      intent:raw?.intent||null,
      disclosure:current?travelOfferDisclosureText(raw):null,
      reason:!knownPlace?"UNKNOWN_PLACE":!eligiblePlace?"SOURCE_NOT_CURRENTLY_ELIGIBLE":!partnerId?"MISSING_PARTNER_ID":!partnerRow?"UNKNOWN_PARTNER":!partnerActive?"PARTNER_INACTIVE_OR_EXPIRED":current?null:"UNVERIFIED_OR_EXPIRED"
    };
  });

  const activePartners=partnerRows.filter(x=>x.active);
  const currentOffers=offerRows.filter(x=>x.current);
  const affiliateOffers=currentOffers.filter(x=>x.affiliate);
  const sponsoredOffers=currentOffers.filter(x=>x.sponsored);
  const invalidPartners=partnerRows.filter(x=>!x.valid);
  const invalidOffers=offerRows.filter(x=>!x.knownPlace);
  const sourceIneligibleOffers=offerRows.filter(x=>x.knownPlace&&!x.eligiblePlace);

  const stage=currentOffers.length&&activePartners.length
    ?"ACTIVE"
    :(partners.length||offers.length)
      ?"STAGING_REVIEW"
      :"EMPTY_STAGING";

  return{
    generatedAt:new Date(now instanceof Date?now.getTime():Number(now)).toISOString(),
    stage,
    publicActivationAllowed:stage==="ACTIVE",
    partnerRegistry:{
      total:partnerRows.length,
      active:activePartners.length,
      invalid:invalidPartners.length,
      byIntent:Object.fromEntries(["stay","eat","transport","tickets","activities","culture","services"].map(k=>[k,activePartners.filter(x=>x.intent===k).length])),
      rows:partnerRows
    },
    travelOfferRegistry:{
      total:offerRows.length,
      current:currentOffers.length,
      affiliate:affiliateOffers.length,
      sponsored:sponsoredOffers.length,
      invalid:invalidOffers.length,
      sourceIneligible:sourceIneligibleOffers.length,
      placeCoverage:new Set(currentOffers.map(x=>x.placeId)).size,
      byIntent:Object.fromEntries(["stay","eat","transport","activities","culture","services"].map(k=>[k,currentOffers.filter(x=>x.intent===k).length])),
      rows:offerRows
    },
    safety:{
      inventPartnersAllowed:false,
      unverifiedOffersVisible:false,
      undisclosedAffiliateLinksAllowed:false,
      paidRankingAllowed:false,
      sourceEligibilityRequired:true,
      matchingActivePartnerRequired:true
    },
    next:stage==="EMPTY_STAGING"
      ?"ADD_REAL_VERIFIED_PARTNER_TO_STAGING"
      :stage==="STAGING_REVIEW"
        ?"COMPLETE_VERIFICATION_AND_DISCLOSURE_REVIEW"
        :"MAINTAIN_CURRENT_VERIFICATION",
    note:"Commercial inventory is private staging until verified real partners/offers exist. Offer currentness requires both a currently HEALTHY live/external-live ERN source for the referenced place and the offer's own active verified affiliate partner; degraded, held, expired, unknown, non-live, missing-partner, or inactive-partner state fails closed. Empty registries are valid and keep the public ERN experience non-commercial."
  };
}
