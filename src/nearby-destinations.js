function finite(n){return Number.isFinite(n)}
export function destinationCentroid(place){
 const sources=(place?.sources||[]).filter(s=>finite(s.lat)&&finite(s.lon));
 if(sources.length){return{lat:sources.reduce((n,s)=>n+s.lat,0)/sources.length,lon:sources.reduce((n,s)=>n+s.lon,0)/sources.length}}
 return finite(place?.lat)&&finite(place?.lon)?{lat:place.lat,lon:place.lon}:null;
}
export function distanceKm(a,b){
 if(!a||!b)return Infinity;const rad=x=>x*Math.PI/180,R=6371,dLat=rad(b.lat-a.lat),dLon=rad(b.lon-a.lon),x=Math.sin(dLat/2)**2+Math.cos(rad(a.lat))*Math.cos(rad(b.lat))*Math.sin(dLon/2)**2;return 2*R*Math.asin(Math.min(1,Math.sqrt(x)));
}
export function nearbyDestinations(origin,places,{limit=6,maxKm=250}={}){
 const from=destinationCentroid(origin);if(!from)return[];
 return places.filter(p=>p?.id!==origin?.id).map(place=>({place,distanceKm:distanceKm(from,destinationCentroid(place))})).filter(x=>Number.isFinite(x.distanceKm)&&x.distanceKm<=maxKm).sort((a,b)=>a.distanceKm-b.distanceKm).slice(0,Math.max(0,limit));
}
