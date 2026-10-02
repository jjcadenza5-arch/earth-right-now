import fs from "node:fs";
import assert from "node:assert/strict";
import {execFileSync} from "node:child_process";

execFileSync(process.execPath,["scripts/build-destination-pages.mjs"]);
const sources=JSON.parse(fs.readFileSync("data/sources.json","utf8"));
const places=[...new Set(sources.map(s=>s.placeId||s.id))];

for(const id of places)assert.ok(fs.existsSync("places/"+id+"/index.html"),"every catalog place should retain a crawlable or noindex truth page: "+id);

const xml=fs.readFileSync("sitemap.xml","utf8");
for(const path of ["/places/","/discover/","/discover/beaches-water/","/discover/mountains-snow/","/discover/cities-streets/","/discover/wildlife-nature/","/discover/calm-scenic/"]){
  assert.ok(xml.includes("https://earthrightnow.app"+path),"sitemap should include "+path);
}

const placeFiles=places.map(id=>"places/"+id+"/index.html").filter(p=>fs.existsSync(p));
const indexable=placeFiles.filter(p=>fs.readFileSync(p,"utf8").includes('<meta name="robots" content="index,follow">'));
assert.ok(indexable.length>0,"at least one current/schedule-verified destination must remain indexable");
const sample=fs.readFileSync(indexable[0],"utf8");
assert.ok(sample.includes("application/ld+json")&&sample.includes("Earth Right Now"),"destination page should expose structured identity");
assert.ok(sample.includes('"@type":"Place"'),"destination schema must use conservative Place type");
assert.ok(sample.includes("ERN checked"),"destination pages must expose source verification freshness");
assert.ok(sample.includes("Provider source"),"destination pages must retain provider navigation");
assert.ok(sample.includes("Time zone:"),"destination pages must expose place context in crawlable text");

const related=placeFiles.map(p=>fs.readFileSync(p,"utf8")).find(html=>html.includes("Explore related places"));
assert.ok(related&&related.includes("/places/"),"destination pages should provide crawlable related-place paths");
assert.ok(related.includes("never by payment"),"related discovery must preserve ranking independence");

for(const slug of ["beaches-water","mountains-snow","cities-streets","wildlife-nature","calm-scenic"]){
  const file="discover/"+slug+"/index.html";
  assert.ok(fs.existsSync(file),"discover page should be generated: "+slug);
  const html=fs.readFileSync(file,"utf8");
  assert.ok(html.includes('<meta name="robots" content="index,follow">'),"discover page should be indexable: "+slug);
  assert.ok(html.includes("ERN only lists destinations"),"discover page should state fail-closed truth boundary");
}
const home=fs.readFileSync("index.html","utf8");
assert.ok(home.includes('href="./discover/"'),"home should link visitors directly to Discover");
console.log("ERN Phase 6 indexable destination and discovery smoke checks passed");
