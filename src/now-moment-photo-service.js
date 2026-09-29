import {nowMomentPhotoActivation} from "./now-moment-photo-capabilities.js";
import {nowMomentPhotoServerRecord,nowMomentPhotoPublic} from "./now-moment-photo-record.js";
import {nowMomentMetadataScan,nowMomentImageDimensions} from "./now-moment-photo-metadata.js";
import {assertNowMomentPhotoMetadataStore,assertNowMomentPhotoObjectStore} from "./now-moment-photo-storage-contract.js";

function requireReady(capabilities){
  const a=nowMomentPhotoActivation(capabilities);
  if(!a.ready)throw Object.assign(new Error("NOW_MOMENT_PHOTO_NOT_ACTIVATED"),{code:"NOW_MOMENT_PHOTO_NOT_ACTIVATED",missing:a.missing});
}
function subjectOk(subject){return typeof subject==="string"&&/^anon_[A-Za-z0-9_-]{8,}$/.test(subject)}

export async function createNowMomentPhoto(input={},context={}){
  requireReady(context.capabilities);
  const metadata=assertNowMomentPhotoMetadataStore(context.metadataStore);
  const objects=assertNowMomentPhotoObjectStore(context.objectStore);
  if(!subjectOk(context.rateSubject))return{ok:false,stage:"RATE_LIMIT",reason:"RATE_SUBJECT_REQUIRED"};
  if(typeof context.rateLimiter?.commit!=="function")throw Object.assign(new Error("PHOTO_RATE_LIMITER_REQUIRED"),{code:"PHOTO_RATE_LIMITER_REQUIRED"});
  const bytes=input.bytes instanceof Uint8Array?input.bytes:new Uint8Array(input.bytes||[]);
  if(Number(input.storedBytes)!==bytes.byteLength)return{ok:false,stage:"VALIDATION",reason:"STORED_SIZE_MISMATCH"};
  const scan=nowMomentMetadataScan(bytes,input.mimeType);
  if(!scan.ok)return{ok:false,stage:"METADATA",reason:scan.issues[0],issues:scan.issues};
  const dimensions=nowMomentImageDimensions(bytes,input.mimeType);
  if(!dimensions.ok)return{ok:false,stage:"VALIDATION",reason:dimensions.reason};
  if(Number(input.width)!==dimensions.width||Number(input.height)!==dimensions.height)return{ok:false,stage:"VALIDATION",reason:"IMAGE_DIMENSIONS_MISMATCH",actual:{width:dimensions.width,height:dimensions.height}};
  const now=context.now instanceof Date?context.now:new Date();
  const record=nowMomentPhotoServerRecord({...input,metadataStripped:true},{id:context.id,objectKey:context.objectKey,now,knownPlaceIds:context.knownPlaceIds});
  if(!record.ok)return{ok:false,stage:"VALIDATION",...record};
  const committed=await context.rateLimiter.commit({subject:context.rateSubject,placeId:record.record.placeId,action:"PHOTO",now});
  if(!committed?.allowed)return{ok:false,stage:"RATE_LIMIT",reason:committed?.reason||"RATE_LIMIT"};
  await objects.put(record.record.objectKey,bytes,{contentType:record.record.mimeType});
  try{await metadata.put(record.record)}
  catch(error){try{await objects.delete(record.record.objectKey)}catch{}throw error}
  return{ok:true,record:record.record,public:null,rate:{remaining:committed.remaining},moderationRequired:true};
}

export async function listNowMomentPhotos({placeId=null}={},context={}){
  requireReady(context.capabilities);
  const metadata=assertNowMomentPhotoMetadataStore(context.metadataStore);
  const rows=await metadata.list({placeId,now:context.now instanceof Date?context.now:new Date()});
  return{ok:true,photos:rows.map(nowMomentPhotoPublic).filter(Boolean)};
}

export async function reviewNowMomentPhoto({id,decision}={},context={}){
  requireReady(context.capabilities);
  if(!["APPROVED","REJECTED"].includes(decision))return{ok:false,reason:"INVALID_REVIEW_DECISION"};
  const metadata=assertNowMomentPhotoMetadataStore(context.metadataStore);
  const objects=assertNowMomentPhotoObjectStore(context.objectStore);
  const current=await metadata.get(id);
  if(!current)return{ok:false,reason:"PHOTO_NOT_FOUND"};
  const now=context.now instanceof Date?context.now:new Date();
  if(Date.parse(current.storageExpiryAt)<=now.getTime())return{ok:false,reason:"PHOTO_EXPIRED"};
  if(decision==="REJECTED"){
    await objects.delete(current.objectKey);
    await metadata.update(id,{moderation:"REJECTED",reported:false});
    return{ok:true,id,moderation:"REJECTED",public:null};
  }
  const updated=await metadata.update(id,{moderation:"APPROVED",reported:false});
  return{ok:true,id,moderation:"APPROVED",public:nowMomentPhotoPublic(updated)};
}

export async function reportNowMomentPhoto({id}={},context={}){
  requireReady(context.capabilities);
  const metadata=assertNowMomentPhotoMetadataStore(context.metadataStore);
  const current=await metadata.get(id);
  if(!current)return{ok:false,reason:"PHOTO_NOT_FOUND"};
  await metadata.update(id,{reported:true,moderation:"REVIEW"});
  return{ok:true,id,visible:false};
}

export async function cleanupNowMomentPhotos(context={}){
  requireReady(context.capabilities);
  const metadata=assertNowMomentPhotoMetadataStore(context.metadataStore);
  const objects=assertNowMomentPhotoObjectStore(context.objectStore);
  const now=context.now instanceof Date?context.now:new Date(),expired=await metadata.listExpired({now});
  let deleted=0;const failed=[];
  for(const r of expired||[]){
    try{
      await objects.delete(r.objectKey);
      await metadata.delete(r.id);
      deleted++;
    }catch(error){failed.push({id:r.id,reason:String(error?.code||error?.message||"DELETE_FAILED")})}
  }
  return{ok:failed.length===0,deleted,failed};
}
