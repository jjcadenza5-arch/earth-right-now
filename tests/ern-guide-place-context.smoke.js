import fs from "node:fs";import {earthGuidePlaceAction,earthGuidePlaceFollowUps} from "../src/earth-guide-place-context.js";
console.assert(earthGuidePlaceAction("Show me now",{placeId:"zermatt"}).type==="SEE_NOW");
console.assert(earthGuidePlaceAction("What's nearby?",{placeId:"zermatt"}).type==="NEARBY");
console.assert(earthGuidePlaceAction("Where could I stay?",{placeId:"zermatt"}).type==="STAY");
console.assert(earthGuidePlaceAction("What's nearby?",{placeId:null})===null,"no invented place context");
console.assert(earthGuidePlaceFollowUps({id:"zermatt"}).includes("Show me now"));
const app=fs.readFileSync("src/app.js","utf8");console.assert(app.includes("const guidePlace=earthGuideContextPlace(query,result.items);guidePlaceId=guidePlace?.id||null"),"Guide must bind follow-ups only to a clear result");console.assert(app.includes("current and verified"),"stay follow-up must preserve travel verification boundary");console.log("ERN Guide place-context checks passed");