import fs from "node:fs";import { discoverableSource,currentSource } from "../src/discovery-eligibility.js";import { promotionFor,PROMOTION } from "../src/health-policy.js";
const rows=JSON.parse(fs.readFileSync("data/sources.json","utf8")),ids=["maui-hale-pau-hana","waikiki-south-shore","cold-lake-marina"];
for(const id of ids){const s=rows.find(x=>x.id===id);console.assert(discoverableSource(s),id+" should remain available elsewhere when its source URL/embed still exists");console.assert(!currentSource(s),id+" must not claim current/live discovery while quarantined");console.assert(promotionFor(s,{now:new Date("2026-09-20T05:34:00Z")})===PROMOTION.ATLAS,id+" belongs in lower-promotion discovery, not primary Watch Earth")}
console.log("ERN quality-tier placement checks passed");
