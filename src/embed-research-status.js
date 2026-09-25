import { allowedEmbedUrl } from "./embed-policy.js";
export function embedResearchStatus(candidates=[]){
 const rows=(candidates||[]).map(x=>{
   const embedAllowed=Boolean(allowedEmbedUrl(x.candidateEmbedUrl));
   const blocked=x.status!=="APPROVED"||x.promotion!=="APPROVED_FOR_CATALOG"||x.playbackReview!=="HUMAN_PLAYBACK_CONFIRMED"||x.permissionReview!=="PER_VIDEO_EMBED_CONFIRMED";
   return{...x,embedPolicyAccepted:embedAllowed,blockedFromCatalog:blocked||!embedAllowed};
 });
 return{
   total:rows.length,
   platforms:[...new Set(rows.map(x=>x.platform).filter(Boolean))].sort(),
   providers:[...new Set(rows.map(x=>x.provider).filter(Boolean))].sort(),
   policyAccepted:rows.filter(x=>x.embedPolicyAccepted).length,
   approvedForCatalog:rows.filter(x=>!x.blockedFromCatalog).length,
   needsHumanPlayback:rows.filter(x=>x.playbackReview==="HUMAN_PLAYBACK_REQUIRED").map(x=>x.id),
   needsPerVideoPermissionReview:rows.filter(x=>x.permissionReview==="PER_VIDEO_EMBED_PERMISSION_REQUIRES_DEPLOYED_TEST").map(x=>x.id),
   next:rows.filter(x=>x.blockedFromCatalog&&x.playbackReview!=="HUMAN_PLAYBACK_FAILED").map(x=>({id:x.id,provider:x.provider,platform:x.platform,sourceUrl:x.sourceUrl,candidateEmbedUrl:x.candidateEmbedUrl,permissionReview:x.permissionReview,playbackReview:x.playbackReview})),
   deferredFailed:rows.filter(x=>x.playbackReview==="HUMAN_PLAYBACK_FAILED").map(x=>x.id),
   note:"Active research excludes approved/promoted and deployed-playback-failed candidates. Failed candidates remain deferred until a target/provider materially changes. Promotion still requires specific embed permission plus deployed-origin HUMAN_PLAYBACK."
 };
}
