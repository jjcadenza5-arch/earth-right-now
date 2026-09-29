import {createNowMomentPhoto,listNowMomentPhotos,reviewNowMomentPhoto,reportNowMomentPhoto,cleanupNowMomentPhotos} from "../../src/now-moment-photo-service.js";
export {MediaState} from "./media-state.js";

const CAPABILITIES=Object.freeze({
  transport:true,objectStorage:true,durableMetadata:true,metadataSanitization:true,canonicalPlaceValidation:true,
  serverRateLimits:true,moderationQueue:true,abuseReporting:true,expiryCleanup:true,privacyNotice:true,
  secretIsolation:true,observability:true,costGuard:true
});
const J={"content-type":"application/json; charset=utf-8","cache-control":"no-store"};
const reply=(status,body,origin)=>new Response(JSON.stringify(body),{status,headers:{...J,...(origin?{"access-control-allow-origin":origin,vary:"Origin"}:{})}});
const originFor=(request,env)=>{
  const want=String(env.ERN_PUBLIC_ORIGIN||"https://earthrightnow.app").replace(/\/$/,"");
  const got=String(request.headers.get("origin")||"").replace(/\/$/,"");
  return got===want?got:null;
};
const stub=env=>env.MEDIA_STATE.get(env.MEDIA_STATE.idFromName("global"));
async function stateCall(env,body){
  const r=await stub(env).fetch("https://media-state/internal",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(body)});
  const x=await r.json();
  if(!r.ok)throw Object.assign(new Error(x.reason||"MEDIA_STATE_ERROR"),{code:x.reason||"MEDIA_STATE_ERROR",status:r.status});
  return x;
}
async function hmac(raw,key){
  const k=await crypto.subtle.importKey("raw",new TextEncoder().encode(key),{name:"HMAC",hash:"SHA-256"},false,["sign"]);
  const sig=await crypto.subtle.sign("HMAC",k,new TextEncoder().encode(raw));
  return btoa(String.fromCharCode(...new Uint8Array(sig))).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"");
}
async function rateSubject(request,env){
  const raw=request.headers.get("CF-Connecting-IP")||request.headers.get("x-real-ip")||"";
  if(!raw||!env.ERN_MEDIA_RATE_HMAC_KEY)return null;
  return "anon_"+(await hmac(raw,env.ERN_MEDIA_RATE_HMAC_KEY)).slice(0,64);
}
async function knownPlaces(env){
  const r=await fetch(env.ERN_CATALOG_URL||"https://earthrightnow.app/data/sources.json",{headers:{accept:"application/json","user-agent":"ERN-Now-Moment-Media/1.0"},cf:{cacheTtl:120,cacheEverything:true}});
  if(!r.ok)throw Object.assign(new Error("CATALOG_FETCH_"+r.status),{code:"TRUSTED_CATALOG_UNAVAILABLE"});
  const list=await r.json();if(!Array.isArray(list))throw Object.assign(new Error("CATALOG_INVALID"),{code:"TRUSTED_CATALOG_UNAVAILABLE"});
  return [...new Set(list.flatMap(s=>[s.placeId,s.id]).filter(Boolean).map(String))];
}
function stores(env){
  return{
    metadataStore:{
      put:record=>stateCall(env,{op:"put",record}),
      async get(id){try{return (await stateCall(env,{op:"get",id})).record}catch(error){if(error.status===404)return null;throw error}},
      async list({placeId=null,now=new Date()}={}){return (await stateCall(env,{op:"list",placeId,now:now.getTime()})).records||[]},
      async update(id,patch){return (await stateCall(env,{op:"update",id,patch})).record},
      async listExpired({now=new Date()}={}){return (await stateCall(env,{op:"list-expired",now:now.getTime()})).records||[]},
      async delete(id){return stateCall(env,{op:"delete",id})}
    },
    objectStore:{
      async put(key,bytes,{contentType}={}){await env.NOW_MOMENT_MEDIA.put(key,bytes,{httpMetadata:{contentType}});return{ok:true}},
      get:key=>env.NOW_MOMENT_MEDIA.get(key),
      delete:key=>env.NOW_MOMENT_MEDIA.delete(key)
    },
    rateLimiter:{
      check:({subject,placeId=null,action="PHOTO",targetId=null,now=new Date()}={})=>stateCall(env,{op:"rate-check",subject,placeId,action,targetId,now:now.getTime()}),
      commit:({subject,placeId=null,action="PHOTO",targetId=null,now=new Date()}={})=>stateCall(env,{op:"rate-commit",subject,placeId,action,targetId,now:now.getTime()})
    }
  };
}
function adminAllowed(request,env){
  const expected=String(env.ERN_MEDIA_REVIEW_TOKEN||""),got=String(request.headers.get("authorization")||"");
  return Boolean(expected&&got===`Bearer ${expected}`);
}
async function readBodyBounded(request,maxBytes){
  if(!request.body)return new Uint8Array();
  const reader=request.body.getReader(),chunks=[];let total=0;
  try{
    while(true){
      const {done,value}=await reader.read();if(done)break;
      total+=value.byteLength;if(total>maxBytes){try{await reader.cancel("BODY_TOO_LARGE")}catch{}throw Object.assign(new Error("DERIVATIVE_TOO_LARGE"),{code:"DERIVATIVE_TOO_LARGE"})}
      chunks.push(value);
    }
  }finally{try{reader.releaseLock()}catch{}}
  const out=new Uint8Array(total);let offset=0;for(const chunk of chunks){out.set(chunk,offset);offset+=chunk.byteLength}
  return out;
}
function mediaExtension(mime){return mime==="image/png"?"png":mime==="image/webp"?"webp":"jpg"}
function inputFrom(request,bytes){
  const h=n=>request.headers.get(n);
  return{
    bytes,
    mimeType:h("x-ern-photo-mime"),
    sourceBytes:Number(h("x-ern-photo-source-bytes")),
    storedBytes:Number(h("x-ern-photo-stored-bytes")),
    width:Number(h("x-ern-photo-width")),
    height:Number(h("x-ern-photo-height")),
    placeId:h("x-ern-place-id"),
    placeLabel:h("x-ern-place-label")
  };
}
async function cleanup(env){
  const {metadataStore,objectStore}=stores(env);
  return cleanupNowMomentPhotos({capabilities:CAPABILITIES,metadataStore,objectStore,now:new Date()});
}

