import {earthSignalHttpRequest} from "../../src/earth-signal-http-adapter.js";
import {earthSignalRateSubject} from "../../src/earth-signal-rate-limiter-contract.js";
export {SignalState} from "./signal-state.js";

const BASE_CAPABILITIES=Object.freeze({
  transport:true,
  rateLimits:true,
  moderation:true,
  reporting:true,
  expiryDeletion:true,
  privacyNotice:true
});

const headers=(origin)=>({
  "content-type":"application/json; charset=utf-8",
  "cache-control":"no-store",
  ...(origin?{"access-control-allow-origin":origin,"vary":"Origin"}:{})
});
const reply=(status,body,origin)=>new Response(JSON.stringify(body),{status,headers:headers(origin)});
const allowedOrigin=(request,env)=>{
  const want=String(env.ERN_PUBLIC_ORIGIN||"https://earthrightnow.app").replace(/\/$/,"");
  const got=String(request.headers.get("origin")||"").replace(/\/$/,"");
  return got===want?got:null;
};
const stateStub=(env)=>env.SIGNAL_STATE.get(env.SIGNAL_STATE.idFromName("global"));
async function stateCall(env,body){
  const r=await stateStub(env).fetch("https://signal-state/internal",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(body)});
  if(!r.ok)throw Object.assign(new Error("SIGNAL_STATE_"+r.status),{code:"SIGNAL_STATE_UNAVAILABLE"});
  return r.json();
}
async function hmac(raw,key){
  const k=await crypto.subtle.importKey("raw",new TextEncoder().encode(key),{name:"HMAC",hash:"SHA-256"},false,["sign"]);
  const sig=await crypto.subtle.sign("HMAC",k,new TextEncoder().encode(raw));
  return btoa(String.fromCharCode(...new Uint8Array(sig))).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"");
}
async function rateSubject(request,env){
  const raw=request.headers.get("CF-Connecting-IP")||request.headers.get("x-real-ip")||"";
  if(!raw||!env.ERN_RATE_HMAC_KEY)return{ok:false,reason:"RATE_SUBJECT_CONFIG_INCOMPLETE"};
  return earthSignalRateSubject({subject:"anon_"+(await hmac(raw,env.ERN_RATE_HMAC_KEY)).slice(0,64)});
}
async function catalogPlaceIds(env){
  const r=await fetch(env.ERN_CATALOG_URL||"https://earthrightnow.app/data/sources.json",{headers:{accept:"application/json","user-agent":"ERN-Signals/1.0"},cf:{cacheTtl:120,cacheEverything:true}});
  if(!r.ok)throw Object.assign(new Error("CATALOG_FETCH_"+r.status),{code:"TRUSTED_CATALOG_UNAVAILABLE"});
  const list=await r.json();
  if(!Array.isArray(list))throw Object.assign(new Error("CATALOG_INVALID"),{code:"TRUSTED_CATALOG_UNAVAILABLE"});
  return [...new Set(list.flatMap(s=>[s.placeId,s.id]).filter(Boolean).map(String))];
}
function adapters(env){
  return{
    storage:{
      putSignal:record=>stateCall(env,{op:"put-signal",record}),
      async listSignals({placeId=null,now=new Date()}={}){const x=await stateCall(env,{op:"list-signals",placeId,now:now.getTime()});return x.signals||[]},
      putReport:report=>stateCall(env,{op:"put-report",report}),
      async deleteExpired({now=new Date()}={}){const x=await stateCall(env,{op:"delete-expired",now:now.getTime()});return{deleted:x.deleted||0}}
    },
    rateLimiter:{
      check:({subject,placeId=null,action="SUBMIT",targetId=null,now=new Date()}={})=>stateCall(env,{op:"rate-check",subject,placeId,action,targetId,now:now.getTime()}),
      commit:({subject,placeId=null,action="SUBMIT",targetId=null,now=new Date()}={})=>stateCall(env,{op:"rate-commit",subject,placeId,action,targetId,now:now.getTime()})
    }
  };
}

