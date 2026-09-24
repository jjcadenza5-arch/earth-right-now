import fs from "node:fs";
import {insideERNRecoveryStatus} from "../src/inside-ern-recovery.js";
import {allowedEmbedUrl,embedSandbox} from "../src/embed-policy.js";

const sources=JSON.parse(fs.readFileSync("data/sources.json","utf8"));
let observations=[];try{observations=JSON.parse(fs.readFileSync("data/provider-observations.json","utf8"))}catch{}
const research=JSON.parse(fs.readFileSync("data/embed-research-candidates.json","utf8"));
const recovery=insideERNRecoveryStatus(sources,observations,{now:new Date(),limit:12,targetReady:5});

const esc=s=>String(s??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const safe=u=>{try{const x=new URL(String(u||""));return /^https:$/.test(x.protocol)?x.toString():""}catch{return""}};
const card=(x,type)=>{
 const embed=allowedEmbedUrl(x.embedUrl||x.candidateEmbedUrl)||"";
 const source=safe(x.sourceUrl);
 const sandbox=embed?embedSandbox({embedUrl:embed}):"";
 const status=type==="research"?"Research-only · technical review required":[x.reason,x.action].filter(Boolean).join(" · ");
 return `<article class="card" data-type="${esc(type)}">
   <div class="meta"><span>${esc(type==="research"?"SECOND PROVIDER":"RESTORE INSIDE ERN")}</span><strong>${esc(x.title||x.id)}</strong><small>${esc(x.provider||"Unknown provider")} · ${esc(status)}</small></div>
   <div class="stage" data-embed="${esc(embed)}" data-sandbox="${esc(sandbox)}"><div class="placeholder">Not loaded. Human playback proof is still required.</div></div>
   <div class="actions"><button class="load" type="button" ${embed?"":"disabled"}>Load candidate</button>${source?`<a href="${esc(source)}" target="_blank" rel="noopener noreferrer">Open provider ↗</a>`:""}</div>
   <p class="note">Loading this frame is only a review step. A page or iframe loading does not prove that the view is live/current.</p>
 </article>`;
};
const restoration=recovery.restorationCandidates.filter(x=>x.embedUrl).slice(0,8);
const researchCards=research.map(x=>({...x,title:x.provider+" — "+x.id}));
const html=`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>ERN Operator Embed Review</title><meta name="robots" content="noindex,nofollow,noarchive"><meta name="referrer" content="strict-origin-when-cross-origin">
<style>:root{color-scheme:dark}*{box-sizing:border-box}body{margin:0;background:#041f1c;color:#eef7f4;font:15px/1.5 system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}main{max-width:1200px;margin:auto;padding:36px 20px 80px}h1{font:500 clamp(2rem,6vw,4.2rem)/1 Georgia,serif;margin:.15em 0}.kicker{font-size:.72rem;letter-spacing:.14em;text-transform:uppercase;color:#9ec3ba}.warning{padding:14px 16px;border:1px solid #6d8e86;border-radius:12px;background:#0a302b;margin:20px 0 30px}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:18px}.card{border:1px solid #31534c;border-radius:16px;background:#082a26;overflow:hidden}.meta{padding:16px;display:grid;gap:4px}.meta span{font-size:.66rem;letter-spacing:.12em;color:#93b9b0}.meta strong{font-size:1.05rem}.meta small{color:#a9beb8}.stage{aspect-ratio:16/9;background:#021411;display:grid;place-items:center;position:relative}.stage iframe{width:100%;height:100%;border:0}.placeholder{padding:22px;text-align:center;color:#86a59e}.actions{display:flex;gap:10px;padding:12px 16px 0}.actions button,.actions a{border:1px solid #577b72;border-radius:999px;padding:9px 12px;background:#0c3c35;color:#effaf7;text-decoration:none;font:inherit;cursor:pointer}.actions button:disabled{opacity:.4;cursor:not-allowed}.note{padding:0 16px 16px;color:#8ca9a2;font-size:.78rem}section{margin-top:40px}h2{font:500 1.5rem Georgia,serif}.empty{color:#91aaa4}.foot{margin-top:40px;color:#75938b;font-size:.8rem}</style></head>
<body><main><p class="kicker">EARTH RIGHT NOW · OPERATOR REVIEW</p><h1>Inside-ERN playback review lab</h1>
<div class="warning"><strong>Unlinked / noindex review surface.</strong> This page is not authentication-protected. All candidates are public sources, but nothing here is visitor-approved. Human playback confirmation and source/provider review remain mandatory before promotion.</div>
<section><h2>Restore inside ERN</h2><p>Highest-value healthy embeds that still need current human playback proof.</p><div class="grid">${restoration.length?restoration.map(x=>card(x,"restore")).join(""):'<p class="empty">No restoration candidates right now.</p>'}</div></section>
<section><h2>Second-provider research</h2><p>Research-only candidates. Technical loading here does not approve permission or playback.</p><div class="grid">${researchCards.length?researchCards.map(x=>card(x,"research")).join(""):'<p class="empty">No research candidates right now.</p>'}</div></section>
<p class="foot">Generated ${esc(new Date().toISOString())}. This page never writes to ERN data and cannot mark a source healthy, live, or approved.</p>
</main><script>
document.querySelectorAll(".load").forEach(btn=>btn.addEventListener("click",()=>{
 const stage=btn.closest(".card").querySelector(".stage"),url=stage.dataset.embed;if(!url)return;
 stage.replaceChildren();const frame=document.createElement("iframe");frame.src=url;frame.title="Operator playback review";frame.loading="eager";frame.allow="autoplay; encrypted-media; picture-in-picture; fullscreen";frame.allowFullscreen=true;
 const sandbox=stage.dataset.sandbox;if(sandbox)frame.setAttribute("sandbox",sandbox);
 stage.append(frame);btn.textContent="Reload candidate";
}));
</script></body></html>`;
fs.mkdirSync("review",{recursive:true});
fs.writeFileSync("review/inside-ern.html",html);
console.log(JSON.stringify({generated:true,restoration:restoration.map(x=>x.id),research:research.map(x=>x.id)},null,2));
