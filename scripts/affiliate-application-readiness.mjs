import fs from "node:fs";import {affiliatePlatformResearchStatus} from "../src/affiliate-platform-research.js";import {affiliateApplicationReadiness} from "../src/affiliate-application-readiness.js";
const platforms=JSON.parse(fs.readFileSync("data/affiliate-platform-research.json","utf8"));
const research=affiliatePlatformResearchStatus(platforms);
const result=affiliateApplicationReadiness(research.items,{publicSite:true,privacyNotice:fs.existsSync("privacy.html"),affiliateDisclosurePolicy:true,noPaidRankingPolicy:true,verifiedTravelResearch:fs.existsSync("data/commercial-research-candidates.json")});
console.log(JSON.stringify(result,null,2));
if(!result.ernReady)process.exitCode=1;
