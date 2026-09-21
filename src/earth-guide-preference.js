const norm=q=>String(q||"").toLowerCase().trim();
export function earthGuidePreferenceAction(query,{placeId=null}={}){
 const q=norm(query);if(!q)return null;
 if(/(?:less expensive|cheaper|lower price|budget)/.test(q))return placeId?{type:"PRICE",placeId}:null;
 if(/(?:quieter|more peaceful|less busy|less crowded)/.test(q))return placeId?{type:"QUIET",placeId}:null;
 return null;
}
export function earthGuidePreferenceReply(action,{hasVerifiedPriceData=false,hasQuietEvidence=false,placeTitle="this place"}={}){
 if(action?.type==="PRICE")return hasVerifiedPriceData
  ?{canAnswer:true,text:`I can compare the verified price information currently connected to ERN for ${placeTitle}.`}
  :{canAnswer:false,text:`ERN does not have verified current price data for ${placeTitle} yet. I won’t guess. I can still show another nearby place or a different current window.`};
 if(action?.type==="QUIET")return hasQuietEvidence
  ?{canAnswer:true,text:`I can use ERN’s current quietness evidence for ${placeTitle}.`}
  :{canAnswer:false,text:`ERN does not have enough current evidence to say whether another place is quieter than ${placeTitle}. I won’t guess. I can show another place or a different current window instead.`};
 return null;
}
