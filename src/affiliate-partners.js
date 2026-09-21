const INTENTS=new Set(["stay","eat","transport","tickets"]);
function privateHost(host){const h=String(host||"").toLowerCase().replace(/^\[|\]$/g,"");if(h==="localhost"||h.endsWith(".localhost")||h==="0.0.0.0"||h==="127.0.0.1"||h==="::1"||h==="::")return true;if(/^127\./.test(h)||/^10\./.test(h)||/^192\.168\./.test(h)||/^169\.254\./.test(h))return true;const m=h.match(/^172\.(\d+)\./);if(m&&Number(m[1])>=16&&Number(m[1])<=31)return true;if(/^fc|^fd|^fe8|^fe9|^fea|^feb/.test(h))return true;return false}
export function affiliatePartner(input){
 if(!input||!INTENTS.has(input.intent))return null;
 let baseUrl=null;try{const u=new URL(String(input.baseUrl||""));if(u.protocol!=="https:"||u.username||u.password||!u.hostname||privateHost(u.hostname))return null;baseUrl=u.toString()}catch{return null}
 const id=String(input.id||"").trim(),name=String(input.name||"").trim();if(!id||id.length>120||!name||name.length>160)return null;return{id,name,intent:input.intent,baseUrl,affiliate:Boolean(input.affiliate),sponsored:Boolean(input.sponsored),enabled:Boolean(input.enabled),verifiedAt:String(input.verifiedAt||""),expiresAt:String(input.expiresAt||"")};
}
export function activeAffiliatePartner(p,{now=Date.now()}={}){
 if(!p?.id||!p.name||!p.enabled||!p.affiliate)return false;
 const v=Date.parse(p.verifiedAt),e=Date.parse(p.expiresAt);return Number.isFinite(v)&&Number.isFinite(e)&&v<=now+5*60*1000&&e>now&&e>v;
}
export function partnerDisclosure(p){if(!p)return null;return p.sponsored?"Sponsored · Affiliate":"Affiliate";}
