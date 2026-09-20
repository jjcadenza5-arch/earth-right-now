function safeUrl(value){
  try{
    const u=new URL(String(value||""));
    return u.protocol==="https:"&&!u.username&&!u.password?u:null;
  }catch{return null}
}

function sameHostFamily(a,b){
  const x=String(a||"").toLowerCase().replace(/^www\./,""),y=String(b||"").toLowerCase().replace(/^www\./,"");
  return Boolean(x&&y&&(x===y||x.endsWith("."+y)||y.endsWith("."+x)));
}

export function providerHostIntegrity(source){
  const sourceUrl=safeUrl(source?.sourceUrl),embedUrl=safeUrl(source?.embedUrl),officialUrl=safeUrl(source?.officialUrl),issues=[];
  if(source?.sourceUrl&&!sourceUrl)issues.push("UNSAFE_SOURCE_URL");
  if(source?.embedUrl&&!embedUrl)issues.push("UNSAFE_EMBED_URL");
  if(source?.officialUrl&&!officialUrl)issues.push("UNSAFE_OFFICIAL_URL");
  if(source?.playback==="EMBED"&&!embedUrl)issues.push("MISSING_SAFE_EMBED_URL");
  const sourceHost=sourceUrl?.hostname||null,embedHost=embedUrl?.hostname||null,officialHost=officialUrl?.hostname||null;
  const hosts=[sourceHost,embedHost,officialHost].filter(Boolean);
  const crossProvider=hosts.length>1&&hosts.some((host,i)=>hosts.slice(i+1).some(other=>!sameHostFamily(host,other)));
  const reviewRequired=issues.length>0||crossProvider;
  return{ok:issues.length===0,reviewRequired,issues,sourceHost,embedHost,officialHost,crossProvider};
}
