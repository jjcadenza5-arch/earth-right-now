import fs from "node:fs";

const rows=JSON.parse(fs.readFileSync("data/sources.json","utf8"));
const network=process.argv.includes("--network");
const now=Date.now();

function safeHttp(v){
  try{const u=new URL(String(v||"").trim());return["http:","https:"].includes(u.protocol)&&!u.username&&!u.password?u.toString():""}catch{return""}
}
function ageHours(s){
  const t=Date.parse(s?.lastSuccessfulCheck||s?.checkedAt||"");
  return Number.isFinite(t)?Math.max(0,(now-t)/36e5):Infinity;
}
function windowHours(s){
  if(s?.truth==="LIVE_IMAGE"||s?.playback==="IMAGE_REFRESH")return 24;
  if(s?.playback==="EMBED")return 24;
  if(s?.truth==="EXTERNAL_LIVE"||s?.truth==="PARTNER")return 72;
  return 168;
}
function current(s){
  if(!s||s.health!=="HEALTHY")return false;
  if(ageHours(s)>windowHours(s))return false;
  if(s.availabilitySchedule){
    // Network audit is about handoff validity, not schedule truth. Scheduled sources
    // remain eligible for URL auditing even when currently outside published hours.
  }
  return true;
}
function mappedBase(s){
  return !!(s&&s.health!=="OFFLINE"&&s.truth!=="PREVIEW"&&Number.isFinite(+s.lat)&&Number.isFinite(+s.lon));
}
const reference=rows.filter(s=>mappedBase(s)&&!current(s)&&s.health==="HEALTHY");
const staticIssues=[];
const candidates=reference.map(s=>{
  const url=safeHttp(s.sourceUrl||s.officialUrl);
  if(!url)staticIssues.push({id:s.id,title:s.title,code:"MISSING_OR_UNSAFE_SOURCE_HANDOFF"});
  return{id:s.id,title:s.title,url,truth:s.truth,playback:s.playback,ageHours:+ageHours(s).toFixed(1),verificationWindowHours:windowHours(s)};
});
const unique=[...new Map(candidates.filter(x=>x.url).map(x=>[x.url,x])).values()];
const results=[];
async function probe(item){
  const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),8000);
  try{
    const r=await fetch(item.url,{method:"GET",redirect:"follow",signal:controller.signal,headers:{accept:"text/html,application/xhtml+xml;q=0.9,*/*;q=0.2","user-agent":"ERN-Reference-Handoff-Audit/1.0"}});
    return{url:item.url,status:r.status,ok:r.status>=200&&r.status<500,definiteBroken:[404,410].includes(r.status),attention:r.status>=500,finalUrl:r.url||item.url};
  }catch(error){
    return{url:item.url,status:null,ok:false,definiteBroken:false,attention:true,error:String(error?.name||error?.message||error)};
  }finally{clearTimeout(timer)}
}
if(network){
  const queue=[...unique],workers=Array.from({length:8},async()=>{while(queue.length){const item=queue.shift();results.push(await probe(item))}});
  await Promise.all(workers);
}
const resultMap=new Map(results.map(x=>[x.url,x]));
const rowsOut=candidates.map(x=>({...x,network:network?(resultMap.get(x.url)||null):null}));
const definiteBroken=rowsOut.filter(x=>x.network?.definiteBroken===true);
const attention=rowsOut.filter(x=>x.network?.attention===true);
const report={
  schemaVersion:1,
  generatedAt:new Date(now).toISOString(),
  mode:network?"STATIC_PLUS_NETWORK":"STATIC_ONLY",
  referenceOnlyMappedCount:reference.length,
  validHandoffCount:candidates.filter(x=>x.url).length,
  staticIssues,
  definiteBroken,
  attention,
  rows:rowsOut,
  policy:{
    reachabilityDoesNotProveLive:true,
    networkSuccessDoesNotRefreshCurrentness:true,
    sourceTruthMutationAllowed:false,
    sourceHealthMutationAllowed:false,
    http403MayStillBeBrowserValid:true,
    transientNetworkFailureIsAttentionNotAutomaticRemoval:true
  },
  ok:staticIssues.length===0&&definiteBroken.length===0
};
console.log(JSON.stringify(report,null,2));
if(!report.ok)process.exitCode=1;
