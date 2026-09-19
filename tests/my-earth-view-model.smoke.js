import { reconcileMyEarth,myEarthAvailabilityCopy } from "../src/my-earth-view-model.js";
const available={id:"a"},unavailable={id:"b"},m={favoritePlaces:[],favoriteWindows:[available,unavailable],availableFavoriteWindows:[available],unavailableFavoriteWindows:[unavailable],recentPlaces:[],recentWindows:[available,unavailable],availableRecentWindows:[available]};
const v=reconcileMyEarth(m);console.assert(v.favoriteWindows.length===1&&v.favoriteWindows[0].id==="a","My Earth must not render unavailable favorite windows as playable");console.assert(v.recentWindows.length===1&&v.unavailableRecentCount===1);console.assert(myEarthAvailabilityCopy(v).startsWith("2 saved or recent windows"));
console.log("ERN My Earth availability smoke checks passed");
