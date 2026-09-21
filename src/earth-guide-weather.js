import {interpretEarthIntent} from "./earth-intent.js";
export function earthGuideWeatherBoundary(query,result={}){
 const intent=interpretEarthIntent(query),weather=intent.intents.filter(x=>x==="snow"||x==="rain");
 if(!weather.length)return null;
 const current=result.nearNowCount||0;
 if(current>0)return{canClaimCurrent:true,text:`ERN has ${current} near-now ${weather[0]} view${current===1?"":"s"} supported by current evidence.`};
 return{canClaimCurrent:false,text:`ERN does not currently have verified near-now evidence for ${weather[0]} in these results. I can show the available windows, but I won’t claim the weather is happening now.`};
}
