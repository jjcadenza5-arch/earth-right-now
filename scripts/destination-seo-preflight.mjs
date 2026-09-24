import fs from "node:fs";
import { discoverableSource } from "../src/discovery-eligibility.js";

const sources=JSON.parse(fs.readFileSync("data/sources.json","utf8"));
const sitemap=fs.readFileSync("sitemap.xml","utf8");
const groups=new Map();
for(const source of sources){
  const id=source.placeId||source.id;
  if(!groups.has(id))groups.set(id,[]);
  groups.get(id).push(source);
}
const issues=[];
for(const [placeId,items] of groups){
  const path="places/"+encodeURIComponent(String(placeId))+"/index.html";
  if(!fs.existsSync(path)){issues.push({placeId,code:"MISSING_DESTINATION_PAGE"});continue}
  const html=fs.readFileSync(path,"utf8");
  const url="https://earthrightnow.app/places/"+encodeURIComponent(String(placeId))+"/";
  const indexable=items.some(discoverableSource);
  const must=(ok,code)=>{if(!ok)issues.push({placeId,code})};
  must(html.includes(`<link rel="canonical" href="${url}">`),"CANONICAL_MISMATCH");
  must(html.includes('<meta property="og:site_name" content="Earth Right Now">'),"OG_SITE_NAME_MISSING");
  must(html.includes('<meta name="twitter:card" content="summary">'),"TWITTER_CARD_MISSING");
  must(html.includes('"@type":"WebSite"')&&html.includes('"@type":"WebPage"')&&html.includes('"@type":"Place"')&&html.includes('"@type":"BreadcrumbList"'),"STRUCTURED_GRAPH_INCOMPLETE");
  must(/ERN checked <time datetime=/.test(html)||/verification time unavailable/.test(html),"VERIFICATION_EVIDENCE_MISSING");
  must(/A source check confirms ERN verification at that time/.test(html),"TRUTH_DISCLAIMER_MISSING");
  if(indexable){
    must(html.includes('<meta name="robots" content="index,follow">'),"INDEXABLE_ROBOTS_MISMATCH");
    must(sitemap.includes(`<loc>${url}</loc>`),"INDEXABLE_SITEMAP_MISSING");
  }else{
    must(html.includes('<meta name="robots" content="noindex,follow">'),"NONINDEXABLE_ROBOTS_MISMATCH");
    must(!sitemap.includes(`<loc>${url}</loc>`),"NONINDEXABLE_IN_SITEMAP");
  }
}
const result={ok:issues.length===0,places:groups.size,indexable:[...groups.values()].filter(items=>items.some(discoverableSource)).length,issues};
console.log(JSON.stringify(result,null,2));
if(issues.length)process.exit(1);
