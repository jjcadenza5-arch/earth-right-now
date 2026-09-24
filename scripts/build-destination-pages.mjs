import fs from "node:fs";
import { currentWindowEyebrow } from "../src/current-window-label.js";
import { discoverableSource,currentSource } from "../src/discovery-eligibility.js";
import { destinationPreferredSource,destinationLastModified,destinationSeoGraph } from "../src/destination-seo.js";

const sources=JSON.parse(fs.readFileSync("data/sources.json","utf8"));
const base="https://earthrightnow.app/";
const buildNow=new Date();

const esc=value=>String(value??"")
  .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const safe=value=>{
  try{const u=new URL(value);return /^https?:$/.test(u.protocol)&&!u.username&&!u.password?u.toString():""}
  catch{return""}
};
const iso=value=>{const d=new Date(value);return Number.isNaN(d.getTime())?"":d.toISOString()};
const pathPart=value=>encodeURIComponent(String(value));
const groups=new Map();
for(const source of sources){
  const placeId=source.placeId||source.id;
  if(!groups.has(placeId))groups.set(placeId,[]);
  groups.get(placeId).push(source);
}

fs.rmSync("places",{recursive:true,force:true});
fs.mkdirSync("places",{recursive:true});
const sitemapPlaces=[];

for(const [placeId,items] of groups){
  const preferred=destinationPreferredSource(items,{now:buildNow})||items[0];
  if(!preferred)continue;

  const title=preferred.title;
  const where=[preferred.region,preferred.country].filter(Boolean).join(", ");
  const description=(preferred.story||(`Earth Right Now views for ${title}. See the available source status before you go.`)).slice(0,220);
  const url=base+"places/"+pathPart(placeId)+"/";
  const lastModified=destinationLastModified(items);
  const discoverable=items.filter(discoverableSource);
  const current=items.filter(source=>currentSource(source,{now:buildNow}));
  const indexable=discoverable.length>0;
  const robots=indexable?"index,follow":"noindex,follow";
  const graph=destinationSeoGraph({placeId,preferred,description,url,lastModified});

  const related=[...groups.entries()]
    .filter(([otherId,rows])=>otherId!==placeId&&rows.some(source=>source.country===preferred.country)&&rows.some(discoverableSource))
    .map(([otherId,rows])=>{
      const pick=destinationPreferredSource(rows,{now:buildNow})||rows[0];
      return{id:otherId,title:pick?.title||otherId};
    })
    .slice(0,4);

  const relatedHtml=related.length
    ?`<h2>Explore more in ${esc(preferred.country||"this region")}</h2><ul>${related.map(x=>`<li><a href="${base}places/${pathPart(x.id)}/">${esc(x.title)}</a></li>`).join("")}</ul>`
    :"";

  const ordered=[...items].sort((a,b)=>{
    const ac=currentSource(a,{now:buildNow})?1:0,bc=currentSource(b,{now:buildNow})?1:0;
    if(ac!==bc)return bc-ac;
    const ah=a.health==="HEALTHY"?1:0,bh=b.health==="HEALTHY"?1:0;
    if(ah!==bh)return bh-ah;
    return (Number(b.quality)||0)-(Number(a.quality)||0);
  });

  const cards=ordered.map(source=>{
    const href=safe(source.sourceUrl||source.officialUrl);
    const checked=iso(source.lastSuccessfulCheck||source.checkedAt);
    const verified=checked
      ?` · ERN checked <time datetime="${esc(checked)}">${esc(checked.slice(0,10))}</time>`
      :" · verification time unavailable";
    const link=href?` · <a href="${esc(href)}" rel="noopener noreferrer">Provider source</a>`:"";
    const truth=currentWindowEyebrow(source,{now:buildNow});
    return `<li><strong>${esc(source.title)}</strong> — ${esc(truth)} · ${esc(source.provider||"Provider")}${verified}${link}</li>`;
  }).join("");

  const lat=Number(preferred.lat),lon=Number(preferred.lon);
  const coordinateText=Number.isFinite(lat)&&Number.isFinite(lon)
    ?`${preferred.coordinateBasis?"Map reference":"Coordinates"}: ${lat}, ${lon}`
    :null;
  const coordinateNote=preferred.coordinateNote?`<p class="ern-note">${esc(preferred.coordinateNote)}</p>`:"";
  const facts=[preferred.timeZone?`Time zone: ${preferred.timeZone}`:null,coordinateText].filter(Boolean).join(" · ");
  const statusLine=current.length
    ?`${current.length} currently verified window${current.length===1?"":"s"} available in ERN.`
    :discoverable.length
      ?`Source information is available, but ERN's current-verification window has expired. Recheck before relying on live/current status.`
      :`No currently discoverable source is available for this place. This page is retained only as a reference and is not indexed.`;

  const jsonLd=graph?JSON.stringify(graph).replace(/</g,"\\u003c"):"{}";
  const modifiedMeta=lastModified?`<meta property="og:updated_time" content="${esc(lastModified)}">`:"";

  const html=`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>See ${esc(title)} before you go — Earth Right Now</title>
<meta name="description" content="${esc(description)}">
<meta name="robots" content="${robots}">
<link rel="canonical" href="${url}">
<meta property="og:site_name" content="Earth Right Now">
<meta property="og:title" content="See ${esc(title)} before you go — Earth Right Now">
<meta property="og:description" content="${esc(description)}">
<meta property="og:type" content="website">
<meta property="og:url" content="${url}">
${modifiedMeta}
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="See ${esc(title)} before you go — Earth Right Now">
<meta name="twitter:description" content="${esc(description)}">
<meta name="theme-color" content="#062f2b">
<script type="application/ld+json">${jsonLd}</script>
<style>:root{color-scheme:dark}body{margin:0;background:radial-gradient(circle at 70% 0,#0b4d45,#062f2b 48%,#041f1c);color:#f2f8f6;font:16px/1.65 system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}main{max-width:880px;margin:auto;padding:64px 24px 88px}a{color:#a9d9cd}h1{font-family:Georgia,serif;font-size:clamp(2.4rem,7vw,5rem);font-weight:500;line-height:.98;letter-spacing:-.035em;margin:.25em 0}h2{margin-top:2.4rem;font-size:1.15rem}ul{padding-left:1.2rem}li{margin:.85rem 0;color:#d8e6e2}.ern-kicker{letter-spacing:.14em;text-transform:uppercase;font-size:.75rem;color:#a9c7bf}.ern-cta{display:inline-block;margin:1.6rem 0;padding:.82rem 1.05rem;border:1px solid rgba(255,255,255,.35);background:#fff;color:#123b34;border-radius:999px;text-decoration:none;font-weight:800}.ern-note{color:#a8beb8;font-size:.9rem}.ern-status{padding:.85rem 1rem;border:1px solid rgba(255,255,255,.18);border-radius:14px;color:#cfe0dc}</style>
</head>
<body><main>
<p class="ern-kicker"><a href="${base}">Earth Right Now</a> · See before you go.</p>
<h1>See ${esc(title)} before you go</h1>
<p>${esc(where)}</p>
<p>${esc(facts)}</p>
${coordinateNote}
<p>${esc(description)}</p>
<p class="ern-status">${esc(statusLine)}</p>
<h2>Available views</h2><ul>${cards}</ul>
${relatedHtml}
<p><a class="ern-cta" href="${base}#place=${encodeURIComponent(placeId)}">See ${esc(title)} in Earth Right Now →</a> <a class="ern-cta" href="${base}?guide=${encodeURIComponent("Show me "+title)}">Ask ERN Guide →</a></p>
<p class="ern-note">ERN distinguishes live video, refreshed live images, provider-hosted external live sources and reference images. Reference images are never presented as live. A source check confirms ERN verification at that time; it is not a promise about weather, visibility or uninterrupted provider availability.</p>
</main></body></html>`;

  const dir="places/"+pathPart(placeId);
  fs.mkdirSync(dir,{recursive:true});
  fs.writeFileSync(dir+"/index.html",html);
  if(indexable)sitemapPlaces.push({loc:url,lastmod:lastModified?lastModified.slice(0,10):null});
}

const staticUrls=[
  {loc:base,lastmod:null},
  {loc:base+"about.html",lastmod:"2026-09-23"},
  {loc:base+"privacy.html",lastmod:"2026-09-23"},
  {loc:base+"for-places.html",lastmod:"2026-09-23"},
  {loc:base+"now-moments.html",lastmod:"2026-09-23"}
];
const xml='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
  +[...staticUrls,...sitemapPlaces].map(item=>`  <url><loc>${item.loc.replace(/&/g,"&amp;")}</loc>${item.lastmod?`<lastmod>${item.lastmod}</lastmod>`:""}</url>`).join("\n")
  +'\n</urlset>\n';
fs.writeFileSync("sitemap.xml",xml);
console.log(`Generated ${groups.size} destination pages; ${sitemapPlaces.length} indexable in sitemap`);
