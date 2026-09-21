import fs from "node:fs";import {earthGuideAction} from "../src/earth-guide-actions.js";
console.assert(earthGuideAction("What’s good on Earth right now?").type==="LIVE_NOW","signature prompt should enter current Earth");
console.assert(earthGuideAction("Want to see somewhere you've probably never heard of?").type==="SURPRISE","unknown-place prompt should surprise");
console.assert(earthGuideAction("Show me Zermatt").type==="SEARCH","ordinary place question remains search");
const app=fs.readFileSync("src/app.js","utf8");console.assert(app.includes('action.type==="LIVE_NOW"'),"Guide must handle live-now action");console.assert(app.includes("buildDynamicWatchEarth(runtimeHealthySources(all,now)"),"live-now Guide must use healthy dynamic Watch Earth pool");console.log("ERN Guide conversation action checks passed");
