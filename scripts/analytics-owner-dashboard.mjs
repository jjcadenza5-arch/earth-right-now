import fs from "node:fs";
const input=process.argv[2],output=process.argv[3];if(!input||!output)throw new Error("usage: analytics-owner-dashboard <input.json> <output.html>");
const x=JSON.parse(fs.readFileSync(input,"utf8"));
const esc=v=>String(v??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const num=v=>Number(v)||0;
const total=arr=>(Array.isArray(arr)?arr:[]).reduce((n,r)=>n+num(r.count),0);
const eventCount=name=>num((x.events||[]).find(r=>r.value===name)?.count);
const table=(arr=[],a="Item",b="Count")=>`<table><thead><tr><th>${esc(a)}</th><th>${esc(b)}</th></tr></thead><tbody>${(arr.length?arr:[{value:"—",count:0}]).map(r=>`<tr><td>${esc(r.value||"—")}</td><td>${num(r.count)}</td></tr>`).join("")}</tbody></table>`;
const daily=(x.daily||[]).slice().reverse();
const maxV=Math.max(1,...daily.map(r=>num(r.visitors)));
const dailyTable=`<table><thead><tr><th>Day (UTC)</th><th>Visitors</th><th>Page views</th></tr></thead><tbody>${(daily.length?daily:[{day:"—",visitors:0,pageViews:0}]).map(r=>`<tr><td>${esc(r.day)}</td><td>${num(r.visitors)}<span class="bar" style="--w:${Math.round(num(r.visitors)/maxV*100)}%"></span></td><td>${num(r.pageViews)}</td></tr>`).join("")}</tbody></table>`;
const cards=[
 ["Visitors",num(x.visitors?.approxUnique),"Approx. unique"],
 ["Page views",num(x.visitors?.pageViews),"All ERN pages"],
 ["Place opens",total(x.places),"Destination/window opens"],
 ["Searches",eventCount("earth_search"),"Search events"],
 ["Zero results",eventCount("earth_search_zero"),"Search gaps"],
 ["Live-source clicks",eventCount("external_source_opened"),"Outbound provider opens"],
 ["Commercial clicks",eventCount("travel_option_opened"),"Verified travel-option opens"]
];
const html=`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow,noarchive"><title>ERN Owner Analytics</title><style>
:root{color-scheme:light dark;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}*{box-sizing:border-box}body{margin:0;background:#f4f7f6;color:#10211d}main{max-width:1180px;margin:auto;padding:32px 18px 64px}.kicker{font-size:.72rem;letter-spacing:.14em;text-transform:uppercase;color:#57706a}h1{font:500 clamp(2rem,5vw,3.5rem)/1.02 Georgia,serif;margin:.12em 0}.meta,.note{color:#657873}.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px;margin:24px 0}.card,section{background:#fff;border:1px solid #dce6e2;border-radius:16px;box-shadow:0 5px 24px rgba(16,33,29,.045)}.card{padding:15px}.card strong{display:block;font-size:1.55rem}.card small{color:#6b7c77}section{padding:18px;margin:14px 0;overflow:auto}h2{font:500 1.3rem Georgia,serif;margin:.1rem 0 1rem}table{width:100%;border-collapse:collapse;font-size:.9rem}th,td{text-align:left;padding:8px 9px;border-bottom:1px solid #edf1ef}th:last-child,td:last-child{text-align:right}tbody tr:last-child td{border-bottom:0}.bar{display:block;height:3px;background:#7b978f;width:var(--w);margin-top:3px;border-radius:3px}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:14px}.privacy{font-size:.83rem;background:#edf4f1;padding:12px 14px;border-radius:12px}.warn{font-size:.83rem;color:#654f30}@media(prefers-color-scheme:dark){body{background:#071b17;color:#edf7f4}.card,section{background:#0b2621;border-color:#21423a;box-shadow:none}.meta,.note,.card small{color:#9bb2ab}th,td{border-color:#173a32}.privacy{background:#12342d}.bar{background:#8bb2a6}.warn{color:#d8be92}}
</style></head><body><main><div class="kicker">EARTH RIGHT NOW · OWNER ANALYTICS</div><h1>Soft-launch performance</h1><p class="meta">Generated ${esc(x.generatedAt||"unknown")} · rolling ${num(x.windowDays)||30}-day window</p>
<div class="cards">${cards.map(c=>`<div class="card"><small>${esc(c[0])}</small><strong>${c[1]}</strong><small>${esc(c[2])}</small></div>`).join("")}</div>
<section><h2>Daily visitors</h2>${dailyTable}</section>
<div class="grid"><section><h2>Top destinations</h2>${table(x.places,"Place ID","Opens")}</section><section><h2>Top searches</h2>${table(x.searches,"Search","Count")}</section></div>
<div class="grid"><section><h2>Zero-result searches</h2>${table(x.searchGaps,"Search gap","Count")}<p class="warn">Use as research demand only; never auto-add a destination.</p></section><section><h2>Live-source clicks</h2>${table(x.externalSources,"External source ID","Opens")}</section></div>
<div class="grid"><section><h2>Affiliate / commercial clicks</h2>${table(x.commercialOffers,"Offer ID","Opens")}<p class="warn">Clicks are not bookings, conversions or revenue.</p></section><section><h2>Referral sources</h2>${table(x.referrers,"Referrer host","Page views")}</section></div>
<section><h2>Reading the numbers</h2><p class="note"><strong>Place opens</strong> aggregate destination/window-open activity. <strong>Live-source clicks</strong> are outbound opens to provider sources. <strong>Commercial clicks</strong> count only verified travel-option outbound opens. Daily visitor counts are privacy-preserving aggregate unique visitors by UTC day.</p><p class="privacy">Privacy: aggregate counters only. No raw IP addresses, precise coordinates or per-event rows are stored. Search text resembling email addresses, URLs or phone numbers is discarded.</p></section>
</main></body></html>`;
fs.writeFileSync(output,html);console.log("Private ERN owner analytics dashboard written.");
