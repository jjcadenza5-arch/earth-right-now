const PLACE_CONTEXT_PATTERNS=[
 {re:/^(?:what(?:'s| is)|show me) nearby\??$/i,type:"NEARBY"},
 {re:/^(?:where (?:could|can|should) i stay|places? to stay|hotels? nearby)\??$/i,type:"STAY"},
 {re:/^(?:what does it look like|show me (?:this|it) now|show me now)\??$/i,type:"SEE_NOW"}
];
export function earthGuidePlaceAction(query,{placeId=null}={}){
 const q=String(query||"").trim();if(!placeId||!q)return null;
 const hit=PLACE_CONTEXT_PATTERNS.find(x=>x.re.test(q));return hit?{type:hit.type,placeId}:null;
}
export function earthGuidePlaceFollowUps(place){
 if(!place?.id)return[];return["Show me now","What’s nearby?","Where could I stay?"];
}
