import { solarMoment,beautifulNowScore } from "./solar-moment.js";
const CITY=/Cities|Harbour|Skyline|Landmark|Urban|Culture/i;
export function nightCityEligible(s,now=new Date()){
 const sun=solarMoment(s,now);
 return sun.phase==="NIGHT"&&(s.categories||[]).some(x=>CITY.test(x));
}
export function watchEarthBeautyScore(s,now=new Date()){
 const sun=solarMoment(s,now),base=beautifulNowScore(s,now);
 if(sun.phase==="NIGHT")return nightCityEligible(s,now)?base+22:base-28;
 if(sun.phase==="SUNRISE"||sun.phase==="SUNSET")return base+18;
 if(sun.phase==="MORNING_GOLDEN"||sun.phase==="EVENING_GOLDEN")return base+10;
 return base;
}
export function beautifulWatchEarth(sources,{limit=20,now=new Date()}={}){
 return [...(sources||[])].sort((a,b)=>watchEarthBeautyScore(b,now)-watchEarthBeautyScore(a,now)).slice(0,limit);
}
