import fs from "node:fs";import {commercialResearchStatus} from "../src/commercial-research-candidates.js";
const sources=JSON.parse(fs.readFileSync("data/sources.json","utf8"));
const rows=JSON.parse(fs.readFileSync("data/commercial-research-candidates.json","utf8"));
const known=[...new Set(sources.map(s=>String(s.placeId||s.id||"")).filter(Boolean))];
const report=commercialResearchStatus(rows,{knownPlaceIds:known});
console.log(JSON.stringify(report,null,2));
if(report.invalid)process.exitCode=1;
