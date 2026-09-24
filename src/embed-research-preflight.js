function parseHttps(raw){
  try{const u=new URL(String(raw||""));return u.protocol==="https:"?u:null}catch{return null}
}
function youtubeWatchUrl(raw){
  const u=parseHttps(raw);if(!u)return null;
  const host=u.hostname.toLowerCase().replace(/^www\./,"");
  return(host==="youtube.com"||host==="youtu.be")?u.href:null;
}
function youtubeEmbedUrl(raw){
  const u=parseHttps(raw);if(!u)return null;
  const host=u.hostname.toLowerCase().replace(/^www\./,"");
  if(!["youtube-nocookie.com","youtube.com"].includes(host)||!u.pathname.startsWith("/embed/"))return null;
  return u.href;
}
function exploreSourceUrl(raw){
  const u=parseHttps(raw);if(!u)return null;
  const host=u.hostname.toLowerCase().replace(/^www\./,"");
  if(host!=="explore.org"||!u.pathname.startsWith("/livecams/"))return null;
  return u.href;
}
function explorePlayerUrl(raw){
  const u=parseHttps(raw);if(!u)return null;
  const host=u.hostname.toLowerCase().replace(/^www\./,"");
  if(host!=="explore.org"||!u.pathname.startsWith("/livecams/player/"))return null;
  return u.href;
}
async function fetchJson(url,{fetchImpl,timeoutMs}){
  const r=await fetchImpl(url,{method:"GET",redirect:"follow",signal:AbortSignal.timeout(timeoutMs),headers:{"user-agent":"EarthRightNow/embed-research-preflight (+https://earthrightnow.app)","accept":"application/json"}});
  const status=r.status;let json=null;try{json=await r.json()}catch{}
  return{status,url:r.url||url,json};
}
async function fetchPage(url,{fetchImpl,timeoutMs}){
  const r=await fetchImpl(url,{method:"GET",redirect:"follow",signal:AbortSignal.timeout(timeoutMs),headers:{"user-agent":"EarthRightNow/embed-research-preflight (+https://earthrightnow.app)","accept":"text/html,application/xhtml+xml;q=0.9,*/*;q=0.1"}});
  try{await r.body?.cancel?.()}catch{}
  return{status:r.status,url:r.url||url};
}
async function youtubePreflight(candidate,{fetchImpl,timeoutMs}){
  const sourceUrl=youtubeWatchUrl(candidate?.sourceUrl),embedUrl=youtubeEmbedUrl(candidate?.candidateEmbedUrl);
  if(!sourceUrl||!embedUrl)return null;
  const oembed="https://www.youtube.com/oembed?url="+encodeURIComponent(sourceUrl)+"&format=json";
  let meta=null,page=null,metaError=null,pageError=null;
  try{meta=await fetchJson(oembed,{fetchImpl,timeoutMs})}catch(error){metaError=String(error?.message||error)}
  try{page=await fetchPage(embedUrl,{fetchImpl,timeoutMs})}catch(error){pageError=String(error?.message||error)}
  const metadataAvailable=Boolean(meta&&meta.status>=200&&meta.status<300&&meta.json?.title);
  const embedPageReachable=Boolean(page&&page.status>=200&&page.status<400);
  const technicalReady=metadataAvailable&&embedPageReachable;
  return{
    id:candidate.id,provider:candidate.provider||null,platform:candidate.platform||null,sourceUrl,candidateEmbedUrl:embedUrl,
    outcome:technicalReady?"TECHNICALLY_READY_FOR_DEPLOYED_TEST":metadataAvailable||embedPageReachable?"PARTIAL_TECHNICAL_EVIDENCE":"TECHNICAL_PREFLIGHT_FAILED",
    metadataAvailable,sourcePageReachable:metadataAvailable,embedPageReachable,technicalReady,
    oembed:{httpStatus:meta?.status??null,title:meta?.json?.title||null,authorName:meta?.json?.author_name||null,providerName:meta?.json?.provider_name||null,error:metaError},
    embed:{httpStatus:page?.status??null,finalUrl:page?.url||embedUrl,error:pageError},
    permissionConfirmed:false,humanPlaybackConfirmed:false,promotionAllowed:false,
    note:"YouTube technical preflight only. oEmbed/embed reachability does not prove per-video permission on ERN, live/current playback, or catalog eligibility."
  };
}
async function explorePreflight(candidate,{fetchImpl,timeoutMs}){
  const sourceUrl=exploreSourceUrl(candidate?.sourceUrl),embedUrl=explorePlayerUrl(candidate?.candidateEmbedUrl);
  if(!sourceUrl||!embedUrl)return null;
  let source=null,player=null,sourceError=null,playerError=null;
  try{source=await fetchPage(sourceUrl,{fetchImpl,timeoutMs})}catch(error){sourceError=String(error?.message||error)}
  try{player=await fetchPage(embedUrl,{fetchImpl,timeoutMs})}catch(error){playerError=String(error?.message||error)}
  const sourcePageReachable=Boolean(source&&source.status>=200&&source.status<400);
  const embedPageReachable=Boolean(player&&player.status>=200&&player.status<400);
  const technicalReady=sourcePageReachable&&embedPageReachable;
  return{
    id:candidate.id,provider:candidate.provider||null,platform:candidate.platform||null,sourceUrl,candidateEmbedUrl:embedUrl,
    outcome:technicalReady?"TECHNICALLY_READY_FOR_DEPLOYED_TEST":sourcePageReachable||embedPageReachable?"PARTIAL_TECHNICAL_EVIDENCE":"TECHNICAL_PREFLIGHT_FAILED",
    metadataAvailable:sourcePageReachable,sourcePageReachable,embedPageReachable,technicalReady,
    source:{httpStatus:source?.status??null,finalUrl:source?.url||sourceUrl,error:sourceError},
    embed:{httpStatus:player?.status??null,finalUrl:player?.url||embedUrl,error:playerError},
    permissionConfirmed:false,humanPlaybackConfirmed:false,promotionAllowed:false,
    note:"Explore.org technical preflight only. Reachable source/player pages do not prove that the player is authorized for ERN, live/current in the deployed iframe, or catalog eligible."
  };
}
export async function preflightEmbedResearchCandidate(candidate,{fetchImpl=globalThis.fetch,timeoutMs=7000}={}){
  if(typeof fetchImpl!=="function")throw new Error("fetch implementation required");
  const platform=String(candidate?.platform||"").toLowerCase();
  let result=null;
  if(platform==="youtube")result=await youtubePreflight(candidate,{fetchImpl,timeoutMs});
  else if(platform==="explore")result=await explorePreflight(candidate,{fetchImpl,timeoutMs});
  if(result)return result;
  return{id:candidate?.id||null,provider:candidate?.provider||null,platform:candidate?.platform||null,outcome:"UNSUPPORTED_CANDIDATE",metadataAvailable:false,sourcePageReachable:false,embedPageReachable:false,technicalReady:false,permissionConfirmed:false,humanPlaybackConfirmed:false,promotionAllowed:false};
}
export async function runEmbedResearchPreflight(candidates=[],opts={}){
  const rows=[];for(const candidate of candidates||[])rows.push(await preflightEmbedResearchCandidate(candidate,opts));
  return{
    generatedAt:new Date().toISOString(),total:rows.length,technicalReady:rows.filter(x=>x.technicalReady).length,
    partial:rows.filter(x=>x.outcome==="PARTIAL_TECHNICAL_EVIDENCE").length,failed:rows.filter(x=>x.outcome==="TECHNICAL_PREFLIGHT_FAILED").length,
    unsupported:rows.filter(x=>x.outcome==="UNSUPPORTED_CANDIDATE").length,rows,
    note:"Research-only preflight. No result can promote a source without deployed-origin human playback and explicit provider/per-video review."
  };
}
