export const VIATOR_API_VERSION="2026-09-27.v1";
export const VIATOR_SEARCH_PATH="/api/viator/products";
export const VIATOR_DESTINATIONS_PATH="/api/viator/destinations";

const ALLOWED_LANGUAGES=new Set(["en-US","th-TH","de-DE","fr-FR","es-ES","ja-JP","zh-CN"]);
const MAX_RESULTS=12;

export function validateViatorSearchRequest(input={}){
  const issues=[];
  const placeId=String(input.placeId||"").trim();
  const language=String(input.language||"en-US").trim();
  const count=Number(input.count??6);
  if(!placeId)issues.push("MISSING_PLACE_ID");
  if(!ALLOWED_LANGUAGES.has(language))issues.push("UNSUPPORTED_LANGUAGE");
  if(!Number.isInteger(count)||count<1||count>MAX_RESULTS)issues.push("INVALID_COUNT");
  return{valid:issues.length===0,issues,value:{placeId,language,count}};
}

export function publicViatorProduct(product={}){
  const url=String(product.productUrl||product.url||"").trim();
  return{
    productCode:String(product.productCode||""),
    title:String(product.title||"").slice(0,220),
    description:String(product.description||"").slice(0,500),
    imageUrl:String(product.images?.[0]?.variants?.[0]?.url||product.imageUrl||""),
    rating:Number(product.reviews?.combinedAverageRating??product.rating??0)||0,
    reviewCount:Number(product.reviews?.totalReviews??product.reviewCount??0)||0,
    priceFrom:Number(product.pricing?.summary?.fromPrice??product.priceFrom??0)||0,
    currency:String(product.pricing?.currency||product.currency||""),
    productUrl:url,
    provider:"Viator"
  };
}
