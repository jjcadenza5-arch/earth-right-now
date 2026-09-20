import { earthSuggestions,suggestionForEmptyIntent } from "../src/earth-suggestions.js";
const all=earthSuggestions({currentAvailable:true});console.assert(all.some(x=>x.current)&&all.some(x=>x.query==="wildlife nature"));
const noCurrent=earthSuggestions({currentAvailable:false});console.assert(noCurrent.every(x=>!x.current),"must not suggest a current-only prompt when no current windows exist");
console.assert(suggestionForEmptyIntent({currentAvailable:false})?.query==="peaceful scenic views");
console.log("ERN Earth suggestions smoke checks passed");

localStorage.setItem("ern.recentEarthSearches.v1",JSON.stringify(["one","two","three","four"]));const mixed=earthSuggestions({currentAvailable:true,limit:5});console.assert(mixed.filter(x=>x.recent).length<=2,"recent searches must not crowd out fresh Earth discovery");console.assert(mixed.some(x=>x.label==="Live beaches now"),"fresh current discovery should remain visible");
