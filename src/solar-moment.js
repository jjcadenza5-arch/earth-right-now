const RAD=Math.PI/180;
function dayOfYear(d){const start=Date.UTC(d.getUTCFullYear(),0,0);return Math.floor((d.getTime()-start)/86400000)}
export function solarElevation(lat,lon,now=new Date()){
 if(!Number.isFinite(lat)||!Number.isFinite(lon)||!(now instanceof Date)||Number.isNaN(now.getTime()))return null;
 const n=dayOfYear(now),h=now.getUTCHours()+now.getUTCMinutes()/60+now.getUTCSeconds()/3600;
 const gamma=2*Math.PI/365*(n-1+(h-12)/24);
 const eq=229.18*(0.000075+0.001868*Math.cos(gamma)-0.032077*Math.sin(gamma)-0.014615*Math.cos(2*gamma)-0.040849*Math.sin(2*gamma));
 const dec=0.006918-0.399912*Math.cos(gamma)+0.070257*Math.sin(gamma)-0.006758*Math.cos(2*gamma)+0.000907*Math.sin(2*gamma)-0.002697*Math.cos(3*gamma)+0.00148*Math.sin(3*gamma);
 let minutes=h*60+eq+4*lon;minutes=((minutes%1440)+1440)%1440;
 const hourAngle=(minutes/4-180)*RAD,phi=lat*RAD;
 const sinEl=Math.sin(phi)*Math.sin(dec)+Math.cos(phi)*Math.cos(dec)*Math.cos(hourAngle);
 return Math.asin(Math.max(-1,Math.min(1,sinEl)))/RAD;
}
export function solarMoment(source,now=new Date()){
 const rawLat=source?.lat,rawLon=source?.lon;
 if(rawLat===null||rawLat===undefined||rawLat===""||rawLon===null||rawLon===undefined||rawLon==="")return{phase:"UNKNOWN",elevation:null,score:0,label:"Light unknown"};
 const lat=Number(rawLat),lon=Number(rawLon);
 const elevation=solarElevation(lat,lon,now);
 if(elevation===null)return{phase:"UNKNOWN",elevation:null,score:0,label:"Light unknown"};
 const later=solarElevation(lat,lon,new Date(now.getTime()+10*60000));
 const rising=later!==null&&later>elevation;
 if(elevation>=-6&&elevation<=6)return{phase:rising?"SUNRISE":"SUNSET",elevation,score:24,label:rising?"Sunrise window":"Sunset window"};
 if(elevation>6&&elevation<18)return{phase:rising?"MORNING_GOLDEN":"EVENING_GOLDEN",elevation,score:14,label:rising?"Morning light":"Evening light"};
 if(elevation>=18)return{phase:"DAY",elevation,score:6,label:"Daylight"};
 return{phase:"NIGHT",elevation,score:0,label:"Night"};
}
export function beautifulNowScore(source,now=new Date()){
 const sun=solarMoment(source,now),visual=Number(source?.quality)||0,moment=Number(source?.moment)||0;
 const scenic=(source?.categories||[]).some(x=>/Beautiful Earth|Cities|Harbour|Beaches|Mountains|Culture|Parks|Scenic/i.test(x))?8:0;
 return visual*.45+moment*.25+sun.score+scenic;
}
export function beautifulNow(sources,{limit=8,now=new Date()}={}){
 return [...(sources||[])].sort((a,b)=>beautifulNowScore(b,now)-beautifulNowScore(a,now)).slice(0,limit);
}
