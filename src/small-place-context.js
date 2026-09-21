import {smallPlaceSignals} from "./small-place-discovery.js";
export function smallPlaceContext(place={}){
 const sources=place.sources?.length?place.sources:[place],worth=sources.some(s=>smallPlaceSignals(s).discoveryWorth);
 return worth?"A lesser-known place worth a look":""; 
}