export default{
  async fetch(request,env){
    const url=new URL(request.url),origin=allowedOrigin(request,env),enabled=env.ERN_EARTH_SIGNALS_ENABLED==="true";
    if(request.method==="OPTIONS")return origin?new Response(null,{status:204,headers:{"access-control-allow-origin":origin,"access-control-allow-methods":"GET, POST, OPTIONS","access-control-allow-headers":"content-type","access-control-max-age":"600","vary":"Origin"}}):new Response(null,{status:403});
    if(request.method==="GET"&&url.pathname==="/health"){
      let state=null;try{state=await stateCall(env,{op:"status"})}catch{}
      return reply(200,{ok:true,service:"ERN Earth Signals API",contributionsEnabled:enabled,durableStorage:Boolean(env.SIGNAL_STATE),rateSubjectSecretConfigured:Boolean(env.ERN_RATE_HMAC_KEY),reviewTokenConfigured:Boolean(env.ERN_SIGNAL_REVIEW_TOKEN),rawNetworkIdentifiersStored:false,state,secretValuesExposed:false},origin);
    }
    if(url.pathname.startsWith("/internal/earth-signals")){
      const expected=String(env.ERN_SIGNAL_REVIEW_TOKEN||"");
      const got=String(request.headers.get("authorization")||"");
      if(!expected||got!==`Bearer ${expected}`)return reply(401,{ok:false,reason:"UNAUTHORIZED"});
      if(request.method==="GET"&&url.pathname==="/internal/earth-signals/reports"){
        const x=await stateCall(env,{op:"list-reports",now:Date.now()});
        return reply(200,x);
      }
      const m=url.pathname.match(/^\/internal\/earth-signals\/([^/]+)\/resolve$/);
      if(request.method==="POST"&&m){
        let body;try{body=await request.json()}catch{return reply(400,{ok:false,reason:"INVALID_JSON"})}
        const decision=String(body?.decision||"");
        if(!["RESTORE","REMOVE"].includes(decision))return reply(400,{ok:false,reason:"INVALID_RESOLUTION"});
        const x=await stateCall(env,{op:"resolve-report",signalId:decodeURIComponent(m[1]),decision,now:Date.now()});
        return reply(200,{...x,published:false});
      }
      return reply(404,{ok:false,reason:"NOT_FOUND"});
    }

    if(!url.pathname.startsWith("/api/earth-signals"))return reply(404,{ok:false,reason:"NOT_FOUND"},origin);
    if(!origin)return reply(403,{ok:false,reason:"ORIGIN_NOT_ALLOWED"});
    if((+request.headers.get("content-length")||0)>4096)return reply(413,{ok:false,reason:"REQUEST_TOO_LARGE"},origin);
    const subject=await rateSubject(request,env);
    if(!subject.ok)return reply(503,{ok:false,mode:"READ_ONLY",reason:subject.reason},origin);
    let knownPlaceIds;try{knownPlaceIds=await catalogPlaceIds(env)}catch(error){return reply(503,{ok:false,mode:"READ_ONLY",reason:error.code||"TRUSTED_CATALOG_UNAVAILABLE"},origin)}
    const {storage,rateLimiter}=adapters(env);
    let body={};
    if(request.method==="POST"){try{body=await request.json()}catch{return reply(400,{ok:false,reason:"INVALID_JSON"},origin)}}
    const result=await earthSignalHttpRequest({
      method:request.method,
      path:url.pathname,
      query:{placeId:url.searchParams.get("placeId")||null},
      body
    },{
      capabilities:enabled?BASE_CAPABILITIES:{},
      storage,
      rateLimiter,
      rateSubject:subject.subject,
      knownPlaceIds,
      id:crypto.randomUUID(),
      now:new Date()
    });
    return new Response(JSON.stringify(result.body),{status:result.status,headers:headers(origin)});
  }
};
