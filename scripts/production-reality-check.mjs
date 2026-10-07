const base=(process.argv[2]||"https://earthrightnow.app/").replace(/\/$/,"");
const wait=ms=>new Promise(r=>setTimeout(r,ms));
async function get(url,tries=6){let last;for(let i=0;i<tries;i++){try{const r=await fetch(url+"?ernReality="+Date.now(),{redirect:"follow",headers:{"cache-control":"no-cache"}});if(r.ok)return r;last=new Error(url+" -> "+r.status)}catch(e){last=e}await wait(3000)}throw last}
const home=await (await get(base+"/")).text();
if(!home.includes("app-lite.js?v=20261007c"))throw new Error("production home is not serving the reconciled app revision");
const app=await (await get(base+"/src/app-lite.js")).text();
for(const marker of ["setTimeout(()=>loadSearchExtra(initialQ),0)","const dc=()=>state.sources.concat(state.sx)","renderDiscoveryProof();renderWander();renderLocalEarth();renderSaved()"])if(!app.includes(marker))throw new Error("production app missing reality-sync marker: "+marker);
const core=await (await get(base+"/data/sources.json")).json();
const extra=await (await get(base+"/data/search-supplemental.json")).json();
if(!Array.isArray(core)||!Array.isArray(extra))throw new Error("production catalogs are not arrays");
if(extra.length<400)throw new Error("production supplemental catalog unexpectedly small: "+extra.length);
const ids=new Set([...core,...extra].map(x=>x?.id).filter(Boolean));
for(const id of ["taitung-jinzun","norway-oslo-port-live","iceland-akureyri-port-live","germany-helgoland-harbor-live","south-africa-kruger-orpen-live"])if(!ids.has(id))throw new Error("production catalog missing expected reconciled source: "+id);
console.log(JSON.stringify({ok:true,homeRevision:"20261007c",core:core.length,supplemental:extra.length,combined:core.length+extra.length,taitungBenchmark:ids.has("taitung-jinzun"),checked:[...ids].filter(id=>["taitung-jinzun","norway-oslo-port-live","iceland-akureyri-port-live","germany-helgoland-harbor-live","south-africa-kruger-orpen-live"].includes(id))},null,2));
