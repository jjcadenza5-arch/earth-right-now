import { posterPresentation } from "../src/source-poster.js";
const preferred={title:"Preferred",thumbnailUrl:"https://example.com/preferred.jpg"};
const fallback={title:"Fallback",categories:["Beaches & Water"]};
console.assert(posterPresentation(preferred).kind==="image","destination preferred window may provide legitimate poster imagery");
console.assert(posterPresentation(fallback).kind==="generated","destination without supplied imagery must stay generated");
console.assert(posterPresentation({thumbnailUrl:"data:text/html,bad"}).kind==="generated","non-http imagery must not enter destination cards");
console.log("ERN destination poster smoke checks passed");
