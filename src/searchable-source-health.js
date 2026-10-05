import { probeSourceAvailability } from "./source-availability-observer.js";

const ADVERSE=new Set(["PAGE_MISSING","TEMPORARY_ERROR","TIMEOUT","NETWORK_ERROR"]);
const SAFE_PROTOCOLS=new Set(["http:","https:"]);

function safeUrl(raw){
  try{
    const u=new URL(raw);
    if(!SAFE_PROTOCOLS.has(u.protocol))return null;
    const host=u.hostname.toLowerCase();
    const privateV4=/^(?:10\.|127\.|169\.254\.|192\.168\.|172\.(?:1[6-9]|2\d|3[01])\.)/;
    if(host==="localhost"||host.endsWith(".localhost")||host==="0.0.0.0"||host==="::1"||host==="[::1]"||privateV4.test(host)||host.endsWith(".local"))return null;
    return u;
  }catch{return null}
}
function hash(text){
  let h=2166136261;
  for(const ch of String(text)){h^=ch.charCodeAt(0);h=Math.imul(h,16777619)}
  return h>>>0;
}
function dayIndex(now,cycleDays){
  const d=now instanceof Date?now:new Date(now);
  return Math.floor(d.getTime()/86400000)%cycleDays;
}
function catalogRows(core=[],supplemental=[]){
  const seen=new Set(),out=[];
  for(const source of [...(core||[]),...(supplemental||[])]){
    if(!source?.id||seen.has(source.id)||source.health==="OFFLINE")continue;
    const url=safeUrl(source.sourceUrl||source.officialUrl);
    if(!url)continue;
    seen.add(source.id);
    out.push({...source,_healthUrl:url.href,_healthHost:url.hostname.toLowerCase()});
  }
  return out;
}
export function buildSearchableCoveragePlan(core=[],supplemental=[],{now=new Date(),cycleDays=7}={}){
  const rows=catalogRows(core,supplemental);
  const groups=new Map();
  for(const source of rows){
    const key=source._healthUrl;
    const group=groups.get(key)||{url:key,host:source._healthHost,ids:[],sources:[]};
    group.ids.push(source.id);group.sources.push(source);groups.set(key,group);
  }
  const index=dayIndex(now,cycleDays);
  const all=[...groups.values()].sort((a,b)=>a.url.localeCompare(b.url));
  const cohort=all.filter(g=>hash(g.url)%cycleDays===index);
  return{
    generatedAt:new Date(now).toISOString(),
    cycleDays,
    cohortIndex:index,
    eligibleSources:rows.length,
    eligibleUniqueUrls:all.length,
    cohortSources:cohort.reduce((n,g)=>n+g.ids.length,0),
    cohortUniqueUrls:cohort.length,
    groups:cohort,
    note:"Rotating deterministic coverage. Every eligible searchable URL belongs to exactly one cohort in the cycle; shared URLs are probed once and mapped back to every source ID."
  };
}
function nextState(prev,result){
  const previous=prev?.[result.id]||null;
  const adverse=ADVERSE.has(result.outcome);
  const missing=result.outcome==="PAGE_MISSING";
  const blocked=result.outcome==="ACCESS_BLOCKED";
  const reachable=result.outcome==="PAGE_REACHABLE";
  return{
    id:result.id,
    url:result.url,
    title:result.title||previous?.title||null,
    provider:result.provider||previous?.provider||null,
    lastOutcome:result.outcome,
    lastObservedAt:result.observedAt,
    previousOutcome:previous?.lastOutcome||null,
    consecutiveAdverse:adverse?(previous?.consecutiveAdverse||0)+1:0,
    consecutiveMissing:missing?(previous?.consecutiveMissing||0)+1:0,
    consecutiveBlocked:blocked?(previous?.consecutiveBlocked||0)+1:0,
    consecutiveReachable:reachable?(previous?.consecutiveReachable||0)+1:0,
    recovered:reachable&&previous&&previous.lastOutcome!=="PAGE_REACHABLE"
  };
}
function repairItem(state){
  let severity=null,action=null,reason=null;
  if(state.consecutiveMissing>=2){severity="REPAIR";action="VERIFY_PROVIDER_PAGE_OR_REPLACEMENT";reason="REPEATED_PAGE_MISSING"}
  else if(state.consecutiveAdverse>=3){severity="REPAIR";action="VERIFY_PROVIDER_OR_REPLACEMENT";reason="REPEATED_NETWORK_OR_SERVER_FAILURE"}
  else if(state.consecutiveBlocked>=2){severity="REVIEW";action="REVIEW_PROVIDER_ACCESS_PATTERN";reason="REPEATED_ACCESS_BLOCK"}
  else if(state.lastOutcome==="PAGE_MISSING"){severity="WATCH";action="RECHECK_ON_NEXT_COHORT";reason="FIRST_PAGE_MISSING"}
  else if(ADVERSE.has(state.lastOutcome)){severity="WATCH";action="RECHECK_ON_NEXT_COHORT";reason="TRANSIENT_FAILURE"}
  else if(state.lastOutcome==="ACCESS_BLOCKED"){severity="NOTICE";action="KEEP_AND_RECHECK";reason="ACCESS_BLOCKED"}
  if(!severity)return null;
  return{...state,severity,action,reason,catalogMutationAllowed:false,automaticHealthChangeAllowed:false};
}
export async function runSearchableSourceHealth(core=[],supplemental=[],{previousState={},now=new Date(),cycleDays=7,concurrency=6,timeoutMs=7000,fetchImpl=globalThis.fetch}={}){
  const plan=buildSearchableCoveragePlan(core,supplemental,{now,cycleDays});
  const groupResults=new Array(plan.groups.length);let cursor=0;
  async function worker(){
    for(;;){
      const i=cursor++;if(i>=plan.groups.length)return;
      const g=plan.groups[i];
      groupResults[i]=await probeSourceAvailability({id:g.ids[0],url:g.url,host:g.host},{fetchImpl,timeoutMs});
    }
  }
  await Promise.all(Array.from({length:Math.max(1,Math.min(concurrency,plan.groups.length||1))},()=>worker()));
  const results=[];
  for(let i=0;i<plan.groups.length;i++){
    const g=plan.groups[i],base=groupResults[i];
    for(const source of g.sources)results.push({...base,id:source.id,title:source.title||null,provider:source.provider||null,url:g.url});
  }
  const state={...(previousState||{})};
  const observedStates=[];
  for(const result of results){state[result.id]=nextState(state,result);observedStates.push(state[result.id])}
  const repairQueue=observedStates.map(repairItem).filter(Boolean).sort((a,b)=>{
    const weight={REPAIR:3,REVIEW:2,WATCH:1,NOTICE:0};
    return (weight[b.severity]||0)-(weight[a.severity]||0)||String(a.id).localeCompare(String(b.id));
  });
  const summary={
    checkedSources:results.length,
    checkedUniqueUrls:plan.cohortUniqueUrls,
    reachable:results.filter(x=>x.outcome==="PAGE_REACHABLE").length,
    missing:results.filter(x=>x.outcome==="PAGE_MISSING").length,
    blocked:results.filter(x=>x.outcome==="ACCESS_BLOCKED").length,
    temporaryOrNetwork:results.filter(x=>["TEMPORARY_ERROR","TIMEOUT","NETWORK_ERROR"].includes(x.outcome)).length,
    recovered:observedStates.filter(x=>x.recovered).length,
    repair:repairQueue.filter(x=>x.severity==="REPAIR").length,
    review:repairQueue.filter(x=>x.severity==="REVIEW").length,
    watch:repairQueue.filter(x=>x.severity==="WATCH").length
  };
  return{
    generatedAt:new Date(now).toISOString(),
    coverage:{
      cycleDays:plan.cycleDays,cohortIndex:plan.cohortIndex,
      eligibleSources:plan.eligibleSources,eligibleUniqueUrls:plan.eligibleUniqueUrls,
      checkedSources:plan.cohortSources,checkedUniqueUrls:plan.cohortUniqueUrls,
      target:"100% of eligible searchable URLs once per cycle"
    },
    summary,results,repairQueue,state,
    safety:{catalogMutationAllowed:false,automaticHealthChangeAllowed:false,pageReachabilityProvesLive:false},
    note:"Automated URL health is not media proof. PAGE_REACHABLE only proves the source page responded. Persistent failures create a repair queue; catalog or truth changes require separate evidence/review."
  };
}
