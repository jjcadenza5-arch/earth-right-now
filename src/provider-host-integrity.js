function safeUrl(value){
  try{
    const u=new URL(String(value||""));
    return u.protocol==="https:"&&!u.username&&!u.password?u:null;
  }catch{return null}
}

function rootHost(host){
  const h=String(host||"").toLowerCase().replace(/^www\./,"");
  const parts=h.split(".");
  return parts.length>2?parts.slice(-2).join("."):h;
}

export function providerHostIntegrity(source){
  const sourceUrl=safeUrl(source?.sourceUrl);
  const embedUrl=safeUrl(source?.embedUrl);
  const officialUrl=safeUrl(source?.officialUrl);
  const issues=[];
  if(source?.sourceUrl&&!sourceUrl)issues.push("UNSAFE_SOURCE_URL");
  if(source?.embedUrl&&!embedUrl)issues.push("UNSAFE_EMBED_URL");
  if(source?.officialUrl&&!officialUrl)issues.push("UNSAFE_OFFICIAL_URL");
  if(source?.playback==="EMBED"&&!embedUrl)issues.push("MISSING_SAFE_EMBED_URL");
  const sourceHost=sourceUrl?.hostname||null;
  const embedHost=embedUrl?.hostname||null;
  const officialHost=officialUrl?.hostname||null;
  const roots=[sourceHost,embedHost,officialHost].filter(Boolean).map(rootHost);
  const crossProvider=roots.length>1&&new Set(roots).size>1;
  const reviewRequired=issues.length>0||crossProvider;
  return{ok:issues.length===0,reviewRequired,issues,sourceHost,embedHost,officialHost,crossProvider};
}
