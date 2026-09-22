import { watchEarthLane } from "./watch-earth-mix.js";
function key(s){return s?.provider?String(s.provider).trim().toLowerCase():"unknown"}
export function interleaveWatchEarthProviders(items=[],{now=new Date()}={}){
 const pool=(items||[]).filter(Boolean),out=[],remaining=[...pool];let previous=null;
 while(remaining.length){const expectedLane=watchEarthLane(remaining[0],now);let index=remaining.findIndex(s=>watchEarthLane(s,now)===expectedLane&&key(s)!==previous);if(index<0)index=0;const [next]=remaining.splice(index,1);out.push(next);previous=key(next)}
 return out
}
