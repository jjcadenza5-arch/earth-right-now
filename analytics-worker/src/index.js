import {AnalyticsState} from "./analytics-state.js";export {AnalyticsState};
const ALLOWED=new Set(["page_view","window_opened","place_opened","watch_earth_started","earth_search","earth_search_zero","external_source_opened","travel_option_opened"]);
const headers=origin=>({"content-type":"application/json; charset=utf-8","cache-control":"no-store",...(origin?{"access-control-allow-origin":origin,"vary":"Origin"}:{})});
const reply=(status,body,origin)=>new Response(JSON.stringify(body),{status,headers:headers(origin)});
const clean=s=>String(s??"").trim();
const clipped=(v,n=120)=>clean(v).slice(0,n);
const allowedOrigin=(request,env)=>{const want=clean(env.ERN_PUBLIC_ORIGIN||"https://earthrightnow.app").replace(/\/$/,""),got=clean(request.headers.get("origin")).replace(/\/$/,"");return got===want?got:null};
const stateStub=env=>env.ANALYTICS_STATE.get(env.ANALYTICS_STATE.idFromName("global"));
async function stateCall(env,body){const r=await stateStub(env).fetch("https://analytics-state/internal",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(body)});if(!r.ok)throw new Error("ANALYTICS_STATE_"+r.status);return r.json()}
async function hmac(raw,key){const k=await crypto.subtle.importKey("raw",new TextEncoder().encode(key),{name:"HMAC",hash:"SHA-256"},false,["sign"]);const sig=await crypto.subtle.sign("HMAC",k,new TextEncoder().encode(raw));return [...new Uint8Array(sig)].map(x=>x.toString(16).padStart(2,"0")).join("")}
const safeSearch=q=>{const s=clean(q).normalize("NFKC").replace(/\s+/g," ").slice(0,80);if(s.length<2)return"";if(/@|https?:\/\/|www\./i.test(s))return"";if(/(?:\+?\d[\d\s().-]{6,}\d)/.test(s))return"";return s.toLocaleLowerCase()};
const cleanData=(name,data={})=>{
  const out={};const text=(k,n=120)=>{const v=clipped(data[k],n);if(v)out[k]=v};
  if(name==="page_view")text("route",120);
  if(["window_opened","external_source_opened"].includes(name)){text("sourceId");text("placeId");text("truth",40);text("playback",40);text("provider",80)}
  if(name==="place_opened")text("placeId");
  if(name==="watch_earth_started"){text("sourceId");text("placeId")}
  if(["earth_search","earth_search_zero"].includes(name)){const q=safeSearch(data.query);if(q)out.query=q;if(Number.isFinite(+data.resultCount))out.resultCount=Math.max(0,Math.min(+data.resultCount,1000))}
  if(name==="travel_option_opened"){text("offerId");text("placeId");text("intent",60);text("linkScope",30);out.affiliate=data.affiliate===true;out.sponsored=data.sponsored===true}
  return out;
};
const constantTimeEqual=(a,b)=>{const x=String(a||""),y=String(b||""),n=Math.max(x.length,y.length,1);let diff=x.length^y.length;for(let i=0;i<n;i++)diff|=(x.charCodeAt(i%x.length||0)||0)^(y.charCodeAt(i%y.length||0)||0);return diff===0};
export default{async fetch(request,env){
  const url=new URL(request.url),origin=allowedOrigin(request,env),enabled=env.ERN_ANALYTICS_ENABLED==="true";
  if(request.method==="OPTIONS")return origin?new Response(null,{status:204,headers:{"access-control-allow-origin":origin,"access-control-allow-methods":"POST, OPTIONS","access-control-allow-headers":"content-type","access-control-max-age":"600","vary":"Origin"}}):new Response(null,{status:403});
  if(request.method==="GET"&&url.pathname==="/health"){
    let state=null;try{state=await stateCall(env,{op:"status"})}catch{}
    return reply(200,{ok:true,service:"ERN Analytics API",analyticsEnabled:enabled,durableStorage:Boolean(env.ANALYTICS_STATE),hmacSecretConfigured:Boolean(env.ERN_ANALYTICS_HMAC_KEY),reviewTokenConfigured:Boolean(env.ERN_ANALYTICS_REVIEW_TOKEN),rawNetworkIdentifiersStored:false,eventRowsStored:false,state,secretValuesExposed:false},origin);
  }
  if(request.method==="GET"&&url.pathname==="/internal/analytics/summary"){
    const expected=clean(env.ERN_ANALYTICS_REVIEW_TOKEN),got=clean(request.headers.get("authorization"));
    if(!expected||!constantTimeEqual(got,`Bearer ${expected}`))return reply(401,{ok:false,reason:"UNAUTHORIZED"});
    const days=Math.max(1,Math.min(Number(url.searchParams.get("days"))||30,90));
    return reply(200,await stateCall(env,{op:"summary",days,now:Date.now()}));
  }
  if(request.method!=="POST"||url.pathname!=="/api/analytics")return reply(404,{ok:false,reason:"NOT_FOUND"},origin);
  if(!origin)return reply(403,{ok:false,reason:"ORIGIN_NOT_ALLOWED"},origin);
  if(!enabled)return reply(503,{ok:false,reason:"ANALYTICS_DISABLED"},origin);
  const len=+request.headers.get("content-length")||0;if(len>4096)return reply(413,{ok:false,reason:"REQUEST_TOO_LARGE"},origin);
  let body;try{const raw=await request.text();if(raw.length>4096)return reply(413,{ok:false,reason:"REQUEST_TOO_LARGE"},origin);body=JSON.parse(raw)}catch{return reply(400,{ok:false,reason:"INVALID_JSON"},origin)}
  const e=body?.event||{},name=clipped(e.name,60);if(!ALLOWED.has(name))return reply(400,{ok:false,reason:"EVENT_NOT_ALLOWED"},origin);
  const visitorId=clipped(body?.visitorId,100),visitorHash=visitorId&&env.ERN_ANALYTICS_HMAC_KEY?await hmac(visitorId,env.ERN_ANALYTICS_HMAC_KEY):"";
  const cf=request.cf||{},country=clipped(cf.country,8)||"unknown",region=clipped(cf.regionCode||cf.region,40);
  const device=["mobile","tablet","desktop"].includes(body?.context?.device)?body.context.device:"unknown";
  const referrerHost=clipped(body?.context?.referrerHost,120).replace(/^www\./,"")||"direct";
  const result=await stateCall(env,{op:"record",event:{name,data:cleanData(name,e.data)},visitorHash,retentionDays:Number(env.ERN_ANALYTICS_RETENTION_DAYS)||90,now:Date.now(),context:{country,region,device,referrerHost}});
  return reply(202,{ok:true,recorded:true,visitorStatus:name==="page_view"?result.visitorStatus:undefined,rawNetworkIdentifiersStored:false},origin);
}};
