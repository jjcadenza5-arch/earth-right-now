import { safePlaceFromHash,parseWindowHash,parsePlaceHash } from "./place-routing.js";
export function navigationState({hash="",places=[],registry=null}={}){
 const requestedPlaceId=parsePlaceHash(hash),place=safePlaceFromHash(hash,places),requestedWindowId=parseWindowHash(hash),source=requestedWindowId&&registry?.get?.(requestedWindowId);
 const sourcePlaceId=source?(source.placeId||source.id):null,placeMatchesSource=!requestedPlaceId||!source||requestedPlaceId===sourcePlaceId;
 return{requestedPlaceId,requestedWindowId,placeId:place?.id||null,windowId:source?.id||null,hasPlace:Boolean(place),hasWindow:Boolean(source),placeMatchesSource};
}
export function syncPlaceNavigation({hash="",places=[],registry=null,openPlace=()=>false,openWindow=()=>false,closePlace=()=>false}={}){
 const state=navigationState({hash,places,registry});
 if(state.windowId&&state.placeMatchesSource){if(state.placeId)openPlace(state.placeId,{writeHistory:false,recordRecent:false});return Boolean(openWindow(registry.get(state.windowId),{surface:"shared-window"}))}
 if(state.placeId)return Boolean(openPlace(state.placeId,{writeHistory:false,recordRecent:false}));
 closePlace({writeHistory:false,restoreFocus:false});return false;
}
