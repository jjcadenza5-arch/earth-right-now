import { loadFavorites } from "./favorites.js";
import { loadFavoritePlaces } from "./place-favorites.js";
import { loadRecentPlaces } from "./recent-places.js";
import { loadRecentWindows } from "./recent-windows.js";
import { myEarthSnapshot } from "./my-earth-portability.js";

export function exportMyEarthData(){
 return myEarthSnapshot({favoritePlaceIds:[...loadFavoritePlaces()],favoriteWindowIds:[...loadFavorites()],recentPlaceIds:loadRecentPlaces(),recentWindowIds:loadRecentWindows()});
}
export function downloadMyEarthData(data=exportMyEarthData(),{documentRef=typeof document!=="undefined"?document:null,urlRef=typeof URL!=="undefined"?URL:null}={}){
 if(!documentRef||!urlRef?.createObjectURL)return false;
 const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"}),url=urlRef.createObjectURL(blob),a=documentRef.createElement("a");
 a.href=url;a.download="earth-right-now-my-earth.json";a.hidden=true;documentRef.body?.append?.(a);a.click?.();a.remove?.();urlRef.revokeObjectURL?.(url);return true;
}
