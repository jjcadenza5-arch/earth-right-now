import { bestAvailableWindows } from "../src/window-evidence.js";
const now=new Date().toISOString(),base={truth:"EXTERNAL_LIVE",permission:"LINK_ONLY",health:"HEALTHY",playback:"EXTERNAL",checkedAt:now,lastSuccessfulCheck:now,sourceUrl:"https://example.com",freshness:80};
const rows=[{...base,id:"weak",quality:50,moment:50},{...base,id:"strong",quality:95,moment:95}];
console.assert(bestAvailableWindows(rows,{limit:2})[0].id==="strong","equal evidence should prefer the stronger editorial view");
console.log("ERN destination evidence quality ordering checks passed");
