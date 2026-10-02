import {readFile,readdir,stat} from "node:fs/promises";
import path from "node:path";

const root=path.resolve(process.argv[2]||"dist");
const base="https://earthrightnow.app/";
const issues=[],warnings=[];
const exists=async rel=>{try{return (await stat(path.join(root,rel))).isFile()}catch{return false}};
const read=rel=>readFile(path.join(root,rel),"utf8");
async function walk(dir="",out=[]){
  for(const e of await readdir(path.join(root,dir),{withFileTypes:true})){
    const rel=path.join(dir,e.name);
    if(e.isDirectory())await walk(rel,out);else if(e.isFile()&&e.name.endsWith(".html"))out.push(rel.replace(/\\/g,"/"));
  }
  return out;
}
function tag(html,re){return html.match(re)?.[1]?.trim()||""}
function visibleText(html){
  return html.replace(/<script[\s\S]*?<\/script>/gi," ").replace(/<style[\s\S]*?<\/style>/gi," ").replace(/<[^>]+>/g," ").replace(/&[a-z#0-9]+;/gi," ").replace(/\s+/g," ").trim()
}
function routeForCanonical(url){
  if(!url.startsWith(base))return null;
  const rel=url.slice(base.length).split(/[?#]/)[0];
  if(!rel)return"index.html";
  if(rel.endsWith("/"))return rel+"index.html";
  return rel;
}
function jsonLdBlocks(html){
  const blocks=[];for(const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)){try{blocks.push(JSON.parse(m[1]))}catch{blocks.push(null)}}return blocks
}
const robots=await read("robots.txt"),sitemap=await read("sitemap.xml");
if(!/User-agent:\s*\*[\s\S]*?Allow:\s*\//i.test(robots))issues.push({code:"ROBOTS_PUBLIC_ROOT_NOT_ALLOWED"});
if(!/Sitemap:\s*https:\/\/earthrightnow\.app\/sitemap\.xml/i.test(robots))issues.push({code:"ROBOTS_SITEMAP_MISSING"});
if(/Disallow:\s*\/\s*(?:\r?\n|$)/i.test(robots))issues.push({code:"ROBOTS_ROOT_BLOCKED"});
const sitemapUrls=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
const sitemapDup=sitemapUrls.filter((u,i,a)=>a.indexOf(u)!==i);
if(sitemapDup.length)issues.push({code:"SITEMAP_DUPLICATE_URLS",urls:[...new Set(sitemapDup)]});
for(const url of sitemapUrls){const rel=routeForCanonical(url);if(!rel||!(await exists(rel)))issues.push({code:"SITEMAP_ROUTE_MISSING",url,rel})}

const files=await walk(),canonicalMap=new Map(),titleMap=new Map(),descMap=new Map();
let indexable=0,destinations=0,indexedDestinations=0;
for(const rel of files){
  if(rel==="release-verification.html"||rel.startsWith("review/")||rel==="offline.html")continue;
  const html=await read(rel),robotsMeta=tag(html,/<meta name="robots" content="([^"]+)"/i);
  const canonical=tag(html,/<link rel="canonical" href="([^"]+)"/i);
  const title=tag(html,/<title>([^<]+)<\/title>/i);
  const desc=tag(html,/<meta name="description" content="([^"]*)"/i);
  const ogTitle=tag(html,/<meta property="og:title" content="([^"]*)"/i);
  const ogDesc=tag(html,/<meta property="og:description" content="([^"]*)"/i);
  const ogUrl=tag(html,/<meta property="og:url" content="([^"]*)"/i);
  const noindex=/\bnoindex\b/i.test(robotsMeta),isIndexable=/\bindex\b/i.test(robotsMeta)&&!noindex;
  if(isIndexable)indexable++;
  if(isIndexable&&!canonical)issues.push({code:"INDEXABLE_CANONICAL_MISSING",rel});
  if(isIndexable&&!title)issues.push({code:"INDEXABLE_TITLE_MISSING",rel});
  if(isIndexable&&(!desc||desc.length<50))issues.push({code:"INDEXABLE_DESCRIPTION_WEAK",rel,length:desc.length});
  if(isIndexable&&(!ogTitle||!ogDesc||!ogUrl))issues.push({code:"INDEXABLE_OG_INCOMPLETE",rel});
  if(canonical){
    const route=routeForCanonical(canonical);
    if(!route||!(await exists(route)))issues.push({code:"CANONICAL_ROUTE_MISSING",rel,canonical,route});
    if(ogUrl&&ogUrl!==canonical)issues.push({code:"OG_CANONICAL_MISMATCH",rel,canonical,ogUrl});
    const prior=canonicalMap.get(canonical);if(prior&&prior!==rel)issues.push({code:"DUPLICATE_CANONICAL",canonical,files:[prior,rel]});else canonicalMap.set(canonical,rel);
  }
  if(isIndexable&&title){const a=titleMap.get(title)||[];a.push(rel);titleMap.set(title,a)}
  if(isIndexable&&desc){const a=descMap.get(desc)||[];a.push(rel);descMap.set(desc,a)}
  if(isIndexable){
    const text=visibleText(html);
    if(text.length<220)issues.push({code:"INDEXABLE_THIN_VISIBLE_TEXT",rel,length:text.length});
    const blocks=jsonLdBlocks(html);if(blocks.some(x=>x===null))issues.push({code:"INVALID_JSONLD",rel});
  }
  if(rel.startsWith("places/")&&rel!=="places/index.html"){
    destinations++;
    const inSitemap=canonical&&sitemapUrls.includes(canonical);
    if(isIndexable)indexedDestinations++;
    if(isIndexable&&!inSitemap)issues.push({code:"INDEXABLE_DESTINATION_NOT_IN_SITEMAP",rel,canonical});
    if(noindex&&inSitemap)issues.push({code:"NOINDEX_DESTINATION_IN_SITEMAP",rel,canonical});
    if(isIndexable&&!/Live Now \| Earth Right Now<\/title>/i.test(html)&&!/Live View \| Earth Right Now<\/title>/i.test(html))issues.push({code:"DESTINATION_TITLE_PATTERN_WEAK",rel,title});
    if(isIndexable&&!/"@type":"Place"/.test(html))issues.push({code:"DESTINATION_PLACE_SCHEMA_MISSING",rel});
    if(isIndexable&&!/ERN source status/.test(html))issues.push({code:"DESTINATION_STATUS_SCHEMA_MISSING",rel});
    if(isIndexable&&!/Provider source/.test(html))warnings.push({code:"DESTINATION_PROVIDER_ATTRIBUTION_NOT_VISIBLE",rel});
    if(isIndexable&&!/Explore related places/.test(html))warnings.push({code:"DESTINATION_RELATED_LINKS_EMPTY",rel});
    if(isIndexable&&!/Earth Right Now · See before you go\./.test(html))issues.push({code:"DESTINATION_BRAND_CONTEXT_MISSING",rel});
  }
}
for(const [title,rels] of titleMap)if(rels.length>1)warnings.push({code:"DUPLICATE_INDEXABLE_TITLE",title,rels});
for(const [description,rels] of descMap)if(rels.length>2)warnings.push({code:"DUPLICATE_INDEXABLE_DESCRIPTION",description:description.slice(0,120),rels});
const sitemapSet=new Set(sitemapUrls);
if(!sitemapSet.has(base))issues.push({code:"HOME_MISSING_FROM_SITEMAP"});
if(!sitemapSet.has(base+"places/"))issues.push({code:"PLACES_MISSING_FROM_SITEMAP"});
if(!sitemapSet.has(base+"discover/"))issues.push({code:"DISCOVER_MISSING_FROM_SITEMAP"});

const report={schemaVersion:1,checkedAt:new Date().toISOString(),root,ready:issues.length===0,filesChecked:files.length,indexablePages:indexable,destinationPages:destinations,indexedDestinations,sitemapUrls:sitemapUrls.length,issueCount:issues.length,warningCount:warnings.length,issues,warnings,boundaries:{sourceTruthChanged:false,paidRankingChanged:false,thinPageExpansionAllowed:false,accountActionPerformed:false}};
console.log(JSON.stringify(report,null,2));if(!report.ready)process.exitCode=1;
