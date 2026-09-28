export const NOW_MOMENT_PHOTO_API=Object.freeze({
  uploadPath:"/api/now-moments/photos",
  listPath:"/api/now-moments/photos?placeId=:placeId",
  mediaPath:"/api/now-moments/photos/:id/media",
  reportPath:"/api/now-moments/photos/:id/report",
  contentType:"application/octet-stream",
  requestMetadataHeaders:Object.freeze([
    "x-ern-place-id",
    "x-ern-place-label",
    "x-ern-photo-mime",
    "x-ern-photo-source-bytes",
    "x-ern-photo-stored-bytes",
    "x-ern-photo-width",
    "x-ern-photo-height"
  ]),
  originalFilenameAccepted:false,
  freeTextAccepted:false,
  preciseCoordinatesAccepted:false,
  responseCache:"no-store"
});

export function nowMomentPhotoUploadHeaders(meta={}){
  const headers={
    "content-type":"application/octet-stream",
    "x-ern-place-id":String(meta.placeId||""),
    "x-ern-place-label":String(meta.placeLabel||"").slice(0,160),
    "x-ern-photo-mime":String(meta.mimeType||""),
    "x-ern-photo-source-bytes":String(Number(meta.sourceBytes)||0),
    "x-ern-photo-stored-bytes":String(Number(meta.storedBytes)||0),
    "x-ern-photo-width":String(Number(meta.width)||0),
    "x-ern-photo-height":String(Number(meta.height)||0)
  };
  return headers;
}
