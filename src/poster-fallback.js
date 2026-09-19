export function posterFailureState(source,{hadRemoteImage=false}={}){return{fallback:hadRemoteImage,kind:hadRemoteImage?"generated":"unchanged",reason:hadRemoteImage?"REMOTE_POSTER_FAILED":null,sourceId:source?.id||null}}
export function installPosterFallback(img,container,source,{fallbackClass}={}){
 if(!img||!container)return false;img.addEventListener?.("error",()=>{if(!img.isConnected)return;img.remove();container.classList?.remove("has-poster");container.classList?.add(fallbackClass||"poster-earth");container.setAttribute?.("data-poster-kind","generated");container.setAttribute?.("data-poster-fallback","true")},{once:true});return true;
}
