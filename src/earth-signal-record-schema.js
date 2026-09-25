import {EARTH_SIGNAL_TYPES} from "./earth-signals.js";

export const EARTH_SIGNAL_RECORD_LIMITS=Object.freeze({
  id:160,
  placeId:120,
  placeLabel:160,
  reportReason:40
});

function boundedString(value,max,{required=false}={}){
  if(value==null||value==="")return required?null:"";
  const text=String(value);
  return text.length<=max?text:null;
}
function validIso(value){
  return typeof value==="string"&&Number.isFinite(Date.parse(value));
}

export function validateEarthSignalStoredRecord(record={}){
  const errors=[];
  if(!boundedString(record.id,EARTH_SIGNAL_RECORD_LIMITS.id,{required:true}))errors.push("INVALID_ID");
  if(!EARTH_SIGNAL_TYPES.includes(record.type))errors.push("INVALID_TYPE");
  if(!boundedString(record.placeId,EARTH_SIGNAL_RECORD_LIMITS.placeId,{required:true}))errors.push("INVALID_PLACE_ID");
  if(record.placeLabel!=null&&!boundedString(record.placeLabel,EARTH_SIGNAL_RECORD_LIMITS.placeLabel))errors.push("INVALID_PLACE_LABEL");
  if(!validIso(record.createdAt))errors.push("INVALID_CREATED_AT");
  if(!validIso(record.storageExpiryAt))errors.push("INVALID_EXPIRY_AT");
  if(validIso(record.createdAt)&&validIso(record.storageExpiryAt)&&Date.parse(record.storageExpiryAt)<=Date.parse(record.createdAt))errors.push("EXPIRY_NOT_AFTER_CREATION");
  if(!["NEAR_PLACE","UNVERIFIED"].includes(record.locationEvidence))errors.push("INVALID_LOCATION_EVIDENCE");
  if(record.reported!==true&&record.reported!==false)errors.push("INVALID_REPORTED_FLAG");
  if(!["STRUCTURED","APPROVED","PENDING"].includes(record.moderation))errors.push("INVALID_MODERATION");
  const forbidden=["lat","latitude","lon","lng","longitude","text","message","comment","email","ip","userAgent"];
  const forbiddenPresent=forbidden.filter(key=>record[key]!=null);
  if(forbiddenPresent.length)errors.push(...forbiddenPresent.map(key=>"FORBIDDEN_"+key.toUpperCase()));
  return{valid:errors.length===0,errors};
}

export function validateEarthSignalReportRecord(report={}){
  const errors=[];
  if(!boundedString(report.signalId,EARTH_SIGNAL_RECORD_LIMITS.id,{required:true}))errors.push("INVALID_SIGNAL_ID");
  if(!boundedString(report.reason,EARTH_SIGNAL_RECORD_LIMITS.reportReason,{required:true}))errors.push("INVALID_REASON");
  if(!validIso(report.createdAt))errors.push("INVALID_CREATED_AT");
  const allowed=["WRONG_PLACE","MISLEADING","PRIVACY","UNSAFE","SPAM"];
  if(report.reason&&!allowed.includes(report.reason))errors.push("UNSUPPORTED_REASON");
  const forbidden=["text","message","comment","email","ip","userAgent"];
  const forbiddenPresent=forbidden.filter(key=>report[key]!=null);
  if(forbiddenPresent.length)errors.push(...forbiddenPresent.map(key=>"FORBIDDEN_"+key.toUpperCase()));
  return{valid:errors.length===0,errors};
}
