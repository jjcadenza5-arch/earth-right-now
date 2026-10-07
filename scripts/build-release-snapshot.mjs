import { readFile,writeFile,mkdir,cp,readdir,rm } from "node:fs/promises";
import { createHash } from "node:crypto";
const root=new URL("../",import.meta.url),dist=new URL("../dist/",import.meta.url);
await rm(dist,{recursive:true,force:true});
await mkdir(dist,{recursive:true});
// Generate crawlable destination pages and sitemap from the same truth catalog used by the app.
await import("./build-destination-pages.mjs");
await import("./build-operator-review.mjs");
await cp(new URL("../index.html",import.meta.url),new URL("index.html",dist));
const ERN_BUILD_CACHE_BUST=String(process.env.GITHUB_SHA||process.env.ERN_COMMIT_SHA||Date.now()).slice(0,12);
{
  const indexPath=new URL("index.html",dist);
  let html=await readFile(indexPath,"utf8");
  html=html
    .replace(/(\.\/src\/styles-lite\.css)(?:\?v=[^"']*)?/g,`$1?v=${ERN_BUILD_CACHE_BUST}`)
    .replace(/(\.\/src\/app-lite\.js)(?:\?v=[^"']*)?/g,`$1?v=${ERN_BUILD_CACHE_BUST}`);
  await writeFile(indexPath,html);
}
await mkdir(new URL("src/",dist),{recursive:true});
await cp(new URL("../src/guide-public-copy.js",import.meta.url),new URL("src/guide-public-copy.js",dist));
await cp(new URL("../src/guide-ai-client.js",import.meta.url),new URL("src/guide-ai-client.js",dist));
await cp(new URL("../src/guide-ai-routing.js",import.meta.url),new URL("src/guide-ai-routing.js",dist));
await cp(new URL("../src/guide-ai-capabilities.js",import.meta.url),new URL("src/guide-ai-capabilities.js",dist));
await cp(new URL("../src/guide-ai-activation.js",import.meta.url),new URL("src/guide-ai-activation.js",dist));
await cp(new URL("../src/home-i18n.js",import.meta.url),new URL("src/home-i18n.js",dist));
await cp(new URL("../src/fullscreen-continuity.js",import.meta.url),new URL("src/fullscreen-continuity.js",dist));
await cp(new URL("../src/travel-planning-client.js",import.meta.url),new URL("src/travel-planning-client.js",dist));
await cp(new URL("../src/app-lite.js",import.meta.url),new URL("src/app-lite.js",dist));
await cp(new URL("../src/styles-lite.css",import.meta.url),new URL("src/styles-lite.css",dist));
await cp(new URL("../src/participation-public-config.js",import.meta.url),new URL("src/participation-public-config.js",dist));
await cp(new URL("../src/earth-signal-client.js",import.meta.url),new URL("src/earth-signal-client.js",dist));
await cp(new URL("../src/earth-signals.js",import.meta.url),new URL("src/earth-signals.js",dist));
await cp(new URL("../src/now-moments-page.js",import.meta.url),new URL("src/now-moments-page.js",dist));
await cp(new URL("../src/submission-client.js",import.meta.url),new URL("src/submission-client.js",dist));
await cp(new URL("../src/business-submission.js",import.meta.url),new URL("src/business-submission.js",dist));
await cp(new URL("../src/submission-review-contract.js",import.meta.url),new URL("src/submission-review-contract.js",dist));
await cp(new URL("../src/for-places-page.js",import.meta.url),new URL("src/for-places-page.js",dist));
await mkdir(new URL("data/",dist),{recursive:true});
await cp(new URL("../data/sources.json",import.meta.url),new URL("data/sources.json",dist));
await cp(new URL("../data/search-supplemental.json",import.meta.url),new URL("data/search-supplemental.json",dist));
await cp(new URL("../data/place-search-aliases.json",import.meta.url),new URL("data/place-search-aliases.json",dist));
await cp(new URL("../data/local-directory.json",import.meta.url),new URL("data/local-directory.json",dist));
await cp(new URL("../data/travel-offers.json",import.meta.url),new URL("data/travel-offers.json",dist));
await cp(new URL("../data/viator-api-deployment.json",import.meta.url),new URL("data/viator-api-deployment.json",dist));
await cp(new URL("../data/viator-destination-map.json",import.meta.url),new URL("data/viator-destination-map.json",dist));
await cp(new URL("../data/provider-observations.json",import.meta.url),new URL("data/provider-observations.json",dist));
await cp(new URL("../data/earth-signal-deployment.json",import.meta.url),new URL("data/earth-signal-deployment.json",dist));
await cp(new URL("../data/submission-transport.json",import.meta.url),new URL("data/submission-transport.json",dist));
try{await cp(new URL("../data/release-evidence.json",import.meta.url),new URL("data/release-evidence.json",dist))}catch{await writeFile(new URL("data/release-evidence.json",dist),"{}\n")}
await cp(new URL("../assets/",import.meta.url),new URL("assets/",dist),{recursive:true});
{
  const chunks=[];
  for(let i=0;i<4;i++)chunks.push((await readFile(new URL("../assets/ern-social-card-v2.b64."+i,import.meta.url),"utf8")).trim());
  const socialCard=Buffer.from(chunks.join(""),"base64");
  if(socialCard.length<1000||socialCard[0]!==137||socialCard[1]!==80||socialCard[2]!==78||socialCard[3]!==71)throw new Error("invalid ERN social card build asset");
  await writeFile(new URL("assets/ern-social-card-v2.png",dist),socialCard);
  for(let i=0;i<4;i++)await rm(new URL("assets/ern-social-card-v2.b64."+i,dist),{force:true});
}
await cp(new URL("../places/",import.meta.url),new URL("places/",dist),{recursive:true});
await cp(new URL("../countries/",import.meta.url),new URL("countries/",dist),{recursive:true});
await cp(new URL("../discover/",import.meta.url),new URL("discover/",dist),{recursive:true});
for(const locale of ["th","de","fr","ja","zh","es"])await cp(new URL("../"+locale+"/",import.meta.url),new URL(locale+"/",dist),{recursive:true});
await cp(new URL("../review/",import.meta.url),new URL("review/",dist),{recursive:true});
await cp(new URL("../sitemap.xml",import.meta.url),new URL("sitemap.xml",dist));
await cp(new URL("../updates.xml",import.meta.url),new URL("updates.xml",dist));
await cp(new URL("../updates/",import.meta.url),new URL("updates/",dist),{recursive:true});
await cp(new URL("../robots.txt",import.meta.url),new URL("robots.txt",dist));
await cp(new URL("../indexnow-key.txt",import.meta.url),new URL("indexnow-key.txt",dist));
await cp(new URL("../CNAME",import.meta.url),new URL("CNAME",dist));
await cp(new URL("../manifest.webmanifest",import.meta.url),new URL("manifest.webmanifest",dist));
await cp(new URL("../service-worker.js",import.meta.url),new URL("service-worker.js",dist));
await cp(new URL("../offline.html",import.meta.url),new URL("offline.html",dist));
await cp(new URL("../privacy.html",import.meta.url),new URL("privacy.html",dist));
await cp(new URL("../now-moments.html",import.meta.url),new URL("now-moments.html",dist));
await cp(new URL("../stories.html",import.meta.url),new URL("stories.html",dist));
await cp(new URL("../src/ern-stories.js",import.meta.url),new URL("src/ern-stories.js",dist));
await cp(new URL("../src/stories-page.js",import.meta.url),new URL("src/stories-page.js",dist));
await cp(new URL("../src/discovery-eligibility.js",import.meta.url),new URL("src/discovery-eligibility.js",dist));
await cp(new URL("../src/source-recency.js",import.meta.url),new URL("src/source-recency.js",dist));
await cp(new URL("../src/embed-policy.js",import.meta.url),new URL("src/embed-policy.js",dist));
await cp(new URL("../src/url-safety.js",import.meta.url),new URL("src/url-safety.js",dist));
await cp(new URL("../src/solar-moment.js",import.meta.url),new URL("src/solar-moment.js",dist));
await cp(new URL("../src/media-identity.js",import.meta.url),new URL("src/media-identity.js",dist));
await cp(new URL("../src/playback-proof.js",import.meta.url),new URL("src/playback-proof.js",dist));
await cp(new URL("../src/share-links.js",import.meta.url),new URL("src/share-links.js",dist));
await cp(new URL("../src/analytics-config.js",import.meta.url),new URL("src/analytics-config.js",dist));
await cp(new URL("../src/analytics-runtime.js",import.meta.url),new URL("src/analytics-runtime.js",dist));
await cp(new URL("../src/telemetry-policy.js",import.meta.url),new URL("src/telemetry-policy.js",dist));
await cp(new URL("../src/telemetry.js",import.meta.url),new URL("src/telemetry.js",dist));
await cp(new URL("../src/commercial-attribution-runtime.js",import.meta.url),new URL("src/commercial-attribution-runtime.js",dist));
await cp(new URL("../src/affiliate-partners.js",import.meta.url),new URL("src/affiliate-partners.js",dist));
await cp(new URL("../src/travel-offer-verification.js",import.meta.url),new URL("src/travel-offer-verification.js",dist));
await cp(new URL("../src/travel-bridge.js",import.meta.url),new URL("src/travel-bridge.js",dist));
await cp(new URL("../data/affiliate-partners.json",import.meta.url),new URL("data/affiliate-partners.json",dist));
await cp(new URL("../for-places.html",import.meta.url),new URL("for-places.html",dist));
await cp(new URL("../release-verification.html",import.meta.url),new URL("release-verification.html",dist));
await cp(new URL("../src/release-verification-console.js",import.meta.url),new URL("src/release-verification-console.js",dist));
await cp(new URL("../src/candidate-evidence-binding.js",import.meta.url),new URL("src/candidate-evidence-binding.js",dist));
await cp(new URL("../about.html",import.meta.url),new URL("about.html",dist));
await cp(new URL("../how-ern-works.html",import.meta.url),new URL("how-ern-works.html",dist));
await cp(new URL("../source-policy.html",import.meta.url),new URL("source-policy.html",dist));
await cp(new URL("../editorial-principles.html",import.meta.url),new URL("editorial-principles.html",dist));
await cp(new URL("../faq.html",import.meta.url),new URL("faq.html",dist));
await cp(new URL("../llms.txt",import.meta.url),new URL("llms.txt",dist));
await cp(new URL("../press.html",import.meta.url),new URL("press.html",dist));
await cp(new URL("../data/public-brand-facts.json",import.meta.url),new URL("data/public-brand-facts.json",dist));
await cp(new URL("../deploy/_headers",import.meta.url),new URL("_headers",dist));
await cp(new URL("../deploy/_redirects",import.meta.url),new URL("_redirects",dist));
async function listArtifactFiles(dir,baseDir=dir){
  const out=[];
  for(const entry of await readdir(dir,{withFileTypes:true})){
    const full=new URL(entry.name+(entry.isDirectory()?"/":""),dir);
    if(entry.isDirectory())out.push(...await listArtifactFiles(full,baseDir));
    else{
      const rel=decodeURIComponent(full.pathname.slice(baseDir.pathname.length)).replace(/^\/+/, "");
      if(rel&&rel!=="release-manifest.json")out.push(rel);
    }
  }
  return out;
}
const files=(await listArtifactFiles(dist)).sort();
const hashes={};for(const p of files){const b=await readFile(new URL(p,dist));hashes[p]=createHash("sha256").update(b).digest("hex")}
const pkg=JSON.parse(await readFile(new URL("../package.json",import.meta.url),"utf8"));
const commit=String(process.env.GITHUB_SHA||process.env.ERN_COMMIT_SHA||"").trim()||null;
const manifest={name:"Earth Right Now",version:pkg.version,commit,generatedAt:new Date().toISOString(),entry:"index.html",files,sha256:hashes,rollback:{sourceOfTruth:"Git commit SHA + this manifest",note:"Deploy this artifact as an immutable candidate; retain the prior known-good artifact before promotion."}};
await writeFile(new URL("release-manifest.json",dist),JSON.stringify(manifest,null,2)+"\n");
console.log(JSON.stringify(manifest,null,2));
