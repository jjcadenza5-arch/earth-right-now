const SYNONYMS={
 wildlife:["wildlife","animal","animals","elephant","bird","birds","zoo","nature"],
 water:["beach","beaches","sea","ocean","coast","coastal","water","surf","harbour","harbor"],
 mountains:["mountain","mountains","volcano","volcanoes","snow","summit","alpine"],
 human:["city","cities","street","streets","people","urban","square","harbour","harbor","market","markets","promenade","walking street"],
 beautiful:["beautiful","scenic","view","views","relax","relaxing","calm","peaceful"],
 happening:["happening","active","event","busy","crowd","crowds","street life","local life"],
 night:["night","nighttime","lights","after dark"],
 daylight:["daylight","sunny","daytime"],
 golden:["sunrise","sunset","golden hour","dawn","dusk"],
 snow:["snow","snowing","snowfall","snowy"],
 rain:["rain","raining","rainy"],
 local:["local","small place","small places","village","villages","hidden gem","hidden gems","lesser known","off the beaten path","ท้องถิ่น","หมู่บ้าน","ที่เล็กๆ","kleiner ort","kleine orte","dorf","dörfer","lokal","village local","petit village","petit endroit","local","pueblo","pueblos","lugar pequeño","local","小さな町","村","地元","小さな場所","小镇","小鎮","村庄","村莊","本地","当地","當地"],
 reference:["photo","photos","image","images","reference","picture","pictures"]
};
const CURRENT=["right now","live now","now","live","current","currently","today","tonight","at the moment","at this moment","ตอนนี้","สด","jetzt","live jetzt","gerade","maintenant","en direct","ahora","en vivo","今","今すぐ","ライブ","现在","現在","直播"];
const marks=/[\u0300-\u036f]/g;
function cleanPunctuation(s){return s.replace(/[!-/:-@[-`{-~]/g," ")}
export function normalizeEarthText(x){return cleanPunctuation((x||"").toString().normalize("NFC").toLowerCase()).replace(/\s+/g," ").trim()}
const COMPACT_SCRIPT=/[\u0E00-\u0E7F\u3040-\u30FF\u3400-\u9FFF]/;\nfunction phrasePresent(text,tokens,phrase){if(phrase.includes(" "))return (" "+text+" ").includes(" "+phrase+" ");if(COMPACT_SCRIPT.test(phrase)&&[...phrase].length>1)return text.includes(phrase);return tokens.includes(phrase)}
export function foldEarthSearchText(x){return normalizeEarthText(x).split(/(\s+)/).map(token=>/[A-Za-zÀ-ž]/.test(token)?token.normalize("NFD").replace(marks,"").normalize("NFC"):token).join("")}
export function interpretEarthIntent(q){
 const text=normalizeEarthText(q),tokens=text.split(" ").filter(Boolean),intents=[];
 for(const [intent,words] of Object.entries(SYNONYMS))if(words.some(w=>phrasePresent(text,tokens,w)))intents.push(intent);
 const currentTerms=CURRENT.filter(w=>phrasePresent(text,tokens,w)),wantsCurrent=currentTerms.length>0;
 return{text,tokens,intents:[...new Set(intents)],wantsCurrent,currentTerms};
}
export function earthIntentHints(q){const x=interpretEarthIntent(q);return{...x,empty:!x.text,broad:x.tokens.length<=1&&x.intents.length===0}}
