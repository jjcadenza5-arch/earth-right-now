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
const CURRENT=["right now","live now","live jetzt","en direct","en vivo","dal vivo","now","live","current","today","tonight","ตอนนี้","สด","jetzt","maintenant","ahora","adesso","今","ライブ","지금","라이브","现在","直播"];
export function normalizeEarthText(x){return(x||"").toString().normalize("NFKC").toLowerCase().replace(/[^\p{L}\p{M}\p{N}\s-]/gu," ").replace(/\s+/g," ").trim()}
function phrasePresent(text,tokens,phrase){if(phrase.includes(" "))return text===phrase||text.startsWith(phrase+" ")||text.endsWith(" "+phrase)||text.includes(" "+phrase+" ");return tokens.includes(phrase)}
export function foldEarthSearchText(x){const clean=normalizeEarthText(x);return clean.split(/(\\s+)/).map(token=>/^[\\p{Script=Latin}\\p{M}\\p{N}-]+$/u.test(token)?token.normalize("NFD").replace(/\\p{M}+/gu,"").normalize("NFC"):token).join("")}\nexport function interpretEarthIntent(q){
 const text=normalizeEarthText(q),tokens=text.split(" ").filter(Boolean),intents=[];
 for(const [intent,words] of Object.entries(SYNONYMS))if(words.some(w=>phrasePresent(text,tokens,w)))intents.push(intent);
 const currentTerms=CURRENT.filter(w=>phrasePresent(text,tokens,w)),wantsCurrent=currentTerms.length>0;
 return{text,tokens,intents:[...new Set(intents)],wantsCurrent,currentTerms};
}
export function earthIntentHints(q){const x=interpretEarthIntent(q);return{...x,empty:!x.text,broad:x.tokens.length<=1&&x.intents.length===0}}
