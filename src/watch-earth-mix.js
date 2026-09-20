import { solarMoment } from "./solar-moment.js";
import { nightCityEligible } from "./watch-earth-beauty.js";
const GOLDEN=new Set(["SUNRISE","SUNSET","MORNING_GOLDEN","EVENING_GOLDEN"]);
export function watchEarthLane(source,now=new Date()){
 const phase=solarMoment(source,now).phase;
 if(GOLDEN.has(phase))return"golden";
 if(phase==="DAY")return"daylight";
 if(phase==="NIGHT"&&nightCityEligible(source,now))return"nightCity";
 return"other";
}
export function balanceWatchEarthMoments(ranked=[],{limit=20,now=new Date(),minimums={golden:2,daylight:6,nightCity:2}}={}){
 const pool=(ranked||[]).filter(Boolean),target=Math.min(Math.max(0,limit),pool.length),out=[],used=new Set();
 const add=s=>{if(!s||used.has(s.id)||out.length>=target)return false;out.push(s);used.add(s.id);return true};
 for(const lane of ["golden","daylight","nightCity"]){
  let need=Math.max(0,Number(minimums?.[lane])||0);
  for(const s of pool){if(!need||out.length>=target)break;if(watchEarthLane(s,now)===lane&&add(s))need--}
 }
 for(const s of pool)add(s);
 return out;
}
