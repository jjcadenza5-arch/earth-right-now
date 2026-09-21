const SYNONYMS={
 wildlife:["wildlife","animal","animals","elephant","bird","birds","zoo","nature"],
 water:["beach","beaches","sea","ocean","coast","coastal","water","surf","harbour","harbor"],
 mountains:["mountain","mountains","volcano","volcanoes","snow","summit","alpine"],
 human:["city","cities","street","streets","people","urban","square","harbour","harbor","market","markets","promenade","walking street"],
 beautiful:["beautiful","scenic","view","views","relax","relaxing","calm","peaceful"],
 happening:["happening","active","event","busy","crowd","crowds"],
 night:["night","nighttime","lights","after dark"],
 daylight:["daylight","sunny","daytime"],
 golden:["sunrise","sunset","golden hour","dawn","dusk"],
 snow:["snow","snowing","snowfall","snowy"],
 rain:["rain","raining","rainy"],
 reference:["photo","photos","image","images","reference","picture","pictures"]
};
const CURRENT=["right now","live now","now","live","current","today","tonight","ตอนนี้","สด"];
const marks=/[\u0300-\u036f]/g;
function cleanPunctuation(s){return s.replace(/[!-/:-@[-`{-~]/g," ")}
export function normalizeEarthText(x){return cleanPunctuation((x||"").toString().normalize("NFC").toLowerCase()).replace(/\s+/g," ").trim()}
function phrasePresent(text,tokens,phrase){return phrase.includes(" ")?(" "+text+" ").includes(" "+phrase+" "):tokens.includes(phrase)}
export function foldEarthSearchText(x){return normalizeEarthText(x).split(/(\s+)/).map(token=>/[A-Za-zÀ-ž]/.test(token)?token.normalize("NFD").replace(marks,"").normalize("NFC"):token).join("")}
export function interpretEarthIntent(q){
 const text=normalizeEarthText(q),tokens=text.split(" ").filter(Boolean),intents=[];
 for(const [intent,words] of Object.entries(SYNONYMS))if(words.some(w=>phrasePresent(text,tokens,w)))intents.push(intent);
 const currentTerms=CURRENT.filter(w=>phrasePresent(text,tokens,w)||(w==="ตอนนี้"&&text.includes(w))),wantsCurrent=currentTerms.length>0;
 return{text,tokens,intents:[...new Set(intents)],wantsCurrent,currentTerms};
}
export function earthIntentHints(q){const x=interpretEarthIntent(q);return{...x,empty:!x.text,broad:x.tokens.length<=1&&x.intents.length===0}}
