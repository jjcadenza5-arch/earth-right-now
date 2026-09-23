import {interpretEarthIntent} from "./earth-intent.js";import {guideFormat} from "./earth-guide-l10n.js";
export function earthGuideWeatherBoundary(query,result={},options={}){
 const language=options.language||"en",intent=interpretEarthIntent(query),weather=intent.intents.filter(x=>x==="snow"||x==="rain");
 if(!weather.length)return null;
 const condition=weather[0],currentWindows=result.nearNowCount||0,verifiedWeather=result.verifiedWeatherCount||0;
 if(verifiedWeather>0)return{canClaimCurrent:true,text:guideFormat("weatherYes",{count:verifiedWeather,plural:verifiedWeather===1?"":"s",condition},language)};
 if(currentWindows>0)return{canClaimCurrent:false,text:guideFormat("weatherNear",{count:currentWindows,plural:currentWindows===1?"":"s",condition},language)};
 return{canClaimCurrent:false,text:guideFormat("weatherNo",{condition},language)};
}
