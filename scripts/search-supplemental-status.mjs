import fs from "node:fs";
const core=JSON.parse(fs.readFileSync("data/sources.json","utf8"));
const extra=JSON.parse(fs.readFileSync("data/search-supplemental.json","utf8"));
const fail=[],must=(ok,msg)=>{if(!ok)fail.push(msg)};
must(Array.isArray(extra),"supplemental catalog must be an array");
const coreIds=new Set(core.map(x=>x.id)),corePlaces=new Set(core.map(x=>x.placeId||x.id)),ids=new Set(),places=new Set();
for(const s of extra){
 must(!!s?.id&&!!s?.title,"supplemental rows require id/title");
 must(!ids.has(s.id),"duplicate supplemental id: "+s.id);ids.add(s.id);
 must(!coreIds.has(s.id),"supplemental id duplicates core: "+s.id);
 must(s.health==="HEALTHY","supplemental row must be HEALTHY: "+s.id);
 must(s.featuredHold===true&&s.watchHold===true,"supplemental row must be held from featured/watch: "+s.id);
 must(s.permission==="LINK_ONLY","supplemental row must remain LINK_ONLY: "+s.id);
 must(/^https:\/\//.test(String(s.sourceUrl||"")),"supplemental sourceUrl must be https: "+s.id);
 const p=s.placeId||s.id;places.add(p);
 must(!corePlaces.has(p),"supplemental place duplicates core place: "+p);
}
must(extra.length<=500,"supplemental catalog exceeds 500 rows");
if(fail.length){console.error(JSON.stringify({ok:false,fail,count:extra.length},null,2));process.exit(1)}
console.log(JSON.stringify({ok:true,count:extra.length,distinctPlaces:places.size,corePlaces:corePlaces.size,combinedSearchablePlaces:corePlaces.size+places.size,watchEarthImpact:0,firstPaintImpact:"lazy-on-search"},null,2));
