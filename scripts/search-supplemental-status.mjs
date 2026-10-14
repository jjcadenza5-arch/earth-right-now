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
 must(s.health==="HEALTHY"||(s.health==="DEGRADED"&&String(s.failureReason||"").trim()&&Number.isFinite(Date.parse(s.lastFailedCheck))&&s.lastFailedCheck===s.checkedAt&&Date.parse(s.lastFailedCheck)<=Date.now()+300000),"supplemental row requires HEALTHY or documented negative review: "+s.id);
 must(s.featuredHold===true&&s.watchHold===true,"supplemental row must be held from featured/watch: "+s.id);
 must(s.permission==="LINK_ONLY","supplemental row must remain LINK_ONLY: "+s.id);
 must(/^https:\/\//.test(String(s.sourceUrl||"")),"supplemental sourceUrl must be https: "+s.id);
 const p=s.placeId||s.id;places.add(p);
 if(corePlaces.has(p)){
  const anchor=core.find(x=>x.id===s.alternateOfSourceId&&(x.placeId||x.id)===p);
  must(!!anchor,"supplemental core-place alternative requires exact anchor: "+s.id);
  must(!core.some(x=>(x.placeId||x.id)===p&&x.sourceUrl===s.sourceUrl),"supplemental alternative duplicates core camera URL: "+s.id);
  must(!extra.some(x=>x.id!==s.id&&(x.placeId||x.id)===p&&x.sourceUrl===s.sourceUrl),"supplemental alternative duplicates camera URL: "+s.id);
  must(s.truth==="LIVE_IMAGE"||s.truth==="EXTERNAL_LIVE","supplemental alternative requires current-view type: "+s.id);
  must(!!String(s.attribution||"").trim()&&!!String(s.rightsBasis||"").trim()&&!!String(s.freshnessEvidence||"").trim()&&Number.isFinite(Date.parse(s.lastSuccessfulCheck)),"supplemental alternative requires attributed permission and successful-view evidence: "+s.id);
 }else must(!s.alternateOfSourceId,"supplemental alternative anchor must share an existing core place: "+s.id);
}
must(extra.length<=500,"supplemental catalog exceeds 500 rows");
if(fail.length){console.error(JSON.stringify({ok:false,fail,count:extra.length},null,2));process.exit(1)}
console.log(JSON.stringify({ok:true,count:extra.length,distinctPlaces:places.size,corePlaces:corePlaces.size,combinedSearchablePlaces:new Set([...corePlaces,...places]).size,existingPlaceAlternates:extra.filter(s=>corePlaces.has(s.placeId||s.id)).length,watchEarthImpact:0,firstPaintImpact:"lazy-on-search"},null,2));
