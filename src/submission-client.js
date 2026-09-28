function safeEndpoint(raw){
  try{
    const u=new URL(String(raw||"").trim());
    if(u.protocol!=="https:"||u.username||u.password||!u.hostname)return null;
    return u.toString().replace(/\/$/,"");
  }catch{return null}
}
export function submissionClientConfig(raw={}){
  const endpoint=safeEndpoint(raw.endpoint||raw.endpointUrl||"");
  let submissionUrl=null;
  if(endpoint){
    const u=new URL(endpoint);
    submissionUrl=u.pathname.replace(/\/$/,"").endsWith("/api/submissions")?u.toString().replace(/\/$/,""):endpoint+"/api/submissions";
  }
  const enabled=Boolean(raw.enabled===true&&submissionUrl);
  return{enabled,endpoint,submissionUrl};
}
export function createSubmissionClient(raw={}){
  const config=submissionClientConfig(raw);
  return{
    config,
    async submit(record,{consent=false}={}){
      if(consent!==true)return{ok:false,reason:"CONSENT_REQUIRED"};
      if(!config.enabled)return{ok:false,disabled:true,reason:"SUBMISSION_TRANSPORT_DISABLED"};
      const r=await fetch(config.submissionUrl,{
        method:"POST",
        headers:{"content-type":"application/json"},
        credentials:"omit",
        cache:"no-store",
        body:JSON.stringify({...record,consent:true})
      });
      let body=null;try{body=await r.json()}catch{}
      return r.ok
        ?{ok:true,id:body?.id||null,status:body?.status||"PENDING_REVIEW",published:body?.published===true,expiresAt:body?.expiresAt||null}
        :{ok:false,status:r.status,reason:body?.reason||"REQUEST_FAILED",errors:body?.errors||[]};
    }
  };
}
