const PLACE_CONTEXT_PATTERNS=[
 {re:/^(?:what(?:'s| is)|show me|anything) nearby\??$/i,type:"NEARBY"},
 {re:/^(?:where (?:could|can|should) (?:i|we) stay|places? to stay|hotels? nearby|show me (?:places? to stay|hotels?))\??$/i,type:"STAY"},
 {re:/^(?:what does it look like(?: now)?|show me (?:this|it) now|show me now|what can i see (?:here|now))\??$/i,type:"SEE_NOW"}
];
const norm=x=>String(x||"").toLowerCase().normalize("NFKD").replace(/[^a-z0-9\s]/g," ").replace(/\s+/g," ").trim();
export function earthGuidePlaceAction(query,{placeId=null}={}){
 const q=String(query||"").trim();if(!placeId||!q)return null;
 const hit=PLACE_CONTEXT_PATTERNS.find(x=>x.re.test(q));return hit?{type:hit.type,placeId}:null;
}
export function earthGuidePlaceFollowUps(place){
 if(!place?.id)return[];return["Show me now","What’s nearby?","Where could I stay?"];
}
export function earthGuideContextPlace(query,items=[]){
 const rows=(items||[]).filter(x=>x?.id);if(rows.length===1)return rows[0];
 const q=norm(query);if(!q)return null;
 const exact=rows.filter(x=>[x.title,x.region,x.country].some(v=>norm(v)===q));
 return exact.length===1?exact[0]:null;
}
