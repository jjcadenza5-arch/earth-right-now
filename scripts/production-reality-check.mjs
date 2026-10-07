const base=(process.argv[2]||"https://earthrightnow.app/").replace(/\/$/,""),build=String(process.env.GITHUB_SHA||"").slice(0,12);
if(!build)throw new Error("GITHUB_SHA is required for production reality verification");
const wait=ms=>new Promise(r=>setTimeout(r,ms));
async function fetchFresh(url){const join=url.includes("?")?"&":"?";return fetch(url+join+"ernReality="+Date.now(),{redirect:"follow",headers:{"cache-control":"no-cache"}})}
async function waitText(url,predicate,label,tries=18){let last="no response";for(let i=0;i<tries;i++){try{const r=await fetchFresh(url);const t=await r.text();last=r.status+" "+t.slice(0,120);if(r.ok&&predicate(t))return t}catch(e){last=String(e)}await wait(5000)}throw new Error(label+" did not reach expected production state: "+last)}
async function get(url,tries=8){let last;for(let i=0;i<tries;i++){try{const r=await fetchFresh(url);if(r.ok)return r;last=new Error(url+" -> "+r.status)}catch(e){last=e}await wait(4000)}throw last}
const home=await waitText(base+"/",t=>t.includes("app-lite.js?v="+build),"production home");
const app=await waitText(base+"/src/app-lite.js?v="+build,t=>t.includes("setTimeout(()=>loadSearchExtra(initialQ),0)"),"production app");
const analyticsCfg=await waitText(base+"/src/analytics-config.js",t=>t.includes('provider:"ERN_FIRST_PARTY"')&&t.includes("enabled:true")&&t.includes("ern-analytics-api"),"production analytics config");
const analyticsRuntime=await waitText(base+"/src/analytics-runtime.js",t=>t.includes("ERN_SEARCH_ANALYTICS")&&t.includes("page_view")&&t.includes("globalPrivacyControl"),"production analytics runtime");
const commercialRuntime=await waitText(base+"/src/commercial-attribution-runtime.js",t=>t.includes('"/data/travel-offers.json"')&&t.includes("travelOption"),"production commercial attribution runtime");
const analyticsDeployment=await (await get(base+"/data/analytics-deployment.json")).json();
const trafficGrowth=await (await get(base+"/data/traffic-growth-priorities.json")).json();
if(trafficGrowth?.trafficMetricSemanticsVersion!==2||!trafficGrowth?.cleanDestinationAttributionStartsAt)throw new Error("production traffic-growth baseline is not reconciled to clean v2 attribution");
if(analyticsDeployment?.publicCollectionActive!==true||analyticsDeployment?.healthVerified!==true||analyticsDeployment?.metricSemanticsVersion!==2)throw new Error("production analytics deployment state/metric semantics are not active and reconciled");
const analyticsHealth=await (await get(String(analyticsDeployment.healthUrl||""))).json();
if(analyticsHealth?.ok!==true||analyticsHealth?.analyticsEnabled!==true||analyticsHealth?.durableStorage!==true||analyticsHealth?.rawNetworkIdentifiersStored!==false||analyticsHealth?.eventRowsStored!==false)throw new Error("live analytics health/privacy invariant failed");
for(const marker of ["setTimeout(()=>loadSearchExtra(initialQ),0)","const dc=()=>state.sources.concat(state.sx),ds=s=>","renderDiscoveryProof();renderWander();renderLocalEarth();renderQuickSearches();renderSaved()","Math.min(8,setLimit)","(providers.get(r)||0)>=2||(countries.get(c)||0)>=2","countries.set(c,(countries.get(c)||0)+1)","note=$(\"#atlasBeyondNote\"),cat=dc()","let pool=placeMatches.length?[...placeMatches]:dc().filter(guideEligible)","return dc().filter(guideEligible).filter(s=>{const hay=sst(s);"])if(!app.includes(marker))throw new Error("production app missing reality-sync marker: "+marker);
const core=await (await get(base+"/data/sources.json")).json();
const extra=await (await get(base+"/data/search-supplemental.json")).json();
if(!Array.isArray(core)||!Array.isArray(extra))throw new Error("production catalogs are not arrays");
if(extra.length<400)throw new Error("production supplemental catalog unexpectedly small: "+extra.length);
const all=[...core,...extra],ids=new Set(all.map(x=>x?.id).filter(Boolean));
const searchable=all.filter(x=>x?.health==="HEALTHY"&&x.truth!=="PREVIEW"&&String(x.sourceUrl||x.officialUrl||"").startsWith("https://"));
const places=new Set(searchable.map(x=>x.placeId||x.id)),countries=new Set(searchable.map(x=>x.country).filter(Boolean));
const now=Date.now(),windowHours=s=>s?.truth==="LIVE_IMAGE"||s?.playback==="IMAGE_REFRESH"?72:s?.playback==="EMBED"?168:s?.truth==="EXTERNAL_LIVE"||s?.truth==="PARTNER"?168:336;
const ageHours=s=>{const t=Date.parse(s?.lastSuccessfulCheck||s?.checkedAt||"");return Number.isFinite(t)?Math.max(0,(now-t)/36e5):Infinity};
const playbackFresh=s=>s?.playback!=="EMBED"||(()=>{const t=Date.parse(s?.playbackVerifiedAt||"");return Number.isFinite(t)&&(now-t)/36e5<=168&&(now-t)>=-5/60})();
const sourceVisuals=core.filter(s=>s?.health==="HEALTHY"&&!s.featuredHold&&!s.watchHold&&Number(s.quality)>=80&&Number(s.moment)>=70&&ageHours(s)<=windowHours(s)&&playbackFresh(s)&&["EMBED","IMAGE_REFRESH"].includes(s.playback)&&String(s.thumbnailUrl||"").startsWith("https://"));
const visualProviders=new Set(sourceVisuals.map(s=>s.provider).filter(Boolean));
if(sourceVisuals.length<8||visualProviders.size<5)throw new Error("Watch Earth source-image reality floor failed: "+sourceVisuals.length+" visuals / "+visualProviders.size+" providers");
if(places.size<740||countries.size<120)throw new Error("production discovery breadth below reconciled floor: "+places.size+" places / "+countries.size+" countries");
if(!home.includes('id="proofPlaces">751</strong>')||!home.includes('id="proofCountries">130</strong>'))throw new Error("production home fallback counts do not match reconciled catalog");
for(const id of ["taitung-jinzun","norway-oslo-port-live","iceland-akureyri-port-live","germany-helgoland-harbor-live","south-africa-kruger-orpen-live"])if(!ids.has(id))throw new Error("production catalog missing expected reconciled source: "+id);
const demandText=s=>[s?.title,s?.placeId,s?.city,s?.state,s?.region,s?.country,s?.provider,s?.story,...(s?.categories||[]),...(s?.tags||[]),...(s?.aliases||[])].filter(Boolean).join(" ").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
for(const q of ["chicago","arches","new york"]){
  if(!searchable.some(s=>demandText(s).includes(q)))throw new Error("production unified catalog still misses observed search demand: "+q);
}
if(!app.includes('$("#proofPlaces").textContent=groupByPlace(s).length')||!app.includes('$("#proofCountries").textContent=new Set(s.map(x=>x.country).filter(Boolean)).size')||!app.includes('$("#proofCurrent").textContent=groupByPlace(h).length'))throw new Error("production app missing reconciled visitor-count semantics");
const jinzunPage=await waitText(base+"/places/taitung-jinzun/",t=>t.includes("Explore Taitung &amp; Taiwan's East Coast")&&t.includes("Affiliate link")&&t.includes("pid=P00322254")&&t.includes('data-offer-id="viator-taitung-east-coast-public"')&&t.includes("src/commercial-attribution-runtime.js"),"Jinzun planning page");
if(!jinzunPage.includes("Affiliate availability never affects ERN source ranking"))throw new Error("Jinzun page lost commission-neutral planning disclosure");
console.log(JSON.stringify({ok:true,homeRevision:build,core:core.length,supplemental:extra.length,combined:core.length+extra.length,healthySearchablePlaces:places.size,healthyCountries:countries.size,taitungBenchmark:ids.has("taitung-jinzun"),jinzunCommissionPath:true,analyticsLive:true,trafficMetricSemanticsVersion:2,trafficGrowthBaselineReconciled:true,destinationCommercialTelemetry:true,observedSearchGapsResolved:["chicago","arches","new york"],watchEarthSourceVisuals:sourceVisuals.length,watchEarthVisualProviders:visualProviders.size,checked:[...ids].filter(id=>["taitung-jinzun","norway-oslo-port-live","iceland-akureyri-port-live","germany-helgoland-harbor-live","south-africa-kruger-orpen-live"].includes(id))},null,2));
