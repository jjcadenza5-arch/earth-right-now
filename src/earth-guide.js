import { interpretEarthIntent } from "./earth-intent.js";
import { guideCopy,guideFormat,guideIntentLabel } from "./earth-guide-l10n.js";

export function earthGuideReply(result,{tasteSignals=0,language="en"}={}){
 const q=String(result?.query||"").trim(),copy=guideCopy(language);
 if(!q)return{tone:"WELCOME",text:copy.welcome};
 const intent=interpretEarthIntent(q);
 if(result?.empty)return{tone:"EMPTY",text:intent.wantsCurrent?copy.emptyCurrent:copy.empty};
 const first=result.items?.[0],where=first?.title||first?.region||first?.country||"somewhere on Earth",weather=intent.intents.filter(i=>i==="snow"||i==="rain"),theme=(weather.length?weather:intent.intents).map(i=>guideIntentLabel(i,language)).slice(0,2).join(language==="ja"||language==="zh"?"、":" and ");
 const count=result.count||0,current=intent.wantsCurrent;
 const text=guideFormat("found",{count,current:current?(language==="en"?"current ":language==="th"?"ที่เป็นปัจจุบัน":language==="de"?"aktuelle ":language==="fr"?" actuelle":language==="es"?" actual":language==="ja"?"現在の":"当前"):"",plural:count===1?"":"s",theme:theme?(language==="en"?" for "+theme:language==="de"?" für "+theme:language==="fr"?" pour "+theme:language==="es"?" para "+theme:language==="ja"?"（"+theme+"）":language==="zh"?"，主题为"+theme:" สำหรับ "+theme):"",where},language)
  +(result.nearNowCount?guideFormat("nearNow",{count:result.nearNowCount,plural:result.nearNowCount===1?"":"s",verb:result.nearNowCount===1?"is":"are"},language):"")
  +(!current&&result.availableNonCurrentCount?guideFormat("unchecked",{count:result.availableNonCurrentCount,plural:result.availableNonCurrentCount===1?"":"s",verb:result.availableNonCurrentCount===1?"is":"are"},language):"")
  +(!current&&result.referenceCount?guideFormat("fallback",{count:result.referenceCount,plural:result.referenceCount===1?"":"s",verb:result.referenceCount===1?"is":"are"},language):"")
  +(tasteSignals?copy.personal:"");
 return{tone:"FOUND",text};
}
export function earthGuideFollowUps(result,{language="en"}={}){
 const copy=guideCopy(language);
 if(!result?.count)return[...copy.followEmpty];
 const intent=interpretEarthIntent(result.query),out=[];
 if(!intent.wantsCurrent)out.push(copy.follow[0]);
 if(!intent.intents.includes("beautiful"))out.push(copy.follow[1]);
 if(!intent.intents.includes("night")&&!intent.intents.includes("golden"))out.push(copy.follow[2]);
 out.push(copy.follow[3]);out.push(copy.follow[4]);return out.slice(0,3);
}
