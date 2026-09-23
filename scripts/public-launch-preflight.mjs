import fs from "node:fs";
const fail=[];
const read=p=>fs.readFileSync(p,"utf8");
const index=read("index.html"),about=read("about.html"),privacy=read("privacy.html"),robots=read("robots.txt"),sitemap=read("sitemap.xml"),cname=read("CNAME").trim(),manifest=JSON.parse(read("manifest.webmanifest")),sw=read("service-worker.js"),build=read("scripts/build-release-snapshot.mjs");
const assert=(ok,msg)=>{if(!ok)fail.push(msg)};
assert(cname==="earthrightnow.app","CNAME must be earthrightnow.app");
const forPlaces=read("for-places.html"),nowMoments=read("now-moments.html");
for(const [name,html,url] of [["index",index,"https://earthrightnow.app/"],["about",about,"https://earthrightnow.app/about.html"],["privacy",privacy,"https://earthrightnow.app/privacy.html"],["forPlaces",forPlaces,"https://earthrightnow.app/for-places.html"],["nowMoments",nowMoments,"https://earthrightnow.app/now-moments.html"]]){
  assert(html.includes(`rel="canonical" href="${url}"`),`${name} canonical mismatch`);
  assert(!html.includes("github.io"),`${name} must not advertise GitHub hostname`);
  assert(html.includes("./src/styles-lite.css"),`${name} must use lean public stylesheet`);
}
assert(!about.includes("./src/styles.css")&&!privacy.includes("./src/styles.css"),"trust pages still reference legacy stylesheet");
assert(robots.includes("Sitemap: https://earthrightnow.app/sitemap.xml"),"robots sitemap mismatch");
for(const url of ["https://earthrightnow.app/","https://earthrightnow.app/about.html","https://earthrightnow.app/privacy.html","https://earthrightnow.app/for-places.html","https://earthrightnow.app/now-moments.html"])assert(sitemap.includes(`<loc>${url}</loc>`),`sitemap missing ${url}`);
assert(manifest.start_url==="/"&&manifest.scope==="/","manifest must use custom-domain root");
assert(index.includes('rel="manifest" href="/manifest.webmanifest"'),"manifest link missing");
assert(index.includes('navigator.serviceWorker.register("/service-worker.js")'),"service worker root registration missing");
for(const p of ["manifest.webmanifest","service-worker.js","offline.html","sitemap.xml","robots.txt","CNAME","about.html","privacy.html","for-places.html","now-moments.html","release-verification.html"])assert(build.includes(`../${p}`),`release artifact missing ${p}`);
assert(build.includes("../src/release-verification-console.js"),"release verification console script is not shipped");
assert(build.includes("../data/local-directory.json"),"reviewed local-place directory is not shipped");
assert(build.includes("../data/provider-observations.json"),"provider playback observations are not shipped to operator verification");
assert(read("scripts/build-destination-pages.mjs").includes("Ask ERN Guide"),"destination pages lost ERN Guide handoff");
assert(sw.includes('event.request.mode!=="navigate"'),"service worker should limit offline interception to navigation");
assert(index.includes("./privacy.html")&&index.includes("./about.html"),"footer trust links missing");
if(fail.length){console.error(JSON.stringify({ok:false,fail},null,2));process.exit(1)}
console.log(JSON.stringify({ok:true,domain:"earthrightnow.app",trustPages:["about.html","privacy.html"],leanStyles:true,pwa:true,offlineFallback:true,operatorConsole:true},null,2));
