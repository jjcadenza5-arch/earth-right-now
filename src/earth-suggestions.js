const SUGGESTIONS=[
 {label:"Live beaches now",query:"live beach now",intents:["water"],current:true},
 {label:"Peaceful scenic views",query:"peaceful scenic views",intents:["beautiful"],current:false},
 {label:"City life",query:"busy city",intents:["human","happening"],current:false},
 {label:"Wildlife",query:"wildlife nature",intents:["wildlife"],current:false},
 {label:"Mountains",query:"mountains scenic",intents:["mountains","beautiful"],current:false}
];
export function earthSuggestions({currentAvailable=true,limit=5}={}){
 return SUGGESTIONS.filter(x=>currentAvailable||!x.current).slice(0,Math.max(0,limit)).map(x=>({...x,intents:[...x.intents]}));
}
export function suggestionForEmptyIntent(options={}){return earthSuggestions(options)[0]||null}
