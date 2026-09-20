import { loadFavorites } from "./favorites.js";
import { loadFavoritePlaces } from "./place-favorites.js";
import { loadRecentPlaces } from "./recent-places.js";
import { loadRecentWindows } from "./recent-windows.js";
import { discoverableSource } from "./discovery-eligibility.js";

export function buildMyEarth({sources,places},{now=new Date()}={}){
 const sourceFav=loadFavorites(),placeFav=loadFavoritePlaces(),recent=loadRecentPlaces(),recentWindows=loadRecentWindows(),placeMap=new Map((places||[]).map(p=>[p.id,p])),sourceMap=new Map((sources||[]).map(s=>[s.id,s]));
 const favoriteWindows=[...sourceFav].map(id=>sourceMap.get(id)).filter(Boolean),availableFavoriteWindows=favoriteWindows.filter(discoverableSource);
 const visitedWindows=recentWindows.map(id=>sourceMap.get(id)).filter(Boolean);
 return{
  favoritePlaces:[...placeFav].map(id=>placeMap.get(id)).filter(Boolean),
  favoriteWindows,
  availableFavoriteWindows,
  unavailableFavoriteWindows:favoriteWindows.filter(s=>!discoverableSource(s)),
  recentPlaces:recent.map(id=>placeMap.get(id)).filter(Boolean),
  recentWindows:visitedWindows,
  availableRecentWindows:visitedWindows.filter(discoverableSource),
  currentFavoriteWindows:favoriteWindows.filter(s=>discoverableSource(s)&&s.health==="HEALTHY"),
  generatedAt:now instanceof Date?now.toISOString():new Date(now).toISOString()
 };
}
export function myEarthCount(model){return model.favoritePlaces.length+model.favoriteWindows.length}
