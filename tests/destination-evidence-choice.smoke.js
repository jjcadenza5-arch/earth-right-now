import { sourceChoiceSummary } from "../src/source-choice-summary.js";import { placeAnswer } from "../src/place-answer.js";
const now=new Date("2026-03-20T12:00:00Z"),live={id:"l",title:"Live",truth:"EXTERNAL_LIVE",permission:"LINK_ONLY",health:"HEALTHY",playback:"EXTERNAL",sourceUrl:"https://example.com/live",checkedAt:now.toISOString(),lastSuccessfulCheck:now.toISOString(),quality:80},preview={id:"p",title:"Photo",truth:"PREVIEW",permission:"UNKNOWN",health:"UNKNOWN",playback:"PREVIEW",sourceUrl:"https://example.com/photo",quality:99};
const place={id:"x",sources:[preview,live],preferred:preview};
console.assert(sourceChoiceSummary(place,{now})==="1 current · 1 at source · 1 reference image · not live","destination choice summary should include honest photo fallback");
const answer=placeAnswer(place,{now});console.assert(answer.headline==="EXTERNAL LIVE","place answer must not let a preferred reference photo outrank verified-current live evidence");
console.assert(answer.detail.includes("1 current/live view")&&answer.detail.includes("2 views"),"place answer should explain currentness and choice breadth");
console.log("ERN destination evidence-choice checks passed");
