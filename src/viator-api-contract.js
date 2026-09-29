export const VIATOR_API_VERSION="2026-09-27.v2";
export const VIATOR_SEARCH_PATH="/api/viator/products";
export const VIATOR_DESTINATIONS_PATH="/api/viator/destinations";
export const VIATOR_DIAGNOSTICS_PATH="/api/viator/diagnostics";
export const VIATOR_PRODUCT_VALIDATION_PATH="/api/viator/product-validation";

const ALLOWED_LANGUAGES=new Set(["en-US","th-TH","de-DE","fr-FR","es-ES","ja-JP","zh-CN"]);
const ALLOWED_CURRENCIES=new Set(["USD","THB","EUR","GBP","AUD","CAD","NZD","JPY","CHF"]);
const MAX_RESULTS=12;

export function validateViatorSearchRequest(input={}){
  const issues=[];
  const placeId=String(input.placeId||"").trim();
  const language=String(input.language||"en-US").trim();
  const currency=String(input.currency||"USD").trim().toUpperCase();
  const count=Number(input.count??6);
  if(!placeId)issues.push("MISSING_PLACE_ID");
  if(!ALLOWED_LANGUAGES.has(language))issues.push("UNSUPPORTED_LANGUAGE");
  if(!ALLOWED_CURRENCIES.has(currency))issues.push("UNSUPPORTED_CURRENCY");
  if(!Number.isInteger(count)||count<1||count>MAX_RESULTS)issues.push("INVALID_COUNT");
  return{valid:issues.length===0,issues,value:{placeId,language,currency,count}};
}

export function safeViatorAffiliateUrl(value){
  try{
    const u=new URL(String(value||"").trim());
    if(u.protocol!=="https:"||u.username||u.password||!u.hostname)return"";
    const host=u.hostname.toLowerCase();
    if(host!=="viator.com"&&!host.endsWith(".viator.com"))return"";
    return u.toString();
  }catch{return""}
}

export function viatorCampaignValue(placeId){
  const cleaned=String(placeId||"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,120);
  return cleaned?("ern-"+cleaned):"ern";
}

export function publicViatorProduct(product={}){
  const productUrl=safeViatorAffiliateUrl(product.productUrl||product.url);
  return{
    productCode:String(product.productCode||""),
    title:String(product.title||"").slice(0,220),
    description:String(product.description||"").slice(0,500),
    imageUrl:String(product.images?.[0]?.variants?.[0]?.url||product.imageUrl||""),
    rating:Number(product.reviews?.combinedAverageRating??product.rating??0)||0,
    reviewCount:Number(product.reviews?.totalReviews??product.reviewCount??0)||0,
    priceFrom:Number(product.pricing?.summary?.fromPrice??product.priceFrom??0)||0,
    currency:String(product.pricing?.currency||product.currency||""),
    productUrl,
    provider:"Viator",
    affiliate:true,
    sponsored:false,
    linkScope:"experience"
  };
}
