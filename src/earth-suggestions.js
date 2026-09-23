import { recentEarthSearches } from "./recent-earth-searches.js";import {guideFormat} from "./earth-guide-l10n.js";
const BASE=[
 {key:"good",label:"✨ What’s good on Earth right now?",query:"what is good on Earth right now",intents:["beautiful","happening"],current:true},
 {key:"snow",label:"❄️ Where can I see snow?",query:"where can I see snow",intents:["snow"],current:false},
 {key:"sunset",label:"🌅 Show me a beautiful sunset",query:"beautiful sunset",intents:["golden","beautiful"],current:false},
 {key:"beach",label:"Live beaches now",query:"live beach now",intents:["water"],current:true},
 {key:"life",label:"Life happening now",query:"life happening now",intents:["human","happening"],current:true},
 {key:"peaceful",label:"Peaceful scenic views",query:"peaceful scenic views",intents:["beautiful"],current:false},
 {key:"chiangmai",label:"See Chiang Mai",query:"Chiang Mai",intents:[],current:false},
 {key:"surprise",label:"🎲 Somewhere I’ve never heard of",query:"surprise me",intents:[],current:false},
 {key:"markets",label:"Local markets & streets",query:"local market street life",intents:["human","happening"],current:false},
 {key:"lights",label:"City lights now",query:"live city lights at night now",intents:["human","night"],current:true},
 {key:"wildlife",label:"Wildlife",query:"wildlife nature",intents:["wildlife"],current:false},
 {key:"mountains",label:"Mountains",query:"mountains scenic",intents:["mountains","beautiful"],current:false}
];
const LABELS={
 th:{good:"✨ ตอนนี้บนโลกมีอะไรน่าดู?",snow:"❄️ ที่ไหนมีหิมะ?",sunset:"🌅 ดูพระอาทิตย์ตกสวยๆ",beach:"ชายหาดสดตอนนี้",life:"ชีวิตที่กำลังเกิดขึ้นตอนนี้",peaceful:"วิวสงบและสวย",chiangmai:"ดูเชียงใหม่",surprise:"🎲 พาไปที่ที่ไม่เคยรู้จัก",markets:"ตลาดและถนนท้องถิ่น",lights:"แสงเมืองตอนนี้",wildlife:"สัตว์ป่า",mountains:"ภูเขา"},
 de:{good:"✨ Was lohnt sich gerade auf der Erde?",snow:"❄️ Wo kann ich Schnee sehen?",sunset:"🌅 Zeig mir einen schönen Sonnenuntergang",beach:"Live-Strände jetzt",life:"Leben, das gerade passiert",peaceful:"Ruhige schöne Aussichten",chiangmai:"Chiang Mai ansehen",surprise:"🎲 Irgendwo, wovon ich noch nie gehört habe",markets:"Lokale Märkte & Straßen",lights:"Stadtlichter jetzt",wildlife:"Tierwelt",mountains:"Berge"},
 fr:{good:"✨ Que voir sur Terre maintenant ?",snow:"❄️ Où puis-je voir de la neige ?",sunset:"🌅 Montrez-moi un beau coucher de soleil",beach:"Plages en direct maintenant",life:"La vie en ce moment",peaceful:"Vues calmes et belles",chiangmai:"Voir Chiang Mai",surprise:"🎲 Un endroit dont je n’ai jamais entendu parler",markets:"Marchés et rues locales",lights:"Lumières de ville maintenant",wildlife:"Faune",mountains:"Montagnes"},
 es:{good:"✨ ¿Qué vale la pena ver en la Tierra ahora?",snow:"❄️ ¿Dónde puedo ver nieve?",sunset:"🌅 Muéstrame un atardecer hermoso",beach:"Playas en vivo ahora",life:"Vida ocurriendo ahora",peaceful:"Vistas tranquilas y hermosas",chiangmai:"Ver Chiang Mai",surprise:"🎲 Un lugar del que nunca he oído hablar",markets:"Mercados y calles locales",lights:"Luces de ciudad ahora",wildlife:"Vida salvaje",mountains:"Montañas"},
 ja:{good:"✨ 今の地球でおすすめは？",snow:"❄️ 雪はどこで見られる？",sunset:"🌅 美しい夕日を見せて",beach:"今のライブ海岸",life:"今起きている暮らし",peaceful:"静かで美しい景色",chiangmai:"チェンマイを見る",surprise:"🎲 聞いたことのない場所へ",markets:"地元の市場と通り",lights:"今の街明かり",wildlife:"野生動物",mountains:"山"},
 zh:{good:"✨ 现在地球上有什么值得看？",snow:"❄️ 哪里可以看到雪？",sunset:"🌅 给我看美丽的日落",beach:"现在的直播海滩",life:"此刻正在发生的生活",peaceful:"安静美丽的景色",chiangmai:"看看清迈",surprise:"🎲 带我去一个从没听说过的地方",markets:"本地市场与街道",lights:"现在的城市灯光",wildlife:"野生动物",mountains:"山地"}
};
const localized=(x,language)=>language==="en"?x.label:(LABELS[language]?.[x.key]||x.label);
const signature=x=>x.key==="good",surprise=x=>x.key==="surprise",localLife=x=>x.key==="life";
export function earthSuggestions({currentAvailable=true,limit=5,includeRecent=true,language="en"}={}){
 const eligible=BASE.filter(x=>currentAvailable||!x.current),recent=includeRecent?recentEarthSearches().filter(query=>!BASE.some(x=>x.query.toLowerCase()===query.toLowerCase())).map(query=>({key:"recent",label:guideFormat("again",{query},language),query,intents:[],current:false,recent:true})):[],recentCap=Math.min(recent.length,Math.max(0,Math.min(2,limit-3))),freshCap=Math.max(0,limit-recentCap);
 let fresh=eligible.slice(0,freshCap);
 if(currentAvailable&&freshCap>0&&!fresh.some(signature)){const x=eligible.find(signature);if(x)fresh[0]=x}
 if(freshCap===5&&!fresh.some(surprise)){const x=eligible.find(surprise);if(x)fresh[fresh.length-1]=x}
 if(currentAvailable&&freshCap===5&&!fresh.some(localLife)){const x=eligible.find(localLife);if(x)fresh[Math.max(0,fresh.length-2)]=x}
 return [...fresh.map(x=>({...x,label:localized(x,language)})),...recent.slice(0,recentCap)].slice(0,Math.max(0,limit)).map(x=>({...x,intents:[...x.intents]}));
}
export function suggestionForEmptyIntent(options={}){return earthSuggestions(options)[0]||null}
