import assert from "node:assert/strict";import fs from "node:fs";
const app=fs.readFileSync("src/app-lite.js","utf8");
assert.ok(app.includes("s.title,s.placeId,s.city,s.state,s.region,s.country,s.provider,s.story,s.categories,s.tags,s.aliases"),"browser search document must include destination metadata, tags and aliases");
assert.ok(app.includes("function sst("),"browser search must use the shared searchable destination document");
assert.ok(app.includes('matches=catalogMatches.filter(s=>guideEligible(s)||(s.health==="HEALTHY"&&!!safeExternalUrl(s.sourceUrl||s.officialUrl)))'),"known healthy destinations must remain discoverable when current verification lapses");
assert.ok(app.includes('reference-only'),"search status must disclose reference-only fallback");
assert.ok(app.includes("(guideEligible(b)?1:0)-(guideEligible(a)?1:0)"),"current source must win within a mixed destination group");
console.log("ERN browser search preserves destination discovery without faking currentness");

const {runInNewContext}=await import("node:vm");
const grouping=app.slice(app.indexOf("const matches=catalogMatches.filter"),app.indexOf("const groups=ag.slice"));
const rows=[{country:"Japan",id:"j1"},{country:"Japan",id:"j2"},{country:"Canada",id:"c1"},{country:"Taiwan",id:"t1"}];
const result=runInNewContext(grouping+"ag.map(g=>g[0].id)",{x:"",catalogMatches:rows,localIntent:false,guideEligible:()=>true,groupByPlace:items=>items.map(item=>[item]),baseScore:()=>0});
assert.deepEqual(Array.from(result),["j1","c1","t1","j2"],"empty search must interleave countries without throwing or dropping destinations");
