export const EARTH_SIGNAL_MEDIA_POLICY=Object.freeze({
 photo:Object.freeze({enabled:false,ttlMinutes:45,stripMetadata:true}),
 video:Object.freeze({enabled:false,ttlMinutes:45,maxSeconds:15,stripMetadata:true})
});
export function earthSignalMediaPolicy(kind){return EARTH_SIGNAL_MEDIA_POLICY[kind]||null}
export function earthSignalMediaPublishable(media={}){
 const policy=earthSignalMediaPolicy(media.kind);
 return Boolean(policy?.enabled&&media.moderation==="APPROVED"&&media.storageExpiryAt&&media.metadataStripped===true);
}
export function earthSignalMediaPublicRecord(media={}){
 const policy=earthSignalMediaPolicy(media.kind);if(!policy)return null;
 return{kind:media.kind,placeId:media.placeId||null,placeLabel:media.placeLabel||null,createdAt:media.createdAt||null,nearPlaceVerified:media.locationEvidence==="NEAR_PLACE",temporary:true};
}
