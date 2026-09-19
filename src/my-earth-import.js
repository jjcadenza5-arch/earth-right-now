import { loadFavorites,saveFavorites } from "./favorites.js";
import { loadFavoritePlaces,saveFavoritePlaces } from "./place-favorites.js";
import { loadRecentPlaces,saveRecentPlaces } from "./recent-places.js";
import { loadRecentWindows,saveRecentWindows } from "./recent-windows.js";
import { myEarthSnapshot,mergeMyEarthSnapshot } from "./my-earth-portability.js";
import { myEarthHygiene } from "./my-earth-hygiene.js";

export function currentMyEarthSnapshot(){return myEarthSnapshot({favoritePlaceIds:[...loadFavoritePlaces()],favoriteWindowIds:[...loadFavorites()],recentPlaceIds:loadRecentPlaces(),recentWindowIds:loadRecentWindows()})}
export function restoreMyEarthData(incoming,{validPlaceIds=null,validWindowIds=null}={}){
 const merged=mergeMyEarthSnapshot(currentMyEarthSnapshot(),incoming);if(!merged.ok)return merged;
 const audited=validPlaceIds&&validWindowIds?myEarthHygiene(merged.data,{validPlaceIds,validWindowIds}):{data:merged.data,removed:0,retired:0,duplicates:0,truncated:0},d=audited.data;
 saveFavoritePlaces(new Set(d.favoritePlaceIds));saveFavorites(new Set(d.favoriteWindowIds));saveRecentPlaces(d.recentPlaceIds);saveRecentWindows(d.recentWindowIds);
 return{ok:true,data:d,removed:audited.removed,retired:audited.retired,duplicates:audited.duplicates,truncated:audited.truncated};
}
export async function importMyEarthFile(file,{maxBytes=128000,validPlaceIds=null,validWindowIds=null}={}){
 if(!file||typeof file.text!=="function")return{ok:false,error:"Choose an ERN My Earth JSON file."};
 if(Number(file.size)>maxBytes)return{ok:false,error:"My Earth file is too large."};
 try{return restoreMyEarthData(JSON.parse(await file.text()),{validPlaceIds,validWindowIds})}catch{return{ok:false,error:"My Earth file is not valid JSON."}}
}
