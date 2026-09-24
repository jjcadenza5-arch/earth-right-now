import fs from "node:fs";
import {operatorReviewQueue} from "../src/operator-review-queue.js";
import {allowedEmbedUrl,allowedResearchEmbedUrl,embedSandbox} from "../src/embed-policy.js";
import {providerFamilyResearchStatus} from "../src/provider-family-research.js";
import {researchReviewQueue} from "../src/research-review-queue.js";

const sources=JSON.parse(fs.readFileSync("data/sources.json","utf8"));
let observations=[];try{observations=JSON.parse(fs.readFileSync("data/provider-observations.json","utf8"))}catch{}
const research=JSON.parse(fs.readFileSync("data/embed-research-candidates.json","utf8"));
const providerFamilies=JSON.parse(fs.readFileSync("data/embed-provider-families.json","utf8"));
const familyResearch=providerFamilyResearchStatus(providerFamilies,{now:new Date()});
const researchQueue=researchReviewQueue(research,{providerFamilyReport:familyResearch,primaryCount:1});
const reviewQueue=operatorReviewQueue(sources,observations,{now:new Date(),limit:10,targetReady:5});

const esc=s=>String(s??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const safe=u=>{try{const x=new URL(String(u||""));return /^https:$/.test(x.protocol)?x.toString():""}catch{return""}};
const card=(x,type)=>{
 const rawEmbed=x.embedUrl||x.candidateEmbedUrl;
 const embed=(type==="research"?allowedResearchEmbedUrl(rawEmbed):allowedEmbedUrl(rawEmbed))||"";
 const source=safe(x.sourceUrl);
 const sandbox=embed?embedSandbox({embedUrl:embed}):"";
 const status=type==="research"?"Research-only · technical review required":[x.reason,x.action,Number.isFinite(x.remainingHours)?`${x.remainingHours}h remaining`:null].filter(Boolean).join(" · ");
 return `<article class="card" data-type="${esc(type)}" data-id="${esc(x.id)}" data-title="${esc(x.title||x.id)}" data-provider="${esc(x.provider||"Unknown provider")}" data-source="${esc(source)}" data-embed="${esc(embed)}">
   <div class="meta"><span>${esc(type==="research"?"SECOND PROVIDER":x.reviewMode==="RENEW"?"RENEW LIVE HERE":"RESTORE INSIDE ERN")}</span><strong>${esc(x.title||x.id)}</strong><small>${esc(x.provider||"Unknown provider")} · ${esc(status)}</small></div>
   <div class="stage" data-embed="${esc(embed)}" data-sandbox="${esc(sandbox)}"><div class="placeholder">Not loaded. Human playback proof is still required.</div></div>
   <div class="actions"><button class="load" type="button" ${embed?"":"disabled"}>Load candidate</button>${source?`<a href="${esc(source)}" target="_blank" rel="noopener noreferrer">Open provider ↗</a>`:""}</div>
   <div class="review-actions" aria-label="Record local human review"><button type="button" data-outcome="HUMAN_PLAYBACK_CONFIRMED" disabled>Playing & current</button><button type="button" data-outcome="PLAYBACK_FAILED" disabled>Failed / not playing</button><button type="button" data-outcome="INCONCLUSIVE" disabled>Inconclusive</button></div>
   <p class="review-state">No local review recorded.</p>
   <p class="note">Loading this frame is only a review step. A page or iframe loading does not prove that the view is live/current.</p>
 </article>`;
};
const insideReview=(reviewQueue.primaryItems||reviewQueue.items||[]).filter(x=>x.embedUrl).slice(0,10);
const insideBacklog=(reviewQueue.backlogItems||[]).filter(x=>x.embedUrl);
const researchPrimary=researchQueue.primary.map(x=>({...x,title:x.provider+" — "+x.id}));
const researchAlternates=researchQueue.alternates.map(x=>({...x,title:x.provider+" — "+x.id}));
const generatedAt=new Date().toISOString();
const html=`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>ERN Operator Embed Review</title><meta name="robots" content="noindex,nofollow,noarchive"><meta name="referrer" content="strict-origin-when-cross-origin">
<style>:root{color-scheme:dark}*{box-sizing:border-box}body{margin:0;background:#041f1c;color:#eef7f4;font:15px/1.5 system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}main{max-width:1200px;margin:auto;padding:36px 20px 80px}h1{font:500 clamp(2rem,6vw,4.2rem)/1 Georgia,serif;margin:.15em 0}.kicker{font-size:.72rem;letter-spacing:.14em;text-transform:uppercase;color:#9ec3ba}.warning,.evidence{padding:14px 16px;border:1px solid #6d8e86;border-radius:12px;background:#0a302b;margin:20px 0}.evidence{display:flex;gap:10px;align-items:center;flex-wrap:wrap}.evidence strong{margin-right:auto}.evidence button{border:1px solid #6f978d;border-radius:999px;padding:8px 11px;background:#10473f;color:#effaf7;cursor:pointer}.evidence small{width:100%;color:#93aea7}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:18px}.card{border:1px solid #31534c;border-radius:16px;background:#082a26;overflow:hidden}.card.reviewed{border-color:#6a9b8f}.meta{padding:16px;display:grid;gap:4px}.meta span{font-size:.66rem;letter-spacing:.12em;color:#93b9b0}.meta strong{font-size:1.05rem}.meta small{color:#a9beb8}.stage{aspect-ratio:16/9;background:#021411;display:grid;place-items:center;position:relative}.stage iframe{width:100%;height:100%;border:0}.placeholder{padding:22px;text-align:center;color:#86a59e}.actions,.review-actions{display:flex;gap:8px;flex-wrap:wrap;padding:12px 16px 0}.actions button,.actions a,.review-actions button{border:1px solid #577b72;border-radius:999px;padding:9px 12px;background:#0c3c35;color:#effaf7;text-decoration:none;font:inherit;cursor:pointer}.actions button:disabled,.review-actions button:disabled{opacity:.38;cursor:not-allowed}.review-actions button[data-outcome="HUMAN_PLAYBACK_CONFIRMED"]{border-color:#5c9e8e}.review-actions button[data-outcome="PLAYBACK_FAILED"]{border-color:#9a6d6d}.review-state{margin:10px 16px 0;color:#a7c8bf;font-size:.8rem}.note{padding:0 16px 16px;color:#8ca9a2;font-size:.78rem}section{margin-top:40px}h2{font:500 1.5rem Georgia,serif}.empty{color:#91aaa4}details{margin-top:18px;padding:12px 14px;border:1px solid #31534c;border-radius:12px;background:#061f1b}summary{cursor:pointer;color:#b5d0c9}.backlog{margin:.6rem 0 0;padding-left:1.2rem;color:#91aaa4}.foot{margin-top:40px;color:#75938b;font-size:.8rem}</style></head>
<body><main><p class="kicker">EARTH RIGHT NOW · OPERATOR REVIEW</p><h1>Inside-ERN playback review lab</h1>
<div class="warning"><strong>Unlinked / noindex review surface.</strong> This page is not authentication-protected. All candidates are public sources, but nothing here is visitor-approved. Human playback confirmation and source/provider review remain mandatory before promotion.</div>
<div class="evidence"><strong>Local review evidence</strong><span id="reviewCount">0 observations</span><button id="copyEvidence" type="button">Copy JSON</button><button id="downloadEvidence" type="button">Download JSON</button><button id="clearEvidence" type="button">Clear local</button><small id="evidenceStatus">Stored only in this browser. Nothing is uploaded or written to ERN.</small></div>
<section><h2>Renew / restore inside ERN</h2><p>Primary batch: ${reviewQueue.renewalCount||0} renewal + ${reviewQueue.recommendedRestorationCount||0} restoration review${(reviewQueue.recommendedRestorationCount||0)===1?"":"s"} to protect current proof and close the ${reviewQueue.readyShortfall||0}-window shortfall.</p><div class="grid">${insideReview.length?insideReview.map(x=>card(x,"restore")).join(""):'<p class="empty">No renewal or restoration candidates right now.</p>'}</div>${insideBacklog.length?`<details><summary>Additional restoration backlog (${insideBacklog.length})</summary><ul class="backlog">${insideBacklog.map(x=>`<li>${esc(x.title||x.id)} — ${esc(x.reason||x.action||"REVIEW")}</li>`).join("")}</ul></details>`:""}</section>
<section><h2>Second-provider research</h2><p>Test one strongest provider-family candidate first. Technical loading never approves permission or playback.</p><div class="grid">${researchPrimary.length?researchPrimary.map(x=>card(x,"research")).join(""):'<p class="empty">No primary research candidate right now.</p>'}</div>${researchAlternates.length?`<details><summary>Alternate provider tests (${researchAlternates.length})</summary><ul class="backlog">${researchAlternates.map(x=>`<li>${esc(x.title||x.id)} — use only if the primary test fails or remains blocked</li>`).join("")}</ul></details>`:""}</section>
<p class="foot">Generated ${esc(generatedAt)}. This page never writes to ERN data and cannot mark a source healthy, live, or approved.</p>
</main><script>
const KEY="ern-operator-review-evidence-v1";
const readEvidence=()=>{try{return JSON.parse(localStorage.getItem(KEY)||"{}")}catch{return{}}};
const writeEvidence=value=>{try{localStorage.setItem(KEY,JSON.stringify(value))}catch{}};
const packet=()=>({schemaVersion:1,kind:"ERN_OPERATOR_REVIEW_EVIDENCE",generatedAt:new Date().toISOString(),reviewOrigin:location.origin+location.pathname,catalogMutationAllowed:false,networkStatus:"UNKNOWN_NOT_RECORDED",items:Object.values(readEvidence()).sort((a,b)=>String(a.id).localeCompare(String(b.id)))});
function renderEvidence(){
 const data=readEvidence(),items=Object.values(data);document.getElementById("reviewCount").textContent=items.length+" observation"+(items.length===1?"":"s");
 document.querySelectorAll(".card").forEach(card=>{const key=card.dataset.type+":"+card.dataset.id,item=data[key],label=card.querySelector(".review-state");card.classList.toggle("reviewed",Boolean(item));label.textContent=item?item.outcome+" · "+new Date(item.observedAt).toLocaleString():"No local review recorded."});
}
function record(card,outcome){
 const data=readEvidence(),key=card.dataset.type+":"+card.dataset.id;
 data[key]={id:card.dataset.id,type:card.dataset.type,title:card.dataset.title,provider:card.dataset.provider,outcome,observedAt:new Date().toISOString(),evidenceKind:"HUMAN_REVIEW",networkStatus:"UNKNOWN_NOT_RECORDED",sourceUrl:card.dataset.source||null,embedUrl:card.dataset.embed||null};
 writeEvidence(data);renderEvidence();document.getElementById("evidenceStatus").textContent="Local observation recorded. Export JSON when the review batch is complete.";
}
document.querySelectorAll(".load").forEach(btn=>btn.addEventListener("click",()=>{
 const card=btn.closest(".card"),stage=card.querySelector(".stage"),url=stage.dataset.embed;if(!url)return;
 stage.replaceChildren();const frame=document.createElement("iframe");frame.src=url;frame.title="Operator playback review";frame.loading="eager";frame.allow="autoplay; encrypted-media; picture-in-picture; fullscreen";frame.allowFullscreen=true;
 const sandbox=stage.dataset.sandbox;if(sandbox)frame.setAttribute("sandbox",sandbox);
 stage.append(frame);btn.textContent="Reload candidate";card.querySelectorAll(".review-actions button").forEach(x=>x.disabled=false);
}));
document.querySelectorAll(".review-actions button").forEach(btn=>btn.addEventListener("click",()=>record(btn.closest(".card"),btn.dataset.outcome)));
document.getElementById("copyEvidence").addEventListener("click",async()=>{const text=JSON.stringify(packet(),null,2);try{await navigator.clipboard.writeText(text);document.getElementById("evidenceStatus").textContent="Evidence JSON copied to clipboard."}catch{document.getElementById("evidenceStatus").textContent="Clipboard unavailable. Use Download JSON instead."}});
document.getElementById("downloadEvidence").addEventListener("click",()=>{const blob=new Blob([JSON.stringify(packet(),null,2)],{type:"application/json"}),url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download="ern-review-evidence-"+new Date().toISOString().replace(/[:.]/g,"-")+".json";a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)});
document.getElementById("clearEvidence").addEventListener("click",()=>{if(!confirm("Clear local ERN review evidence from this browser?"))return;try{localStorage.removeItem(KEY)}catch{}renderEvidence();document.getElementById("evidenceStatus").textContent="Local review evidence cleared."});
renderEvidence();
</script></body></html>`;
fs.mkdirSync("review",{recursive:true});
fs.writeFileSync("review/inside-ern.html",html);
console.log(JSON.stringify({generated:true,ready:reviewQueue.ready,targetReady:reviewQueue.targetReady,readyShortfall:reviewQueue.readyShortfall,recommendedRestorationCount:reviewQueue.recommendedRestorationCount,renewal:reviewQueue.renewal.map(x=>x.id),primary:insideReview.map(x=>x.id),backlog:insideBacklog.map(x=>x.id),researchPrimary:researchPrimary.map(x=>x.id),researchAlternates:researchAlternates.map(x=>x.id),localEvidence:true},null,2));
