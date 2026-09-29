(()=>{"use strict";
const safe=v=>{try{const u=new URL(String(v||"").trim());return u.protocol==="https:"&&!u.username&&!u.password&&u.hostname?u.toString():""}catch{return""}};
function current(o,now=Date.now()){
 if(!o||o.verified!==true||!o.id||!o.title||!o.provider||!o.placeId||!o.intent||!safe(o.url))return false;
 const t=Date.parse(o.verifiedAt||"");if(!Number.isFinite(t)||t>now+300000)return false;
 const expires=Date.parse(o.expiresAt||"");if(o.expiresAt&&(!Number.isFinite(expires)||expires<=now))return false;
 return (now-t)/86400000<=90;
}
function offerFor(offers,s,intent,now=Date.now()){
 const placeId=s?.placeId||s?.id;if(!placeId)return null;
 return (offers||[]).filter(o=>o&&o.placeId===placeId&&o.intent===intent&&current(o,now)).sort((a,b)=>Date.parse(b.verifiedAt)-Date.parse(a.verifiedAt)||String(a.id).localeCompare(String(b.id)))[0]||null;
}
const disclosure=o=>o?.sponsored?"Sponsored":o?.affiliate?"Affiliate link":"External travel link";
function guideOffers(offers,s,now=Date.now()){
 const seen=new Set();return["activities","culture","transport","stay","eat"].map(i=>offerFor(offers,s,i,now)).filter(o=>o&&!seen.has(o.id)&&(seen.add(o.id),true)).slice(0,3);
}
function guideLink(o){
 const a=document.createElement("a");a.className="guide-result guide-result-link";a.href=safe(o.url);a.target="_blank";a.rel=o.affiliate||o.sponsored?"noopener noreferrer sponsored":"noopener noreferrer";a.textContent=o.title+" · "+o.provider+" · "+disclosure(o)+" →";return a
}
globalThis.ERNTravelPlanning=Object.freeze({current,offerFor,disclosure,guideOffers,guideLink});
})();