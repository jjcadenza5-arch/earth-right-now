import { currentWindowEyebrow } from "../src/current-window-label.js";
import { currentSource } from "../src/discovery-eligibility.js";
import { sourceAvailabilityState,recencyState } from "../src/source-recency.js";
import { currentTravelOffer } from "../src/travel-offer-verification.js";
import { affiliatePartner,activeAffiliatePartner } from "../src/affiliate-partners.js";
import { currentLocalDirectoryEntry } from "../src/local-directory-status.js";
import { embedPlaybackProofCurrent } from "../src/playback-proof.js";
import { EDITORIAL_COLLECTIONS,editorialCollectionRows,editorialCollectionMatches } from "../src/editorial-collections.js";
import { DISCOVERY_LOCALES,discoveryLocale,localizedCollection } from "../src/editorial-collections-l10n.js";
import fs from "node:fs";

const discoverDefinitions=EDITORIAL_COLLECTIONS;
const coreSources=JSON.parse(fs.readFileSync("data/sources.json","utf8"));
const searchSupplemental=JSON.parse(fs.readFileSync("data/search-supplemental.json","utf8"));
const sources=[...coreSources,...searchSupplemental];
const travelOffers=JSON.parse(fs.readFileSync("data/travel-offers.json","utf8"));
const localDirectory=JSON.parse(fs.readFileSync("data/local-directory.json","utf8"));
const affiliatePartners=JSON.parse(fs.readFileSync("data/affiliate-partners.json","utf8"));
const base="https://earthrightnow.app/";
const localizedDiscoverUrl=(locale,id="")=>locale==="en"?base+"discover/"+(id?id+"/":""):base+locale+"/discover/"+(id?id+"/":"");
const discoveryAlternates=id=>DISCOVERY_LOCALES.map(locale=>'<link rel="alternate" hreflang="'+locale+'" href="'+localizedDiscoverUrl(locale,id)+'">').join("")+'<link rel="alternate" hreflang="x-default" href="'+localizedDiscoverUrl("en",id)+'">';
const staticLastmod="2026-09-29";
const esc=s=>String(s??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const slug=s=>String(s).replace(/[^a-zA-Z0-9_-]/g,"-");
const safe=u=>{try{const x=new URL(u);return /^https?:$/.test(x.protocol)?x.toString():""}catch{return""}};
const date=s=>{const d=new Date(s);return Number.isNaN(d.getTime())?"":d.toISOString()};
const pageCurrentSource=(s,now)=>currentSource(s,{now})&&embedPlaybackProofCurrent(s,{now});
const commonAlias=s=>(s.aliases||[]).find(a=>a&&a.length>=3&&!/^(st|mt)\.?\s/i.test(a))||"";
const seoName=s=>s.seoName||s.city||(s.region&&!/[\/,]/.test(s.region)&&String(s.title||"").toLowerCase().startsWith(String(s.region).toLowerCase())?s.region:"")||commonAlias(s)||String(s.title||"").split(" — ")[0]||s.title;
const sourceKind=s=>s.truth==="LIVE_VIDEO"?"live video":s.truth==="LIVE_IMAGE"?"current image":s.truth==="EXTERNAL_LIVE"?"official external live source":s.truth==="PARTNER"?"partner source":"reference source";

const latestDate=items=>{
  const times=items.map(s=>Date.parse(s.lastSuccessfulCheck||s.checkedAt||"")).filter(Number.isFinite).sort((a,b)=>b-a);
  return times[0]?new Date(times[0]).toISOString().slice(0,10):null;
};

const map=new Map();
for(const s of sources){
  const id=s.placeId||s.id;
  if(!map.has(id))map.set(id,[]);
  map.get(id).push(s);
}

fs.rmSync("places",{recursive:true,force:true});
fs.mkdirSync("places",{recursive:true});

const placeRows=[];
const urls=[];
const buildNow=new Date();
const activePartners=new Set(affiliatePartners.map(affiliatePartner).filter(Boolean).filter(p=>activeAffiliatePartner(p,{now:buildNow.getTime()})).map(p=>p.id));
const offerForPlace=id=>travelOffers.filter(o=>o?.placeId===id&&o?.verified===true&&currentTravelOffer(o,{now:buildNow.getTime()})&&(!o.affiliate||activePartners.has(String(o.partnerId||""))));
const localForPlace=id=>localDirectory.filter(x=>x?.placeId===id&&currentLocalDirectoryEntry(x,{now:buildNow,maxAgeDays:90})&&safe(x.url));
const scheduledClosedSource=s=>{const a=sourceAvailabilityState(s,{now:buildNow});return a.restricted&&!a.open&&recencyState(s,{now:buildNow})==="CURRENT_CHECK"&&s.health==="HEALTHY"&&embedPlaybackProofCurrent(s,{now:buildNow})};
const placeIndexable=rows=>rows.some(s=>pageCurrentSource(s,buildNow))||rows.some(scheduledClosedSource);

for(const [id,items] of map){
  const currentItems=items.filter(s=>pageCurrentSource(s,buildNow));
  const scheduledClosedItems=items.filter(scheduledClosedSource);
  const waitingItems=items.filter(s=>!currentItems.includes(s)&&!scheduledClosedItems.includes(s));
  const indexable=currentItems.length>0||scheduledClosedItems.length>0;
  const preferred=[...(currentItems.length?currentItems:items)].sort((a,b)=>(b.quality||0)-(a.quality||0))[0];
  const title=preferred.title;
  const destinationName=seoName(preferred);
  const pageName=String(title||"").startsWith(destinationName+" — ")?destinationName+" "+String(title).slice((destinationName+" — ").length):destinationName;
  const aliases=[...(preferred.aliases||[])].filter(Boolean);
  const city=preferred.city||"";
  const state=preferred.state||"";
  const where=[city,state||preferred.region,preferred.country].filter(Boolean).join(", ");
  const story=(preferred.story||("Available Earth Right Now views for "+title)).slice(0,220);
  const desc=currentItems.length
    ?("See "+destinationName+" now with Earth Right Now. "+story).slice(0,220)
    :scheduledClosedItems.length
      ?("ERN has a recently verified source for "+title+", but it is outside the provider's published live hours right now. Check the published schedule or return when the source is open.").slice(0,220)
      :("ERN currently has provider source information for "+title+", but no active current-source verification is available right now. Open the provider source directly or check back after ERN revalidates it.").slice(0,220);
  const url=base+"places/"+encodeURIComponent(id)+"/";
  const lat=Number(preferred.lat),lon=Number(preferred.lon);
  const lastmod=latestDate(items);
  const placeData={
    "@type":"Place",
    "@id":url+"#place",
    "name":title,
    ...(title!==destinationName||aliases.length?{"alternateName":[destinationName,...aliases].filter((x,i,a)=>x&&x!==title&&a.indexOf(x)===i)}:{}),
    "description":desc,
    "url":url,
    "mainEntityOfPage":{"@id":url},
    "containedInPlace":{"@type":"Place","name":where||preferred.country||destinationName},
    ...(city||state||preferred.region||preferred.country?{"address":{"@type":"PostalAddress",...(city?{"addressLocality":city}:{}),...(state||preferred.region?{"addressRegion":state||preferred.region}:{}),...(preferred.country?{"addressCountry":preferred.country}:{})}}:{}),
    "additionalProperty":[
      {"@type":"PropertyValue","name":"ERN source status","value":currentItems.length?"Current verified view available":scheduledClosedItems.length?"Verified source outside published live hours":"Reference only / recheck due"},
      {"@type":"PropertyValue","name":"ERN source type","value":sourceKind(preferred)}
    ]
  };
  if(Number.isFinite(lat)&&Number.isFinite(lon))placeData.geo={"@type":"GeoCoordinates","latitude":lat,"longitude":lon};
  const graph={
    "@context":"https://schema.org",
    "@graph":[
      {"@type":"WebPage","@id":url,"url":url,"name":pageName+(currentItems.length?" Live Now":" Live View")+" | Earth Right Now","description":desc,"isPartOf":{"@id":base+"#website"},"mainEntity":{"@id":url+"#place"},"about":{"@id":url+"#place"},"breadcrumb":{"@id":url+"#breadcrumb"},"citation":[...new Set(items.map(s=>safe(s.sourceUrl||s.officialUrl)).filter(Boolean))],...(lastmod?{"dateModified":lastmod}: {})},
      placeData,
      {"@type":"BreadcrumbList","@id":url+"#breadcrumb","itemListElement":[
        {"@type":"ListItem","position":1,"name":"Earth Right Now","item":base},
        {"@type":"ListItem","position":2,"name":"Places","item":base+"places/"},
        {"@type":"ListItem","position":3,"name":title,"item":url}
      ]}
    ]
  };

  const preferredCategories=new Set(preferred.categories||[]);
  const related=[...map.entries()]
    .filter(([otherId,rows])=>otherId!==id&&placeIndexable(rows))
    .map(([otherId,rows])=>{
      const rep=[...rows].sort((a,b)=>(b.quality||0)-(a.quality||0))[0];
      const overlap=(rep.categories||[]).filter(x=>preferredCategories.has(x)).length;
      const sameCountry=Boolean(preferred.country&&rep.country===preferred.country);
      const sameRegion=Boolean(preferred.region&&rep.region===preferred.region);
      const sameCity=Boolean(preferred.city&&rep.city===preferred.city);
      const score=(sameCountry?5:0)+(sameRegion?3:0)+(sameCity?5:0)+overlap*2+(rep.truth==="LIVE_VIDEO"?1:0);
      return{id:otherId,title:rep.title,country:rep.country||"",score};
    })
    .filter(x=>x.score>0)
    .sort((a,b)=>b.score-a.score||a.title.localeCompare(b.title))
    .slice(0,6);
  const relatedHtml=related.length
    ?'<h2>Explore related places</h2><p class="ern-note">Chosen by place/category similarity and current ERN availability — never by payment.</p><ul>'+related.map(x=>'<li><a href="'+base+'places/'+encodeURIComponent(x.id)+'/">'+esc(x.title)+'</a>'+(x.country?' — '+esc(x.country):'')+'</li>').join("")+'</ul>'
    :"";

  const cardFor=s=>{
    const href=safe(s.sourceUrl||s.officialUrl);
    const checked=date(s.lastSuccessfulCheck||s.checkedAt);
    const fresh=checked?' · ERN checked <time datetime="'+esc(checked)+'">'+esc(checked.slice(0,10))+'</time>':" · verification time unavailable";
    const playbackChecked=s.playback==="EMBED"?date(s.playbackVerifiedAt):null;
    const playback=playbackChecked?' · Playback checked <time datetime="'+esc(playbackChecked)+'">'+esc(playbackChecked.slice(0,10))+'</time>':"";
    const externalCurrent=pageCurrentSource(s,buildNow)&&s.playback==="EXTERNAL";
    const mode=s.playback==="EMBED"?"Playback: embedded in ERN":externalCurrent?"Playback: live stream available at source":s.playback==="IMAGE_REFRESH"?"Playback: refreshed current image":"Playback: provider source";
    const link=href?' · <a href="'+esc(href)+'" rel="noopener noreferrer">'+(externalCurrent?"Open live source":"Provider source")+'</a>':"";
    const availability=sourceAvailabilityState(s,{now:buildNow});
    const playbackFresh=embedPlaybackProofCurrent(s,{now:buildNow});
    const truth=!playbackFresh&&s.playback==="EMBED"?"PLAYBACK RECHECK DUE":availability.restricted&&!availability.open?"OUTSIDE LIVE HOURS":currentWindowEyebrow(s,{now:buildNow});
    return '<li><strong>'+esc(s.title)+'</strong> — '+esc(truth)+' · Provider: '+esc(s.provider||"Provider")+' · Source type: '+esc(sourceKind(s))+' · '+esc(mode)+fresh+playback+link+'</li>';
  };
  const currentCards=currentItems.map(cardFor).join("");
  const waitingCards=waitingItems.map(cardFor).join("");
  const scheduledClosedCards=scheduledClosedItems.map(cardFor).join("");
  const currentSection=currentItems.length?'<h2>Current verified views</h2><ul>'+currentCards+'</ul>':"";
  const scheduledSection=scheduledClosedItems.length?'<h2>Outside published live hours</h2><p class="ern-note">These sources have current verification but are outside a provider-published live schedule right now. ERN keeps the source visible without calling it currently live.</p><ul>'+scheduledClosedCards+'</ul>':"";
  const waitingSection=waitingItems.length?'<h2>Sources awaiting recheck or recovery</h2><p class="ern-note">These provider sources remain in ERN\'s catalog, but current evidence is incomplete, stale, degraded or otherwise outside the active current-source gate. They are not presented as current until the relevant check recovers.</p><ul>'+waitingCards+'</ul>':"";
  const viewsHtml=currentSection+scheduledSection+waitingSection;

  const offers=currentItems.length?offerForPlace(id):[];
  const locals=(currentItems.length||scheduledClosedItems.length)?localForPlace(id):[];
  const planningHtml=offers.length?'<h2>Plan after looking</h2><p class="ern-note">Optional planning links shown only after the Earth view is selected. Affiliate availability never affects ERN source ranking.</p><ul>'+offers.slice(0,3).map(o=>'<li><a href="'+esc(safe(o.url))+'" rel="sponsored noopener noreferrer">'+esc(o.title||("Plan with "+o.provider))+'</a> — '+esc(o.provider||"Partner")+' · Affiliate link</li>').join("")+'</ul>':"";
  const localHtml=locals.length?'<h2>Reviewed local places</h2><p class="ern-note">Reviewed local places are shown for visitor usefulness. These entries are not paid placements.</p><ul>'+locals.slice(0,4).map(x=>'<li><a href="'+esc(safe(x.url))+'" rel="noopener noreferrer">'+esc(x.name)+'</a> — '+esc(x.summary||x.type||"Local place")+(x.address?' · '+esc(x.address):'')+'</li>').join("")+'</ul>':"";
  const coordinateText=Number.isFinite(lat)&&Number.isFinite(lon)?((preferred.coordinateBasis?"Map reference":"Coordinates")+": "+lat+", "+lon):null;
  const coordinateNote=preferred.coordinateNote?'<p class="ern-note">'+esc(preferred.coordinateNote)+'</p>':"";
  const facts=[city?"City: "+city:null,state?"State/region: "+state:null,!state&&preferred.region?"Region: "+preferred.region:null,preferred.country?"Country: "+preferred.country:null,aliases.length?"Also known as: "+aliases.join(", "):null,preferred.timeZone?"Time zone: "+preferred.timeZone:null,coordinateText].filter(Boolean).join(" · ");
  const categoryLinks=discoverDefinitions.filter(def=>editorialCollectionMatches(preferred,def)).slice(0,3).map(def=>'<a href="'+base+'discover/'+def.id+'/">'+esc(def.title)+'</a>');
  const categoryHtml=categoryLinks.length?'<p class="ern-note">Explore: '+categoryLinks.join(" · ")+'</p>':"";
  const breadcrumb='<nav class="ern-breadcrumb" aria-label="Breadcrumb"><a href="'+base+'">Earth Right Now</a><span>›</span><a href="'+base+'places/">Places</a><span>›</span><span aria-current="page">'+esc(title)+'</span></nav>';

  const primaryCta=currentItems.length
    ?'<a class="ern-cta" href="'+base+'#place='+encodeURIComponent(id)+'">See '+esc(title)+' in Earth Right Now →</a>'
    :'<a class="ern-cta" href="'+base+'?q='+encodeURIComponent(title)+'">Explore current ERN windows →</a>';
  const trustLinks='<p class="ern-note"><a href="'+base+'how-ern-works.html">How ERN works</a> · <a href="'+base+'source-policy.html">Live & current source policy</a> · <a href="'+base+'editorial-principles.html">Editorial principles</a></p>';

  const html='<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+esc(pageName)+(currentItems.length?' Live Now':' Live View')+' | Earth Right Now</title><meta name="description" content="'+esc(desc)+'"><meta name="robots" content="'+(indexable?"index,follow":"noindex,follow")+'"><meta property="og:site_name" content="Earth Right Now"><meta property="og:title" content="'+esc(pageName)+(currentItems.length?' Live Now':' Live View')+' | Earth Right Now"><meta property="og:description" content="'+esc(desc)+'"><meta property="og:type" content="website"><meta property="og:url" content="'+url+'"><meta property="og:image" content="'+base+'assets/ern-social-card.png"><meta property="og:image:type" content="image/png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="Earth Right Now — See before you go."><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="'+esc(pageName)+(currentItems.length?' Live Now':' Live View')+' | Earth Right Now"><meta name="twitter:description" content="'+esc(desc)+'"><meta name="twitter:image" content="'+base+'assets/ern-social-card.png"><meta name="twitter:image:alt" content="Earth Right Now — See before you go."><meta name="theme-color" content="#062f2b"><link rel="canonical" href="'+url+'"><script type="application/ld+json">'+JSON.stringify(graph).replace(/</g,"\\u003c")+'</script><style>:root{color-scheme:dark}body{margin:0;background:radial-gradient(circle at 70% 0,#0b4d45,#062f2b 48%,#041f1c);color:#f2f8f6;font:16px/1.65 system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}main{max-width:880px;margin:auto;padding:64px 24px 88px}a{color:#a9d9cd}h1{font-family:Georgia,serif;font-size:clamp(2.4rem,7vw,5rem);font-weight:500;line-height:.98;letter-spacing:-.035em;margin:.25em 0}h2{margin-top:2.4rem;font-size:1.15rem}ul{padding-left:1.2rem}li{margin:.85rem 0;color:#d8e6e2}.ern-kicker{letter-spacing:.14em;text-transform:uppercase;font-size:.75rem;color:#a9c7bf}.ern-breadcrumb{display:flex;gap:.55rem;flex-wrap:wrap;color:#a8beb8;font-size:.9rem}.ern-cta{display:inline-block;margin:1.6rem .5rem 1.6rem 0;padding:.82rem 1.05rem;border:1px solid rgba(255,255,255,.35);background:#fff;color:#123b34;border-radius:999px;text-decoration:none;font-weight:800}.ern-note{color:#a8beb8;font-size:.9rem}</style></head><body><main>'+breadcrumb+'<p class="ern-kicker">Earth Right Now · See before you go.</p><h1>'+esc(pageName)+(currentItems.length?' live now':' live view')+'</h1><p>'+esc(where)+'</p><p>'+esc(facts)+'</p>'+categoryHtml+coordinateNote+'<p>'+esc(desc)+'</p>'+viewsHtml+localHtml+planningHtml+relatedHtml+'<p>'+primaryCta+'<a class="ern-cta" href="'+base+'?guide='+encodeURIComponent("Show me "+title)+'">Ask ERN Guide →</a></p>'+trustLinks+'<p class="ern-note">ERN distinguishes live video, refreshed live images, provider-hosted external live sources and reference images. Reference images are never presented as live. A source check confirms ERN verification at that time; it is not a promise about weather, visibility or uninterrupted provider availability.</p></main></body></html>';
  const dir="places/"+slug(id);
  fs.mkdirSync(dir,{recursive:true});
  fs.writeFileSync(dir+"/index.html",html);

  if(indexable)urls.push({loc:url,lastmod});
  placeRows.push({id,title,destinationName,aliases,city,state,country:preferred.country||"",region:preferred.region||"",story:desc,lastmod,current:currentItems.length>0,scheduled:scheduledClosedItems.length>0,indexable,categories:[...(preferred.categories||[])]});
}

placeRows.sort((a,b)=>Number(b.indexable)-Number(a.indexable)||a.country.localeCompare(b.country)||a.title.localeCompare(b.title));
const structuredRows=placeRows.filter(p=>p.indexable);
const directoryItems=placeRows.map(p=>'<li data-search="'+esc([p.title,p.destinationName,p.city,p.state,p.region,p.country,...(p.aliases||[]),p.story].filter(Boolean).join(" ").toLowerCase())+'"><a href="'+base+'places/'+encodeURIComponent(p.id)+'/"><strong>'+esc(p.title)+'</strong></a><span>'+esc([p.region,p.country].filter(Boolean).join(", "))+'</span><small>'+(p.current?'Current verified view available · ':p.scheduled?'Verified source, outside published live hours · ':'Awaiting ERN recheck or recovery · ')+esc(p.story)+'</small></li>').join("");
const directoryData={"@context":"https://schema.org","@graph":[
  {"@type":"CollectionPage","@id":base+"places/","url":base+"places/","name":"Places on Earth Right Now","description":"Browse crawlable destination pages for places with live or current Earth Right Now views.","isPartOf":{"@id":base+"#website"},"mainEntity":{"@id":base+"places/#list"}},
  {"@type":"ItemList","@id":base+"places/#list","name":"Places on Earth Right Now","numberOfItems":structuredRows.length,"itemListElement":structuredRows.map((p,i)=>({"@type":"ListItem","position":i+1,"name":p.title,"url":base+"places/"+encodeURIComponent(p.id)+"/"}))},
  {"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Earth Right Now","item":base},{"@type":"ListItem","position":2,"name":"Places","item":base+"places/"}]}
]};
const directoryHtml='<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Places — Earth Right Now</title><meta name="description" content="Browse places with truthful live and current Earth Right Now views. See before you go."><meta name="robots" content="index,follow"><link rel="canonical" href="'+base+'places/"><meta property="og:site_name" content="Earth Right Now"><meta property="og:title" content="Places — Earth Right Now"><meta property="og:description" content="Browse places with truthful live and current Earth Right Now views. See before you go."><meta property="og:type" content="website"><meta property="og:url" content="'+base+'places/"><meta property="og:image" content="'+base+'assets/ern-social-card.png"><script type="application/ld+json">'+JSON.stringify(directoryData).replace(/</g,"\\u003c")+'</script><style>:root{color-scheme:dark}body{margin:0;background:#062f2b;color:#f2f8f6;font:16px/1.55 system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}main{max-width:1000px;margin:auto;padding:56px 24px 88px}a{color:#b5e2d7}h1{font:500 clamp(2.8rem,7vw,5rem)/1 Georgia,serif;margin:.25em 0}.intro{max-width:700px;color:#c9dad5}.grid{list-style:none;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:14px}.grid li{border:1px solid rgba(255,255,255,.15);border-radius:16px;padding:16px;background:rgba(255,255,255,.04)}.grid strong,.grid span,.grid small{display:block}.grid span{color:#a9c7bf;margin:.25rem 0}.grid small{color:#c9dad5}.ern-breadcrumb{display:flex;gap:.55rem}.place-filter{display:block;margin:1.5rem 0 .5rem;font-weight:700}.place-filter input{display:block;width:min(100%,560px);margin-top:.5rem;padding:.8rem 1rem;border-radius:999px;border:1px solid rgba(255,255,255,.25);background:rgba(0,0,0,.15);color:inherit;font:inherit}</style></head><body><main><nav class="ern-breadcrumb" aria-label="Breadcrumb"><a href="'+base+'">Earth Right Now</a><span>›</span><span aria-current="page">Places</span></nav><h1>Places on Earth Right Now</h1><p class="intro">Current and schedule-verified destinations are listed first. Reference-only places awaiting recheck remain labeled for source transparency and are not advertised as current discovery pages.</p><label class="place-filter">Find a place<input id="placeFilter" type="search" placeholder="Search place, region or country" autocomplete="off"></label><p id="placeFilterStatus" class="intro" aria-live="polite"></p><ul class="grid" id="placeGrid">'+directoryItems+'</ul><script>(()=>{const input=document.getElementById("placeFilter"),rows=[...document.querySelectorAll("#placeGrid>li")],status=document.getElementById("placeFilterStatus");if(!input)return;const run=()=>{const q=input.value.trim().toLowerCase();let shown=0;for(const row of rows){const ok=!q||String(row.dataset.search||"").includes(q);row.hidden=!ok;if(ok)shown++}status.textContent=q?shown+" matching place"+(shown===1?"":"s"):""};input.addEventListener("input",run)})()</script></main></body></html>';
fs.writeFileSync("places/index.html",directoryHtml);

