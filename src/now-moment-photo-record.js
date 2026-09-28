import {NOW_MOMENT_PHOTO_POLICY,nowMomentPhotoInput,nowMomentPhotoPublicRecord} from "./now-moment-photo-policy.js";

export function nowMomentPhotoServerRecord(input={},{
  id,
  objectKey,
  now=new Date(),
  knownPlaceIds=null
}={}){
  const placeId=String(input.placeId||"").trim();
  if(knownPlaceIds&&!new Set([...knownPlaceIds].map(String)).has(placeId))return{ok:false,reason:"UNKNOWN_PLACE"};
  const validation=nowMomentPhotoInput(input);
  if(!validation.ok)return{ok:false,reason:validation.issues[0],issues:validation.issues};
  const recordId=String(id||"").trim(),key=String(objectKey||"").trim();
  if(!recordId||!key)return{ok:false,reason:"SERVER_ID_REQUIRED"};
  const createdAt=now.toISOString();
  const storageExpiryAt=new Date(now.getTime()+NOW_MOMENT_PHOTO_POLICY.ttlMinutes*60000).toISOString();
  return{
    ok:true,
    record:{
      id:recordId,
      kind:"photo",
      placeId,
      placeLabel:String(input.placeLabel||"").trim().slice(0,160)||null,
      mimeType:String(input.mimeType),
      sourceBytes:Number(input.sourceBytes),
      storedBytes:Number(input.storedBytes),
      width:Number(input.width),
      height:Number(input.height),
      objectKey:key,
      metadataStripped:true,
      moderation:"PENDING",
      reported:false,
      createdAt,
      storageExpiryAt
    }
  };
}

export function nowMomentPhotoPublic(record={}){
  if(record.moderation!=="APPROVED"||record.reported===true)return null;
  return nowMomentPhotoPublicRecord(record);
}
