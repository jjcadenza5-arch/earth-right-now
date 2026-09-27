import {publicViatorProduct,validateViatorSearchRequest} from "../../src/viator-api-contract.js";

const JSON_HEADERS={"content-type":"application/json; charset=utf-8","cache-control":"no-store"};
const VIATOR_BASE="https://api.viator.com/partner";
const allowedOrigin=(request,env)=>{
  const want=String(env.ERN_PUBLIC_ORIGIN||"https://earthrightnow.app").replace(/\/$/,"");
  const got=String(request.headers.get("origin")||"").replace(/\/$/,"");
  return got===want?got:null;
};
const reply=(status,body,origin,cacheControl="no-store")=>{
  const headers={...JSON_HEADERS,"cache-control":cacheControl};
  if(origin){headers["access-control-allow-origin"]=origin;headers.vary="Origin"}
  return new Response(JSON.stringify(body),{status,headers});
};
const viatorHeaders=(env,language="en-US")=>({
  "accept":"application/json;version=2.0",
  "content-type":"application/json",
  "accept-language":language,
  "exp-api-key":env.VIATOR_API_KEY
});
async function viatorFetch(path,{env,method="GET",language="en-US",body=null}={}){
  const r=await fetch(VIATOR_BASE+path,{method,headers:viatorHeaders(env,language),body:body?JSON.stringify(body):undefined});
  if(!r.ok)throw new Error("VIATOR_"+r.status);
  return r.json();
}
async function mappingRegistry(env){
  const url=env.ERN_VIATOR_MAPPING_URL||"https://earthrightnow.app/data/viator-destination-map.json";
  const r=await fetch(url,{headers:{accept:"application/json","user-agent":"ERN-Travel/1.0"},cf:{cacheTtl:300,cacheEverything:true}});
  if(!r.ok)throw new Error("MAPPING_"+r.status);
  const data=await r.json();
  if(!Array.isArray(data?.mappings))throw new Error("MAPPING_INVALID");
  return data;
}
function approvedMapping(registry,placeId){
  return registry.mappings.find(x=>x?.ernPlaceId===placeId&&x?.status==="APPROVED"&&String(x?.viatorDestinationId||"").trim());
}
export default{
 async fetch(request,env){
  const url=new URL(request.url),origin=allowedOrigin(request,env),enabled=env.ERN_VIATOR_API_ENABLED==="true";
  if(request.method==="OPTIONS"){
    return origin?new Response(null,{status:204,headers:{
      "access-control-allow-origin":origin,
      "access-control-allow-methods":"GET, POST, OPTIONS",
      "access-control-allow-headers":"content-type",
      "access-control-max-age":"600",
      vary:"Origin"
    }}):new Response(null,{status:403});
  }
  if(request.method==="GET"&&url.pathname==="/health"){
    return reply(200,{ok:true,service:"ERN Travel API",viatorEnabled:enabled,apiKeyConfigured:Boolean(env.VIATOR_API_KEY),mappingMode:"EXPLICIT_ONLY",publicActivationAllowed:false,secretValuesExposed:false},origin);
  }
  if(!origin)return reply(403,{ok:false,reason:"ORIGIN_NOT_ALLOWED"});
  if(!enabled)return reply(503,{ok:false,reason:"VIATOR_API_DISABLED"},origin);
  if(!env.VIATOR_API_KEY)return reply(503,{ok:false,reason:"VIATOR_API_KEY_MISSING"},origin);

  if(request.method==="GET"&&url.pathname==="/api/viator/destinations"){
    try{
      const data=await viatorFetch("/v1/taxonomy/destinations",{env});
      const items=Array.isArray(data?.destinations)?data.destinations:[];
      return reply(200,{ok:true,destinations:items.map(x=>({
        destinationId:String(x.destinationId||x.id||""),
        name:String(x.name||""),
        type:String(x.type||""),
        parentDestinationId:x.parentDestinationId==null?null:String(x.parentDestinationId),
        lookupId:String(x.lookupId||""),
        destinationUrl:String(x.destinationUrl||""),
        defaultCurrencyCode:String(x.defaultCurrencyCode||""),
        timeZone:String(x.timeZone||""),
        center:x.center&&Number.isFinite(Number(x.center.latitude))&&Number.isFinite(Number(x.center.longitude))?{latitude:Number(x.center.latitude),longitude:Number(x.center.longitude)}:null
      }))},origin,"public, max-age=3600");
    }catch(error){
      return reply(503,{ok:false,reason:String(error?.message||"VIATOR_DESTINATIONS_FAILED")},origin);
    }
  }

  if(request.method==="POST"&&url.pathname==="/api/viator/products"){
    let input;try{input=await request.json()}catch{return reply(400,{ok:false,reason:"INVALID_JSON"},origin)}
    const checked=validateViatorSearchRequest(input);
    if(!checked.valid)return reply(400,{ok:false,reason:"INVALID_REQUEST",issues:checked.issues},origin);
    let registry;try{registry=await mappingRegistry(env)}catch(error){return reply(503,{ok:false,reason:String(error?.message||"MAPPING_UNAVAILABLE")},origin)}
    const mapping=approvedMapping(registry,checked.value.placeId);
    if(!mapping)return reply(404,{ok:false,reason:"PLACE_NOT_MAPPED"},origin);
    try{
      const data=await viatorFetch("/products/search",{env,method:"POST",language:checked.value.language,body:{
        filtering:{destination:String(mapping.viatorDestinationId)},
        sorting:{sort:"DEFAULT"},
        pagination:{start:1,count:checked.value.count},
        currency:String(input?.currency||"USD")
      }});
      const products=(Array.isArray(data?.products)?data.products:[]).slice(0,checked.value.count).map(publicViatorProduct).filter(x=>x.productCode&&x.title);
      return reply(200,{ok:true,placeId:checked.value.placeId,destination:{id:String(mapping.viatorDestinationId),name:String(mapping.viatorDestinationName||"")},products},origin,"public, max-age=900");
    }catch(error){
      return reply(503,{ok:false,reason:String(error?.message||"VIATOR_PRODUCT_SEARCH_FAILED")},origin);
    }
  }
  return reply(404,{ok:false,reason:"NOT_FOUND"},origin);
 }
};
