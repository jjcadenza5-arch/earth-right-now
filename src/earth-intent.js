const SYNONYMS={
 wildlife:["wildlife","animal","animals","elephant","bird","birds","zoo","nature"],
 water:["beach","beaches","sea","ocean","coast","coastal","water","surf","harbour","harbor"],
 mountains:["mountain","mountains","volcano","volcanoes","snow","summit","alpine"],
 human:["city","cities","street","streets","people","urban","square","harbour","harbor"],
 beautiful:["beautiful","scenic","view","views","relax","relaxing","calm","peaceful"],
 happening:["happening","active","event","busy","crowd","crowds"],
 night:["night","nighttime","lights","after dark"],
 daylight:["daylight","sunny","daytime"],
 golden:["sunrise","sunset","golden hour","dawn","dusk"],
 reference:["photo","photos","image","images","reference","picture","pictures"]
};
const CURRENT=["now","live","current","today","right now","ตอนนี้","สด"];
function norm(x){return(x||"").toString().normalize("NFKD").toLowerCase().replace(/[\u0300-\u036f]/g,"").replace(/[^\p{L}\p{N}\s-]/gu," ").replace(/\s+/g," ").trim()}
export function interpretEarthIntent(q){
 const text=norm(q),tokens=text.split(" ").filter(Boolean),intents=[];
 for(const [intent,words] of Object.entries(SYNONYMS))if(words.some(w=>tokens.includes(w)||text.includes(w)))intents.push(intent);
 const wantsCurrent=CURRENT.some(w=>text===w||text.includes(w));
 return{text,tokens,intents:[...new Set(intents)],wantsCurrent};
}
export function earthIntentHints(q){const x=interpretEarthIntent(q);return{...x,empty:!x.text,broad:x.tokens.length<=1&&x.intents.length===0}}
