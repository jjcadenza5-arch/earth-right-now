import assert from "node:assert/strict";
import fs from "node:fs";
const sources=JSON.parse(fs.readFileSync(new URL("../data/sources.json",import.meta.url),"utf8"));
const priorities=JSON.parse(fs.readFileSync(new URL("../data/source-research-priorities.json",import.meta.url),"utf8"));
const active=sources.filter(x=>/couchtourist/i.test(String(x.provider||"")+" "+String(x.sourceUrl||"")+" "+String(x.officialUrl||"")));
assert.equal(active.length,0,"active catalog should have no CouchTourist dependency");
assert.equal(priorities.operationalResearchModifiers.providerDiversification.currentActiveCouchTouristSources,0);
for(const id of ["bergen-ulriken","skeikampen-ski","cijin-beach-kaohsiung","ponte-di-legno-adamello"]){
  const s=sources.find(x=>x.id===id);
  assert.ok(s,id+" missing");
  assert.equal(s.permission,"LINK_ONLY");
  assert.equal(s.playback,"EXTERNAL");
  assert.equal(s.truth,"EXTERNAL_LIVE");
  assert.equal("embedUrl" in s,false,id+" should not retain superseded embed URL");
  assert.equal("playbackVerifiedAt" in s,false,id+" should not retain superseded playback marker");
}
console.log("ERN active source catalog is free of CouchTourist dependency and final replacements stay conservative");
