import {interpretEarthIntent} from "./earth-intent.js";
export function earthGuideWeatherBoundary(query,result={}){
 const intent=interpretEarthIntent(query),weather=intent.intents.filter(x=>x==="snow"||x==="rain");
 if(!weather.length)return null;
 const condition=weather[0],currentWindows=result.nearNowCount||0,verifiedWeather=result.verifiedWeatherCount||0;
 if(verifiedWeather>0)return{canClaimCurrent:true,text:`ERN has ${verifiedWeather} current ${condition} observation${verifiedWeather===1?"":"s"} backed by explicit weather evidence.`};
 if(currentWindows>0)return{canClaimCurrent:false,text:`ERN has ${currentWindows} near-now window${currentWindows===1?"":"s"} matching this search, but a current camera does not by itself prove that ${condition} is happening. I can show the windows without claiming the weather condition.`};
 return{canClaimCurrent:false,text:`ERN does not currently have verified evidence that ${condition} is happening in these results. I can show the available windows, but I won’t claim the weather condition.`};
}
