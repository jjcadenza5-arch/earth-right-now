import { EARTH_SIGNAL_TYPES, EARTH_SIGNAL_TTL_MINUTES, publicEarthSignal } from "./earth-signals.js";

export const EARTH_SIGNAL_API_VERSION="2026-09-25.v1";
export const EARTH_SIGNAL_API_CONTRACT=Object.freeze({
  version:EARTH_SIGNAL_API_VERSION,
  contributionPath:"/api/earth-signals",
  reportPath:"/api/earth-signals/:id/report",
  listPath:"/api/earth-signals?placeId=:placeId",
  serverTimestampRequired:true,
  ttlMinutes:EARTH_SIGNAL_TTL_MINUTES,
  freeTextAccepted:false,
  preciseCoordinatesAccepted:false,
  clientIdentityPublic:false,
  responseCache:"no-store"
});

function clean(value,max=120){
  const text=String(value??"").trim();
  return text?text.slice(0,max):null;
}

export function earthSignalSubmissionEnvelope(input={}, {knownPlaceIds=null}={}){
  const type=EARTH_SIGNAL_TYPES.includes(input.type)?input.type:null;
  const placeId=clean(input.placeId,120);
  if(!type||!placeId)return{ok:false,reason:"INVALID_SIGNAL"};
  if(knownPlaceIds&&!new Set([...knownPlaceIds].map(String)).has(placeId))return{ok:false,reason:"UNKNOWN_PLACE"};
  if(input.text!=null||input.message!=null||input.comment!=null)return{ok:false,reason:"FREE_TEXT_NOT_ACCEPTED"};
  if(input.lat!=null||input.latitude!=null||input.lon!=null||input.lng!=null||input.longitude!=null)return{ok:false,reason:"PRECISE_COORDINATES_NOT_ACCEPTED"};
  return{
    ok:true,
    request:{
      apiVersion:EARTH_SIGNAL_API_VERSION,
      type,
      placeId,
      placeLabel:clean(input.placeLabel,160),
      locationEvidence:input.locationPermission===true&&input.nearPlace===true?"NEAR_PLACE":"UNVERIFIED"
    },
    serverMustSet:["id","createdAt","storageExpiryAt"],
    serverMustIgnore:["createdAt","storageExpiryAt","id"]
  };
}

export function earthSignalServerRecord(request={}, {id,now=new Date()}={}){
  if(request.apiVersion!==EARTH_SIGNAL_API_VERSION)return{ok:false,reason:"UNSUPPORTED_API_VERSION"};
  const type=EARTH_SIGNAL_TYPES.includes(request.type)?request.type:null;
  const placeId=clean(request.placeId,120);
  const createdAt=now.toISOString();
  const recordId=clean(id,160);
  if(!recordId||!type||!placeId)return{ok:false,reason:"INVALID_SERVER_RECORD"};
  return{
    ok:true,
    record:{
      id:recordId,
      type,
      placeId,
      placeLabel:clean(request.placeLabel,160),
      locationEvidence:request.locationEvidence==="NEAR_PLACE"?"NEAR_PLACE":"UNVERIFIED",
      createdAt,
      storageExpiryAt:new Date(now.getTime()+EARTH_SIGNAL_TTL_MINUTES*60000).toISOString(),
      moderation:"STRUCTURED",
      reported:false
    }
  };
}

export function earthSignalPublicResponse(record={}){
  const publicSignal=publicEarthSignal(record);
  return{
    id:record.id||null,
    ...publicSignal,
    expiresAt:record.storageExpiryAt||null
  };
}
