// Mount St Helens current-image promotion 2026-10-08
// traffic snapshot reconciled 2026-10-08 04:54
// Kilauea fail-closed staging reconciled 2026-10-08
// Kilauea readiness counts reconciled 2026-10-08
const base=(process.argv[2]||"https://earthrightnow.app/").replace(/\/$/,""),build=String(process.env.GITHUB_SHA||"").slice(0,12);
if(!build)throw new Error("GITHUB_SHA is required for production reality verification");
const wait=ms=>new Promise(r=>setTimeout(r,ms));
async function fetchFresh(url){const join=url.includes("?")?"&":"?";return fetch(url+join+"ernReality="+Date.now(),{redirect:"follow",headers:{"cache-control":"no-cache"}})}
async function waitText(url,predicate,label,tries=18){let last="no response";for(let i=0;i<tries;i++){try{const r=await fetchFresh(url);const t=await r.text();last=r.status+" "+t.slice(0,120);if(r.ok&&predicate(t))return t}catch(e){last=String(e)}await wait(5000)}throw new Error(label+" did not reach expected production state: "+last)}
async function get(url,tries=8){let last;for(let i=0;i<tries;i++){try{const r=await fetchFresh(url);if(r.ok)return r;last=new Error(url+" -> "+r.status)}catch(e){last=e}await wait(4000)}throw last}
const home=await waitText(base+"/",t=>t.includes("app-lite.js?v="+build),"production home");
const app=await waitText(base+"/src/app-lite.js?v="+build,t=>t.includes("setTimeout(()=>loadSearchExtra(initialQ),0)"),"production app");
const liteCss=await waitText(base+"/src/styles-lite.css",t=>t.includes(".viewer-stage .c"),"production current-image viewer CSS");
const analyticsCfg=await waitText(base+"/src/analytics-config.js",t=>t.includes('provider:"ERN_FIRST_PARTY"')&&t.includes("enabled:true")&&t.includes("ern-analytics-api"),"production analytics config");
const analyticsRuntime=await waitText(base+"/src/analytics-runtime.js",t=>t.includes("ERN_SEARCH_ANALYTICS")&&t.includes("page_view")&&t.includes("globalPrivacyControl")&&t.includes("},1500);"),"production analytics runtime");
const commercialRuntime=await waitText(base+"/src/commercial-attribution-runtime.js",t=>t.includes('"/data/travel-offers.json"')&&t.includes("travelOption"),"production commercial attribution runtime");
const analyticsDeployment=await (await get(base+"/data/analytics-deployment.json")).json();
const trafficGrowth=await (await get(base+"/data/traffic-growth-priorities.json")).json();
const businessGrowth=await (await get(base+"/data/business-growth-signals.json")).json();
if(trafficGrowth?.searchMeasurementContract?.searchAnalyticsDebounceMs!==1500||trafficGrowth?.searchMeasurementContract?.triageSchemaVersion!==2||trafficGrowth?.searchMeasurementContract?.rawZeroResultCountsPreserved!==true||trafficGrowth?.searchMeasurementContract?.automaticCatalogMutationAllowed!==false||trafficGrowth?.searchMeasurementContract?.automaticAliasMutationAllowed!==false)throw new Error("production traffic growth lost qualified search-measurement contract");
if(businessGrowth?.currentOperatingEvidence?.metricSemanticsVersion!==2||businessGrowth?.currentOperatingEvidence?.approximateUniqueVisitors!==trafficGrowth?.latestObservedTraffic?.approximateUniqueVisitors||businessGrowth?.currentOperatingEvidence?.pageViews!==trafficGrowth?.latestObservedTraffic?.pageViews||businessGrowth?.currentOperatingEvidence?.earthSearches!==trafficGrowth?.latestObservedTraffic?.earthSearches||businessGrowth?.currentOperatingEvidence?.travelOptionOpens!==trafficGrowth?.latestObservedTraffic?.travelOptionOpens)throw new Error("production business-growth signals drift from reconciled traffic baseline");
if(trafficGrowth?.trafficMetricSemanticsVersion!==2||!trafficGrowth?.cleanDestinationAttributionStartsAt)throw new Error("production traffic-growth baseline is not reconciled to clean v2 attribution");
if(analyticsDeployment?.publicCollectionActive!==true||analyticsDeployment?.healthVerified!==true||analyticsDeployment?.metricSemanticsVersion!==2)throw new Error("production analytics deployment state/metric semantics are not active and reconciled");
const analyticsHealth=await (await get(String(analyticsDeployment.healthUrl||""))).json();
if(analyticsHealth?.ok!==true||analyticsHealth?.analyticsEnabled!==true||analyticsHealth?.durableStorage!==true||analyticsHealth?.rawNetworkIdentifiersStored!==false||analyticsHealth?.eventRowsStored!==false)throw new Error("live analytics health/privacy invariant failed");
for(const marker of ["className=\"c\"","n=new Set(nearby.map(x=>x.s.placeId||x.s.id))","!n.has(x.placeId||x.id)","setTimeout(()=>loadSearchExtra(initialQ),0)","const dc=()=>state.sources.concat(state.sx),ds=s=>","renderDiscoveryProof();renderWander();renderLocalEarth();renderQuickSearches();renderSaved()","Math.min(8,setLimit)","(providers.get(r)||0)>=2||(countries.get(c)||0)>=2","countries.set(c,(countries.get(c)||0)+1)","note=$(\"#atlasBeyondNote\"),cat=dc()","let pool=placeMatches.length?[...placeMatches]:dc().filter(guideEligible)","return dc().filter(guideEligible).filter(s=>{const hay=sst(s);","[\"museaum\",\"museum\"]","No current match yet.","globalThis.ERN_EVENT?.(\"share_clicked\",{placeId:s.placeId||s.id})"])if(!app.includes(marker))throw new Error("production app missing reality-sync marker: "+marker);
if(!liteCss.includes("width:auto!important")||!liteCss.includes("max-width:100%!important")||!liteCss.includes("max-height:100%!important"))throw new Error("production current-image viewer lost whole-frame fit contract");
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
if(sourceVisuals.length<17||visualProviders.size<5)throw new Error("Watch Earth source-image reality floor failed: "+sourceVisuals.length+" visuals / "+visualProviders.size+" providers");
const taiwanInsideIds=["taiwan-yehliu-live","taiwan-heping-island-live"];for(const id of taiwanInsideIds){const s=all.find(x=>x?.id===id);if(!s||s.truth!=="LIVE_VIDEO"||s.permission!=="EMBED_ALLOWED"||s.playback!=="EMBED"||!String(s.embedUrl||"").includes("youtube-nocookie.com/embed/"))throw new Error("production Taiwan inside-live binding failed: "+id)}
const currentImageIds=["nz-ruapehu-current-image","yellowstone-biscuit-basin-current-image","yellowstone-lake-current-image","nz-taranaki-current-image","nz-ngauruhoe-current-image","nz-tongariro-current-image","nz-whakaari-current-image","kilauea-summit","us-mount-st-helens-current-image"],currentImages=currentImageIds.map(id=>all.find(s=>s?.id===id));
for(const s of currentImages)if(!s||s.permission!=="EMBED_ALLOWED"||s.playback!=="IMAGE_REFRESH"||String(s.thumbnailUrl||"")!==String(s.sourceUrl||""))throw new Error("production current-image discovery card is not using its permitted source visual: "+String(s?.id||"missing"));
if(places.size<740||countries.size<120)throw new Error("production discovery breadth below reconciled floor: "+places.size+" places / "+countries.size+" countries");
if(!home.includes('id="proofPlaces">752</strong>')||!home.includes('id="proofCountries">130</strong>'))throw new Error("production home fallback counts do not match reconciled catalog");
for(const id of ["taitung-jinzun","norway-oslo-port-live","iceland-akureyri-port-live","germany-helgoland-harbor-live","south-africa-kruger-orpen-live","hua-hin-centara-live"])if(!ids.has(id))throw new Error("production catalog missing expected reconciled source: "+id);const huaHinSource=all.find(s=>s?.id==="hua-hin-centara-live");if(!huaHinSource||huaHinSource.truth!=="EXTERNAL_LIVE"||huaHinSource.permission!=="LINK_ONLY"||huaHinSource.playback!=="EXTERNAL"||!String(huaHinSource.sourceUrl||"").includes("youtube.com/watch?v=PPJ55qdY3pw"))throw new Error("production Hua Hin first-party source binding failed");
const demandText=s=>[s?.title,s?.placeId,s?.city,s?.state,s?.region,s?.country,s?.provider,s?.story,...(s?.categories||[]),...(s?.tags||[]),...(s?.aliases||[])].filter(Boolean).join(" ").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
for(const q of ["chicago","arches","new york"]){
  if(!searchable.some(s=>demandText(s).includes(q)))throw new Error("production unified catalog still misses observed search demand: "+q);
}
if(!app.includes('$("#proofPlaces").textContent=groupByPlace(s).length')||!app.includes('$("#proofCountries").textContent=new Set(s.map(x=>x.country).filter(Boolean)).size')||!app.includes('$("#proofCurrent").textContent=groupByPlace(h).length'))throw new Error("production app missing reconciled visitor-count semantics");
const travelOffers=await (await get(base+"/data/travel-offers.json")).json();
const jinzunOffer=Array.isArray(travelOffers)?travelOffers.find(o=>o?.id==="viator-taitung-east-coast-public"):null;
const ruapehuOffer=Array.isArray(travelOffers)?travelOffers.find(o=>o?.id==="viator-ruapehu-sky-waka-public"):null;
const kilaueaOffer=Array.isArray(travelOffers)?travelOffers.find(o=>o?.id==="viator-kilauea-volcanoes-national-park-public"):null;
const mahoOffer=Array.isArray(travelOffers)?travelOffers.find(o=>o?.id==="viator-maho-beach-public"):null,yehliuOffer=Array.isArray(travelOffers)?travelOffers.find(o=>o?.id==="viator-yehliu-geopark-public"):null;
const karakolOffer=Array.isArray(travelOffers)?travelOffers.find(o=>o?.id==="viator-karakol-issyk-kul-public"):null,oeschOffer=Array.isArray(travelOffers)?travelOffers.find(o=>o?.id==="viator-oeschinensee-kandersteg-public"):null,huaHinOffer=Array.isArray(travelOffers)?travelOffers.find(o=>o?.id==="viator-hua-hin-public"):null;
const denpasarOffer=Array.isArray(travelOffers)?travelOffers.find(o=>o?.id==="viator-denpasar-city-temples-public"):null;
if(!jinzunOffer||jinzunOffer.verified!==true||jinzunOffer.affiliate!==true||jinzunOffer.partnerId!=="viator"||!String(jinzunOffer.url||"").includes("pid=P00322254"))throw new Error("production Jinzun commission-capable offer is not ready");
if(!ruapehuOffer||ruapehuOffer.verified!==true||ruapehuOffer.affiliate!==true||ruapehuOffer.partnerId!=="viator"||!String(ruapehuOffer.url||"").includes("41075P14"))throw new Error("production Ruapehu demand-led planning offer is not ready");
if(!kilaueaOffer||kilaueaOffer.verified!==true||kilaueaOffer.affiliate!==true||kilaueaOffer.partnerId!=="viator"||!String(kilaueaOffer.url||"").includes("196601P1"))throw new Error("production Kilauea planning offer is not ready");
if(!mahoOffer||mahoOffer.verified!==true||mahoOffer.partnerId!=="viator"||!String(mahoOffer.url||"").includes("198496P3"))throw new Error("production Maho planning offer is not ready");
if(!yehliuOffer||yehliuOffer.verified!==true||yehliuOffer.partnerId!=="viator"||!String(yehliuOffer.url||"").includes("174468P7"))throw new Error("production Yehliu planning offer is not ready");
if(!karakolOffer||karakolOffer.verified!==true||karakolOffer.partnerId!=="viator"||!String(karakolOffer.url||"").includes("185368P11"))throw new Error("production Karakol planning offer is not ready");
if(!oeschOffer||oeschOffer.verified!==true||oeschOffer.partnerId!=="viator"||!String(oeschOffer.url||"").includes("33924P2"))throw new Error("production Oeschinensee planning offer is not ready");if(!huaHinOffer||huaHinOffer.verified!==true||huaHinOffer.partnerId!=="viator"||!String(huaHinOffer.url||"").includes("/Hua-Hin/d22968-ttd")||!String(huaHinOffer.url||"").includes("pid=P00322254"))throw new Error("production Hua Hin planning offer is not ready");
if(!denpasarOffer||denpasarOffer.verified!==true||denpasarOffer.affiliate!==true||denpasarOffer.partnerId!=="viator"||!String(denpasarOffer.url||"").includes("71852P16"))throw new Error("production Denpasar demand-led planning offer is not ready");
const ruapehuPage=await waitText(base+"/places/nz-ruapehu/",t=>t.includes("Mount Ruapehu"),"Ruapehu destination page");
if(!ruapehuPage.includes('data-offer-id="viator-ruapehu-sky-waka-public"')||!ruapehuPage.includes("Affiliate availability never affects ERN source ranking"))throw new Error("production Ruapehu page is missing the demand-led planning path or neutral-ranking disclosure");
const mahoSource=all.find(s=>s?.id==="maho-beach-current-page"),mahoCurrent=mahoSource&&mahoSource.health==="HEALTHY"&&ageHours(mahoSource)<=windowHours(mahoSource);
const mahoPage=await waitText(base+"/places/st-maarten-maho-beach/",t=>t.includes("Maho"),"Maho destination page");
if(mahoCurrent&&!mahoPage.includes('data-offer-id="viator-maho-beach-public"'))throw new Error("production current Maho page is missing its planning action");
if(!mahoCurrent&&mahoPage.includes('data-offer-id="viator-maho-beach-public"'))throw new Error("production stale Maho source must suppress its planning action");
const yehliuSource=all.find(s=>s?.id==="taiwan-yehliu-live"),yehliuPlaybackAge=yehliuSource?(now-Date.parse(yehliuSource.playbackVerifiedAt||""))/36e5:Infinity,yehliuPageCurrent=yehliuSource&&yehliuSource.health==="HEALTHY"&&ageHours(yehliuSource)<=windowHours(yehliuSource)&&yehliuPlaybackAge>=0&&yehliuPlaybackAge<=24;
const yehliuPage=await waitText(base+"/places/taiwan-yehliu/",t=>t.includes("Yehliu"),"Yehliu destination page");
if(yehliuPageCurrent&&!yehliuPage.includes('data-offer-id="viator-yehliu-geopark-public"'))throw new Error("production current Yehliu page is missing its planning action");
if(!yehliuPageCurrent&&yehliuPage.includes('data-offer-id="viator-yehliu-geopark-public"'))throw new Error("production playback-stale Yehliu page must suppress its planning action");
const karakolPage=await waitText(base+"/places/karakol-ski-base/",t=>t.includes("Karakol"),"Karakol destination page");
if(!karakolPage.includes('data-offer-id="viator-karakol-issyk-kul-public"'))throw new Error("production Karakol page is missing its planning action");
const oeschPage=await waitText(base+"/places/oeschinensee/",t=>t.includes("Oeschinensee"),"Oeschinensee destination page");
if(!oeschPage.includes('data-offer-id="viator-oeschinensee-kandersteg-public"'))throw new Error("production Oeschinensee page is missing its planning action");
const huaHinPage=await waitText(base+"/places/hua-hin-centara-live/",t=>t.includes("Hua Hin"),"Hua Hin destination page");
if(!huaHinPage.includes('data-offer-id="viator-hua-hin-public"')||!huaHinPage.includes("Affiliate availability never affects ERN source ranking"))throw new Error("production Hua Hin page is missing its planning action or neutral-ranking disclosure");
const kilaueaPage=await waitText(base+"/places/kilauea-summit/",t=>t.includes("Kīlauea"),"Kilauea destination page");
if(!kilaueaPage.includes('data-offer-id="viator-kilauea-volcanoes-national-park-public"')||!kilaueaPage.includes("Affiliate availability never affects ERN source ranking"))throw new Error("production Kilauea page is missing its planning path or neutral-ranking disclosure");
const denpasarPage=await waitText(base+"/places/denpasar-city-live/",t=>t.includes("Denpasar"),"Denpasar destination page");
const volcanoDiscover=await waitText(base+"/discover/volcanoes-earth-science/",t=>t.includes("Volcanoes & Earth Science"),"volcano discovery page");
const parksDiscover=await waitText(base+"/discover/parks-protected-places/",t=>t.includes("Parks & Protected Places"),"parks discovery page");
const thailandDiscover=await waitText(base+"/discover/thailand-live-now/",t=>t.includes("Thailand Live & Current Views")&&t.includes("Hua Hin Beach")&&t.includes("Koh Samui")&&!t.includes("Bangkok — Sukhumvit Road"),"Thailand demand-led discovery page");
const thailandTh=await waitText(base+"/th/discover/thailand-live-now/",t=>t.includes("มุมมองสดและปัจจุบันในประเทศไทย"),"Thai Thailand discovery page");
const seoSitemap=await waitText(base+"/sitemap.xml",t=>t.includes("/discover/volcanoes-earth-science/")&&t.includes("/discover/parks-protected-places/")&&t.includes("/discover/thailand-live-now/"),"SEO sitemap");
for(const locale of ["th","de","fr","ja","zh","es"]){
  if(!seoSitemap.includes("/"+locale+"/discover/volcanoes-earth-science/")||!seoSitemap.includes("/"+locale+"/discover/parks-protected-places/")||!seoSitemap.includes("/"+locale+"/discover/thailand-live-now/"))throw new Error("production sitemap is missing localized SEO collection routes for "+locale);
}
for(const [name,html] of [["volcano",volcanoDiscover],["parks",parksDiscover],["thailand",thailandDiscover]]){
  if(!html.includes('meta name="robots" content="index,follow"'))throw new Error("production "+name+" discovery page is not indexable");
  if(!html.includes('meta name="googlebot" content="max-image-preview:large,max-snippet:-1,max-video-preview:-1"'))throw new Error("production "+name+" discovery page is missing rich-preview directives");
  if(!html.includes('type="application/atom+xml"')||!html.includes("/updates.xml"))throw new Error("production "+name+" discovery page is missing ERN updates feed discovery");
  for(const locale of ["en","th","de","fr","ja","zh","es"])if(!html.includes('hreflang="'+locale+'"'))throw new Error("production "+name+" discovery page is missing hreflang "+locale);
  if(!html.includes('"@type":"ItemList"')||!html.includes('"@type":"BreadcrumbList"'))throw new Error("production "+name+" discovery page is missing collection structured data");
}
if(!denpasarPage.includes('data-offer-id="viator-denpasar-city-temples-public"')||!denpasarPage.includes("Affiliate availability never affects ERN source ranking"))throw new Error("production Denpasar page is missing the demand-led planning path or neutral-ranking disclosure");
const jinzunPage=await waitText(base+"/places/taitung-jinzun/",t=>t.includes("Taitung Jinzun"),"Jinzun destination page");
const jinzunPlanningVisible=jinzunPage.includes('data-offer-id="viator-taitung-east-coast-public"')&&jinzunPage.includes("Affiliate link")&&jinzunPage.includes("src/commercial-attribution-runtime.js");
const jinzunPlaybackGate=!jinzunPlanningVisible&&(jinzunPage.includes("PLAYBACK RECHECK DUE")||jinzunPage.includes("no active current-source verification"));
if(jinzunPlanningVisible&&!jinzunPage.includes("Affiliate availability never affects ERN source ranking"))throw new Error("Jinzun page lost commission-neutral planning disclosure");
if(!jinzunPlanningVisible&&!jinzunPlaybackGate)throw new Error("Jinzun planning path is neither visible nor truthfully playback-gated");
console.log(JSON.stringify({ok:true,homeRevision:build,core:core.length,supplemental:extra.length,combined:core.length+extra.length,healthySearchablePlaces:places.size,healthyCountries:countries.size,taitungBenchmark:ids.has("taitung-jinzun"),jinzunCommissionOfferReady:true,jinzunCommissionPathVisible:jinzunPlanningVisible,jinzunPlanningPlaybackGated:jinzunPlaybackGate,analyticsLive:true,trafficMetricSemanticsVersion:2,trafficGrowthBaselineReconciled:true,businessGrowthSignalsReconciled:true,destinationCommercialTelemetry:true,destinationShareAttribution:true,publicExpansionRealityReconciled:true,ruapehuPlanningPathVisible:true,kilaueaPlanningPathVisible:true,mahoPlanningSourceGated:true,yehliuPlanningSourceGated:true,denpasarPlanningPathVisible:true,seoGrowthCollectionsLive:["volcanoes-earth-science","parks-protected-places"],localizedSeoCollectionsInSitemap:true,localizedSeoHreflang:true,richSearchPreviewDirectives:true,updatesFeedDiscovery:true,observedSearchGapsResolved:["chicago","arches","new york"],watchEarthSourceVisuals:sourceVisuals.length,watchEarthVisualProviders:visualProviders.size,taiwanInsideLive:taiwanInsideIds,currentImageCardVisuals:currentImageIds,checked:[...ids].filter(id=>["taitung-jinzun","norway-oslo-port-live","iceland-akureyri-port-live","germany-helgoland-harbor-live","south-africa-kruger-orpen-live"].includes(id))},null,2));
