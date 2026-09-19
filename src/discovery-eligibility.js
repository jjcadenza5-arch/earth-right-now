import { recencyState } from "./source-recency.js";
import { allowedEmbedUrl } from "./embed-policy.js";
import { safeHttpUrl } from "./url-safety.js";

export function discoverableSource(source){
 if(!source||source.id==="recovery-placeholder"||source.health==="OFFLINE")return false;
 const external=safeHttpUrl(source.sourceUrl||source.officialUrl);
 if(source.permission==="LINK_ONLY"||source.playback==="EXTERNAL")return!!external;
 if(source.playback==="EMBED")return!!(source.embedUrl&&allowedEmbedUrl(source.embedUrl));
 if(source.playback==="IMAGE_REFRESH")return!!safeHttpUrl(source.sourceUrl);
 return!!external;
}
export function currentSource(source,options={}){return discoverableSource(source)&&source.health==="HEALTHY"&&source.permission!=="UNKNOWN"&&recencyState(source,options)==="CURRENT_CHECK"}
export function discoveryPool(sources){return sources.filter(discoverableSource)}
export function currentDiscoveryPool(sources,options={}){return sources.filter(source=>currentSource(source,options))}
