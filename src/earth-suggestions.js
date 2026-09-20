import { recentEarthSearches } from "./recent-earth-searches.js";
const SUGGESTIONS=[
 {label:"Live beaches now",query:"live beach now",intents:["water"],current:true},
 {label:"Peaceful scenic views",query:"peaceful scenic views",intents:["beautiful"],current:false},
 {label:"City lights now",query:"live city lights at night now",intents:["human","night"],current:true},
 
 {label:"City life",query:"busy city",intents:["human","happening"],current:false},
 {label:"Wildlife",query:"wildlife nature",intents:["wildlife"],current:false},
 {label:"Mountains",query:"mountains scenic",intents:["mountains","beautiful"],current:false},
 {label:"Golden light now",query:"sunrise sunset golden hour now",intents:["golden"],current:true}
];
export function earthSuggestions({currentAvailable=true,limit=5,includeRecent=true}={}){
 const recent=includeRecent?recentEarthSearches().map(query=>({label:`Again: ${query}`,query,intents:[],current:false,recent:true})):[];const defaults=SUGGESTIONS.filter(x=>currentAvailable||!x.current).map(x=>({...x,intents:[...x.intents]}));const recentCap=Math.min(recent.length,Math.max(0,Math.min(2,limit-3))),freshCap=Math.max(0,limit-recentCap),fresh=defaults.slice(0,freshCap);if(currentAvailable&&limit>=5&&!fresh.some(x=>x.intents.includes("golden"))){const golden=defaults.find(x=>x.intents.includes("golden"));if(golden&&fresh.length)fresh[fresh.length-1]=golden}return [...fresh,...recent.slice(0,recentCap)].slice(0,Math.max(0,limit));
}
export function suggestionForEmptyIntent(options={}){return earthSuggestions(options)[0]||null}
