import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const root=process.argv[2]||'dist',base='https://earthrightnow.app/';
const guide=JSON.parse(fs.readFileSync('data/destination-viewing-guidance.json','utf8'));
const sitemap=fs.readFileSync(path.join(root,'sitemap.xml'),'utf8'),robots=fs.readFileSync(path.join(root,'robots.txt'),'utf8'),directory=fs.readFileSync(path.join(root,'places/index.html'),'utf8');
const tag=(s,re)=>s.match(re)?.[1]||'';
const pages=Object.keys(guide.places).map(id=>{
 const route='places/'+id+'/',url=base+route,s=fs.readFileSync(path.join(root,route,'index.html'),'utf8');
 const canonical=tag(s,/<link rel="canonical" href="([^"]+)"/),directives=tag(s,/<meta name="robots" content="([^"]+)"/),title=tag(s,/<title>([^<]+)<\/title>/),description=tag(s,/<meta name="description" content="([^"]+)"/);
 const indexable=directives==='index,follow',inSitemap=sitemap.includes('<loc>'+url+'</loc>');
 const internal=[...s.matchAll(/<a\b[^>]*href="([^"]+)"/g)].map(m=>m[1].replaceAll('&amp;','&')).filter(h=>h.startsWith(base)||h.startsWith('./'));
 const missing=internal.filter(h=>{const u=new URL(h,url),p=u.pathname.replace(/^\//,'');return !fs.existsSync(path.join(root,p.endsWith('/')?p+'index.html':p||'index.html'))});
 const guidancePresent=s.includes('What to look for and how to plan')&&guide.places[id].every(t=>s.includes(t.replaceAll('&','&amp;').replaceAll('"','&quot;')));
 return {placeId:id,url,title,description,canonical,robots:directives,indexEligible:indexable,sitemapIncluded:inSitemap,directoryLinked:directory.includes('href="'+url+'"'),internalLinkCount:internal.length,missingInternalLinks:missing,viewingGuidancePresent:guidancePresent,truthLabels:[...new Set(s.match(/LIVE WINDOW|CURRENT IMAGE|OUTSIDE LIVE HOURS|PLAYBACK RECHECK DUE|RECHECK DUE|REFERENCE ONLY/g)||[])],sha256:crypto.createHash('sha256').update(s).digest('hex'),technicalPass:canonical===url&&!!title&&!!description&&indexable===inSitemap&&missing.length===0&&guidancePresent};
});
console.log(JSON.stringify({schemaVersion:1,reviewedAt:new Date().toISOString(),samplePolicy:'Fixed ten representative destinations: five moving streams, two external refreshed stills, failed player, scheduled source and expired image. Human reviewed copy; technical checks do not establish Google indexing.',source:'Generated release artifact; served verification required after publication',robotsRootAllowed:/User-agent:\s*\*[\s\S]*?Allow:\s*\//i.test(robots),pages,summary:{reviewed:pages.length,technicalPassed:pages.filter(p=>p.technicalPass).length,indexEligible:pages.filter(p=>p.indexEligible).length,noindexReferences:pages.filter(p=>!p.indexEligible).length},searchConsole:{status:'ACCESS_UNAVAILABLE',period:null,indexedPages:null,impressions:null,clicks:null,queries:null,note:'No Search Console connector or current export available. Technical eligibility is not indexing or ranking evidence; no demand inferred.'},weeklyComparison:{sameSample:true,compare:'Page changes, truth/index eligibility and GSC same-property equal seven-day periods when supplied. Record GSC reporting dates and timezone; distinguish site totals from sample pages.',demandAction:'No demand-driven expansion priority changed without actual query/page evidence. Historical isolated interest is a lead, not repeated demand.'}},null,2));
if(pages.some(p=>!p.technicalPass))process.exitCode=1;
