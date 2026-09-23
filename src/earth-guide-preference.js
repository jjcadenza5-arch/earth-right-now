import { guideCopy,guideFormat } from "./earth-guide-l10n.js";
const norm=q=>String(q||"").toLowerCase().trim();
export function earthGuidePreferenceAction(query,{placeId=null}={}){
 const q=norm(query);if(!q)return null;
 const type=/(?:less expensive|cheaper|lower price|budget)/.test(q)?"PRICE":/(?:quieter|more peaceful|less busy|less crowded)/.test(q)?"QUIET":null;
 if(!type)return null;
 return placeId?{type,placeId}:{type:"MISSING_CONTEXT",preference:type};
}
export function earthGuidePreferenceReply(action,{hasVerifiedPriceData=false,hasQuietEvidence=false,placeTitle="this place",language="en"}={}){
 const copy=guideCopy(language);
 if(action?.type==="MISSING_CONTEXT")return{canAnswer:false,text:copy.missingContext};
 if(action?.type==="PRICE")return hasVerifiedPriceData
  ?{canAnswer:true,text:guideFormat("priceYes",{place:placeTitle},language)}
  :{canAnswer:false,text:guideFormat("priceNo",{place:placeTitle},language)};
 if(action?.type==="QUIET")return hasQuietEvidence
  ?{canAnswer:true,text:guideFormat("quietYes",{place:placeTitle},language)}
  :{canAnswer:false,text:guideFormat("quietNo",{place:placeTitle},language)};
 return null;
}
