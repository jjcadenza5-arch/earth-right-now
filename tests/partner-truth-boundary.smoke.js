import { currentWindowEyebrow } from "../src/current-window-label.js";
const now=new Date().toISOString();
const partner={permission:"LINK_ONLY",health:"HEALTHY",playback:"EXTERNAL",truth:"PARTNER",sourceUrl:"https://example.com",checkedAt:now,lastSuccessfulCheck:now};
console.assert(currentWindowEyebrow(partner)==="RECENTLY CHECKED SOURCE","partner status alone must not imply live");
console.log("ERN partner truth-boundary smoke checks passed");
