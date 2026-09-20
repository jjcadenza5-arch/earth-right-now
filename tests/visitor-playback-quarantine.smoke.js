import fs from "node:fs";import { buildDynamicWatchEarth } from "../src/dynamic-watch-earth.js";
const sources=JSON.parse(fs.readFileSync("data/sources.json","utf8")),blocked=new Set(["maui-hale-pau-hana","waikiki-south-shore","cold-lake-marina"]);
for(const id of blocked){const s=sources.find(x=>x.id===id);console.assert(s?.health==="DEGRADED"&&s.failureReason==="VISITOR_PLAYBACK_REJECTED_2026-09-20",id+" must remain quarantined until reverified")}
const journey=buildDynamicWatchEarth(sources,{limit:20,now:new Date("2026-09-20T05:34:00Z")});
console.assert(!journey.some(x=>blocked.has(x.id)),"visitor-rejected windows must not enter Watch Earth");
console.log("ERN visitor playback quarantine checks passed");
