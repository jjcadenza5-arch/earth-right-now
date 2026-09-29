import fs from "node:fs";
import {providerConcentration} from "../src/provider-concentration.js";
const rows=JSON.parse(fs.readFileSync(new URL("../data/sources.json",import.meta.url),"utf8"));
const r=providerConcentration(rows);
const advisoryThreshold=.20,highRiskThreshold=.35;
const report={...r,advisoryThreshold,highRiskThreshold,advisory:r.topShare>=advisoryThreshold,highRisk:r.topShare>=highRiskThreshold,note:"Provider concentration is an operational resilience signal only. It may raise research priority but must never change visitor ranking, truth, permission or quality standards."};
console.log(JSON.stringify(report,null,2));
if(r.topShare>=highRiskThreshold)process.exit(1);
