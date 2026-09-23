const $=s=>document.querySelector(s);
const GATES=[
 {key:"browser",title:"Desktop browser",steps:["Open Home, Watch Earth, Explore, Local Earth, Living Atlas and My Earth.","Open ERN Guide and try at least one place request.","Open and close the immersive viewer.","Open the separate Now Moments and Places & Cameras pages.","Verify Previous/Next and source links.","Confirm controls are reachable and layout is not broken."]},
 {key:"mobile",title:"Mobile device / narrow viewport",steps:["Open ERN on a phone or narrow viewport.","Verify Hero actions and the bottom dock remain reachable.","Browse Watch Earth, Search and Living Atlas.","Open ERN Guide and confirm it fits above the safe area.","Open/close viewer and verify controls remain reachable."]},
 {key:"providerPlayback",title:"Provider playback",steps:["Open every representative listed below.","Confirm actual visible media renders inside ERN.","Check attribution remains visible.","Check source/external fallback remains usable."]},
 {key:"accessibility",title:"Keyboard and accessibility",steps:["Navigate primary surfaces with keyboard only.","Check visible focus and dialog focus containment.","Confirm controls have meaningful accessible names.","Check reduced-motion behavior and readability."]},
 {key:"performance",title:"Performance and one-player behavior",steps:["Load Home on a normal network.","Move through Hero, Watch Earth, Atlas and viewer.","Confirm ERN does not create competing active players.","Record any visibly slow or blocked interaction."]},
 {key:"rollback",title:"Rollback",steps:["Confirm the candidate SHA shown above.","Identify the previous known-good SHA in the operator packet.","Confirm the Pages redeploy/rollback path.","Verify rollback would preserve source-truth data and labels."]}
];
function representativeSources(rows=[]){const degraded=rows.filter(x=>x.health==="DEGRADED"),healthy=rows.filter(x=>x.health==="HEALTHY").sort((a,b)=>(b.quality||0)-(a.quality||0));return[...degraded,...healthy.slice(0,Math.max(1,2-degraded.length))].filter((x,i,a)=>a.findIndex(y=>y.id===x.id)===i)}
const facts=$("#facts"),providers=$("#providers"),gates=$("#gates"),command=$("#command"),note=$("#note"),key=$("#key");
let manifest=null,sources=[],observations=[];
function fact(label,value){const d=document.createElement("div");d.className="fact";d.innerHTML="<strong>"+label+"</strong><span></span>";d.querySelector("span").textContent=value||"Unknown";facts.append(d)}
function gateView(g){const d=document.createElement("div");d.className="gate";const h=document.createElement("h3");h.textContent=g.title;const checks=document.createElement("div");checks.className="checks";for(const step of g.steps){const l=document.createElement("label"),c=document.createElement("input");c.type="checkbox";c.dataset.gate=g.key;l.append(c," "+step);checks.append(l)}d.append(h,checks);return d}
GATES.forEach(g=>gates.append(gateView(g)));
async function load(){
 try{manifest=await fetch("./release-manifest.json",{cache:"no-store"}).then(r=>r.ok?r.json():Promise.reject(new Error("manifest")));}catch{}
 try{sources=await fetch("./data/sources.json",{cache:"no-store"}).then(r=>r.ok?r.json():[]);}catch{}
 try{observations=await fetch("./data/provider-observations.json",{cache:"no-store"}).then(r=>r.ok?r.json():[]);}catch{}
 fact("Candidate commit",manifest?.commit||"Manifest not available");
 fact("Origin",location.origin);
 fact("Viewport",innerWidth+" × "+innerHeight);
 fact("Browser",navigator.userAgent);
 fact("Reduced motion",matchMedia("(prefers-reduced-motion: reduce)").matches?"Requested":"Not requested");
 renderProviders();
}
function renderProviders(){
 const embeds=sources.filter(x=>x.playback==="EMBED"&&x.permission==="EMBED_ALLOWED"),groups=new Map();
 for(const s of embeds){const p=String(s.provider||"Unknown");if(!groups.has(p))groups.set(p,[]);groups.get(p).push(s)}
 const reps=[...groups.entries()].flatMap(([provider,rows])=>representativeSources(rows).map(source=>({provider,source,verified:observations.some(o=>o.id===source.id&&o.httpStatus===200&&o.confirmation==="HUMAN_PLAYBACK")})));
 providers.replaceChildren();
 if(!reps.length){providers.textContent="No inside-ERN representative list could be built.";return}
 for(const x of reps){const row=document.createElement("div");row.className="provider";const left=document.createElement("div");const title=document.createElement("strong");title.textContent=x.source.title;const meta=document.createElement("div");meta.className="muted";meta.textContent=x.provider+" · "+x.source.id+" · "+x.source.health;left.append(title,meta);const actions=document.createElement("div");const status=document.createElement("span");status.className="pill "+(x.verified?"ok":"danger");status.textContent=x.verified?"Recorded":"Needs human playback";const open=document.createElement("a");open.className="button secondary";open.href="./#view="+encodeURIComponent(x.source.id);open.target="_blank";open.rel="noopener";open.textContent="Open";actions.append(status," ",open);row.append(left,actions);providers.append(row)}
}
$("#makeCommand").onclick=()=>{const sha=String(manifest?.commit||"");if(!/^[0-9a-f]{40}$/i.test(sha)){command.textContent="Cannot build a recording command until release-manifest.json exposes a valid candidate SHA.";return}const text=String(note.value||"").trim();const escaped=text.replaceAll("\\","\\\\").replaceAll('"','\\"');command.textContent='npm run release:record -- '+key.value+' pass '+sha+' "'+escaped+'"';};
load();
