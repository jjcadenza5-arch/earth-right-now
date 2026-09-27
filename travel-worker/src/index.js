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
    return reply(200,{ok:true,service:"ERN Travel API",viatorEnabled:enabled,apiKeyConfigured:Boolean(env.VIATOR_API_KEY),publicActivationAllowed:false,secretValuesExposed:false},origin);
  }
  if(!origin)return reply(403,{ok:false,reason:"ORIGIN_NOT_ALLOWED"});
  if(!enabled)return reply(503,{ok:false,reason:"VIATOR_API_DISABLED"},origin);
  if(!env.VIATOR_API_KEY)return reply(503,{ok:false,reason:"VIATOR_API_KEY_MISSING"},origin);

  if(request.method==="GET"&&url.pathname==="/api/viator/destinations"){
    try{
      const data=await viatorFetch("/v1/taxonomy/destinations",{env});
      return reply(200,{ok:true,destinations:Array.isArray(data?.destinations)?data.destinations:data},origin,"public, max-age=3600");
    }catch(error){
      return reply(503,{ok:false,reason:String(error?.message||"VIATOR_DESTINATIONS_FAILED")},origin);
    }
  }

  if(request.method==="POST"&&url.pathname==="/api/viator/products"){
    let input;try{input=await request.json()}catch{return reply(400,{ok:false,reason:"INVALID_JSON"},origin)}
    const destination=String(input?.destinationId||"").trim(),count=Math.min(12,Math.max(1,Number(input?.count||6))),language=String(input?.language||"en-US");
    if(!destination)return reply(400,{ok:false,reason:"MISSING_DESTINATION_ID"},origin);
    try{
      const data=await viatorFetch("/products/search",{env,method:"POST",language,body:{
        filtering:{destination},
        sorting:{sort:"DEFAULT"},
        pagination:{start:1,count},
        currency:String(input?.currency||"USD")
      }});
      return reply(200,{ok:true,destinationId:destination,products:Array.isArray(data?.products)?data.products:[]},origin,"public, max-age=900");
    }catch(error){
      return reply(503,{ok:false,reason:String(error?.message||"VIATOR_PRODUCT_SEARCH_FAILED")},origin);
    }
  }
  return reply(404,{ok:false,reason:"NOT_FOUND"},origin);
 }
};
