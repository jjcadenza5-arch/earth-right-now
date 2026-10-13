import assert from "node:assert/strict";import fs from "node:fs";
const s=fs.readFileSync("scripts/seo-indexing-audit.mjs","utf8"),b=fs.readFileSync("scripts/build-destination-pages.mjs","utf8");
for(const x of ["SITEMAP_DUPLICATE_URLS","CANONICAL_ROUTE_MISSING","DUPLICATE_CANONICAL","INDEXABLE_DESTINATION_NOT_IN_SITEMAP","NOINDEX_DESTINATION_IN_SITEMAP","DESTINATION_TITLE_PATTERN_WEAK","COUNTRIES_MISSING_FROM_SITEMAP","COUNTRY_COLLECTION_SCHEMA_MISSING","COUNTRY_ITEMLIST_SCHEMA_MISSING","ROBOTS_RECENT_FEED_MISSING","RECENT_FEED_INVALID","RECENT_FEED_SELF_LINK_MISSING","INVALID_JSONLD"])assert.ok(s.includes(x),x+" SEO guard missing");
assert.ok(b.includes(" Live Now"),"destination title logic missing");
assert.ok(b.includes('"alternateName"'),"destination aliases must reach structured data");
assert.ok(b.includes('"citation"'),"provider citations must reach structured data");
assert.ok(b.includes('"addressLocality"'),"city metadata must reach structured data when present");
assert.ok(b.includes('"addressRegion"'),"region metadata must reach structured data");
assert.ok(b.includes("ERN source status"),"truthful source status must reach structured data");
assert.ok(b.includes("Explore related places"),"destination internal links must remain crawlable");
console.log("ERN SEO indexing audit contract passed");

assert.ok(b.includes("countryHubEligible"),"country hubs must be minimum-depth gated");
assert.ok(b.includes("Share this place"),"destination share action must remain available");

// Visible credit is evidence; a player-action label or JSON-LD-only name is not.
const {mkdtempSync,mkdirSync,writeFileSync,rmSync}=await import('node:fs');
const {tmpdir}=await import('node:os');
const {join}=await import('node:path');
const {spawnSync}=await import('node:child_process');
const fixture=mkdtempSync(join(tmpdir(),'ern-seo-provider-'));
try{
 mkdirSync(join(fixture,'places','fixture'),{recursive:true});
 writeFileSync(join(fixture,'robots.txt'),'User-agent: *\nAllow: /\nSitemap: https://earthrightnow.app/sitemap.xml\nSitemap: https://earthrightnow.app/updates.xml\n');
 writeFileSync(join(fixture,'sitemap.xml'),'<urlset><url><loc>https://earthrightnow.app/places/fixture/</loc></url></urlset>');
 writeFileSync(join(fixture,'updates.xml'),'<feed xmlns="http://www.w3.org/2005/Atom"><link rel="self" href="https://earthrightnow.app/updates.xml"/></feed>');
 const audit=body=>{
  writeFileSync(join(fixture,'places','fixture','index.html'),'<html><head><title>Fixture Live Now | Earth Right Now</title><meta name="robots" content="index,follow"><link rel="canonical" href="https://earthrightnow.app/places/fixture/"><script type="application/ld+json">{"@type":"Place","provider":"Official Fixture Operator"}</script></head><body>'+body+'</body></html>');
  const r=spawnSync(process.execPath,['scripts/seo-indexing-audit.mjs',fixture],{encoding:'utf8'});
  assert.ok(r.stdout,r.stderr);return JSON.parse(r.stdout);
 };
 const attributed=audit('<p>Provider: Official Fixture Operator · Source type: official external live source · <a>Open live source</a></p>');
 assert.ok(!attributed.warnings.some(x=>x.code==='DESTINATION_PROVIDER_ATTRIBUTION_NOT_VISIBLE'),'visible named credit must pass with modern source-action wording');
 assert.equal(attributed.indexEligibleDestinations,1);
 assert.match(attributed.indexingEvidence,/confirmed search-engine indexing and rankings are not measured/);
 for(const body of ['<a>Provider source</a>','<p>Provider: · Source type: live camera</p>','<p>Provider: Provider · Source type: live camera</p>']){
  assert.ok(audit(body).warnings.some(x=>x.code==='DESTINATION_PROVIDER_ATTRIBUTION_NOT_VISIBLE'),'link text, empty/generic credit or metadata-only provider must not count as visible attribution');
 }
}finally{rmSync(fixture,{recursive:true,force:true});}
console.log('SEO audit distinguishes visible attribution and local eligibility from search-engine indexing');
