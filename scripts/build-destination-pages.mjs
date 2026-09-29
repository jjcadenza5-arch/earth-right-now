import { currentWindowEyebrow } from "../src/current-window-label.js";
import { currentSource } from "../src/discovery-eligibility.js";
import { sourceAvailabilityState,recencyState } from "../src/source-recency.js";
import { currentTravelOffer } from "../src/travel-offer-verification.js";
import { affiliatePartner,activeAffiliatePartner } from "../src/affiliate-partners.js";
import fs from "node:fs";

const sources=JSON.parse(fs.readFileSync("data/sources.json","utf8"));
const travelOffers=JSON.parse(fs.readFileSync("data/travel-offers.json","utf8"));
const localDirectory=JSON.parse(fs.readFileSync("data/local-directory.json","utf8"));
const affiliatePartners=JSON.parse(fs.readFileSync("data/affiliate-partners.json","utf8"));
const base="https://earthrightnow.app/";
const staticLastmod="2026-09-29";
const esc=s=>String(s??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const slug=s=>String(s).replace(/[^a-zA-Z0-9_-]/g,"-");
const safe=u=>{try{const x=new URL(u);return /^https?:$/.test(x.protocol)?x.toString():""}catch{return""}};
const date=s=>{const d=new Date(s);return Number.isNaN(d.getTime())?"":d.toISOString()};
const embedPlaybackCurrent=(s,now)=>{
  if(s?.playback!=="EMBED")return true;
  const t=Date.parse(s?.playbackVerifiedAt||"");
  return Number.isFinite(t)&&Math.max(0,(now.getTime()-t)/36e5)<=24;
};
const pageCurrentSource=(s,now)=>currentSource(s,{now})&&embedPlaybackCurrent(s,now);
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
const localForPlace=id=>localDirectory.filter(x=>x?.placeId===id&&x?.status==="APPROVED"&&x?.paidPlacement===false&&safe(x.url));

for(const [id,items] of map){
  const currentItems=items.filter(s=>pageCurrentSource(s,buildNow));
  const scheduledClosedItems=items.filter(s=>{
    const a=sourceAvailabilityState(s,{now:buildNow});
    return a.restricted&&!a.open&&recencyState(s,{now:buildNow})==="CURRENT_CHECK"&&s.health==="HEALTHY"&&embedPlaybackCurrent(s,buildNow);
  });
  const waitingItems=items.filter(s=>!currentItems.includes(s)&&!scheduledClosedItems.includes(s));
  const preferred=[...(currentItems.length?currentItems:items)].sort((a,b)=>(b.quality||0)-(a.quality||0))[0];
  const title=preferred.title;
  const where=[preferred.region,preferred.country].filter(Boolean).join(", ");
  const story=(preferred.story||("Available Earth Right Now views for "+title)).slice(0,220);
  const desc=currentItems.length
    ?story
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
    "description":desc,
    "url":url,
    "mainEntityOfPage":{"@id":url},
    "containedInPlace":{"@type":"Place","name":where||preferred.country||title}
  };
  if(Number.isFinite(lat)&&Number.isFinite(lon))placeData.geo={"@type":"GeoCoordinates","latitude":lat,"longitude":lon};
  const graph={
    "@context":"https://schema.org",
    "@graph":[
      {"@type":"WebPage","@id":url,"url":url,"name":"See "+title+" before you go — Earth Right Now","description":desc,"isPartOf":{"@id":base+"#website"},"mainEntity":{"@id":url+"#place"},"breadcrumb":{"@id":url+"#breadcrumb"},...(lastmod?{"dateModified":lastmod}: {})},
      placeData,
      {"@type":"BreadcrumbList","@id":url+"#breadcrumb","itemListElement":[
        {"@type":"ListItem","position":1,"name":"Earth Right Now","item":base},
        {"@type":"ListItem","position":2,"name":"Places","item":base+"places/"},
        {"@type":"ListItem","position":3,"name":title,"item":url}
      ]}
    ]
  };

  const related=[...map.entries()]
    .filter(([otherId,rows])=>otherId!==id&&rows.some(s=>s.country===preferred.country))
    .map(([otherId,rows])=>({id:otherId,title:[...rows].sort((a,b)=>(b.quality||0)-(a.quality||0))[0].title}))
    .slice(0,4);
  const relatedHtml=related.length
    ?'<h2>Explore more in '+esc(preferred.country||"this region")+'</h2><ul>'+related.map(x=>'<li><a href="'+base+'places/'+encodeURIComponent(x.id)+'/">'+esc(x.title)+'</a></li>').join("")+'</ul>'
    :"";

  const cardFor=s=>{
    const href=safe(s.sourceUrl||s.officialUrl);
    const checked=date(s.lastSuccessfulCheck||s.checkedAt);
    const fresh=checked?' · ERN checked <time datetime="'+esc(checked)+'">'+esc(checked.slice(0,10))+'</time>':" · verification time unavailable";
    const link=href?' · <a href="'+esc(href)+'" rel="noopener noreferrer">Provider source</a>':"";
    const availability=sourceAvailabilityState(s,{now:buildNow});
    const playbackFresh=embedPlaybackCurrent(s,buildNow);
    const truth=!playbackFresh&&s.playback==="EMBED"?"PLAYBACK RECHECK DUE":availability.restricted&&!availability.open?"OUTSIDE LIVE HOURS":currentWindowEyebrow(s,{now:buildNow});
    return '<li><strong>'+esc(s.title)+'</strong> — '+esc(truth)+' · '+esc(s.provider||"Provider")+fresh+link+'</li>';
  };
  const currentCards=currentItems.map(cardFor).join("");
  const waitingCards=waitingItems.map(cardFor).join("");
  const scheduledClosedCards=scheduledClosedItems.map(cardFor).join("");
  const currentSection=currentItems.length?'<h2>Current verified views</h2><ul>'+currentCards+'</ul>':"";
  const scheduledSection=scheduledClosedItems.length?'<h2>Outside published live hours</h2><p class="ern-note">These sources have current verification but are outside a provider-published live schedule right now. ERN keeps the source visible without calling it currently live.</p><ul>'+scheduledClosedCards+'</ul>':"";
  const waitingSection=waitingItems.length?'<h2>Sources awaiting recheck or recovery</h2><p class="ern-note">These provider sources remain in ERN\'s catalog, but current evidence is incomplete, stale, degraded or otherwise outside the active current-source gate. They are not presented as current until the relevant check recovers.</p><ul>'+waitingCards+'</ul>':"";
  const viewsHtml=currentSection+scheduledSection+waitingSection;

  const offers=offerForPlace(id);
  const locals=localForPlace(id);
  const planningHtml=offers.length?'<h2>Plan after looking</h2><p class="ern-note">Optional planning links shown only after the Earth view is selected. Affiliate availability never affects ERN source ranking.</p><ul>'+offers.slice(0,3).map(o=>'<li><a href="'+esc(safe(o.url))+'" rel="sponsored noopener noreferrer">'+esc(o.title||("Plan with "+o.provider))+'</a> — '+esc(o.provider||"Partner")+' · Affiliate link</li>').join("")+'</ul>':"";
  const localHtml=locals.length?'<h2>Reviewed local places</h2><p class="ern-note">Reviewed local places are shown for visitor usefulness. These entries are not paid placements.</p><ul>'+locals.slice(0,4).map(x=>'<li><a href="'+esc(safe(x.url))+'" rel="noopener noreferrer">'+esc(x.name)+'</a> — '+esc(x.summary||x.type||"Local place")+'</li>').join("")+'</ul>':"";
  const coordinateText=Number.isFinite(lat)&&Number.isFinite(lon)?((preferred.coordinateBasis?"Map reference":"Coordinates")+": "+lat+", "+lon):null;
  const coordinateNote=preferred.coordinateNote?'<p class="ern-note">'+esc(preferred.coordinateNote)+'</p>':"";
  const facts=[preferred.timeZone?"Time zone: "+preferred.timeZone:null,coordinateText].filter(Boolean).join(" · ");
  const breadcrumb='<nav class="ern-breadcrumb" aria-label="Breadcrumb"><a href="'+base+'">Earth Right Now</a><span>›</span><a href="'+base+'places/">Places</a><span>›</span><span aria-current="page">'+esc(title)+'</span></nav>';

  const html='<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>See '+esc(title)+' before you go — Earth Right Now</title><meta name="description" content="'+esc(desc)+'"><meta name="robots" content="index,follow"><meta property="og:site_name" content="Earth Right Now"><meta property="og:title" content="See '+esc(title)+' before you go — Earth Right Now"><meta property="og:description" content="'+esc(desc)+'"><meta property="og:type" content="website"><meta property="og:url" content="'+url+'"><meta property="og:image" content="'+base+'assets/ern-social-card.png"><meta property="og:image:type" content="image/png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="Earth Right Now — See before you go."><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="See '+esc(title)+' before you go — Earth Right Now"><meta name="twitter:description" content="'+esc(desc)+'"><meta name="twitter:image" content="'+base+'assets/ern-social-card.png"><meta name="twitter:image:alt" content="Earth Right Now — See before you go."><meta name="theme-color" content="#062f2b"><link rel="canonical" href="'+url+'"><script type="application/ld+json">'+JSON.stringify(graph).replace(/</g,"\\u003c")+'</script><style>:root{color-scheme:dark}body{margin:0;background:radial-gradient(circle at 70% 0,#0b4d45,#062f2b 48%,#041f1c);color:#f2f8f6;font:16px/1.65 system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}main{max-width:880px;margin:auto;padding:64px 24px 88px}a{color:#a9d9cd}h1{font-family:Georgia,serif;font-size:clamp(2.4rem,7vw,5rem);font-weight:500;line-height:.98;letter-spacing:-.035em;margin:.25em 0}h2{margin-top:2.4rem;font-size:1.15rem}ul{padding-left:1.2rem}li{margin:.85rem 0;color:#d8e6e2}.ern-kicker{letter-spacing:.14em;text-transform:uppercase;font-size:.75rem;color:#a9c7bf}.ern-breadcrumb{display:flex;gap:.55rem;flex-wrap:wrap;color:#a8beb8;font-size:.9rem}.ern-cta{display:inline-block;margin:1.6rem .5rem 1.6rem 0;padding:.82rem 1.05rem;border:1px solid rgba(255,255,255,.35);background:#fff;color:#123b34;border-radius:999px;text-decoration:none;font-weight:800}.ern-note{color:#a8beb8;font-size:.9rem}</style></head><body><main>'+breadcrumb+'<p class="ern-kicker">Earth Right Now · See before you go.</p><h1>See '+esc(title)+' before you go</h1><p>'+esc(where)+'</p><p>'+esc(facts)+'</p>'+coordinateNote+'<p>'+esc(desc)+'</p>'+viewsHtml+localHtml+planningHtml+relatedHtml+'<p><a class="ern-cta" href="'+base+'#place='+encodeURIComponent(id)+'">See '+esc(title)+' in Earth Right Now →</a><a class="ern-cta" href="'+base+'?guide='+encodeURIComponent("Show me "+title)+'">Ask ERN Guide →</a></p><p class="ern-note">ERN distinguishes live video, refreshed live images, provider-hosted external live sources and reference images. Reference images are never presented as live. A source check confirms ERN verification at that time; it is not a promise about weather, visibility or uninterrupted provider availability.</p></main></body></html>';
  const dir="places/"+slug(id);
  fs.mkdirSync(dir,{recursive:true});
  fs.writeFileSync(dir+"/index.html",html);

  urls.push({loc:url,lastmod});
  placeRows.push({id,title,country:preferred.country||"",region:preferred.region||"",story:desc,lastmod,current:currentItems.length>0,scheduled:scheduledClosedItems.length>0});
}

