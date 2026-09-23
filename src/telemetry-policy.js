const ALLOWED=new Set(["window_opened","place_opened","watch_earth_started","favorite_toggled","earth_search","external_source_opened"]);
function clean(data={}){
 const out={};for(const [k,v] of Object.entries(data||{})){if(!["sourceId","placeId","truth","playback","provider","length"].includes(k))continue;if(typeof v==="number")out[k]=Math.max(0,Math.min(v,1000));else if(typeof v==="string")out[k]=v.slice(0,120)}
 return out;
}
export function telemetryEnvelope(name,data={},at=new Date().toISOString()){
 if(!ALLOWED.has(name))return null;return{name,data:clean(data),at};
}
export function telemetryPolicy(){return{defaultEnabled:false,allowedEvents:[...ALLOWED],forbidden:["precise location","search text","contact email","business submission fields","My Earth favorites/recents"]}}
