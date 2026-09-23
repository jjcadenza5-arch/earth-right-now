const SYNONYMS={
 wildlife:["wildlife","animal","animals","elephant","bird","birds","zoo","nature","สัตว์","สัตว์ป่า","tier","tiere","animaux","faune","animales","fauna","動物","野生動物","动物","野生动物"],
 water:["beach","beaches","sea","ocean","coast","coastal","water","surf","harbour","harbor","ทะเล","ชายหาด","strand","meer","plage","mer","playa","mar","海","海を","海が","ビーチ","海滩","海灘"],
 mountains:["mountain","mountains","volcano","volcanoes","snow","summit","alpine","ภูเขา","ดอย","berg","berge","montagne","montagnes","montaña","montañas","山","山を","山が","山岳","山峰"],
 human:["city","cities","street","streets","people","urban","square","harbour","harbor","market","markets","promenade","walking street"],
 beautiful:["beautiful","scenic","view","views","relax","relaxing","calm","peaceful"],
 happening:["happening","active","event","busy","crowd","crowds","street life","local life"],
 night:["night","nighttime","lights","after dark","กลางคืน","ไฟกลางคืน","nacht","nuit","noche","夜","夜景"],
 daylight:["daylight","sunny","daytime"],
 golden:["sunrise","sunset","golden hour","dawn","dusk","พระอาทิตย์ขึ้น","พระอาทิตย์ตก","sonnenaufgang","sonnenuntergang","lever du soleil","coucher du soleil","amanecer","atardecer","日の出","夕日","日出","日落"],
 snow:["snow","snowing","snowfall","snowy"],
 rain:["rain","raining","rainy"],
 local:["local","small place","small places","village","villages","hidden gem","hidden gems","lesser known","off the beaten path","ท้องถิ่น","หมู่บ้าน","ที่เล็กๆ","kleiner ort","kleine orte","dorf","dörfer","lokal","village local","petit village","petit endroit","local","pueblo","pueblos","lugar pequeño","local","小さな町","村","地元","小さな場所","小镇","小鎮","村庄","村莊","本地","当地","當地"],
 reference:["photo","photos","image","images","reference","picture","pictures"]
};
const CURRENT=["right now","live now","now","live","current","currently","today","tonight","at the moment","at this moment","ตอนนี้","สด","jetzt","live jetzt","gerade","maintenant","en direct","ahora","en vivo","今","今すぐ","ライブ","现在","現在","直播"];
const marks=/[\u0300-\u036f]/g;
function cleanPunctuation(s){return s.replace(/[!-/:-@[-`{-~]/g," ")}
export function normalizeEarthText(x){return cleanPunctuation((x||"").toString().normalize("NFC").toLowerCase()).replace(/\s+/g," ").trim()}
const COMPACT_SCRIPT=/[\u0E00-\u0E7F\u3040-\u30FF\u3400-\u9FFF]/;
function phrasePresent(text,tokens,phrase){if(phrase.includes(" "))return (" "+text+" ").includes(" "+phrase+" ");if(COMPACT_SCRIPT.test(phrase)&&[...phrase].length>1)return text.includes(phrase);return tokens.includes(phrase)}
export function foldEarthSearchText(x){return normalizeEarthText(x).split(/(\s+)/).map(token=>/[A-Za-zÀ-ž]/.test(token)?token.normalize("NFD").replace(marks,"").normalize("NFC"):token).join("")}
export function interpretEarthIntent(q){
 const text=normalizeEarthText(q),tokens=text.split(" ").filter(Boolean),intents=[];
 for(const [intent,words] of Object.entries(SYNONYMS))if(words.some(w=>phrasePresent(text,tokens,w)))intents.push(intent);
 const currentTerms=CURRENT.filter(w=>phrasePresent(text,tokens,w)),wantsCurrent=currentTerms.length>0;
 return{text,tokens,intents:[...new Set(intents)],wantsCurrent,currentTerms};
}
export function earthIntentHints(q){const x=interpretEarthIntent(q);return{...x,empty:!x.text,broad:x.tokens.length<=1&&x.intents.length===0}}