fs.rmSync("discover",{recursive:true,force:true});
fs.mkdirSync("discover",{recursive:true});
const languageNav=(currentLocale,id="")=>'<nav class="language-nav" aria-label="Language">'+DISCOVERY_LOCALES.map(locale=>{const lc=discoveryLocale(locale);return '<a'+(locale===currentLocale?' aria-current="page"':'')+' href="'+localizedDiscoverUrl(locale,id)+'">'+esc(lc.languageName)+'</a>'}).join("")+'</nav>';
const discoverRows=[];
for(const def of discoverDefinitions){
  const rows=editorialCollectionRows(structuredRows,def).sort((a,b)=>Number(b.current)-Number(a.current)||a.country.localeCompare(b.country)||a.title.localeCompare(b.title));
  const url=base+"discover/"+def.id+"/";
  const items=rows.map(p=>'<li><a href="'+base+'places/'+encodeURIComponent(p.id)+'/"><strong>'+esc(p.title)+'</strong></a><span>'+esc([p.region,p.country].filter(Boolean).join(", "))+'</span><small>'+(p.current?'Current verified view available':p.scheduled?'Verified source, outside published live hours':'ERN source')+'</small></li>').join("");
  const data={"@context":"https://schema.org","@graph":[
    {"@type":"CollectionPage","@id":url,"url":url,"name":def.title+" — Earth Right Now","description":def.description,"isPartOf":{"@id":base+"#website"},"mainEntity":{"@id":url+"#list"}},
    {"@type":"ItemList","@id":url+"#list","name":def.title,"numberOfItems":rows.length,"itemListElement":rows.map((p,i)=>({"@type":"ListItem","position":i+1,"name":p.title,"url":base+"places/"+encodeURIComponent(p.id)+"/"}))},
    {"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Earth Right Now","item":base},{"@type":"ListItem","position":2,"name":"Discover","item":base+"discover/"},{"@type":"ListItem","position":3,"name":def.title,"item":url}]}
  ]};
  const html='<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+esc(def.title)+' — Earth Right Now</title><meta name="description" content="'+esc(def.description)+'"><meta name="robots" content="index,follow"><link rel="canonical" href="'+url+'">'+discoveryAlternates(def.id)+'<meta property="og:site_name" content="Earth Right Now"><meta property="og:title" content="'+esc(def.title)+' — Earth Right Now"><meta property="og:description" content="'+esc(def.description)+'"><meta property="og:type" content="website"><meta property="og:url" content="'+url+'"><meta property="og:image" content="'+base+'assets/ern-social-card.png"><script type="application/ld+json">'+JSON.stringify(data).replace(/</g,"\\u003c")+'</script><style>:root{color-scheme:dark}body{margin:0;background:#062f2b;color:#f2f8f6;font:16px/1.55 system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}main{max-width:1000px;margin:auto;padding:56px 24px 88px}a{color:#b5e2d7}h1{font:500 clamp(2.8rem,7vw,5rem)/1 Georgia,serif;margin:.25em 0}.intro{max-width:720px;color:#c9dad5}.grid{list-style:none;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:14px}.grid li{border:1px solid rgba(255,255,255,.15);border-radius:16px;padding:16px;background:rgba(255,255,255,.04)}.grid strong,.grid span,.grid small{display:block}.grid span{color:#a9c7bf;margin:.25rem 0}.grid small{color:#c9dad5}.ern-breadcrumb{display:flex;gap:.55rem;flex-wrap:wrap}.discover-nav,.language-nav{display:flex;gap:.6rem;flex-wrap:wrap;margin:1.5rem 0}.discover-nav a,.language-nav a{border:1px solid rgba(255,255,255,.2);border-radius:999px;padding:.5rem .75rem;text-decoration:none}.language-nav a[aria-current="page"]{background:#fff;color:#123b34}.collection-share{border:1px solid rgba(255,255,255,.25);background:rgba(255,255,255,.08);color:#f2f8f6;border-radius:999px;padding:.65rem .9rem;font:inherit;cursor:pointer}</style></head><body><main><nav class="ern-breadcrumb" aria-label="Breadcrumb"><a href="'+base+'">Earth Right Now</a><span>›</span><a href="'+base+'discover/">Discover</a><span>›</span><span aria-current="page">'+esc(def.title)+'</span></nav>'+languageNav("en",def.id)+'<h1>'+esc(def.title)+'</h1><p class="intro">'+esc(def.description)+' ERN only lists destinations whose current/scheduled truth passes the same fail-closed discovery rules used elsewhere.</p><nav class="discover-nav" aria-label="Explore categories">'+discoverDefinitions.filter(x=>x.id!==def.id).map(x=>'<a href="'+base+'discover/'+x.id+'/">'+esc(x.title)+'</a>').join("")+'</nav><p><button class="collection-share" type="button">Share this collection</button></p><ul class="grid">'+items+'</ul><script>(()=>{const b=document.querySelector(".collection-share");if(!b)return;const payload={title:document.title,text:"Explore this Earth Right Now collection.",url:location.href};b.addEventListener("click",async()=>{try{if(navigator.share)await navigator.share(payload);else if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(payload.url);b.textContent="Copied";setTimeout(()=>b.textContent="Share this collection",1200)}}catch{}})})()</script></main></body></html>';
  const dir="discover/"+def.id;fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(dir+"/index.html",html);
  discoverRows.push({id:def.id,title:def.title,description:def.description,count:rows.length,url,lastmod:latestDate(rows)||latestDate(sources)||staticLastmod});
}
const discoverIndexData={"@context":"https://schema.org","@graph":[
 {"@type":"CollectionPage","@id":base+"discover/","url":base+"discover/","name":"Discover Earth Right Now","description":"Browse truthful current Earth views by place type and mood.","isPartOf":{"@id":base+"#website"},"mainEntity":{"@id":base+"discover/#list"}},
 {"@type":"ItemList","@id":base+"discover/#list","name":"Discover Earth Right Now","numberOfItems":discoverRows.length,"itemListElement":discoverRows.map((x,i)=>({"@type":"ListItem","position":i+1,"name":x.title,"url":x.url}))}
]};
const discoverIndexItems=discoverRows.map(x=>'<li><a href="'+x.url+'"><strong>'+esc(x.title)+'</strong></a><span>'+x.count+' current/schedule-verified place'+(x.count===1?'':'s')+'</span><small>'+esc(x.description)+'</small></li>').join("");
const discoverIndexHtml='<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Discover Earth Right Now</title><meta name="description" content="Browse truthful current Earth views by place type and mood."><meta name="robots" content="index,follow"><link rel="canonical" href="'+base+'discover/">'+discoveryAlternates("")+'<meta property="og:site_name" content="Earth Right Now"><meta property="og:title" content="Discover Earth Right Now"><meta property="og:description" content="Browse truthful current Earth views by place type and mood."><meta property="og:type" content="website"><meta property="og:url" content="'+base+'discover/"><meta property="og:image" content="'+base+'assets/ern-social-card.png"><script type="application/ld+json">'+JSON.stringify(discoverIndexData).replace(/</g,"\\u003c")+'</script><style>:root{color-scheme:dark}body{margin:0;background:#062f2b;color:#f2f8f6;font:16px/1.55 system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}main{max-width:1000px;margin:auto;padding:56px 24px 88px}a{color:#b5e2d7}h1{font:500 clamp(2.8rem,7vw,5rem)/1 Georgia,serif;margin:.25em 0}.intro{max-width:720px;color:#c9dad5}.grid{list-style:none;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:14px}.grid li{border:1px solid rgba(255,255,255,.15);border-radius:16px;padding:16px;background:rgba(255,255,255,.04)}.grid strong,.grid span,.grid small{display:block}.grid span{color:#a9c7bf;margin:.25rem 0}.grid small{color:#c9dad5}.language-nav{display:flex;gap:.6rem;flex-wrap:wrap;margin:1rem 0}.language-nav a{border:1px solid rgba(255,255,255,.2);border-radius:999px;padding:.5rem .75rem;text-decoration:none}.language-nav a[aria-current="page"]{background:#fff;color:#123b34}</style></head><body><main><p><a href="'+base+'">← Earth Right Now</a></p>'+languageNav("en")+'<h1>Discover Earth Right Now</h1><p class="intro">Choose a type of place or mood, then move into current ERN destination pages. Categories are editorial discovery paths; they never change source truth or paid ranking.</p><ul class="grid">'+discoverIndexItems+'</ul><p><a href="'+base+'places/">Browse all places →</a></p></main></body></html>';
fs.writeFileSync("discover/index.html",discoverIndexHtml);

