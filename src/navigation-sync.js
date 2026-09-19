import { safePlaceFromHash } from "./place-routing.js";
export function navigationState({hash="",places=[]}={}){
 const place=safePlaceFromHash(hash,places);
 return{placeId:place?.id||null,hasPlace:Boolean(place)};
}
export function syncPlaceNavigation({hash="",places=[],openPlace=()=>false,closePlace=()=>false}={}){
 const state=navigationState({hash,places});
 if(state.placeId)return Boolean(openPlace(state.placeId,{writeHistory:false,recordRecent:false}));
 closePlace({writeHistory:false});return false;
}
