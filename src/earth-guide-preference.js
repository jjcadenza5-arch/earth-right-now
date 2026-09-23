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
  ?{canAnswer:true,text:language==="en"?"I can compare the verified price information currently connected to ERN for "+placeTitle+".":guideFormat("priceNo",{place:placeTitle},language).replace(/ยังไม่มีข้อมูลราคาปัจจุบันที่ตรวจสอบแล้วสำหรับ|hat für|ne dispose pas encore de prix actuels vérifiés pour|todavía no tiene precios actuales verificados para|について確認済みの現在価格はまだありません。|还没有 /,"")}
  :{canAnswer:false,text:guideFormat("priceNo",{place:placeTitle},language)};
 if(action?.type==="QUIET")return hasQuietEvidence
  ?{canAnswer:true,text:language==="en"?"I can use ERN’s current quietness evidence for "+placeTitle+".":guideFormat("quietNo",{place:placeTitle},language)}
  :{canAnswer:false,text:guideFormat("quietNo",{place:placeTitle},language)};
 return null;
}
