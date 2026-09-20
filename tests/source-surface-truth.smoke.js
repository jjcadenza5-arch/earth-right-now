import { sourceBadges } from "../src/source-badges.js";import { operationalNote } from "../src/source-note.js";import { sourceActionMeta } from "../src/source-action-labels.js";
const now=new Date("2026-03-20T12:00:00Z"),live={id:"l",title:"Live",truth:"EXTERNAL_LIVE",permission:"LINK_ONLY",health:"HEALTHY",playback:"EXTERNAL",sourceUrl:"https://example.com",checkedAt:now.toISOString(),lastSuccessfulCheck:now.toISOString()},preview={id:"p",title:"Photo",truth:"PREVIEW",permission:"UNKNOWN",health:"UNKNOWN",playback:"PREVIEW",sourceUrl:"https://example.com/p"};
console.assert(sourceBadges(preview,{now}).includes("REFERENCE · NOT LIVE"),"reference fallback must be explicit on cards");
console.assert(operationalNote(preview,{now})==="Reference image — not live","reference operational note must never imply currentness");
const future=new Date("2026-04-20T12:00:00Z");console.assert(sourceActionMeta(live,{now:future}).label==="Open source","expired provider source must lose current action language");
console.log("ERN source surface truth checks passed");
