import { recentEarthSearches } from "./recent-earth-searches.js";
const SUGGESTIONS=[
 {label:"✨ What’s good on Earth right now?",query:"what is good on Earth right now",intents:["beautiful","happening"],current:true},
 {label:"❄️ Where can I see snow?",query:"where can I see snow",intents:["snow"],current:false},
 {label:"🌅 Show me a beautiful sunset",query:"beautiful sunset",intents:["golden","beautiful"],current:false},
 {label:"Live beaches now",query:"live beach now",intents:["water"],current:true},
 {label:"Peaceful scenic views",query:"peaceful scenic views",intents:["beautiful"],current:false},
 {label:"See Chiang Mai",query:"Chiang Mai",intents:[],current:false},
 {label:"🎲 Take me somewhere unexpected",query:"surprise me",intents:[],current:false},
 {label:"Life happening now",query:"life happening now",intents:["human","happening"],current:true},
 {label:"Local markets & streets",query:"local market street life",intents:["human","happening"],current:false},
 {label:"City lights now",query:"live city lights at night now",intents:["human","night"],current:true},
 {label:"Wildlife",query:"wildlife nature",intents:["wildlife"],current:false},
 {label:"Mountains",query:"mountains scenic",intents:["mountains","beautiful"],current:false}
];
const signature=x=>x.label.startsWith("✨"),surprise=x=>x.query==="surprise me";
export function earthSuggestions({currentAvailable=true,limit=5,includeRecent=true}={}){
 const eligible=SUGGESTIONS.filter(x=>currentAvailable||!x.current),recent=includeRecent?recentEarthSearches().filter(query=>!SUGGESTIONS.some(x=>x.query.toLowerCase()===query.toLowerCase())).map(query=>({label:`Again: ${query}`,query,intents:[],current:false,recent:true})):[],recentCap=Math.min(recent.length,Math.max(0,Math.min(2,limit-3))),freshCap=Math.max(0,limit-recentCap);
 let fresh=eligible.slice(0,freshCap);
 if(currentAvailable&&freshCap>0&&!fresh.some(signature)){const x=eligible.find(signature);if(x)fresh[0]=x}
 if(freshCap>=4&&!fresh.some(surprise)){const x=eligible.find(surprise);if(x)fresh[fresh.length-1]=x}
 return [...fresh,...recent.slice(0,recentCap)].slice(0,Math.max(0,limit)).map(x=>({...x,intents:[...x.intents]}));
}
export function suggestionForEmptyIntent(options={}){return earthSuggestions(options)[0]||null}
