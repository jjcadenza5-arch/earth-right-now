const norm=q=>String(q||"").toLowerCase().trim();
export function earthGuidePreferenceAction(query,{placeId=null}={}){
 const q=norm(query);if(!q)return null;
 const type=/(?:less expensive|cheaper|lower price|budget)/.test(q)?"PRICE":/(?:quieter|more peaceful|less busy|less crowded)/.test(q)?"QUIET":null;
 if(!type)return null;
 return placeId?{type,placeId}:{type:"MISSING_CONTEXT",preference:type};
}
export function earthGuidePreferenceReply(action,{hasVerifiedPriceData=false,hasQuietEvidence=false,placeTitle="this place"}={}){
 if(action?.type==="MISSING_CONTEXT")return{canAnswer:false,text:"Open or search for a place first, then ask me to compare it. I need a place to anchor that comparison, so I won’t guess."};
 if(action?.type==="PRICE")return hasVerifiedPriceData
  ?{canAnswer:true,text:`I can compare the verified price information currently connected to ERN for ${placeTitle}.`}
  :{canAnswer:false,text:`ERN does not have verified current price data for ${placeTitle} yet. I won’t guess. I can still show another nearby place or a different current window.`};
 if(action?.type==="QUIET")return hasQuietEvidence
  ?{canAnswer:true,text:`I can use ERN’s current quietness evidence for ${placeTitle}.`}
  :{canAnswer:false,text:`ERN does not have enough current evidence to say whether another place is quieter than ${placeTitle}. I won’t guess. I can show another place or a different current window instead.`};
 return null;
}