const localizedDiscoverRows=[];
for(const locale of DISCOVERY_LOCALES.filter(x=>x!=="en")){
  const copy=discoveryLocale(locale),rootDir=locale+"/discover";
  fs.rmSync(rootDir,{recursive:true,force:true});fs.mkdirSync(rootDir,{recursive:true});
  const localeRows=[];
  for(const def of discoverDefinitions){
    const rows=editorialCollectionRows(structuredRows,def).sort((a,b)=>Number(b.current)-Number(a.current)||a.country.localeCompare(b.country)||a.title.localeCompare(b.title));
    const localized=localizedCollection(def.id,locale)||{title:def.title,description:def.description};
    const url=localizedDiscoverUrl(locale,def.id);
    const items=rows.map(p=>'<li><a href="'+base+'places/'+encodeURIComponent(p.id)+'/"><strong>'+esc(p.title)+'</strong></a><span>'+esc([p.region,p.country].filter(Boolean).join(", "))+'</span><small>'+(p.current?esc(copy.current):p.scheduled?esc(copy.scheduled):'ERN source')+'</small></li>').join("");
    const data={"@context":"https://schema.org","@graph":[
      {"@type":"CollectionPage","@id":url,"url":url,"inLanguage":locale,"name":localized.title+" — Earth Right Now","description":localized.description,"isPartOf":{"@id":base+"#website"},"mainEntity":{"@id":url+"#list"}},
      {"@type":"ItemList","@id":url+"#list","name":localized.title,"numberOfItems":rows.length,"itemListElement":rows.map((p,i)=>({"@type":"ListItem","position":i+1,"name":p.title,"url":base+"places/"+encodeURIComponent(p.id)+"/"}))}
    ]};
    const categoryNav='<nav class="discover-nav" aria-label="Collections">'+discoverDefinitions.filter(x=>x.id!==def.id).map(x=>{const t=localizedCollection(x.id,locale)||{title:x.title};return '<a href="'+localizedDiscoverUrl(locale,x.id)+'">'+esc(t.title)+'</a>'}).join("")+'</nav>';
    const shareScript='<script>(()=>{const b=document.querySelector(".collection-share");if(!b)return;const payload={title:document.title,text:'+JSON.stringify(copy.discoverDescription)+',url:location.href};b.addEventListener("click",async()=>{try{if(navigator.share)await navigator.share(payload);else if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(payload.url);b.textContent='+JSON.stringify(copy.copied)+';setTimeout(()=>b.textContent='+JSON.stringify(copy.share)+',1200)}}catch{}})})()</script>';
    const html='<!doctype html><html lang="'+locale+'"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+esc(localized.title)+' — Earth Right Now</title><meta name="description" content="'+esc(localized.description)+'"><meta name="robots" content="index,follow"><link rel="canonical" href="'+url+'">'+discoveryAlternates(def.id)+'<meta property="og:site_name" content="Earth Right Now"><meta property="og:title" content="'+esc(localized.title)+' — Earth Right Now"><meta property="og:description" content="'+esc(localized.description)+'"><meta property="og:type" content="website"><meta property="og:url" content="'+url+'"><meta property="og:image" content="'+base+'assets/ern-social-card.png"><script type="application/ld+json">'+JSON.stringify(data).replace(/</g,"\\u003c")+'</script><style>:root{color-scheme:dark}body{margin:0;background:#062f2b;color:#f2f8f6;font:16px/1.55 system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}main{max-width:1000px;margin:auto;padding:56px 24px 88px}a{color:#b5e2d7}h1{font:500 clamp(2.8rem,7vw,5rem)/1 Georgia,serif;margin:.25em 0}.intro{max-width:720px;color:#c9dad5}.grid{list-style:none;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:14px}.grid li{border:1px solid rgba(255,255,255,.15);border-radius:16px;padding:16px;background:rgba(255,255,255,.04)}.grid strong,.grid span,.grid small{display:block}.grid span{color:#a9c7bf;margin:.25rem 0}.grid small{color:#c9dad5}.discover-nav,.language-nav{display:flex;gap:.6rem;flex-wrap:wrap;margin:1rem 0}.discover-nav a,.language-nav a{border:1px solid rgba(255,255,255,.2);border-radius:999px;padding:.5rem .75rem;text-decoration:none}.language-nav a[aria-current="page"]{background:#fff;color:#123b34}.collection-share{border:1px solid rgba(255,255,255,.25);background:rgba(255,255,255,.08);color:#f2f8f6;border-radius:999px;padding:.65rem .9rem;font:inherit;cursor:pointer}</style></head><body><main><p><a href="'+localizedDiscoverUrl(locale)+'">← '+esc(copy.discoverTitle)+'</a></p>'+languageNav(locale,def.id)+'<h1>'+esc(localized.title)+'</h1><p class="intro">'+esc(localized.description)+'</p>'+categoryNav+'<p><button class="collection-share" type="button">'+esc(copy.share)+'</button></p><ul class="grid">'+items+'</ul>'+shareScript+'</main></body></html>';
    const dir=rootDir+"/"+def.id;fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(dir+"/index.html",html);
    const lastmod=latestDate(rows)||latestDate(sources)||staticLastmod;
    localeRows.push({id:def.id,title:localized.title,description:localized.description,count:rows.length,url,lastmod});
    localizedDiscoverRows.push({loc:url,lastmod});
  }
  const indexUrl=localizedDiscoverUrl(locale);
  const indexData={"@context":"https://schema.org","@type":"CollectionPage","@id":indexUrl,"url":indexUrl,"inLanguage":locale,"name":copy.discoverTitle,"description":copy.discoverDescription,"isPartOf":{"@id":base+"#website"}};
  const items=localeRows.map(x=>'<li><a href="'+x.url+'"><strong>'+esc(x.title)+'</strong></a><span>'+x.count+'</span><small>'+esc(x.description)+'</small></li>').join("");
  const indexHtml='<!doctype html><html lang="'+locale+'"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+esc(copy.discoverTitle)+'</title><meta name="description" content="'+esc(copy.discoverDescription)+'"><meta name="robots" content="index,follow"><link rel="canonical" href="'+indexUrl+'">'+discoveryAlternates("")+'<meta property="og:site_name" content="Earth Right Now"><meta property="og:title" content="'+esc(copy.discoverTitle)+'"><meta property="og:description" content="'+esc(copy.discoverDescription)+'"><meta property="og:type" content="website"><meta property="og:url" content="'+indexUrl+'"><meta property="og:image" content="'+base+'assets/ern-social-card.png"><script type="application/ld+json">'+JSON.stringify(indexData).replace(/</g,"\\u003c")+'</script><style>:root{color-scheme:dark}body{margin:0;background:#062f2b;color:#f2f8f6;font:16px/1.55 system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}main{max-width:1000px;margin:auto;padding:56px 24px 88px}a{color:#b5e2d7}h1{font:500 clamp(2.8rem,7vw,5rem)/1 Georgia,serif;margin:.25em 0}.intro{max-width:720px;color:#c9dad5}.grid{list-style:none;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:14px}.grid li{border:1px solid rgba(255,255,255,.15);border-radius:16px;padding:16px;background:rgba(255,255,255,.04)}.grid strong,.grid span,.grid small{display:block}.grid span{color:#a9c7bf;margin:.25rem 0}.grid small{color:#c9dad5}.language-nav{display:flex;gap:.6rem;flex-wrap:wrap;margin:1rem 0}.language-nav a{border:1px solid rgba(255,255,255,.2);border-radius:999px;padding:.5rem .75rem;text-decoration:none}.language-nav a[aria-current="page"]{background:#fff;color:#123b34}</style></head><body><main><p><a href="'+base+'">← Earth Right Now</a></p>'+languageNav(locale)+'<h1>'+esc(copy.discoverTitle)+'</h1><p class="intro">'+esc(copy.discoverIntro)+'</p><ul class="grid">'+items+'</ul><p><a href="'+base+'places/">'+esc(copy.browsePlaces)+'</a></p></main></body></html>';
  fs.writeFileSync(rootDir+"/index.html",indexHtml);
  localizedDiscoverRows.push({loc:indexUrl,lastmod:latestDate(sources)||staticLastmod});
}

const staticUrls=[
  {loc:base,lastmod:staticLastmod},
  {loc:base+"places/",lastmod:latestDate(sources)||staticLastmod},
  {loc:base+"discover/",lastmod:latestDate(sources)||staticLastmod},
  ...discoverRows.map(x=>({loc:x.url,lastmod:x.lastmod})),
  ...localizedDiscoverRows,
  {loc:base+"about.html",lastmod:staticLastmod},
  {loc:base+"how-ern-works.html",lastmod:staticLastmod},
  {loc:base+"source-policy.html",lastmod:staticLastmod},
  {loc:base+"editorial-principles.html",lastmod:staticLastmod},
  {loc:base+"faq.html",lastmod:staticLastmod},
  {loc:base+"privacy.html",lastmod:staticLastmod},
  {loc:base+"for-places.html",lastmod:staticLastmod},
  {loc:base+"now-moments.html",lastmod:staticLastmod},
  {loc:base+"stories.html",lastmod:staticLastmod},
  {loc:base+"press.html",lastmod:staticLastmod}
];
const xml='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+[...staticUrls,...urls].map(u=>'  <url><loc>'+u.loc.replace(/&/g,"&amp;")+'</loc>'+(u.lastmod?'<lastmod>'+u.lastmod+'</lastmod>':'')+'</url>').join("\n")+'\n</urlset>\n';
fs.writeFileSync("sitemap.xml",xml);
const referenceOnlyCount=placeRows.filter(p=>!p.indexable).length;console.log("Generated "+urls.length+" indexable destination pages + "+referenceOnlyCount+" reference-only noindex pages plus /places/ and "+discoverRows.length+" /discover/ category pages");
