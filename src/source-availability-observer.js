import { ageHours, verificationWindowHours } from "./source-recency.js";

function safeHttpUrl(raw){
  try{
    const u=new URL(raw);
    if(!["http:","https:"].includes(u.protocol))return null;
    const host=u.hostname.toLowerCase();
    if(host==="localhost"||host.endsWith(".localhost")||host==="0.0.0.0"||host==="127.0.0.1"||host==="::1")return null;
    return u;
  }catch{return null}
}
function priority(source,now){
  const age=ageHours(source.lastSuccessfulCheck||source.checkedAt,now),window=verificationWindowHours(source),remaining=window-age;
  let p=0;
  if(!Number.isFinite(age))p+=120;
  else if(remaining<0)p+=100+Math.min(40,Math.abs(remaining)/6);
  else if(remaining<=24)p+=80+(24-remaining)/4;
  else if(remaining<=72)p+=40+(72-remaining)/12;
  if(source.playback==="EMBED")p+=25;
  if(source.health==="DEGRADED")p+=20;
  if(source.health==="UNKNOWN")p+=30;
  p+=(Number(source.quality)||0)/20;
  return Number(p.toFixed(2));
}
export function buildSourceAvailabilityPlan(sources=[],{now=new Date(),limit=24,maxPerHost=4}={}){
  const ranked=(sources||[]).map(source=>{
    const url=safeHttpUrl(source.sourceUrl||source.officialUrl);
    return url?{id:source.id,title:source.title,provider:source.provider||null,url:url.href,host:url.hostname.toLowerCase(),priority:priority(source,now),health:source.health,playback:source.playback,checkedAt:source.lastSuccessfulCheck||source.checkedAt||null}:null;
  }).filter(Boolean).sort((a,b)=>b.priority-a.priority||a.id.localeCompare(b.id));
  const counts=new Map(),out=[];
  for(const item of ranked){
    const count=counts.get(item.host)||0;
    if(count>=maxPerHost)continue;
    out.push(item);counts.set(item.host,count+1);
    if(out.length>=limit)break;
  }
  return out;
}
export async function probeSourceAvailability(item,{fetchImpl=globalThis.fetch,timeoutMs=7000}={}){
  const started=Date.now();
  if(typeof fetchImpl!=="function")throw new Error("fetch implementation required");
  try{
    const response=await fetchImpl(item.url,{
      method:"GET",
      redirect:"follow",
      signal:AbortSignal.timeout(timeoutMs),
      headers:{"user-agent":"EarthRightNow/availability-audit (+https://earthrightnow.app)","accept":"text/html,application/xhtml+xml;q=0.9,*/*;q=0.1"}
    });
    try{await response.body?.cancel?.()}catch{}
    const status=response.status;
    let outcome="INCONCLUSIVE";
    if(status>=200&&status<400)outcome="PAGE_REACHABLE";
    else if(status===404||status===410)outcome="PAGE_MISSING";
    else if(status===403||status===429)outcome="ACCESS_BLOCKED";
    else if(status>=500)outcome="TEMPORARY_ERROR";
    return{id:item.id,url:item.url,finalUrl:response.url||item.url,host:item.host,httpStatus:status,outcome,observedAt:new Date().toISOString(),elapsedMs:Date.now()-started,evidenceKind:"PAGE_AVAILABILITY",provesLive:false};
  }catch(error){
    return{id:item.id,url:item.url,host:item.host,httpStatus:null,outcome:error?.name==="TimeoutError"?"TIMEOUT":"NETWORK_ERROR",observedAt:new Date().toISOString(),elapsedMs:Date.now()-started,evidenceKind:"PAGE_AVAILABILITY",provesLive:false,error:String(error?.message||error)};
  }
}
export async function runSourceAvailabilityProbe(sources=[],{now=new Date(),limit=24,maxPerHost=4,concurrency=4,fetchImpl=globalThis.fetch,timeoutMs=7000}={}){
  const plan=buildSourceAvailabilityPlan(sources,{now,limit,maxPerHost}),results=new Array(plan.length);let cursor=0;
  async function worker(){for(;;){const i=cursor++;if(i>=plan.length)return;results[i]=await probeSourceAvailability(plan[i],{fetchImpl,timeoutMs})}}
  await Promise.all(Array.from({length:Math.max(1,Math.min(concurrency,plan.length||1))},()=>worker()));
  const summary={total:results.length,reachable:results.filter(x=>x.outcome==="PAGE_REACHABLE").length,missing:results.filter(x=>x.outcome==="PAGE_MISSING").length,blocked:results.filter(x=>x.outcome==="ACCESS_BLOCKED").length,temporaryError:results.filter(x=>x.outcome==="TEMPORARY_ERROR").length,timeout:results.filter(x=>x.outcome==="TIMEOUT").length,networkError:results.filter(x=>x.outcome==="NETWORK_ERROR").length};
  return{generatedAt:new Date().toISOString(),summary,plan,results,note:"Availability evidence only. PAGE_REACHABLE does not prove a camera is live and never changes source truth automatically."};
}
