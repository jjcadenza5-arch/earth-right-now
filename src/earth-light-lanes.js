import { currentSource } from "./discovery-eligibility.js";import { solarMoment,beautifulNowScore } from "./solar-moment.js";
const ORDER=["SUNRISE","SUNSET","MORNING_GOLDEN","EVENING_GOLDEN","DAY","NIGHT"];
const META={SUNRISE:["Near sunrise locally","The sun is near the horizon and rising locally."],SUNSET:["Near sunset locally","The sun is near the horizon and setting locally."],MORNING_GOLDEN:["Morning light","Low morning sun is possible locally."],EVENING_GOLDEN:["Evening light","Low evening sun is possible locally."],NIGHT:["Cities after dark","Nighttime locally."],DAY:["Beautiful daylight","Daylight locally."]};
export function earthLightLanes(sources,{now=new Date(),limitPerLane=4}={}){
 const groups=new Map(ORDER.map(x=>[x,[]]));
 for(const s of sources||[]){if(!currentSource(s,{now}))continue;const m=solarMoment(s,now);if(m.phase==="NIGHT"&&!/(Cities|Harbour|Skyline|Urban|Streets|Landmarks)/i.test((s.categories||[]).join(" ")))continue;if(groups.has(m.phase))groups.get(m.phase).push({...s,solar:m})}
 return ORDER.map(phase=>{const items=groups.get(phase).sort((a,b)=>beautifulNowScore(b,now)-beautifulNowScore(a,now)).slice(0,limitPerLane);return{phase,title:META[phase][0],note:META[phase][1],items}}).filter(x=>x.items.length);
}
export function lightLaneDisclaimer(){return"Light timing is based on solar geometry, not a claim about cloud cover or what the camera can see."}
