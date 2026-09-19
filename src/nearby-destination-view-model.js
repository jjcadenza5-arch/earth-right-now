import { destinationCentroid,distanceKm } from "./nearby-destinations.js";
export function distanceLabel(km){
 if(!Number.isFinite(km))return"";
 if(km<1)return Math.max(1,Math.round(km*1000))+" m away";
 if(km<10)return km.toFixed(1)+" km away";
 return Math.round(km)+" km away";
}
export function nearbyDestinationViewModel(origin,places,options={}){
 const from=destinationCentroid(origin);if(!from)return[];
 const maxKm=options.maxKm??250,limit=options.limit??6;
 return places.filter(p=>p?.id!==origin?.id).map(place=>({place,distanceKm:distanceKm(from,destinationCentroid(place))})).filter(x=>Number.isFinite(x.distanceKm)&&x.distanceKm<=maxKm).sort((a,b)=>a.distanceKm-b.distanceKm).slice(0,Math.max(0,limit)).map(x=>({...x,distanceLabel:distanceLabel(x.distanceKm)}));
}
