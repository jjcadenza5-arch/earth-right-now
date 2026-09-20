import { sourceChoiceCounts,sourceChoiceSummary } from "../src/source-choice-summary.js";
const now=new Date("2026-09-20T12:00:00Z"),base={permission:"LINK_ONLY",playback:"EXTERNAL",truth:"EXTERNAL_LIVE",sourceUrl:"https://example.com/x"};
const place={sources:[{...base,id:"good",health:"HEALTHY",checkedAt:"2026-09-20T12:00:00Z"},{...base,id:"limited",health:"DEGRADED"}]};
const x=sourceChoiceCounts(place,{now});console.assert(x.current===1&&x.limited===1&&x.unchecked===0,"degraded evidence should not be described as merely unchecked");
console.assert(sourceChoiceSummary(place,{now}).includes("1 limited source"),"visitor should see the limited-source distinction");
console.log("ERN limited-source evidence copy checks passed");
