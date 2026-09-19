const INTENTS=new Set(["stay","eat","transport","tickets"]);
export function affiliatePartner(input){
 if(!input||!INTENTS.has(input.intent))return null;
 let baseUrl=null;try{const u=new URL(String(input.baseUrl||""));if(u.protocol!=="https:"||u.username||u.password)return null;baseUrl=u.toString()}catch{return null}
 return{id:String(input.id||"").trim(),name:String(input.name||"").trim(),intent:input.intent,baseUrl,affiliate:Boolean(input.affiliate),sponsored:Boolean(input.sponsored),enabled:Boolean(input.enabled),verifiedAt:String(input.verifiedAt||""),expiresAt:String(input.expiresAt||"")};
}
export function activeAffiliatePartner(p,{now=Date.now()}={}){
 if(!p?.id||!p.name||!p.enabled||!p.affiliate)return false;
 const v=Date.parse(p.verifiedAt),e=Date.parse(p.expiresAt);return Number.isFinite(v)&&Number.isFinite(e)&&v<=now&&e>now;
}
export function partnerDisclosure(p){if(!p)return null;return p.sponsored?"Sponsored · Affiliate":"Affiliate";}
