import { guideCopy } from "./earth-guide-l10n.js";
const ENGLISH_PATTERNS=[
 {re:/^(?:what(?:['’]s| is)|show me|anything|what else is) nearby\??$/i,type:"NEARBY"},
 {re:/^(?:what(?:['’]s| is)|show me|anything|what else is) around here\??$/i,type:"NEARBY"},
 {re:/^what(?:['’]s| is) close by\??$/i,type:"NEARBY"},
 {re:/^(?:where (?:could|can|should) (?:i|we) stay|places? to stay|hotels? nearby|show me (?:places? to stay|hotels?)|anywhere (?:good )?to stay|where should we sleep|can (?:i|we) stay (?:here|there))\??$/i,type:"STAY"},
 {re:/^(?:what does (?:this|it) look like(?: (?:right )?now)?|what does it look like(?: (?:right )?now)?|show me (?:this|it|here|there) (?:right )?now|show me (?:right )?now|what can i see (?:here|there|now)|can i see (?:this|it|here|there) (?:right )?now|is there a current view|is (?:this|it) live(?: right now)?)\??$/i,type:"SEE_NOW"}
];
const norm=x=>String(x||"").toLowerCase().normalize("NFC").replace(/[?!.,，。！？¿¡]/g," ").replace(/\s+/g," ").trim();
const includesAny=(q,terms)=>terms.some(x=>q.includes(x));
const NEARBY=["nearby","around here","close by","ใกล้","in der nähe","in der naehe","à proximité","proche","cerca","近く","附近"];
const STAY=["where could i stay","where can i stay","where should we stay","places to stay","hotel","พักที่ไหน","ที่พัก","übernachten","loger","hébergement","alojarme","alojamiento","泊ま","住宿","住哪里","住哪裡","哪里可以住","哪裡可以住"];
const SEE_NOW=["show me now","look like now","current view","is this live","right now","แสดงตอนนี้","ดูตอนนี้","jetzt zeigen","jetzt ansehen","maintenant","voir maintenant","ahora","ver ahora","今を見る","今見","现在看看","現在看看"];
export function earthGuidePlaceAction(query,{placeId=null}={}){
 const raw=String(query||"").trim();if(!placeId||!raw)return null;
 const english=ENGLISH_PATTERNS.find(x=>x.re.test(raw));if(english)return{type:english.type,placeId};
 const q=norm(raw);
 if(includesAny(q,STAY))return{type:"STAY",placeId};
 if(includesAny(q,NEARBY))return{type:"NEARBY",placeId};
 if(includesAny(q,SEE_NOW))return{type:"SEE_NOW",placeId};
 return null;
}
export function earthGuidePlaceFollowUps(place,{language="en"}={}){if(!place?.id)return[];return[...guideCopy(language).placeFollow]}
export function earthGuideContextPlace(query,items=[]){
 const rows=(items||[]).filter(x=>x?.id);if(rows.length===1)return rows[0];
 const q=norm(query);if(!q)return null;
 const exact=rows.filter(x=>[x.title,x.region,x.country].some(v=>norm(v)===q));
 return exact.length===1?exact[0]:null;
}
