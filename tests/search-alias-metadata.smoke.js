import assert from "node:assert/strict";import fs from "node:fs";import {spawnSync} from "node:child_process";import {searchEarth} from "../src/search-engine.js";
const rows=JSON.parse(fs.readFileSync("data/sources.json","utf8")),now=new Date();
const placeIds=q=>new Set(searchEarth(rows,q,{now}).map(s=>s.placeId||s.id));
for(const q of ["New York","NYC","New York City","纽约","紐約"])assert.ok(placeIds(q).has("new-york-harbor"),q+" should find New York Harbor destination");
assert.ok(searchEarth(rows,"山与雪",{now}).some(s=>(s.categories||[]).some(c=>/mountain|snow/i.test(c))),"Chinese mountain/snow collection phrase should resolve to ERN mountain discovery");\nconst future=[{id:"cm-old-city",placeId:"chiang-mai-old-city",title:"Tha Phae Gate — Morning View",city:"Chiang Mai",region:"Chiang Mai",country:"Thailand",aliases:["Chiangmai"],health:"HEALTHY",truth:"EXTERNAL_LIVE",permission:"LINK_ONLY",playback:"EXTERNAL",sourceUrl:"https://example.test/cm",checkedAt:new Date().toISOString(),lastSuccessfulCheck:new Date().toISOString(),categories:["Cities & Streets"],story:"Old City street view"}];
assert.equal(searchEarth(future,"Chiang Mai")[0]?.id,"cm-old-city","city metadata should make specific Chiang Mai titles searchable");
assert.equal(searchEarth(future,"Chiangmai")[0]?.id,"cm-old-city","common alias should work");
const r=spawnSync(process.execPath,["scripts/search-metadata-audit.mjs"],{encoding:"utf8"});assert.equal(r.status,0,r.stdout+"\n"+r.stderr);
const report=JSON.parse(r.stdout);assert.equal(report.ok,true);assert.ok(report.aliasChecks>0);console.log("ERN destination alias and metadata search audit passed");