export default{
  async fetch(request,env){
    const url=new URL(request.url),origin=originFor(request,env),enabled=env.ERN_NOW_MOMENT_PHOTO_ENABLED==="true";
    if(request.method==="OPTIONS")return origin?new Response(null,{status:204,headers:{"access-control-allow-origin":origin,"access-control-allow-methods":"GET, POST, OPTIONS","access-control-allow-headers":"content-type,x-ern-place-id,x-ern-place-label,x-ern-photo-mime,x-ern-photo-source-bytes,x-ern-photo-stored-bytes,x-ern-photo-width,x-ern-photo-height","access-control-max-age":"600",vary:"Origin"}}):new Response(null,{status:403});
    if(request.method==="GET"&&url.pathname==="/health"){
      let state=null;try{state=await stateCall(env,{op:"status"})}catch{}
      return reply(200,{ok:true,service:"ERN Now Moment Media API",photoEnabled:enabled,videoEnabled:false,objectStorage:Boolean(env.NOW_MOMENT_MEDIA),durableMetadata:Boolean(env.MEDIA_STATE),rateSubjectSecretConfigured:Boolean(env.ERN_MEDIA_RATE_HMAC_KEY),reviewTokenConfigured:Boolean(env.ERN_MEDIA_REVIEW_TOKEN),directBucketPublicAccess:false,automaticPublicationAllowed:false,rawNetworkIdentifiersStored:false,state,secretValuesExposed:false},origin);
    }

    if(url.pathname.startsWith("/internal/now-moments/photos")){
      if(!adminAllowed(request,env))return reply(401,{ok:false,reason:"UNAUTHORIZED"});
      if(request.method==="GET"&&url.pathname==="/internal/now-moments/photos"){
        const x=await stateCall(env,{op:"list-review",now:Date.now()});
        return reply(200,{ok:true,items:(x.records||[]).map(r=>({id:r.id,placeId:r.placeId,placeLabel:r.placeLabel,createdAt:r.createdAt,expiresAt:r.storageExpiryAt,moderation:r.moderation,reported:r.reported===true,mimeType:r.mimeType,width:r.width,height:r.height,storedBytes:r.storedBytes,previewUrl:`/internal/now-moments/photos/${encodeURIComponent(r.id)}/media`}))});
      }
      const privateMedia=url.pathname.match(/^\/internal\/now-moments\/photos\/([^/]+)\/media$/);
      if(request.method==="GET"&&privateMedia){
        const {metadataStore,objectStore}=stores(env);
        const record=await metadataStore.get(decodeURIComponent(privateMedia[1]));
        if(!record||Date.parse(record.storageExpiryAt)<=Date.now())return reply(404,{ok:false,reason:"NOT_FOUND"});
        const object=await objectStore.get(record.objectKey);if(!object)return reply(404,{ok:false,reason:"NOT_FOUND"});
        return new Response(object.body,{status:200,headers:{"content-type":record.mimeType,"cache-control":"private, no-store","x-content-type-options":"nosniff","content-security-policy":"default-src 'none'; img-src 'self'; style-src 'none'; sandbox"}});
      }
      const m=url.pathname.match(/^\/internal\/now-moments\/photos\/([^/]+)\/review$/);
      if(request.method==="POST"&&m){
        let body;try{body=await request.json()}catch{return reply(400,{ok:false,reason:"INVALID_JSON"})}
        const {metadataStore,objectStore}=stores(env);
        const result=await reviewNowMomentPhoto({id:decodeURIComponent(m[1]),decision:body.decision},{capabilities:CAPABILITIES,metadataStore,objectStore});
        return result.ok?reply(200,{...result,publicEligible:Boolean(result.public),published:enabled&&Boolean(result.public)}):reply(result.reason==="PHOTO_EXPIRED"?410:400,result);
      }
      return reply(404,{ok:false,reason:"NOT_FOUND"});
    }

    if(!url.pathname.startsWith("/api/now-moments/photos"))return reply(404,{ok:false,reason:"NOT_FOUND"},origin);
    if(!origin)return reply(403,{ok:false,reason:"ORIGIN_NOT_ALLOWED"});
    if(!enabled)return reply(503,{ok:false,mode:"OFF",reason:"NOW_MOMENT_PHOTO_NOT_ACTIVATED"},origin);
    if(!env.NOW_MOMENT_MEDIA||!env.MEDIA_STATE||!env.ERN_MEDIA_RATE_HMAC_KEY||!env.ERN_MEDIA_REVIEW_TOKEN)return reply(503,{ok:false,mode:"OFF",reason:"MEDIA_SERVER_CONFIG_INCOMPLETE"},origin);

    const {metadataStore,objectStore,rateLimiter}=stores(env);
    const subject=await rateSubject(request,env);
    if(!subject)return reply(503,{ok:false,mode:"OFF",reason:"RATE_SUBJECT_CONFIG_INCOMPLETE"},origin);

    if(request.method==="POST"&&url.pathname==="/api/now-moments/photos"){
      if((+request.headers.get("content-length")||0)>1536*1024)return reply(413,{ok:false,reason:"DERIVATIVE_TOO_LARGE"},origin);
      let places;try{places=await knownPlaces(env)}catch(error){return reply(503,{ok:false,reason:error.code||"TRUSTED_CATALOG_UNAVAILABLE"},origin)}
      let bytes;try{bytes=await readBodyBounded(request,1536*1024)}catch(error){return reply(413,{ok:false,reason:error.code||"DERIVATIVE_TOO_LARGE"},origin)}
      const declared=Number(request.headers.get("x-ern-photo-stored-bytes"));if(!Number.isFinite(declared)||declared!==bytes.byteLength)return reply(400,{ok:false,reason:"STORED_SIZE_MISMATCH"},origin);
      const id=crypto.randomUUID(),objectKey=`photos/${id}.${mediaExtension(request.headers.get("x-ern-photo-mime"))}`;
      const result=await createNowMomentPhoto(inputFrom(request,bytes),{capabilities:CAPABILITIES,metadataStore,objectStore,rateLimiter,rateSubject:subject,knownPlaceIds:places,id,objectKey,now:new Date()});
      if(!result.ok)return reply(result.stage==="RATE_LIMIT"?429:400,result,origin);
      return reply(202,{ok:true,id,status:"PENDING_REVIEW",published:false,expiresAt:result.record.storageExpiryAt},origin);
    }

    if(request.method==="GET"&&url.pathname==="/api/now-moments/photos"){
      const result=await listNowMomentPhotos({placeId:url.searchParams.get("placeId")||null},{capabilities:CAPABILITIES,metadataStore,objectStore,now:new Date()});
      return reply(200,{ok:true,photos:(result.photos||[]).map(p=>({...p,mediaUrl:`${url.origin}/api/now-moments/photos/${encodeURIComponent(p.id)}/media`}))},origin);
    }

    const media=url.pathname.match(/^\/api\/now-moments\/photos\/([^/]+)\/media$/);
    if(request.method==="GET"&&media){
      const record=await metadataStore.get(decodeURIComponent(media[1]));
      if(!record||record.moderation!=="APPROVED"||record.reported===true||Date.parse(record.storageExpiryAt)<=Date.now())return reply(404,{ok:false,reason:"NOT_FOUND"},origin);
      const object=await objectStore.get(record.objectKey);if(!object)return reply(404,{ok:false,reason:"NOT_FOUND"},origin);
      return new Response(object.body,{status:200,headers:{"content-type":record.mimeType,"cache-control":"private, no-store","x-content-type-options":"nosniff","content-security-policy":"default-src 'none'; img-src 'self'; style-src 'none'; sandbox"}});
    }

    const report=url.pathname.match(/^\/api\/now-moments\/photos\/([^/]+)\/report$/);
    if(request.method==="POST"&&report){
      const targetId=decodeURIComponent(report[1]);
      const rate=await rateLimiter.commit({subject,action:"REPORT",targetId,now:new Date()});
      if(!rate.allowed)return reply(429,{ok:false,reason:rate.reason},origin);
      const result=await reportNowMomentPhoto({id:targetId},{capabilities:CAPABILITIES,metadataStore,objectStore});
      return result.ok?reply(202,{ok:true,id:targetId,visible:false},origin):reply(404,result,origin);
    }

    return reply(404,{ok:false,reason:"NOT_FOUND"},origin);
  },
  async scheduled(_controller,env){
    try{
      const result=await cleanup(env);
      if(!result.ok)throw Object.assign(new Error("NOW_MOMENT_CLEANUP_PARTIAL_FAILURE"),{details:result.failed||[]});
    }catch(error){
      console.error("NOW_MOMENT_CLEANUP_FAILED",error?.message||error,error?.details||[]);
      throw error;
    }
  }
};
