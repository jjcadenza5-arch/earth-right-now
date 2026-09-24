import fs from "node:fs";import {affiliatePlatformResearchStatus} from "../src/affiliate-platform-research.js";
const rows=JSON.parse(fs.readFileSync("data/affiliate-platform-research.json","utf8"));const r=affiliatePlatformResearchStatus(rows);console.log(JSON.stringify(r,null,2));if(r.invalid)process.exitCode=1;
