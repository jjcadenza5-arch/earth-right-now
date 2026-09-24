function youtubeWatchUrl(raw){
  try{
    const u=new URL(raw);
    const host=u.hostname.toLowerCase().replace(/^www\./,"");
    if(host!=="youtube.com"&&host!=="youtu.be")return null;
    return u.href;
  }catch{return null}
}
function youtubeEmbedUrl(raw){
  try{
    const u=new URL(raw);
    const host=u.hostname.toLowerCase();
    if(!["www.youtube-nocookie.com","youtube-nocookie.com","www.youtube.com","youtube.com"].includes(host))return null;
    if(!u.pathname.startsWith("/embed/"))return null;
    return u.href;
  }catch{return null}
}
async function fetchJson(url,{fetchImpl,timeoutMs}){
  const r=await fetchImpl(url,{method:"GET",redirect:"follow",signal:AbortSignal.timeout(timeoutMs),headers:{"user-agent":"EarthRightNow/embed-research-preflight (+https://earthrightnow.app)","accept":"application/json"}});
  const status=r.status;
  let json=null;
  try{json=await r.json()}catch{}
  return{status,url:r.url||url,json};
}
async function fetchPage(url,{fetchImpl,timeoutMs}){
  const r=await fetchImpl(url,{method:"GET",redirect:"follow",signal:AbortSignal.timeout(timeoutMs),headers:{"user-agent":"EarthRightNow/embed-research-preflight (+https://earthrightnow.app)","accept":"text/html,application/xhtml+xml;q=0.9,*/*;q=0.1"}});
  try{await r.body?.cancel?.()}catch{}
  return{status:r.status,url:r.url||url};
}
export async function preflightEmbedResearchCandidate(candidate,{fetchImpl=globalThis.fetch,timeoutMs=7000}={}){
  if(typeof fetchImpl!=="function")throw new Error("fetch implementation required");
  const sourceUrl=youtubeWatchUrl(candidate?.sourceUrl),embedUrl=youtubeEmbedUrl(candidate?.candidateEmbedUrl);
  if(!sourceUrl||!embedUrl)return{id:candidate?.id||null,platform:candidate?.platform||null,outcome:"UNSUPPORTED_CANDIDATE",metadataAvailable:false,embedPageReachable:false,technicalReady:false,permissionConfirmed:false,humanPlaybackConfirmed:false};
  const oembed="https://www.youtube.com/oembed?url="+encodeURIComponent(sourceUrl)+"&format=json";
  let meta=null,page=null,metaError=null,pageError=null;
  try{meta=await fetchJson(oembed,{fetchImpl,timeoutMs})}catch(error){metaError=String(error?.message||error)}
  try{page=await fetchPage(embedUrl,{fetchImpl,timeoutMs})}catch(error){pageError=String(error?.message||error)}
  const metadataAvailable=Boolean(meta&&meta.status>=200&&meta.status<300&&meta.json?.title);
  const embedPageReachable=Boolean(page&&page.status>=200&&page.status<400);
  const technicalReady=metadataAvailable&&embedPageReachable;
  const outcome=technicalReady?"TECHNICALLY_READY_FOR_DEPLOYED_TEST":metadataAvailable||embedPageReachable?"PARTIAL_TECHNICAL_EVIDENCE":"TECHNICAL_PREFLIGHT_FAILED";
  return{
    id:candidate.id,
    provider:candidate.provider||null,
    platform:candidate.platform||null,
    sourceUrl,
    candidateEmbedUrl:embedUrl,
    outcome,
    metadataAvailable,
    embedPageReachable,
    technicalReady,
    oembed:{httpStatus:meta?.status??null,title:meta?.json?.title||null,authorName:meta?.json?.author_name||null,providerName:meta?.json?.provider_name||null,error:metaError},
    embed:{httpStatus:page?.status??null,finalUrl:page?.url||embedUrl,error:pageError},
    permissionConfirmed:false,
    humanPlaybackConfirmed:false,
    promotionAllowed:false,
    note:"Technical preflight only. oEmbed/embed reachability does not prove per-video permission on ERN, live/current playback, or catalog eligibility."
  };
}
export async function runEmbedResearchPreflight(candidates=[],opts={}){
  const rows=[];
  for(const candidate of candidates||[])rows.push(await preflightEmbedResearchCandidate(candidate,opts));
  return{
    generatedAt:new Date().toISOString(),
    total:rows.length,
    technicalReady:rows.filter(x=>x.technicalReady).length,
    partial:rows.filter(x=>x.outcome==="PARTIAL_TECHNICAL_EVIDENCE").length,
    failed:rows.filter(x=>x.outcome==="TECHNICAL_PREFLIGHT_FAILED").length,
    unsupported:rows.filter(x=>x.outcome==="UNSUPPORTED_CANDIDATE").length,
    rows,
    note:"Research-only preflight. No result can promote a source without deployed-origin human playback and explicit provider/per-video review."
  };
}
