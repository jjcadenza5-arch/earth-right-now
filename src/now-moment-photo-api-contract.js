export const NOW_MOMENT_PHOTO_API=Object.freeze({
  uploadPath:"/api/now-moments/photos",
  listPath:"/api/now-moments/photos?placeId=:placeId",
  mediaPath:"/api/now-moments/photos/:id/media",
  reportPath:"/api/now-moments/photos/:id/report",
  contentType:"application/octet-stream",
  requestMetadataHeaders:Object.freeze([
    "x-ern-place-id",
    "x-ern-photo-mime",
    "x-ern-photo-mime"
  ]),
  originalFilenameAccepted:false,
  placeLabelAccepted:false,
  freeTextAccepted:false,
  preciseCoordinatesAccepted:false,
  responseCache:"no-store"
});

export function nowMomentPhotoUploadHeaders(meta={}){
  const headers={
    "content-type":"application/octet-stream",
    "x-ern-place-id":String(meta.placeId||""),
    "x-ern-photo-mime":String(meta.mimeType||"")
  };
  return headers;
}
