const base=(process.argv[2]||"https://earthrightnow.app/").replace(/\/$/,""),build=String(process.env.GITHUB_SHA||"").slice(0,12);
if(!build)throw new Error("GITHUB_SHA is required for production reality verification");
const wait=ms=>new Promise(r=>setTimeout(r,ms));
async function fetchFresh(url){const join=url.includes("?")?"&":"?";return fetch(url+join+"ernReality="+Date.now(),{redirect:"follow",headers:{"cache-control":"no-cache"}})}
async function waitText(url,predicate,label,tries=18){let last="no response";for(let i=0;i<tries;i++){try{const r=await fetchFresh(url);const t=await r.text();last=r.status+" "+t.slice(0,120);if(r.ok&&predicate(t))return t}catch(e){last=String(e)}await wait(5000)}throw new Error(label+" did not reach expected production state: "+last)}
async function get(url,tries=8){let last;for(let i=0;i<tries;i++){try{const r=await fetchFresh(url);if(r.ok)return r;last=new Error(url+" -> "+r.status)}catch(e){last=e}await wait(4000)}throw last}
const home=await waitText(base+"/",t=>t.includes("app-lite.js?v="+build),"production home");
const app=await waitText(base+"/src/app-lite.js?v="+build,t=>t.includes("setTimeout(()=>loadSearchExtra(initialQ),0)"),"production app");
for(const marker of ["setTimeout(()=>loadSearchExtra(initialQ),0)","const dc=()=>state.sources.concat(state.sx)","renderDiscoveryProof();renderWander();renderLocalEarth();renderSaved()"])if(!app.includes(marker))throw new Error("production app missing reality-sync marker: "+marker);
const core=await (await get(base+"/data/sources.json")).json();
const extra=await (await get(base+"/data/search-supplemental.json")).json();
if(!Array.isArray(core)||!Array.isArray(extra))throw new Error("production catalogs are not arrays");
if(extra.length<400)throw new Error("production supplemental catalog unexpectedly small: "+extra.length);
const ids=new Set([...core,...extra].map(x=>x?.id).filter(Boolean));
for(const id of ["taitung-jinzun","norway-oslo-port-live","iceland-akureyri-port-live","germany-helgoland-harbor-live","south-africa-kruger-orpen-live"])if(!ids.has(id))throw new Error("production catalog missing expected reconciled source: "+id);
console.log(JSON.stringify({ok:true,homeRevision:build,core:core.length,supplemental:extra.length,combined:core.length+extra.length,taitungBenchmark:ids.has("taitung-jinzun"),checked:[...ids].filter(id=>["taitung-jinzun","norway-oslo-port-live","iceland-akureyri-port-live","germany-helgoland-harbor-live","south-africa-kruger-orpen-live"].includes(id))},null,2));
