import { recentEarthSearches } from "./recent-earth-searches.js";
const SUGGESTIONS=[
 {label:"Live beaches now",query:"live beach now",intents:["water"],current:true},
 {label:"Peaceful scenic views",query:"peaceful scenic views",intents:["beautiful"],current:false},
 {label:"City life",query:"busy city",intents:["human","happening"],current:false},
 {label:"Wildlife",query:"wildlife nature",intents:["wildlife"],current:false},
 {label:"Mountains",query:"mountains scenic",intents:["mountains","beautiful"],current:false}
];
export function earthSuggestions({currentAvailable=true,limit=5,includeRecent=true}={}){
 const recent=includeRecent?recentEarthSearches().map(query=>({label:`Again: ${query}`,query,intents:[],current:false,recent:true})):[];const defaults=SUGGESTIONS.filter(x=>currentAvailable||!x.current).map(x=>({...x,intents:[...x.intents]}));return [...recent,...defaults].slice(0,Math.max(0,limit));
}
export function suggestionForEmptyIntent(options={}){return earthSuggestions(options)[0]||null}
