import {earthSuggestions} from "../src/earth-suggestions.js";
const all=earthSuggestions({currentAvailable:true,limit:12,includeRecent:false});
console.assert(all.some(x=>x.label==="Life happening now"&&x.current),"Guide should invite current human-life discovery");
console.assert(all.some(x=>x.label==="Local markets & streets"),"Guide should invite local market and street discovery");
console.assert(all.some(x=>x.label.includes("never heard of")),"Guide should retain lesser-known-place invitation");
console.assert(all.some(x=>x.intents.includes("golden")),"expanded Guide suggestions should retain golden-hour discovery");
console.log("ERN Guide discovery prompt checks passed");