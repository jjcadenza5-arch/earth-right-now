function safeEndpoint(raw){
  try{
    const u=new URL(String(raw||"").trim());
    if(u.protocol!=="https:"||u.username||u.password||!u.hostname)return null;
    return u.toString().replace(/\/$/,"");
  }catch{return null}
}
export function earthSignalClientConfig(raw={}){
  const endpoint=safeEndpoint(raw.endpointUrl||raw.endpoint||"");
  const enabled=Boolean(raw.publicActivationAllowed===true&&endpoint);
  return{enabled,endpoint,mode:enabled?"CONTRIBUTION_ENABLED":"READ_ONLY"};
}
async function jsonFetch(url,options={}){
  const r=await fetch(url,{...options,headers:{"content-type":"application/json",...(options.headers||{})},credentials:"omit",cache:"no-store"});
  let body=null;try{body=await r.json()}catch{}
  return{ok:r.ok,status:r.status,body};
}
export function createEarthSignalClient(raw={}){
  const config=earthSignalClientConfig(raw);
  return{
    config,
    async list(placeId){
      if(!config.enabled)return{ok:false,disabled:true,reason:"EARTH_SIGNALS_READ_ONLY",signals:[]};
      const u=new URL(config.endpoint+"/api/earth-signals");if(placeId)u.searchParams.set("placeId",String(placeId));
      const r=await jsonFetch(u.toString(),{method:"GET"});
      return r.ok?{ok:true,signals:Array.isArray(r.body?.signals)?r.body.signals:[]}:{ok:false,status:r.status,reason:r.body?.reason||"REQUEST_FAILED",signals:[]};
    },
    async submit(input={}){
      if(!config.enabled)return{ok:false,disabled:true,reason:"EARTH_SIGNALS_READ_ONLY"};
      const r=await jsonFetch(config.endpoint+"/api/earth-signals",{method:"POST",body:JSON.stringify(input)});
      return r.ok?{ok:true,signal:r.body?.signal||null,retention:r.body?.retention||null}:{ok:false,status:r.status,reason:r.body?.reason||"REQUEST_FAILED"};
    },
    async report(signalId,reason){
      if(!config.enabled)return{ok:false,disabled:true,reason:"EARTH_SIGNALS_READ_ONLY"};
      const id=encodeURIComponent(String(signalId||""));
      if(!id)return{ok:false,reason:"SIGNAL_ID_REQUIRED"};
      const r=await jsonFetch(config.endpoint+`/api/earth-signals/${id}/report`,{method:"POST",body:JSON.stringify({reason})});
      return r.ok?{ok:true,visibility:r.body?.visibility||null}:{ok:false,status:r.status,reason:r.body?.reason||"REQUEST_FAILED"};
    }
  };
}
