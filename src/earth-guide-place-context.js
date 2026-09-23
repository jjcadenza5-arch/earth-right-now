import { guideCopy } from "./earth-guide-l10n.js";
const PLACE_CONTEXT_PATTERNS=[
 {re:/^(?:what(?:['’]s| is)|show me|anything|what else is) nearby\??$/i,type:"NEARBY"},
 {re:/^(?:what(?:['’]s| is)|show me|anything|what else is) around here\??$/i,type:"NEARBY"},
 {re:/^what(?:['’]s| is) close by\??$/i,type:"NEARBY"},
 {re:/^(?:where (?:could|can|should) (?:i|we) stay|places? to stay|hotels? nearby|show me (?:places? to stay|hotels?)|anywhere (?:good )?to stay|where should we sleep|can (?:i|we) stay (?:here|there))\??$/i,type:"STAY"},
 {re:/^(?:what does (?:this|it) look like(?: (?:right )?now)?|what does it look like(?: (?:right )?now)?|show me (?:this|it|here|there) (?:right )?now|show me (?:right )?now|what can i see (?:here|there|now)|can i see (?:this|it|here|there) (?:right )?now|is there a current view|is (?:this|it) live(?: right now)?)\??$/i,type:"SEE_NOW"}
];
const norm=x=>String(x||"").toLowerCase().normalize("NFKD").replace(/[^a-z0-9\s]/g," ").replace(/\s+/g," ").trim();
export function earthGuidePlaceAction(query,{placeId=null}={}){
 const q=String(query||"").trim();if(!placeId||!q)return null;
 const hit=PLACE_CONTEXT_PATTERNS.find(x=>x.re.test(q));return hit?{type:hit.type,placeId}:null;
}
export function earthGuidePlaceFollowUps(place,{language="en"}={}){if(!place?.id)return[];return[...guideCopy(language).placeFollow]}
export function earthGuideContextPlace(query,items=[]){
 const rows=(items||[]).filter(x=>x?.id);if(rows.length===1)return rows[0];
 const q=norm(query);if(!q)return null;
 const exact=rows.filter(x=>[x.title,x.region,x.country].some(v=>norm(v)===q));
 return exact.length===1?exact[0]:null;
}
