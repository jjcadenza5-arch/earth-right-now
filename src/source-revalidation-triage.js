import {buildRevalidationQueue} from "./revalidation-queue.js";
import {staleMaintenanceClass} from "./stale-maintenance-class.js";
function byId(report,key="results"){return new Map((report?.[key]||[]).filter(x=>x?.id).map(x=>[String(x.id),x]))}
export function sourceRevalidationTriage(sources=[],{availability=null,continuity=null,limit=20}={}){
  const availabilityMap=byId(availability),continuityMap=byId(continuity,"rows");
  const items=buildRevalidationQueue(sources).map(entry=>{
    const s=entry.source,a=availabilityMap.get(String(s.id))||null,c=continuityMap.get(String(s.id))||null;
    const staleClass=staleMaintenanceClass(s);
    let lane="UNSAMPLED_RECHECK",action=staleClass.action,urgency=staleClass.urgency;
    if(s.featuredHold===true){lane="CURATION_HOLD";action="KEEP_DEFERRED_UNTIL_HOLD_REMOVED";urgency=0}
    else if(String(s.failureReason||"").startsWith("OFFICIAL_COLLECTION_WEBCAMS_OFFLINE_")){lane="DEFERRED_PROVIDER_OFFLINE";action="RECHECK_PROVIDER_COLLECTION_LATER";urgency=15}
    else if(String(s.failureReason||"").startsWith("VISITOR_PLAYBACK_REJECTED_")){lane="DEFERRED_PLAYBACK_REPROVE";action="REPROVE_ONLY_AFTER_PRIMARY_RECOVERY_OR_EXPLICIT_REVIEW";urgency=25}
    else if(s.permission==="UNKNOWN"){lane="PERMISSION_REVIEW";action="REVIEW_PERMISSION_BEFORE_PLAYBACK";urgency=100}
    else if(s.health==="DEGRADED"||s.health==="UNKNOWN"){lane="HUMAN_MEDIA_REVIEW";action="REVIEW_CURRENT_MEDIA_AND_SOURCE";urgency=90}
    else if(c?.state==="PERSISTENT_MISSING_REVIEW"||a?.outcome==="PAGE_MISSING"){lane="MANUAL_SOURCE_REVIEW";action="VERIFY_PROVIDER_PAGE_OR_REPLACEMENT";urgency=85}
    else if(a?.outcome==="ACCESS_BLOCKED"){lane="ACCESS_LIMITED";action="REVIEW_PROVIDER_ACCESS_PATTERN";urgency=50}
    else if(["TEMPORARY_ERROR","TIMEOUT","NETWORK_ERROR"].includes(a?.outcome)){lane="RETRY_LATER";action="RETRY_NETWORK_CHECK";urgency=20}
    else if(a?.outcome==="PAGE_REACHABLE"){lane="EDITORIAL_RECHECK";action="REVIEW_PAGE_CURRENTNESS_WITHOUT_INFERRING_LIVE";urgency=40}
    else if(!a){
      if(s.playback==="EMBED"){lane="DEPLOYED_PLAYBACK_RECHECK";action="RECHECK_DEPLOYED_PLAYBACK_AND_PROVIDER_PAGE";urgency=65}
      else if(s.truth==="LIVE_IMAGE"||s.playback==="IMAGE_REFRESH"){lane="CURRENT_IMAGE_RECHECK";action="VERIFY_CURRENT_IMAGE_REFRESH_AND_PROVIDER_PAGE";urgency=55}
      else {lane="EDITORIAL_RECHECK";action="VERIFY_PROVIDER_PAGE_STILL_PRESENTS_CURRENT_LIVE_SOURCE";urgency=40}
    }
    return{
      id:s.id,title:s.title,provider:s.provider||null,health:s.health,permission:s.permission,playback:s.playback,
      queuePriority:entry.priority,reason:entry.reason,maintenanceClass:staleClass.class,lane,action,urgency,
      availabilityOutcome:a?.outcome||null,continuityState:c?.state||null,
      sourceUrl:s.sourceUrl||null,embedUrl:s.embedUrl||null,
      catalogMutationAllowed:false,automaticHealthChangeAllowed:false,availabilityProvesLive:false
    };
  }).sort((a,b)=>b.urgency-a.urgency||b.queuePriority-a.queuePriority||String(a.id).localeCompare(String(b.id)));
  const count=lane=>items.filter(x=>x.lane===lane).length;
  return{
    generatedAt:new Date().toISOString(),total:items.length,
    summary:{
      permissionReview:count("PERMISSION_REVIEW"),
      humanMediaReview:count("HUMAN_MEDIA_REVIEW"),
      manualSourceReview:count("MANUAL_SOURCE_REVIEW"),
      editorialRecheck:count("EDITORIAL_RECHECK"),
      deployedPlaybackRecheck:count("DEPLOYED_PLAYBACK_RECHECK"),
      currentImageRecheck:count("CURRENT_IMAGE_RECHECK"),
      accessLimited:count("ACCESS_LIMITED"),
      retryLater:count("RETRY_LATER"),
      deferredPlaybackReprove:count("DEFERRED_PLAYBACK_REPROVE"),
      deferredProviderOffline:count("DEFERRED_PROVIDER_OFFLINE"),
      curationHold:count("CURATION_HOLD"),
      unsampled:count("UNSAMPLED_RECHECK")
    },
    immediate:items.filter(x=>x.urgency>=80).slice(0,limit),
    routine:items.filter(x=>x.urgency<80).slice(0,limit),
    items:items.slice(0,limit),
    safety:{catalogMutationAllowed:false,automaticHealthChangeAllowed:false,availabilityProvesLive:false},
    note:"Read-only triage. Unsampled stale/expired sources are still routed by evidence need: deployed playback for embeds, current-image verification for LIVE_IMAGE, and editorial provider-page review for external sources. Reachability alone never proves live playback."
  };
}
