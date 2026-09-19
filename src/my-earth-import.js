import { loadFavorites,saveFavorites } from "./favorites.js";
import { loadFavoritePlaces,saveFavoritePlaces } from "./place-favorites.js";
import { loadRecentPlaces,saveRecentPlaces } from "./recent-places.js";
import { loadRecentWindows,saveRecentWindows } from "./recent-windows.js";
import { myEarthSnapshot,mergeMyEarthSnapshot } from "./my-earth-portability.js";

export function currentMyEarthSnapshot(){return myEarthSnapshot({favoritePlaceIds:[...loadFavoritePlaces()],favoriteWindowIds:[...loadFavorites()],recentPlaceIds:loadRecentPlaces(),recentWindowIds:loadRecentWindows()})}
export function restoreMyEarthData(incoming){
 const merged=mergeMyEarthSnapshot(currentMyEarthSnapshot(),incoming);if(!merged.ok)return merged;const d=merged.data;
 saveFavoritePlaces(new Set(d.favoritePlaceIds));saveFavorites(new Set(d.favoriteWindowIds));saveRecentPlaces(d.recentPlaceIds);saveRecentWindows(d.recentWindowIds);
 return{ok:true,data:d};
}
export async function importMyEarthFile(file,{maxBytes=128000}={}){
 if(!file||typeof file.text!=="function")return{ok:false,error:"Choose an ERN My Earth JSON file."};
 if(Number(file.size)>maxBytes)return{ok:false,error:"My Earth file is too large."};
 try{return restoreMyEarthData(JSON.parse(await file.text()))}catch{return{ok:false,error:"My Earth file is not valid JSON."}}
}
