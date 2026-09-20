import { nearbyDestinations } from "./nearby-destinations.js";
export function distanceLabel(km){if(!Number.isFinite(km))return"";if(km<1)return Math.max(1,Math.round(km*1000))+" m away";if(km<10)return km.toFixed(1)+" km away";return Math.round(km)+" km away";}
export function nearbyDestinationViewModel(origin,places,options={}){return nearbyDestinations(origin,places,options).map(x=>({...x,distanceLabel:distanceLabel(x.distanceKm)}));}
