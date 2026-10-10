import assert from "node:assert/strict";
import fs from "node:fs";
import {spawnSync} from "node:child_process";

const build=spawnSync(process.execPath,["scripts/build-destination-pages.mjs"],{encoding:"utf8"});
assert.equal(build.status,0,build.stderr);

const en=fs.readFileSync("discover/index.html","utf8");
const th=fs.readFileSync("th/discover/index.html","utf8");
const thCollection=fs.readFileSync("th/discover/beaches-water/index.html","utf8");
const sitemap=fs.readFileSync("sitemap.xml","utf8");

assert.match(en,/rel="canonical" href="https:\/\/earthrightnow\.app\/discover\/"/);
assert.match(en,/hreflang="x-default"/);
assert.match(en,/class="language-nav"/);
assert.match(th,/lang="th"/);
assert.match(th,/rel="canonical" href="https:\/\/earthrightnow\.app\/th\/discover\/"/);
assert.match(th,/hreflang="en"/);
assert.match(th,/hreflang="th"/);
assert.match(thCollection,/https:\/\/earthrightnow\.app\/discover\/beaches-water\//);
assert.match(thCollection,/https:\/\/earthrightnow\.app\/th\/discover\/beaches-water\//);
for(const locale of ["th","de","fr","ja","zh","es"]){
  assert.ok(fs.existsSync(locale+"/discover/index.html"),"missing localized Discover root "+locale);
  assert.ok(sitemap.includes("https://earthrightnow.app/"+locale+"/discover/"),"sitemap missing "+locale+" Discover root");
}
for(const id of ["islands-coastal-escapes","beaches-water","mountains-snow","cities-streets","wildlife-nature","calm-scenic"]){
  assert.ok(sitemap.includes("https://earthrightnow.app/discover/"+id+"/"),"sitemap missing English collection "+id);
  for(const locale of ["th","de","fr","ja","zh","es"])assert.ok(sitemap.includes("https://earthrightnow.app/"+locale+"/discover/"+id+"/"),"sitemap missing "+locale+" collection "+id);
}
console.log("Phase 9 crawlable localized Discover, canonical, hreflang, sitemap and language navigation passed");
