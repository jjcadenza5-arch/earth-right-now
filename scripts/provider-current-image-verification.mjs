import {readFile} from "node:fs/promises";
import {assessCurrentImageProbe} from "../src/provider-current-image-verification.js";
const rows=JSON.parse(await readFile(new URL("../data/provider-generated-targets.json",import.meta.url),"utf8"));
const candidates=rows.filter(x=>/^https:\/\//i.test(String(x.exactTargetUrl||""))&&["PROVIDER_GENERATED_CURRENT_IMAGE","PROVIDER_AUTHORIZED_CURRENT_IMAGE"].includes(x.integrationKind));
async function get(url,{json=false}={}){
  const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),8000);
  try{
    const join=url.includes("?")?"&":"?";
    const res=await fetch(url+join+"_ern="+Date.now(),{redirect:"follow",cache:"no-store",signal:controller.signal,headers:{"user-agent":"EarthRightNow-Operations/1.0"}});
    const contentType=res.headers.get("content-type")||"";
    let body=null,bytes=0;
    if(json){try{body=await res.json()}catch{body=null}}
    else{const buf=await res.arrayBuffer();bytes=buf.byteLength}
    return{status:res.status,contentType,bytes,body,etag:res.headers.get("etag"),lastModified:res.headers.get("last-modified"),cacheControl:res.headers.get("cache-control")};
  }catch(error){return{status:0,contentType:null,bytes:0,error:String(error?.message||error)}}finally{clearTimeout(timer)}
}
const items=[];
for(const target of candidates){
  const image=await get(target.exactTargetUrl);
  const metadata=target.metadataUrl?await get(target.metadataUrl,{json:true}):null;
  items.push({id:target.id,provider:target.provider,sourceId:target.sourceId,exactTargetUrl:target.exactTargetUrl,metadataUrl:target.metadataUrl||null,...assessCurrentImageProbe(target,{image,metadata,now:new Date()})});
}
const invalid=items.filter(x=>x.state==="FETCH_OR_IMAGE_INVALID");
const report={generatedAt:new Date().toISOString(),total:items.length,invalid:invalid.length,machineCurrent:items.filter(x=>x.state==="FETCH_OK_METADATA_CURRENT").length,temporalSampleRequired:items.filter(x=>x.state==="FETCH_OK_TEMPORAL_SAMPLE_REQUIRED").length,state:invalid.length?"ATTENTION":"OK",items,safety:{catalogMutationAllowed:false,automaticPromotionAllowed:false}};
console.log(JSON.stringify(report,null,2));
