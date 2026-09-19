import { earthSuggestions,suggestionForEmptyIntent } from "../src/earth-suggestions.js";
const all=earthSuggestions({currentAvailable:true});console.assert(all.some(x=>x.current)&&all.some(x=>x.query==="wildlife nature"));
const noCurrent=earthSuggestions({currentAvailable:false});console.assert(noCurrent.every(x=>!x.current),"must not suggest a current-only prompt when no current windows exist");
console.assert(suggestionForEmptyIntent({currentAvailable:false})?.query==="peaceful scenic views");
console.log("ERN Earth suggestions smoke checks passed");
