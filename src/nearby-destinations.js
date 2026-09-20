import { discoverableSource,currentSource } from "./discovery-eligibility.js";
import { nearNowEvidence } from "./now-evidence.js";
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
 return places.filter(p=>p?.id!==origin?.id&&(!(p?.sources?.length)||(p.sources||[]).some(discoverableSource))).map(place=>{const sources=(place.sources||[]).filter(discoverableSource),nearNow=sources.some(s=>nearNowEvidence(s)),current=sources.some(s=>currentSource(s)),healthy=sources.some(s=>s.health==="HEALTHY");return{place,distanceKm:distanceKm(from,destinationCentroid(place)),current,healthy}}).filter(x=>Number.isFinite(x.distanceKm)&&x.distanceKm<=maxKm).sort((a,b)=>Number(b.nearNow)-Number(a.nearNow)||Number(b.current)-Number(a.current)||Number(b.healthy)-Number(a.healthy)||a.distanceKm-b.distanceKm).slice(0,Math.max(0,limit));
}