placeRows.sort((a,b)=>a.country.localeCompare(b.country)||a.title.localeCompare(b.title));
const directoryItems=placeRows.map(p=>'<li><a href="'+base+'places/'+encodeURIComponent(p.id)+'/"><strong>'+esc(p.title)+'</strong></a><span>'+esc([p.region,p.country].filter(Boolean).join(", "))+'</span><small>'+(p.current?'Current verified view available · ':p.scheduled?'Verified source, outside published live hours · ':'Awaiting ERN recheck or recovery · ')+esc(p.story)+'</small></li>').join("");
const directoryData={"@context":"https://schema.org","@graph":[
  {"@type":"CollectionPage","@id":base+"places/","url":base+"places/","name":"Places on Earth Right Now","description":"Browse crawlable destination pages for places with live or current Earth Right Now views.","isPartOf":{"@id":base+"#website"},"mainEntity":{"@id":base+"places/#list"}},
  {"@type":"ItemList","@id":base+"places/#list","name":"Places on Earth Right Now","numberOfItems":placeRows.length,"itemListElement":placeRows.map((p,i)=>({"@type":"ListItem","position":i+1,"name":p.title,"url":base+"places/"+encodeURIComponent(p.id)+"/"}))},
  {"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Earth Right Now","item":base},{"@type":"ListItem","position":2,"name":"Places","item":base+"places/"}]}
]};
const directoryHtml='<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Places — Earth Right Now</title><meta name="description" content="Browse places with truthful live and current Earth Right Now views. See before you go."><meta name="robots" content="index,follow"><link rel="canonical" href="'+base+'places/"><meta property="og:site_name" content="Earth Right Now"><meta property="og:title" content="Places — Earth Right Now"><meta property="og:description" content="Browse places with truthful live and current Earth Right Now views. See before you go."><meta property="og:type" content="website"><meta property="og:url" content="'+base+'places/"><meta property="og:image" content="'+base+'assets/ern-social-card.png"><script type="application/ld+json">'+JSON.stringify(directoryData).replace(/</g,"\\u003c")+'</script><style>:root{color-scheme:dark}body{margin:0;background:#062f2b;color:#f2f8f6;font:16px/1.55 system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}main{max-width:1000px;margin:auto;padding:56px 24px 88px}a{color:#b5e2d7}h1{font:500 clamp(2.8rem,7vw,5rem)/1 Georgia,serif;margin:.25em 0}.intro{max-width:700px;color:#c9dad5}.grid{list-style:none;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:14px}.grid li{border:1px solid rgba(255,255,255,.15);border-radius:16px;padding:16px;background:rgba(255,255,255,.04)}.grid strong,.grid span,.grid small{display:block}.grid span{color:#a9c7bf;margin:.25rem 0}.grid small{color:#c9dad5}.ern-breadcrumb{display:flex;gap:.55rem}</style></head><body><main><nav class="ern-breadcrumb" aria-label="Breadcrumb"><a href="'+base+'">Earth Right Now</a><span>›</span><span aria-current="page">Places</span></nav><h1>Places on Earth Right Now</h1><p class="intro">Browse places with current verified views where ERN has in-horizon evidence, plus clearly separated provider sources awaiting recheck. ERN labels each source truthfully and keeps provider attribution visible.</p><ul class="grid">'+directoryItems+'</ul></main></body></html>';
fs.writeFileSync("places/index.html",directoryHtml);

const staticUrls=[
  {loc:base,lastmod:staticLastmod},
  {loc:base+"places/",lastmod:latestDate(sources)||staticLastmod},
  {loc:base+"about.html",lastmod:staticLastmod},
  {loc:base+"privacy.html",lastmod:staticLastmod},
  {loc:base+"for-places.html",lastmod:staticLastmod},
  {loc:base+"now-moments.html",lastmod:staticLastmod},
  {loc:base+"stories.html",lastmod:staticLastmod},
  {loc:base+"press.html",lastmod:staticLastmod}
];
const xml='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+[...staticUrls,...urls].map(u=>'  <url><loc>'+u.loc.replace(/&/g,"&amp;")+'</loc>'+(u.lastmod?'<lastmod>'+u.lastmod+'</lastmod>':'')+'</url>').join("\n")+'\n</urlset>\n';
fs.writeFileSync("sitemap.xml",xml);
console.log("Generated "+urls.length+" destination pages plus /places/ directory");
