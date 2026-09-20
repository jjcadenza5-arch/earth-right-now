import { watchEarthLane } from "./watch-earth-mix.js";
const ORDER=["golden","daylight","nightCity","other"];
export function arrangeWatchEarthJourney(sources,{now=new Date()}={}){
 const rows=(sources||[]).filter(Boolean);if(rows.length<3)return rows;
 const lanes=new Map(ORDER.map(x=>[x,[]]));for(const s of rows)(lanes.get(watchEarthLane(s,now))||lanes.get("other")).push(s);
 const out=[],used=new Set(),take=(lane)=>{const q=lanes.get(lane)||[];const s=q.shift();if(s&&!used.has(s.id)){out.push(s);used.add(s.id);return true}return false};
 while(out.length<rows.length){let moved=false;for(const lane of ORDER)moved=take(lane)||moved;if(!moved)break}
 for(const s of rows)if(!used.has(s.id))out.push(s);
 return out
}
