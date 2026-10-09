(()=>{"use strict";
const safe=v=>{try{const u=new URL(String(v||"").trim());return u.protocol==="https:"&&!u.username&&!u.password&&u.hostname?u.toString():""}catch{return""}};
function current(o,now=Date.now()){
 if(!o||o.verified!==true||!o.id||!o.title||!o.provider||!o.placeId||!o.intent||!safe(o.url))return false;
 const t=Date.parse(o.verifiedAt||"");if(!Number.isFinite(t)||t>now+300000)return false;
 const expires=Date.parse(o.expiresAt||"");if(o.expiresAt&&(!Number.isFinite(expires)||expires<=now))return false;
 return (now-t)/86400000<=90;
}
function partnerCurrent(p,now=Date.now()){
 if(!p||p.enabled!==true||p.affiliate!==true||!p.id)return false;
 const verified=Date.parse(p.verifiedAt||"");if(!Number.isFinite(verified)||verified>now+300000)return false;
 const expires=Date.parse(p.expiresAt||"");if(p.expiresAt&&(!Number.isFinite(expires)||expires<=now))return false;
 return true;
}
function sourceEligible(s){return Boolean(s)&&s.health==="HEALTHY"&&["LIVE_VIDEO","LIVE_IMAGE","EXTERNAL_LIVE"].includes(s.truth)}
function offerFor(offers,s,intent,partners=[],now=Date.now()){
 const placeId=s?.placeId||s?.id;if(!placeId||!sourceEligible(s))return null;
 const partnerById=new Map((partners||[]).filter(p=>partnerCurrent(p,now)).map(p=>[String(p.id),p]));
 return (offers||[]).filter(o=>o&&o.placeId===placeId&&o.intent===intent&&current(o,now)&&partnerById.has(String(o.partnerId||""))).sort((a,b)=>Date.parse(b.verifiedAt)-Date.parse(a.verifiedAt)||String(a.id).localeCompare(String(b.id)))[0]||null;
}
const disclosure=o=>o?.sponsored?"Sponsored":o?.affiliate?"Affiliate link":"External travel link";
function guideOffers(offers,s,partners=[],now=Date.now()){
 const seen=new Set();return["activities","culture","transport","stay","eat"].map(i=>offerFor(offers,s,i,partners,now)).filter(o=>o&&!seen.has(o.id)&&(seen.add(o.id),true)).slice(0,3);
}
function guideLink(o){
 const a=document.createElement("a");a.className="guide-result guide-result-link";a.href=safe(o.url);a.target="_blank";a.rel=o.affiliate||o.sponsored?"noopener noreferrer sponsored":"noopener noreferrer";a.textContent=o.title+" · "+o.provider+" · "+disclosure(o)+" →";return a
}
function localFor(rows,s,re){const id=s?.placeId||s?.id;return(rows||[]).find(x=>x&&x.status==="APPROVED"&&x.placeId===id&&re.test(String(x.type||"")+" "+(x.tags||[]).join(" ")))||null}
function applyPlan(el,o,f,l){if(!el)return;const x=f&&typeof f==="object"?f:null;el.href=o?String(o.url||""):x?safe(x.url):f;if(o){delete el.dataset.localPlaceId;const d=disclosure(o);el.dataset.offerId=String(o.id);el.dataset.offerKind=o.sponsored?"sponsored":o.affiliate?"affiliate":"external";el.title=o.provider+" · "+d;el.setAttribute("aria-label",l+" — "+o.provider+" — "+d);el.rel=o.affiliate||o.sponsored?"noopener noreferrer sponsored":"noopener noreferrer"}else{delete el.dataset.offerId;delete el.dataset.offerKind;if(x){el.title=x.name+" · ERN reviewed local place";el.setAttribute("aria-label",l+" — "+x.name+" — ERN reviewed local place");el.dataset.localPlaceId=x.id}else{delete el.dataset.localPlaceId;el.removeAttribute("title");el.setAttribute("aria-label",l)}el.rel="noopener noreferrer"}}
globalThis.ERNTravelPlanning=Object.freeze({current,partnerCurrent,sourceEligible,offerFor,disclosure,guideOffers,guideLink,localFor,applyPlan});
})();