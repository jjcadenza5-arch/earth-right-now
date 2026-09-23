import { interpretEarthIntent } from "./earth-intent.js";
const norm=q=>String(q||"").toLowerCase().normalize("NFC").trim();
const has=(q,terms)=>terms.some(x=>q.includes(x));
const SURPRISE=["surprise me","somewhere random","random window","never heard of","unexpected","สุ่ม","ไม่เคยรู้จัก","überrasche mich","noch nie gehört","surprenez-moi","jamais entendu","sorpréndeme","nunca he oído","おまかせ","聞いたことのない","随机看看","没听说过","從沒聽說過"];
const DIFFERENT=["completely different","somewhere different","something different","แตกต่างออกไป","ganz anders","völlig anderes","complètement différent","completamente diferente","まったく違う","完全不同"];
export function earthGuideAction(query){
 const q=norm(query),intent=interpretEarthIntent(q);
 if(has(q,SURPRISE))return{type:"SURPRISE"};
 if(has(q,DIFFERENT))return{type:"DIFFERENT"};
 if(/what(?: is|[’']s) good on earth right now/.test(q))return{type:"LIVE_NOW"};
 if(/^(?:show me )?(?:life|people|places) happening (?:on earth )?right now\??$/.test(q))return{type:"LIVE_NOW"};
 if(intent.wantsCurrent&&intent.intents.length===0)return{type:"LIVE_NOW"};
 if(/^(what(?: is|'s) happening|what can i see|show me earth) right now\??$/.test(q))return{type:"LIVE_NOW"};
 return{type:"SEARCH"};
}
export function differentFrom(items,current,{limit=8}={}){const country=current?.country,region=current?.region,place=current?.placeId||current?.id;const far=(items||[]).filter(s=>(s.placeId||s.id)!==place&&s.country!==country&&s.region!==region);const near=(items||[]).filter(s=>(s.placeId||s.id)!==place);return(far.length?far:near).slice(0,limit)}
