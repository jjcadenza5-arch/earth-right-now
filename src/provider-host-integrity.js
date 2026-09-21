function privateHost(host){const h=String(host||"").toLowerCase().replace(/^\[|\]$/g,"");if(h==="localhost"||h.endsWith(".localhost")||h==="0.0.0.0"||h==="127.0.0.1"||h==="::1"||h==="::")return true;if(/^127\./.test(h)||/^10\./.test(h)||/^192\.168\./.test(h)||/^169\.254\./.test(h))return true;const m=h.match(/^172\.(\d+)\./);if(m&&Number(m[1])>=16&&Number(m[1])<=31)return true;if(/^fc|^fd|^fe8|^fe9|^fea|^feb/.test(h))return true;return false}
function safeUrl(value){
  try{
    const u=new URL(String(value||""));
    return u.protocol==="https:"&&!u.username&&!u.password&&u.hostname&&!privateHost(u.hostname)?u:null;
  }catch{return null}
}

function sameHostFamily(a,b){
  const x=String(a||"").toLowerCase().replace(/^www\./,""),y=String(b||"").toLowerCase().replace(/^www\./,"");
  if(!x||!y)return false;
  if(x===y)return true;
  const parent=(child,base)=>child.endsWith("."+base)&&base.includes(".")&&!/^(com|co|org|net|gov|ac)\.[a-z]{2}$/.test(base);
  return parent(x,y)||parent(y,x);
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
