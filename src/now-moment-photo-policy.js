export const NOW_MOMENT_PHOTO_POLICY=Object.freeze({
  enabled:false,
  ttlMinutes:45,
  allowedMimeTypes:Object.freeze(["image/jpeg","image/png","image/webp"]),
  maxSourceBytes:5*1024*1024,
  maxStoredBytes:1536*1024,
  maxDimensionPx:1920,
  metadataStrippedRequired:true,
  moderationRequired:true,
  canonicalPlaceRequired:true,
  preciseCoordinatesStored:false,
  freeTextAccepted:false,
  automaticPublicationAllowed:false,
  videoEnabled:false
});

export function nowMomentPhotoPolicy(){return NOW_MOMENT_PHOTO_POLICY}

export function nowMomentPhotoInput(input={}){
  const mime=String(input.mimeType||"");
  const sourceBytes=Number(input.sourceBytes);
  const storedBytes=Number(input.storedBytes);
  const width=Number(input.width),height=Number(input.height);
  const placeId=String(input.placeId||"").trim();
  const issues=[];
  if(!NOW_MOMENT_PHOTO_POLICY.allowedMimeTypes.includes(mime))issues.push("UNSUPPORTED_MEDIA_TYPE");
  if(!Number.isFinite(sourceBytes)||sourceBytes<=0||sourceBytes>NOW_MOMENT_PHOTO_POLICY.maxSourceBytes)issues.push("SOURCE_SIZE_INVALID");
  if(!Number.isFinite(storedBytes)||storedBytes<=0||storedBytes>NOW_MOMENT_PHOTO_POLICY.maxStoredBytes)issues.push("STORED_SIZE_INVALID");
  if(!Number.isFinite(width)||!Number.isFinite(height)||width<1||height<1||Math.max(width,height)>NOW_MOMENT_PHOTO_POLICY.maxDimensionPx)issues.push("DIMENSIONS_INVALID");
  if(!placeId)issues.push("CANONICAL_PLACE_REQUIRED");
  if(input.metadataStripped!==true)issues.push("METADATA_NOT_STRIPPED");
  if(input.text!=null||input.caption!=null||input.comment!=null)issues.push("FREE_TEXT_NOT_ACCEPTED");
  if(input.lat!=null||input.lon!=null||input.latitude!=null||input.longitude!=null)issues.push("PRECISE_COORDINATES_NOT_ACCEPTED");
  return{ok:issues.length===0,issues};
}

export function nowMomentPhotoPublicRecord(record={}){
  return{
    id:record.id||null,
    kind:"photo",
    placeId:record.placeId||null,
    placeLabel:record.placeLabel||null,
    createdAt:record.createdAt||null,
    expiresAt:record.storageExpiryAt||null,
    temporary:true,
    verified:false,
    evidenceKind:"VISITOR_MEDIA",
    wording:"Visitor Now Moment · not independently verified"
  };
}
