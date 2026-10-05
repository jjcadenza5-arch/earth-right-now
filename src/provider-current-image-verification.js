function clean(v){return String(v||"").trim()}
function imageType(v){const s=clean(v).toLowerCase();return s.startsWith("image/")?s:null}
function timestampCandidates(value,out=[]){
  if(value==null)return out;
  if(typeof value==="string"){
    if(/^\d{4}-\d{2}-\d{2}t/i.test(value)&&Number.isFinite(Date.parse(value)))out.push(value);
    return out;
  }
  if(Array.isArray(value)){for(const v of value)timestampCandidates(v,out);return out}
  if(typeof value==="object"){
    for(const [k,v] of Object.entries(value)){
      if(/time|date|timestamp|updated|created|captured/i.test(k))timestampCandidates(v,out);
      else if(typeof v==="object")timestampCandidates(v,out);
    }
  }
  return out;
}
export function assessCurrentImageProbe(target,{image=null,metadata=null,now=new Date()}={}){
  const hasTarget=/^https:\/\//i.test(clean(target?.exactTargetUrl));
  const isCurrentImage=["PROVIDER_GENERATED_CURRENT_IMAGE","PROVIDER_AUTHORIZED_CURRENT_IMAGE"].includes(target?.integrationKind);
  if(!hasTarget||!isCurrentImage)return{state:"NOT_APPLICABLE",eligible:false};
  const status=Number(image?.status||0),type=imageType(image?.contentType),bytes=Number(image?.bytes||0);
  const imageOk=status>=200&&status<300&&!!type&&bytes>=1024;
  const stamps=timestampCandidates(metadata?.body||metadata?.json||null);
  let newest=null,ageMinutes=null;
  if(stamps.length){
    newest=stamps.sort((a,b)=>Date.parse(b)-Date.parse(a))[0];
    ageMinutes=(now.getTime()-Date.parse(newest))/60000;
  }
  const temporalEvidence=Number.isFinite(ageMinutes);
  const freshByMetadata=temporalEvidence&&ageMinutes>=-5&&ageMinutes<=180;
  return{
    state:!imageOk?"FETCH_OR_IMAGE_INVALID":freshByMetadata?"FETCH_OK_METADATA_CURRENT":"FETCH_OK_TEMPORAL_SAMPLE_REQUIRED",
    eligible:true,imageOk,status,contentType:type,bytes,
    etag:image?.etag||null,lastModified:image?.lastModified||null,cacheControl:image?.cacheControl||null,
    metadataOk:metadata?Number(metadata.status||0)>=200&&Number(metadata.status||0)<300:null,
    metadataNewestTimestamp:newest,metadataAgeMinutes:Number.isFinite(ageMinutes)?Math.round(ageMinutes*10)/10:null,
    automatedReviewPassed:imageOk&&(freshByMetadata||!metadata),
    catalogMutationAllowed:false,promotionAllowed:false,
    nextAction:!imageOk?"KEEP_RESEARCH_ONLY_AND_RECHECK_PROVIDER_TARGET":freshByMetadata?"RECORD_MACHINE_VERIFIED_CURRENT_IMAGE_EVIDENCE":"COLLECT_LATER_TEMPORAL_SAMPLE_OR_PROVIDER_METADATA"
  };
}
