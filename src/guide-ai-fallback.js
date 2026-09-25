export function guideAiFallback(reason,{query="",language="en",placeId=null}={}){
  return{
    mode:"DETERMINISTIC_ONLY",
    reason:String(reason||"GENERATIVE_UNAVAILABLE"),
    deterministicRequest:{query:String(query||""),language:String(language||"en"),placeId:placeId||null},
    visitorMessage:null,
    truth:"Generative failure is not a visitor-facing error by itself; ERN should continue through the existing deterministic Guide."
  };
}
