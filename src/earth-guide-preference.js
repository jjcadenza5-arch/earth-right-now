const norm=q=>String(q||"").toLowerCase().trim();
export function earthGuidePreferenceAction(query,{placeId=null}={}){
 const q=norm(query);if(!q)return null;
 if(/(?:less expensive|cheaper|lower price|budget)/.test(q))return{type:"PRICE",placeId};
 if(/(?:quieter|more peaceful|less busy|less crowded)/.test(q))return{type:"QUIET",placeId};
 return null;
}
export function earthGuidePreferenceReply(action,{hasVerifiedPriceData=false,hasQuietEvidence=false}={}){
 if(action?.type==="PRICE")return hasVerifiedPriceData
  ?{canAnswer:true,text:"I can compare the verified price information currently connected to ERN."}
  :{canAnswer:false,text:"ERN does not have verified current price data for this yet. I won’t guess. I can still show you another nearby place or a different current window."};
 if(action?.type==="QUIET")return hasQuietEvidence
  ?{canAnswer:true,text:"I can use ERN’s current quietness evidence for this comparison."}
  :{canAnswer:false,text:"ERN does not have enough current evidence to say which place is quieter. I won’t guess. I can show you another place or a different current window instead."};
 return null;
}
