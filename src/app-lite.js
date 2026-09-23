(() => {
"use strict";
const $=s=>document.querySelector(s);
const FEATURED_HOLD=new Set(["maui-hale-pau-hana","perdido-key-beach","pleasant-beach-lake-ontario","blouberg-table-mountain"]);
function readSavedSet(key){try{return new Set(JSON.parse(localStorage.getItem(key)||"[]"))}catch{return new Set()}}
function readSavedText(key,fallback){try{return localStorage.getItem(key)||fallback}catch{return fallback}}
function writeSaved(key,value){try{localStorage.setItem(key,value)}catch{}}
function readJSON(key,fallback){try{const v=JSON.parse(localStorage.getItem(key)||"null");return v??fallback}catch{return fallback}}
function interactionProfile(){const p=readJSON("ern-profile",{countries:{},categories:{},views:0});return p&&typeof p==="object"?p:{countries:{},categories:{},views:0}}
function recordInterest(s){
 const now=Date.now();if(state.lastInterestId===s.id&&now-state.lastInterestAt<60000)return;state.lastInterestId=s.id;state.lastInterestAt=now;
 const p=interactionProfile();p.countries=p.countries||{};p.categories=p.categories||{};p.views=Number(p.views||0)+1;
 if(s.country)p.countries[s.country]=(p.countries[s.country]||0)+1;
 for(const c of (s.categories||[]).slice(0,4))p.categories[c]=(p.categories[c]||0)+1;
 const trim=o=>Object.fromEntries(Object.entries(o).sort((a,b)=>b[1]-a[1]).slice(0,12));p.countries=trim(p.countries);p.categories=trim(p.categories);
 writeSaved("ern-profile",JSON.stringify(p));
 const recent=readJSON("ern-recent",[]);const next=[s.id,...recent.filter(id=>id!==s.id)].slice(0,8);writeSaved("ern-recent",JSON.stringify(next));
}
const savedMode=readSavedText("ern-mode","auto");
const savedCategory=readSavedText("ern-category","all");
const state={sources:[],localDirectory:[],watch:[],selected:null,watchIndex:0,journeyTimer:null,imageTimer:null,heroTimer:null,setOffset:0,wanderOffset:0,mode:["auto","beautiful","cities","calm","night","golden"].includes(savedMode)?savedMode:"auto",category:["all","mountain","beach","city","nature","wildlife","island","park","landmark","weather","random"].includes(savedCategory)?savedCategory:"all",favorites:readSavedSet("ern-favorites")};
const translations={
 en:{home:"Home",watchEarth:"Watch Earth",explore:"Explore",worldMap:"World Map",destinations:"Destinations",seeBefore:"See before you go.",watchNow:"Watch Earth Now",nextMoment:"Next moment",forMoment:"For this moment",beautifulEarth:"Beautiful Earth",earthMotion:"Earth in Motion",natureCalm:"Nature & Calm",nightLights:"Night Lights",anotherSix:"Another six",searchEarth:"Search Earth…",clear:"Clear",allWindows:"All windows",playHere:"Play here",externalLive:"External live",resetLocal:"Reset local suggestions",previous:"Previous",playJourney:"Play journey",pauseJourney:"Pause journey",next:"Next",source:"Source",share:"Share",fullScreen:"Full screen",watch:"Watch",map:"Map",saved:"Saved",heroDeck:"Live views from amazing places around the world. Real conditions. Real moments. A more connected planet.",watchNowEyebrow:"WATCH EARTH NOW",watchSubhead:"A changing world. Always something new to see.",surpriseMe:"Surprise Me",keepWandering:"KEEP WANDERING",morePlaces:"More places worth a look.",exploreEarth:"EXPLORE EARTH",whereLook:"Where do you want to look?",searchDeck:"Search a city, beach, mountain, park, wildlife camera or destination. ERN shows the best truthful window available.",livingAtlas:"LIVING ATLAS",atlasHeading:"The world, one current window at a time.",atlasDeck:"Choose a pin, then open the best available current view for that place.",myEarth:"MY EARTH",myEarthHeading:"Your places, kept local.",myEarthDeck:"Favorites and recent exploration stay in this browser. ERN uses them only to gently improve your For this moment set.",savedWindows:"Saved windows",recentExplored:"Recently explored",continueExploring:"Continue exploring",localOnly:"Based only on your local ERN activity.",aboutWindow:"ABOUT THIS WINDOW",nearbyEarth:"NEARBY ON EARTH",moreLikeThis:"MORE LIKE THIS",beforeGo:"BEFORE YOU GO",stay:"Stay",eat:"Eat",thingsDo:"Things to do",weather:"Weather",goldenHour:"Golden Hour",playHereCount:"play here",daylightCount:"in daylight",nightCityCount:"night-city views",mappedCount:"mapped windows",allPlaces:"All Places",mountains:"Mountains",beaches:"Beaches",cities:"Cities",nature:"Nature",wildlife:"Wildlife",islands:"Islands",parks:"Parks",landmarks:"Landmarks",random:"Random",daylightNow:"Daylight now"},
 th:{home:"หน้าแรก",watchEarth:"ชมโลก",explore:"สำรวจ",worldMap:"แผนที่โลก",destinations:"จุดหมาย",seeBefore:"ดูก่อนที่คุณจะไป",watchNow:"ชมโลกตอนนี้",nextMoment:"ช่วงเวลาถัดไป",forMoment:"สำหรับช่วงเวลานี้",beautifulEarth:"โลกที่สวยงาม",earthMotion:"โลกที่เคลื่อนไหว",natureCalm:"ธรรมชาติและความสงบ",nightLights:"แสงไฟยามค่ำ",anotherSix:"อีกหกแห่ง",searchEarth:"ค้นหาโลก…",clear:"ล้าง",allWindows:"ทุกมุมมอง",playHere:"เล่นที่นี่",externalLive:"ไลฟ์ภายนอก",resetLocal:"รีเซ็ตคำแนะนำในเครื่อง",previous:"ก่อนหน้า",playJourney:"เล่นต่อเนื่อง",pauseJourney:"หยุดชั่วคราว",next:"ถัดไป",source:"แหล่งที่มา",share:"แชร์",fullScreen:"เต็มจอ",watch:"ชม",map:"แผนที่",saved:"บันทึก",heroDeck:"มุมมองสดและภาพปัจจุบันจากสถานที่น่าสนใจทั่วโลก สภาพจริง ช่วงเวลาจริง โลกที่เชื่อมถึงกันมากขึ้น",watchNowEyebrow:"ชมโลกตอนนี้",watchSubhead:"โลกกำลังเปลี่ยนแปลง และมีสิ่งใหม่ให้เห็นเสมอ",surpriseMe:"สุ่มให้ฉัน",keepWandering:"เดินทางต่อ",morePlaces:"อีกหลายสถานที่ที่น่าดู",exploreEarth:"สำรวจโลก",whereLook:"คุณอยากมองไปที่ไหน?",searchDeck:"ค้นหาเมือง ชายหาด ภูเขา สวน สัตว์ป่า หรือจุดหมายปลายทาง ERN จะแสดงมุมมองที่ตรงไปตรงมาที่สุด",livingAtlas:"แผนที่โลกมีชีวิต",atlasHeading:"โลกทั้งใบ ผ่านมุมมองปัจจุบันทีละแห่ง",atlasDeck:"เลือกหมุด แล้วเปิดมุมมองปัจจุบันที่ดีที่สุดของสถานที่นั้น",myEarth:"โลกของฉัน",myEarthHeading:"สถานที่ของคุณ เก็บไว้ในเบราว์เซอร์นี้",myEarthDeck:"รายการโปรดและประวัติการสำรวจอยู่ในเบราว์เซอร์นี้เท่านั้น ERN ใช้เพื่อปรับชุดสำหรับช่วงเวลานี้อย่างนุ่มนวล",savedWindows:"มุมมองที่บันทึก",recentExplored:"สำรวจล่าสุด",continueExploring:"สำรวจต่อ",localOnly:"อ้างอิงจากกิจกรรม ERN ในเบราว์เซอร์นี้เท่านั้น",aboutWindow:"เกี่ยวกับมุมมองนี้",nearbyEarth:"สถานที่ใกล้เคียง",moreLikeThis:"คล้ายกัน",beforeGo:"ก่อนที่คุณจะไป",stay:"ที่พัก",eat:"ร้านอาหาร",thingsDo:"สิ่งที่น่าทำ",weather:"อากาศ",goldenHour:"ช่วงแสงทอง",playHereCount:"เล่นที่นี่",daylightCount:"อยู่ในช่วงกลางวัน",nightCityCount:"เมืองยามค่ำ",mappedCount:"อยู่บนแผนที่",allPlaces:"ทุกสถานที่",mountains:"ภูเขา",beaches:"ชายหาด",cities:"เมือง",nature:"ธรรมชาติ",wildlife:"สัตว์ป่า",islands:"เกาะ",parks:"สวน",landmarks:"แลนด์มาร์ก",random:"สุ่ม",daylightNow:"กลางวันตอนนี้"},
 de:{home:"Start",watchEarth:"Erde ansehen",explore:"Entdecken",worldMap:"Weltkarte",destinations:"Ziele",seeBefore:"Sehen, bevor du gehst.",watchNow:"Erde jetzt ansehen",nextMoment:"Nächster Moment",forMoment:"Für diesen Moment",beautifulEarth:"Schöne Erde",earthMotion:"Erde in Bewegung",natureCalm:"Natur & Ruhe",nightLights:"Nachtlichter",anotherSix:"Sechs weitere",searchEarth:"Erde durchsuchen…",clear:"Löschen",allWindows:"Alle Fenster",playHere:"Hier abspielen",externalLive:"Extern live",resetLocal:"Lokale Vorschläge zurücksetzen",previous:"Zurück",playJourney:"Reise starten",pauseJourney:"Pause",next:"Weiter",source:"Quelle",share:"Teilen",fullScreen:"Vollbild",watch:"Ansehen",map:"Karte",saved:"Gespeichert",heroDeck:"Live- und aktuelle Ansichten bemerkenswerter Orte weltweit. Echte Bedingungen. Echte Momente. Eine stärker verbundene Welt.",watchNowEyebrow:"ERDE JETZT ANSEHEN",watchSubhead:"Eine Welt in Bewegung. Immer etwas Neues zu sehen.",surpriseMe:"Überrasch mich",keepWandering:"WEITERWANDERN",morePlaces:"Weitere Orte, die einen Blick wert sind.",exploreEarth:"ERDE ENTDECKEN",whereLook:"Wohin möchtest du schauen?",searchDeck:"Suche nach Stadt, Strand, Berg, Park, Tierwelt oder Reiseziel. ERN zeigt das beste ehrliche aktuelle Fenster.",livingAtlas:"LEBENDER ATLAS",atlasHeading:"Die Welt, ein aktuelles Fenster nach dem anderen.",atlasDeck:"Wähle einen Punkt und öffne die beste verfügbare aktuelle Ansicht.",myEarth:"MEINE ERDE",myEarthHeading:"Deine Orte, lokal gespeichert.",myEarthDeck:"Favoriten und zuletzt erkundete Orte bleiben in diesem Browser.",savedWindows:"Gespeicherte Fenster",recentExplored:"Zuletzt erkundet",continueExploring:"Weiter entdecken",localOnly:"Nur basierend auf deiner lokalen ERN-Nutzung.",aboutWindow:"ÜBER DIESES FENSTER",nearbyEarth:"IN DER NÄHE",moreLikeThis:"ÄHNLICHE ORTE",beforeGo:"BEVOR DU GEHST",stay:"Übernachten",eat:"Essen",thingsDo:"Aktivitäten",weather:"Wetter",goldenHour:"Goldene Stunde",playHereCount:"hier abspielbar",daylightCount:"bei Tageslicht",nightCityCount:"Nachtstadt-Ansichten",mappedCount:"kartierte Fenster",allPlaces:"Alle Orte",mountains:"Berge",beaches:"Strände",cities:"Städte",nature:"Natur",wildlife:"Tierwelt",islands:"Inseln",parks:"Parks",landmarks:"Sehenswürdigkeiten",random:"Zufall",daylightNow:"Jetzt Tageslicht"},
 fr:{home:"Accueil",watchEarth:"Voir la Terre",explore:"Explorer",worldMap:"Carte du monde",destinations:"Destinations",seeBefore:"Voir avant de partir.",watchNow:"Voir la Terre maintenant",nextMoment:"Moment suivant",forMoment:"Pour cet instant",beautifulEarth:"Belle Terre",earthMotion:"Terre en mouvement",natureCalm:"Nature & calme",nightLights:"Lumières de nuit",anotherSix:"Six autres",searchEarth:"Rechercher sur Terre…",clear:"Effacer",allWindows:"Toutes les vues",playHere:"Lire ici",externalLive:"Live externe",resetLocal:"Réinitialiser les suggestions locales",previous:"Précédent",playJourney:"Lancer le voyage",pauseJourney:"Pause",next:"Suivant",source:"Source",share:"Partager",fullScreen:"Plein écran",watch:"Voir",map:"Carte",saved:"Enregistré",heroDeck:"Vues en direct et actuelles de lieux remarquables dans le monde. Conditions réelles. Moments réels. Une planète plus connectée.",watchNowEyebrow:"VOIR LA TERRE MAINTENANT",watchSubhead:"Un monde qui change. Toujours quelque chose de nouveau à voir.",surpriseMe:"Surprenez-moi",keepWandering:"CONTINUER À EXPLORER",morePlaces:"D’autres lieux qui valent le détour.",exploreEarth:"EXPLORER LA TERRE",whereLook:"Où voulez-vous regarder ?",searchDeck:"Recherchez une ville, une plage, une montagne, un parc, des animaux ou une destination. ERN affiche la meilleure vue actuelle et honnête.",livingAtlas:"ATLAS VIVANT",atlasHeading:"Le monde, une fenêtre actuelle à la fois.",atlasDeck:"Choisissez un point puis ouvrez la meilleure vue actuelle disponible.",myEarth:"MA TERRE",myEarthHeading:"Vos lieux, conservés localement.",myEarthDeck:"Les favoris et l’exploration récente restent dans ce navigateur.",savedWindows:"Fenêtres enregistrées",recentExplored:"Exploré récemment",continueExploring:"Continuer à explorer",localOnly:"Basé uniquement sur votre activité ERN locale.",aboutWindow:"À PROPOS DE CETTE VUE",nearbyEarth:"À PROXIMITÉ",moreLikeThis:"DANS LE MÊME ESPRIT",beforeGo:"AVANT DE PARTIR",stay:"Séjourner",eat:"Manger",thingsDo:"À faire",weather:"Météo",goldenHour:"Heure dorée",playHereCount:"lisibles ici",daylightCount:"en plein jour",nightCityCount:"vues urbaines de nuit",mappedCount:"fenêtres cartographiées",allPlaces:"Tous les lieux",mountains:"Montagnes",beaches:"Plages",cities:"Villes",nature:"Nature",wildlife:"Faune",islands:"Îles",parks:"Parcs",landmarks:"Sites",random:"Aléatoire",daylightNow:"En plein jour"},
 ja:{home:"ホーム",watchEarth:"地球を見る",explore:"探索",worldMap:"世界地図",destinations:"行き先",seeBefore:"行く前に見る。",watchNow:"今の地球を見る",nextMoment:"次の瞬間",forMoment:"今この瞬間",beautifulEarth:"美しい地球",earthMotion:"動く地球",natureCalm:"自然と静けさ",nightLights:"夜の灯り",anotherSix:"別の6か所",searchEarth:"地球を検索…",clear:"クリア",allWindows:"すべて",playHere:"ここで再生",externalLive:"外部ライブ",resetLocal:"ローカル提案をリセット",previous:"前へ",playJourney:"自動再生",pauseJourney:"一時停止",next:"次へ",source:"ソース",share:"共有",fullScreen:"全画面",watch:"見る",map:"地図",saved:"保存",heroDeck:"世界のすばらしい場所から、ライブまたは現在の景色を。実際の状況、実際の瞬間、よりつながる地球。",watchNowEyebrow:"今の地球を見る",watchSubhead:"変わり続ける世界。いつも新しい景色があります。",surpriseMe:"おまかせ",keepWandering:"さらに旅する",morePlaces:"まだ見てみたい場所。",exploreEarth:"地球を探索",whereLook:"どこを見たいですか？",searchDeck:"都市、ビーチ、山、公園、野生動物、目的地を検索。ERNは最も正直な現在の景色を表示します。",livingAtlas:"リビングアトラス",atlasHeading:"今この瞬間の窓から世界を見る。",atlasDeck:"ピンを選んで、その場所の最良の現在ビューを開きます。",myEarth:"マイ・アース",myEarthHeading:"あなたの場所を、このブラウザに。",myEarthDeck:"お気に入りと最近の探索はこのブラウザ内だけに保存されます。",savedWindows:"保存したビュー",recentExplored:"最近見た場所",continueExploring:"探索を続ける",localOnly:"このブラウザ内のERN利用だけに基づきます。",aboutWindow:"このビューについて",nearbyEarth:"近くの場所",moreLikeThis:"似た場所",beforeGo:"行く前に",stay:"泊まる",eat:"食べる",thingsDo:"すること",weather:"天気",goldenHour:"ゴールデンアワー",playHereCount:"ここで再生",daylightCount:"昼の景色",nightCityCount:"夜の都市",mappedCount:"地図上のビュー",allPlaces:"すべて",mountains:"山",beaches:"ビーチ",cities:"都市",nature:"自然",wildlife:"野生動物",islands:"島",parks:"公園",landmarks:"名所",random:"ランダム",daylightNow:"現在昼間"},
 zh:{home:"首页",watchEarth:"观看地球",explore:"探索",worldMap:"世界地图",destinations:"目的地",seeBefore:"出发前先看看。",watchNow:"现在看地球",nextMoment:"下一个时刻",forMoment:"此刻推荐",beautifulEarth:"美丽地球",earthMotion:"流动的地球",natureCalm:"自然与宁静",nightLights:"夜色灯光",anotherSix:"再看六个",searchEarth:"搜索地球…",clear:"清除",allWindows:"全部窗口",playHere:"站内播放",externalLive:"外部直播",resetLocal:"重置本地推荐",previous:"上一个",playJourney:"自动播放",pauseJourney:"暂停",next:"下一个",source:"来源",share:"分享",fullScreen:"全屏",watch:"观看",map:"地图",saved:"收藏",heroDeck:"来自世界各地精彩地点的直播与当前画面。真实状况，真实时刻，更互联的地球。",watchNowEyebrow:"现在看地球",watchSubhead:"不断变化的世界，总有新的景象。",surpriseMe:"随机看看",keepWandering:"继续漫游",morePlaces:"更多值得一看的地方。",exploreEarth:"探索地球",whereLook:"你想看哪里？",searchDeck:"搜索城市、海滩、山脉、公园、野生动物或目的地。ERN展示最真实可靠的当前窗口。",livingAtlas:"动态地图",atlasHeading:"一次一个当前窗口，看遍世界。",atlasDeck:"选择一个地点，然后打开最佳可用当前画面。",myEarth:"我的地球",myEarthHeading:"你的地点，仅保存在本地。",myEarthDeck:"收藏和最近探索只保存在这个浏览器中。",savedWindows:"已收藏窗口",recentExplored:"最近探索",continueExploring:"继续探索",localOnly:"仅基于你在本地浏览器中的ERN活动。",aboutWindow:"关于此窗口",nearbyEarth:"附近地点",moreLikeThis:"类似地点",beforeGo:"出发前",stay:"住宿",eat:"餐饮",thingsDo:"值得做",weather:"天气",goldenHour:"黄金时刻",playHereCount:"站内播放",daylightCount:"当前白天",nightCityCount:"夜间城市",mappedCount:"地图窗口",allPlaces:"所有地点",mountains:"山脉",beaches:"海滩",cities:"城市",nature:"自然",wildlife:"野生动物",islands:"岛屿",parks:"公园",landmarks:"地标",random:"随机",daylightNow:"当前白天"},
 es:{home:"Inicio",watchEarth:"Ver la Tierra",explore:"Explorar",worldMap:"Mapa mundial",destinations:"Destinos",seeBefore:"Mira antes de ir.",watchNow:"Ver la Tierra ahora",nextMoment:"Siguiente momento",forMoment:"Para este momento",beautifulEarth:"Tierra hermosa",earthMotion:"Tierra en movimiento",natureCalm:"Naturaleza y calma",nightLights:"Luces nocturnas",anotherSix:"Otros seis",searchEarth:"Buscar en la Tierra…",clear:"Limpiar",allWindows:"Todas las vistas",playHere:"Ver aquí",externalLive:"Live externo",resetLocal:"Restablecer sugerencias locales",previous:"Anterior",playJourney:"Iniciar viaje",pauseJourney:"Pausar",next:"Siguiente",source:"Fuente",share:"Compartir",fullScreen:"Pantalla completa",watch:"Ver",map:"Mapa",saved:"Guardado",heroDeck:"Vistas en vivo y actuales de lugares extraordinarios del mundo. Condiciones reales. Momentos reales. Un planeta más conectado.",watchNowEyebrow:"VER LA TIERRA AHORA",watchSubhead:"Un mundo en cambio. Siempre hay algo nuevo que ver.",surpriseMe:"Sorpréndeme",keepWandering:"SEGUIR EXPLORANDO",morePlaces:"Más lugares que merecen una mirada.",exploreEarth:"EXPLORAR LA TIERRA",whereLook:"¿Dónde quieres mirar?",searchDeck:"Busca una ciudad, playa, montaña, parque, fauna o destino. ERN muestra la mejor ventana actual y honesta disponible.",livingAtlas:"ATLAS VIVO",atlasHeading:"El mundo, una ventana actual a la vez.",atlasDeck:"Elige un punto y abre la mejor vista actual disponible.",myEarth:"MI TIERRA",myEarthHeading:"Tus lugares, guardados localmente.",myEarthDeck:"Los favoritos y la exploración reciente permanecen en este navegador.",savedWindows:"Ventanas guardadas",recentExplored:"Explorado recientemente",continueExploring:"Seguir explorando",localOnly:"Basado solo en tu actividad local en ERN.",aboutWindow:"SOBRE ESTA VISTA",nearbyEarth:"CERCA EN LA TIERRA",moreLikeThis:"MÁS COMO ESTO",beforeGo:"ANTES DE IR",stay:"Alojamiento",eat:"Comer",thingsDo:"Qué hacer",weather:"Clima",goldenHour:"Hora dorada",playHereCount:"se reproducen aquí",daylightCount:"con luz diurna",nightCityCount:"vistas urbanas nocturnas",mappedCount:"ventanas en el mapa",allPlaces:"Todos los lugares",mountains:"Montañas",beaches:"Playas",cities:"Ciudades",nature:"Naturaleza",wildlife:"Fauna",islands:"Islas",parks:"Parques",landmarks:"Lugares emblemáticos",random:"Aleatorio",daylightNow:"Con luz ahora"}
}
let lang=readSavedText("ern-language","en");if(!translations[lang])lang="en";
const t=k=>translations[lang]?.[k]||translations.en[k]||k;
function cleanUrl(v){try{const u=new URL(v,location.href);return /^https?:$/.test(u.protocol)?u.href:null}catch{return null}}
function truthLabel(s){if(s.truth==="LIVE_VIDEO")return"LIVE VIDEO";if(s.truth==="LIVE_IMAGE")return"LIVE IMAGE";if(s.truth==="EXTERNAL_LIVE")return"EXTERNAL LIVE";if(s.truth==="PARTNER")return"PARTNER";return"PREVIEW"}
function truthTone(s){if(isInside(s)&&s.truth==="LIVE_VIDEO")return"live-here";if(isInside(s)&&s.truth==="LIVE_IMAGE")return"current-image";if(s.truth==="EXTERNAL_LIVE")return"external-live";if(s.truth==="PARTNER")return"partner";return"preview"}
function publicTruth(s){if(isInside(s)&&s.truth==="LIVE_VIDEO")return"LIVE HERE";if(isInside(s)&&s.truth==="LIVE_IMAGE")return"CURRENT IMAGE";if(s.truth==="EXTERNAL_LIVE")return"LIVE ↗";if(s.truth==="PARTNER")return"PARTNER";return"PREVIEW"}
function allowAmbientLive(){return !(navigator.connection?.saveData||globalThis.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches)}
function isInside(s){return!!(s&&s.health!=="OFFLINE"&&((s.playback==="EMBED"&&cleanUrl(s.embedUrl))||(s.playback==="IMAGE_REFRESH"&&cleanUrl(s.sourceUrl))))}
function localHour(s){if(!s?.timeZone)return null;try{const p=new Intl.DateTimeFormat("en-US",{timeZone:s.timeZone,hour:"2-digit",hour12:false}).formatToParts(new Date());const h=Number(p.find(x=>x.type==="hour")?.value);return Number.isFinite(h)?h%24:null}catch{return null}}
function localTime(s){if(!s?.timeZone)return"";try{return new Intl.DateTimeFormat(undefined,{timeZone:s.timeZone,hour:"numeric",minute:"2-digit"}).format(new Date())}catch{return""}}
function verificationAgeDays(s){const raw=s.lastSuccessfulCheck||s.checkedAt;if(!raw)return Infinity;const ms=Date.now()-Date.parse(raw);return Number.isFinite(ms)?Math.max(0,ms/86400000):Infinity}
function verificationLabel(s){const d=verificationAgeDays(s);if(!Number.isFinite(d))return"Verification time unavailable";if(d<1)return"Verified within 24h";if(d<2)return"Verified yesterday";return"Verified "+Math.floor(d)+" days ago"}
function featureEligible(s){return!!(s&&s.health==="HEALTHY"&&!FEATURED_HOLD.has(s.id)&&verificationAgeDays(s)<=21)}
function watchEligible(s){return featureEligible(s)&&s.truth!=="PREVIEW"&&s.playback!=="PREVIEW"}
const momentWords={
 en:["Current","Morning light","Daylight","Evening light","Night"],
 th:["ปัจจุบัน","แสงยามเช้า","กลางวัน","แสงยามเย็น","กลางคืน"],
 de:["Aktuell","Morgenlicht","Tageslicht","Abendlicht","Nacht"],
 fr:["Actuel","Lumière du matin","Jour","Lumière du soir","Nuit"],
 ja:["現在","朝の光","昼","夕方の光","夜"],
 zh:["当前","晨光","白天","暮光","夜晚"],
 es:["Actual","Luz de la mañana","Día","Luz de la tarde","Noche"]
};
function momentLabel(s){const w=momentWords[lang]||momentWords.en,h=localHour(s);if(h===null)return w[0];if(h>=5&&h<8)return w[1];if(h>=8&&h<17)return w[2];if(h>=17&&h<20)return w[3];return w[4];}
function momentSignal(s){
 const h=localHour(s),c=cats(s);if(h===null)return{score:0,label:"Current view",reason:"Current conditions available now."};
 const scenic=isScenic(s),city=isCity(s),wild=/wildlife|animal|zoo/.test(c),water=/beach|water|sea|coast|harbour/.test(c),mountain=/mountain|snow|ski|volcano|alps/.test(c);
 if(h>=5&&h<8){let score=18+(scenic?16:0)+(wild?9:0);return{score,label:"Morning light",reason:wild?"Dawn can be an active wildlife window.":"Soft morning light can make this a strong time to look."}}
 if(h>=17&&h<20){let score=20+(scenic?18:0)+(water?7:0)+(mountain?6:0);return{score,label:"Evening light",reason:"Late-day light can make this view especially expressive."}}
 if((h>=20||h<5)&&city){return{score:34,label:"Night lights",reason:"This city or harbour can stay visually active after dark."}}
 if((h>=20||h<5)&&!city){return{score:-26,label:"Night",reason:"It is dark locally, so this view may reveal less detail."}}
 if(h>=8&&h<17){let score=10+(scenic?12:0);return{score,label:"Daylight",reason:"Local daylight gives a clearer view of current conditions."}}
 return{score:0,label:momentLabel(s),reason:"Current local conditions."};
}
function cats(s){return(s.categories||[]).join(" ").toLowerCase()}
function isDay(s){const h=localHour(s);return h===null?true:h>=6&&h<19}
function isCity(s){return/city|cities|street|skyline|harbour|landmark|culture/.test(cats(s))}
function isScenic(s){return/beautiful|beach|water|mountain|nature|park|island|wildlife/.test(cats(s))}
function categoryMatch(s,cat){
 const c=cats(s);if(cat==="all")return true;if(cat==="mountain")return/mountain|snow|ski|volcano|alps/.test(c);
 if(cat==="beach")return/beach|water|sea|coast|surf|harbour/.test(c);if(cat==="city")return/city|cities|street|skyline|harbour/.test(c);
 if(cat==="nature")return/nature|forest|garden|earth|scenic/.test(c);if(cat==="wildlife")return/wildlife|zoo|animal|aquarium/.test(c);
 if(cat==="island")return/island|beach|coast/.test(c);if(cat==="park")return/park|nature|forest/.test(c);if(cat==="landmark")return/landmark|culture/.test(c);
 if(cat==="weather")return/useful|weather|mountain|beach/.test(c);return true;
}
function personalBoost(s){
 if(state.mode!=="auto")return 0;
 const p=interactionProfile();let n=state.favorites.has(s.id)?14:0;
 if(Number(p.views||0)>=3){
   if(s.country)n+=Math.min(8,Number(p.countries?.[s.country]||0)*1.5);
   for(const c of s.categories||[])n+=Math.min(3,Number(p.categories?.[c]||0));
   const recent=readJSON("ern-recent",[]);if(recent.includes(s.id))n+=3;
 }
 return Math.min(20,n);
}
function baseScore(s){
 let n=Number(s.quality||0)+Number(s.moment||0)*.72+Number(s.freshness||0)*.35;
 if(s.health==="HEALTHY")n+=32;else if(s.health==="DEGRADED")n-=38;else n-=100;
 const age=verificationAgeDays(s);if(age<1)n+=8;else if(age<3)n+=3;else if(age>14)n-=30;else if(age>7)n-=12;
 if(isInside(s))n+=22;
 const ms=momentSignal(s);n+=ms.score;
 if(isDay(s)&&isScenic(s))n+=18;
 if(!isDay(s)&&!isCity(s))n-=20;
 if(!isDay(s)&&isCity(s))n+=8;
 if(FEATURED_HOLD.has(s.id))n-=500;
 n+=personalBoost(s);
 return n;
}
function heroPool(){
 const inside=state.watch.filter(s=>isInside(s)&&s.health==="HEALTHY"&&!FEATURED_HOLD.has(s.id));
 return inside.length?inside:state.watch;
}
function visitorHour(){return new Date().getHours()}
function visitorDaypart(){const h=visitorHour();if(h>=5&&h<10)return"morning";if(h>=10&&h<17)return"day";if(h>=17&&h<21)return"evening";return"night"}
function setProfile(){
 const part=visitorDaypart();
 const daypartOffset={morning:0,day:1,evening:2,night:3}[part]||0;
 const autoSlot=(Math.floor(Date.now()/14400000)+daypartOffset+state.setOffset)%4;
 const automatic=[
  {id:"beautiful",label:"Beautiful Earth",reason:"Chosen for this moment: daylight, scenery and strong current windows.",boost:s=>isScenic(s)?28:0},
  {id:"live",label:"Live Around the World",reason:"Chosen for this moment: strong live windows across regions.",boost:s=>isInside(s)?34:0},
  {id:"cities",label:"Earth in Motion",reason:"Chosen for this moment: cities, harbours and visible activity.",boost:s=>isCity(s)?34:0},
  {id:"wander",label:"Keep Wandering",reason:"Chosen for this moment: a varied route through useful current views.",boost:s=>(/interesting|useful/.test(cats(s))?24:0)}
 ][autoSlot];
 if(state.mode==="auto")return automatic;
 const fixed={
  beautiful:{id:"beautiful",label:"Beautiful Earth",reason:"Scenic daylight, strong views and visual calm.",boost:s=>(isScenic(s)&&isDay(s)?42:0)},
  cities:{id:"cities",label:"Earth in Motion",reason:"Cities, streets and harbours with visible life.",boost:s=>isCity(s)?46:0},
  calm:{id:"calm",label:"Nature & Calm",reason:"Mountains, water, wildlife and quieter windows.",boost:s=>(/mountain|beach|water|nature|park|wildlife|snow/.test(cats(s))?45:0)-(isCity(s)?12:0)},
  night:{id:"night",label:"Night Lights",reason:"City and harbour windows that stay interesting after dark.",boost:s=>(!isDay(s)&&isCity(s)?60:0)-(!isDay(s)&&!isCity(s)?30:0)},
  golden:{id:"golden",label:"Golden Hour",reason:"Morning and evening light across scenic places.",boost:s=>{const h=localHour(s);return h!==null&&((h>=5&&h<8)||(h>=17&&h<20))&&isScenic(s)?70:0}}
 };
 return fixed[state.mode]||automatic;
}
function buildWatch(sources){
 const profile=setProfile();
 let pool=sources.filter(watchEligible);
 if(state.category!=="all"&&state.category!=="random")pool=pool.filter(s=>categoryMatch(s,state.category));
 if(state.category==="all"){
   const strict={
     beautiful:s=>isScenic(s)&&isDay(s),
     cities:s=>isCity(s),
     calm:s=>/mountain|beach|water|nature|park|wildlife|snow/.test(cats(s)),
     night:s=>!isDay(s)&&isCity(s),
     golden:s=>{const h=localHour(s);return h!==null&&((h>=5&&h<8)||(h>=17&&h<20))&&isScenic(s)}
   }[state.mode];
   if(strict){const narrowed=pool.filter(strict);if(narrowed.length>=8)pool=narrowed}
 }
 const sorted=[...pool].sort((a,b)=>(baseScore(b)+profile.boost(b))-(baseScore(a)+profile.boost(a)));
 const out=[],countries=new Map(),providers=new Map(),places=new Map();
 const reserveInside=sorted.filter(s=>isInside(s)&&s.health==="HEALTHY");
 for(const s of reserveInside){
   if(out.length>=5)break;const place=s.placeId||s.id,provider=s.provider||"";
   if(places.has(place)||(providers.get(provider)||0)>=3)continue;
   out.push(s);places.set(place,1);countries.set(s.country||"", (countries.get(s.country||"")||0)+1);providers.set(provider,(providers.get(provider)||0)+1)
 }
 for(const s of sorted){
   if(out.length>=20)break;if(out.some(x=>x.id===s.id))continue;
   const country=s.country||"",provider=s.provider||"",place=s.placeId||s.id;
   const cc=countries.get(country)||0,pc=providers.get(provider)||0,pl=places.get(place)||0;
   if(pl>=1&&out.length<16)continue;
   if(cc>=2&&out.length<15)continue;
   if(pc>=4&&out.length<15)continue;
   out.push(s);places.set(place,pl+1);countries.set(country,cc+1);providers.set(provider,pc+1);
 }
 for(const s of sorted){if(out.length>=20)break;if(!out.some(x=>x.id===s.id))out.push(s)}
 if(state.category==="random")out.sort(()=>Math.random()-.5);
 $("#setLabel").textContent=profile.label;$("#setReason").textContent=profile.reason;
 const signals=out.slice(0,6).map(s=>momentSignal(s));const strong=signals.filter(x=>x.score>=24).length;$("#momentSummary").textContent=strong?strong+" strong moment"+(strong===1?"":"s")+" near the top":"Balanced for the current moment";
 const p=interactionProfile();$("#personalNote").textContent=Number(p.views||0)>=3?"Adapting locally to places you explore":"Personalized locally as you explore";
 return out;
}
function generatedBackground(s){
 const c=cats(s);
 if(/beach|water|sea|harbour|coast|surf/.test(c))return"radial-gradient(circle at 70% 18%,rgba(255,222,145,.72),transparent 18%),linear-gradient(155deg,#74b7cf,#1d7894 48%,#0e4e61)";
 if(/mountain|volcano|alps|snow|ski/.test(c))return"radial-gradient(circle at 72% 18%,rgba(255,225,165,.6),transparent 17%),linear-gradient(145deg,#b7c8cb,#718c8a 48%,#304b49)";
 if(/wildlife|animal|zoo|aquarium/.test(c))return"radial-gradient(circle at 68% 25%,rgba(235,194,109,.58),transparent 22%),linear-gradient(145deg,#9b9360,#5b7248 52%,#2e4635)";
 if(/city|street|skyline|harbour/.test(c))return"radial-gradient(circle at 72% 18%,rgba(246,181,95,.72),transparent 18%),linear-gradient(150deg,#4a6077,#23394d 52%,#0d2533)";
 return"radial-gradient(circle at 65% 24%,rgba(155,220,190,.62),transparent 20%),linear-gradient(145deg,#5a8b7a,#2d6659 52%,#153f35)";
}
function posterMarkup(s){const img=cleanUrl(s.thumbnailUrl);return img?`<img src="${img.replace(/"/g,"&quot;")}" alt="" loading="lazy">`:""}
function scenicPoster(s){
 const c=cats(s),wrap=document.createElement("div");wrap.className="scenic-poster";
 if(/mountain|volcano|alps|snow|ski/.test(c))wrap.dataset.scene="mountain";
 else if(/beach|water|sea|harbour|coast|surf/.test(c))wrap.dataset.scene="water";
 else if(/wildlife|animal|zoo|aquarium/.test(c))wrap.dataset.scene="wildlife";
 else if(/city|street|skyline|harbour/.test(c))wrap.dataset.scene="city";
 else wrap.dataset.scene="earth";
 wrap.innerHTML='<span class="scene-sun"></span><span class="scene-back"></span><span class="scene-front"></span>';
 return wrap;
}
function renderHero(s){
 state.selected=s;if(!s)return;const mount=$("#heroLive");mount.classList.add("is-changing");
 setTimeout(()=>{mount.replaceChildren();mount.style.background=generatedBackground(s);const img=cleanUrl(s.thumbnailUrl);
  if(img){const el=document.createElement("img");el.src=img;el.alt="";el.decoding="async";el.onerror=()=>{el.remove();mount.append(scenicPoster(s))};mount.append(el)}
  else{mount.append(scenicPoster(s))}
  $("#heroTitle").textContent=s.title;$("#heroMeta").textContent=[s.region,s.country,momentSignal(s).label,localTime(s)].filter(Boolean).join(" · ");$("#heroTruth").textContent=publicTruth(s);$("#heroLocation").dataset.truth=truthTone(s);$("#heroDot").dataset.truth=truthTone(s);mount.classList.remove("is-changing");
 },180);
}
function compactVisual(s){
 const wrap=document.createElement("span");wrap.className="result-visual";wrap.style.background=generatedBackground(s);
 const img=cleanUrl(s.thumbnailUrl);if(img){const el=document.createElement("img");el.src=img;el.alt="";el.loading="lazy";wrap.append(el)}
 return wrap;
}
function card(s,compact=false,index=-1){
 const b=document.createElement("button");b.type="button";b.className=compact?"result-card":"window-card";b.setAttribute("aria-label",`${truthLabel(s)} — ${s.title}`);
 if(!compact){if(s.playback==="EXTERNAL")b.classList.add("is-external");if(s.playback==="IMAGE_REFRESH")b.classList.add("is-image");if(s.truth==="PARTNER")b.classList.add("is-partner");if(state.favorites.has(s.id))b.classList.add("saved");}
 if(compact){
   b.innerHTML=`<span class="truth"></span><strong></strong><small></small><span class="verify-mini"></span>`;
   b.prepend(compactVisual(s));b.querySelector(".truth").textContent=publicTruth(s);b.querySelector(".verify-mini").textContent=verificationLabel(s);b.querySelector("strong").textContent=s.title;b.querySelector("small").textContent=[s.region,s.country].filter(Boolean).join(" · ");
 }
 else{b.innerHTML=`<div class="card-visual"></div><div class="card-body"><div class="card-kicker"><span></span><span></span></div><strong></strong><small></small><span class="card-favorite" aria-hidden="true">${state.favorites.has(s.id)?"♥":"♡"}</span></div>`;const v=b.querySelector(".card-visual");v.style.background=generatedBackground(s);v.innerHTML=posterMarkup(s);
 if(!v.querySelector("img"))v.append(scenicPoster(s));
 b.dataset.truth=truthTone(s);b.querySelector(".card-kicker span:first-child").textContent=publicTruth(s);b.querySelector(".card-kicker span:last-child").textContent=[momentSignal(s).label,localTime(s)].filter(Boolean).join(" · ");b.querySelector("strong").textContent=s.title;b.querySelector("small").textContent=[s.region,s.country].filter(Boolean).join(", ")}
 b.onclick=()=>openViewer(s);return b;
}
function renderModeChips(){document.querySelectorAll(".mode-chip").forEach(b=>b.classList.toggle("active",b.dataset.mode===state.mode))}
function renderWatch(){state.watch=buildWatch(state.sources);$("#watchGrid").replaceChildren(...state.watch.map((s,i)=>card(s,false,i)));$("#watchCount").textContent=state.watch.length;$("#watchEmpty").hidden=state.watch.length>0;renderModeChips();state.watchIndex=Math.min(state.watchIndex,Math.max(0,state.watch.length-1));if(state.watch.length&&!state.selected)renderHero(heroPool()[0]||state.watch[0])}
function placeCard(group){
 const best=[...group].sort((a,b)=>baseScore(b)-baseScore(a))[0];
 const b=card(best,true);b.classList.add("place-card");
 const count=group.length;
 if(count>1){
   const badge=document.createElement("span");badge.className="view-count";badge.textContent=`${count} views`;b.append(badge);
   b.setAttribute("aria-label",`${best.title}, ${count} available views`);
 }
 b.onclick=()=>openViewer(best);return b;
}
function groupByPlace(items){
 const m=new Map();for(const s of items){const key=s.placeId||s.id;if(!m.has(key))m.set(key,[]);m.get(key).push(s)}
 return [...m.values()];
}
function normalizeSearch(v){return String(v||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim()}
function renderQuickSearches(){
 const host=document.querySelector(".search-suggestions");if(!host)return;
 const rankedCountries=[...new Set(state.sources.filter(s=>s.health==="HEALTHY"&&verificationAgeDays(s)<=21).sort((a,b)=>baseScore(b)-baseScore(a)).map(s=>s.country).filter(Boolean))].slice(0,3);
 const typeQueries=visitorDaypart()==="night"?["Cities","Beaches & Water","Wildlife"]:["Beaches & Water","Mountains","Wildlife"];
 const items=[...rankedCountries,...typeQueries].slice(0,6);host.replaceChildren(...items.map(q=>{const b=document.createElement("button");b.type="button";b.dataset.query=q;b.textContent=q;return b}));
 host.querySelectorAll("button").forEach(b=>b.onclick=()=>{$("#searchInput").value=b.dataset.query||"";search($("#searchInput").value,{updateUrl:true});scrollToId("search")});
}


function safeExternalUrl(v){try{const u=new URL(String(v||"").trim());return["http:","https:"].includes(u.protocol)&&!u.username&&!u.password?u.toString():""}catch{return""}}
function approvedLocalPlaces(){return(state.localDirectory||[]).filter(x=>x&&x.status==="APPROVED"&&x.id&&x.name&&safeExternalUrl(x.url))}
function localDirectoryMatch(q){
 const tokens=normalizeSearch(q).split(/\s+/).filter(Boolean),noise=new Set(["local","small","place","places","business","businesses","near","nearby","find","show","me","a","an","the"]);
 const useful=tokens.filter(t=>!noise.has(t));
 return approvedLocalPlaces().filter(x=>{const hay=normalizeSearch([x.name,x.type,x.place,x.country,x.summary,...(x.tags||[])].filter(Boolean).join(" "));return useful.length?useful.every(t=>hay.includes(t)):tokens.some(t=>hay.includes(t))});
}
function localDirectoryCard(x){
 const a=document.createElement("a");a.className="result-card local-directory-card";a.href=safeExternalUrl(x.url);a.target="_blank";a.rel="noopener noreferrer";a.setAttribute("aria-label",x.name+" — reviewed local place");
 const v=document.createElement("span");v.className="result-visual local-place-visual";v.innerHTML="<span>⌂</span>";
 const truth=document.createElement("span");truth.className="truth";truth.textContent="LOCAL PLACE";
 const strong=document.createElement("strong");strong.textContent=x.name;
 const small=document.createElement("small");small.textContent=[x.type,x.place,x.country].filter(Boolean).join(" · ");
 const note=document.createElement("span");note.className="verify-mini";note.textContent=x.verifiedAt?"ERN reviewed "+x.verifiedAt:"ERN reviewed";
 a.append(v,truth,strong,small,note);return a;
}

function guideWords(q){return normalizeSearch(q).split(/\s+/).filter(Boolean)}
function guideIntent(q){
 const x=normalizeSearch(q),words=guideWords(q),has=(...xs)=>xs.some(v=>x.includes(v));
 return{
   raw:String(q||"").trim(),words,
   peaceful:has("peaceful","quiet","calm","relax","tranquil","สงบ","ruhig","calme","静か","安静","tranquilo"),
   golden:has("golden","sunset","sunrise","evening light","morning light","แสง","sonnen","coucher","夕","日落","atardecer"),
   night:has("night","night lights","city lights","กลางคืน","nacht","nuit","夜","夜晚","noche"),
   local:has("small local","local place","not famous","village","market","farm","neighbourhood","neighborhood","ท้องถิ่น","lokal","local","地元","本地"),
   wildlife:has("wildlife","animal","zoo","สัตว์","tier","faune","動物","野生","fauna"),
   beach:has("beach","sea","coast","ocean","ชายหาด","strand","plage","海","playa"),
   mountain:has("mountain","alps","snow","ski","ภูเขา","berg","montagne","山","montaña"),
   city:has("city","street","people","busy","เมือง","stadt","ville","都市","城市","ciudad"),
   surprise:has("surprise","random","unexpected","somewhere else","สุ่ม","überrasch","surpr","おまかせ","随机"),
   current:has("right now","now","live","current","ตอนนี้","jetzt","maintenant","今","现在","ahora"),
   near:has("near here","nearby","around here","ใกล้","in der nähe","près","近く","附近","cerca")
 };
}
function guideScore(s,intent){
 let n=baseScore(s),c=cats(s),m=momentSignal(s);
 if(intent.peaceful)n+=/nature|mountain|beach|water|park|wildlife|forest|snow/.test(c)?42:-8;
 if(intent.golden)n+=m.label==="Morning light"||m.label==="Evening light"?70:isScenic(s)?18:-15;
 if(intent.night)n+=!isDay(s)&&isCity(s)?70:isCity(s)?12:-25;
 if(intent.local){const l=localPlaceSignals(s);n+=l.worth?80:l.score*10-15}
 if(intent.wildlife)n+=/wildlife|animal|zoo|aquarium/.test(c)?70:-16;
 if(intent.beach)n+=/beach|water|sea|coast|island|harbour|harbor/.test(c)?60:-12;
 if(intent.mountain)n+=/mountain|snow|ski|volcano|alps/.test(c)?60:-12;
 if(intent.city)n+=isCity(s)?55:-10;
 return n;
}
function guideNearby(seed){
 if(!seed)return[];const lat=Number(seed.lat),lon=Number(seed.lon);if(!Number.isFinite(lat)||!Number.isFinite(lon))return[];
 return state.sources.filter(s=>s.id!==seed.id&&featureEligible(s)&&Number.isFinite(Number(s.lat))&&Number.isFinite(Number(s.lon)))
   .map(s=>({s,d:distanceKm(seed,s)})).filter(x=>Number.isFinite(x.d)).sort((a,b)=>a.d-b.d).slice(0,4).map(x=>x.s);
}

function guidePlaceMatches(q){
 const noise=new Set(["show","me","take","to","somewhere","place","places","see","earth","please","right","now","live","current","good","what","is","are","the","a","an","with","in","at","near"]);
 const intentWords=new Set(["peaceful","quiet","calm","golden","sunset","sunrise","night","lights","wildlife","animal","beach","sea","coast","ocean","mountain","snow","ski","city","street","busy","surprise","random","local","small","business","cafe","café","restaurant","shop","market","farm","hotel","guesthouse","bakery","food"]);
 const tokens=normalizeSearch(q).split(/\s+/).filter(t=>t&&!noise.has(t)&&!intentWords.has(t));
 if(!tokens.length)return[];
 return state.sources.filter(featureEligible).filter(s=>{const hay=normalizeSearch([s.title,s.region,s.country,s.provider,s.story,...(s.categories||[])].filter(Boolean).join(" "));return tokens.every(t=>hay.includes(t))}).sort((a,b)=>baseScore(b)-baseScore(a));
}

function guideResponse(q){
 const intent=guideIntent(q);
 if(!intent.raw)return{text:"Tell me a mood, a place, or the kind of Earth you want to see.",items:[]};
 const nq=normalizeSearch(q),ownerIntent=/\b(add|submit|owner|my camera|my business|my place|list my|camera owner)\b/.test(nq);
 if(ownerIntent)return{text:"If you have a place or public camera, ERN has a reviewed path for it. Payment never buys ranking.",items:[],link:{href:"./for-places.html",label:"For places & cameras"}};
 const businessIntent=/\b(cafe|café|restaurant|shop|market|farm|small business|local business|hotel|guesthouse|bakery|food)\b/.test(nq);
 if(businessIntent){const locals=localDirectoryMatch(q).slice(0,4);if(locals.length)return{text:"These are reviewed local places that match what you asked for.",items:[],locals};return{text:"ERN’s reviewed local-place directory is still growing. I won’t invent a business, but I can show smaller current Earth places or you can search a destination.",items:state.sources.filter(featureEligible).filter(s=>localPlaceSignals(s).worth).sort((a,b)=>baseScore(b)-baseScore(a)).slice(0,4)};}
 if(/moment|upload|photo|picture|visitor/.test(normalizeSearch(q)))return{text:"Now Moments are the visitor-expression layer: short-lived observations first, then temporary photos and clips once moderation and privacy infrastructure are ready.",items:[],link:{href:"./now-moments.html",label:"About Now Moments"}};
 if(intent.near&&state.selected){const items=guideNearby(state.selected);return{text:items.length?"Here are a few current places near "+state.selected.title+".":"I do not yet have enough mapped places near this window.",items};}
 const placeMatches=guidePlaceMatches(q);
 if(placeMatches.length&&!intent.surprise&&!intent.near&&!intent.local&&!intent.peaceful&&!intent.golden&&!intent.night&&!intent.wildlife&&!intent.beach&&!intent.mountain&&!intent.city)return{text:"I found "+placeMatches.length+" strong ERN window"+(placeMatches.length===1?"":"s")+" for that place.",items:placeMatches.slice(0,4)};
 let pool=state.sources.filter(featureEligible);
 if(intent.current)pool=pool.filter(s=>verificationAgeDays(s)<=7);
 if(intent.local){const local=pool.filter(s=>localPlaceSignals(s).worth);if(local.length)pool=local}
 let items=[...pool].sort((a,b)=>guideScore(b,intent)-guideScore(a,intent));
 if(intent.surprise&&items.length){const top=items.slice(0,Math.min(18,items.length));const salt=(Date.now()/60000|0)%top.length;items=[top[salt],...top.filter((_,i)=>i!==salt)]}
 items=items.slice(0,4);
 let text="Here are a few places I would start with.";
 if(intent.peaceful)text="For a quieter Earth, I’d start with these.";
 else if(intent.golden)text="These have the strongest morning or evening-light potential right now.";
 else if(intent.night)text="For night lights and visible city energy, try these.";
 else if(intent.local)text="These are smaller local places worth discovering, not just famous destinations.";
 else if(intent.wildlife)text="These are the strongest wildlife-oriented windows I can find right now.";
 else if(intent.beach)text="For water, coast and beach views, I’d start here.";
 else if(intent.mountain)text="For mountains, snow and high places, try these.";
 else if(intent.city)text="For streets, cities and visible activity, these are good starting points.";
 else if(intent.surprise)text="Let’s go somewhere you might not have searched for yourself.";
 else if(intent.current)text="These are among ERN’s stronger recently verified windows right now.";
 return{text,items};
}
function renderGuideResult(s){
 const b=document.createElement("button");b.type="button";b.className="guide-result";
 const copy=document.createElement("span"),title=document.createElement("strong"),meta=document.createElement("small");
 title.textContent=s.title;meta.textContent=[publicTruth(s),momentSignal(s).label,s.country].filter(Boolean).join(" · ");copy.append(title,meta);
 const arrow=document.createElement("span");arrow.textContent="→";b.append(copy,arrow);b.onclick=()=>{closeGuide();openViewer(s)};return b;
}
function runGuide(q){
 const result=guideResponse(q);$("#guideReply").textContent=result.text;$("#guideResults").replaceChildren(...result.items.map(renderGuideResult),...(result.locals||[]).map(localDirectoryCard));
 if(result.link){const a=document.createElement("a");a.href=result.link.href;a.className="guide-result guide-result-link";a.textContent=result.link.label+" →";$("#guideResults").append(a)}
}
function openGuide(){
 $("#guidePanel").hidden=false;$("#guideLauncher").setAttribute("aria-expanded","true");setTimeout(()=>$("#guideInput").focus(),40)
}
function closeGuide(){
 $("#guidePanel").hidden=true;$("#guideLauncher").setAttribute("aria-expanded","false")
}

function search(q,options={updateUrl:false}){
 const raw=String(q||"").trim(),x=normalizeSearch(raw),tokens=x.split(/\s+/).filter(Boolean);
 if(options.updateUrl){const u=new URL(location.href);if(raw)u.searchParams.set("q",raw);else u.searchParams.delete("q");history.replaceState(null,"",u.pathname+u.search+u.hash)}
 const localIntent=/\b(local|small|village|market|farm|neighbourhood|neighborhood|harbour|harbor|marina)\b/.test(x);
 const matches=!x?state.sources:state.sources.filter(s=>{const hay=normalizeSearch([s.title,s.region,s.country,s.provider,s.story,...(s.categories||[])].filter(Boolean).join(" "));if(localIntent&&localPlaceSignals(s).worth)return tokens.filter(t=>!["local","small","place","places"].includes(t)).every(token=>hay.includes(token));return tokens.every(token=>hay.includes(token))});
 const groups=groupByPlace(matches).sort((a,b)=>{const al=localIntent?Math.max(...a.map(s=>localPlaceSignals(s).score))*20:0,bl=localIntent?Math.max(...b.map(s=>localPlaceSignals(s).score))*20:0;return(bl+Math.max(...b.map(baseScore)))-(al+Math.max(...a.map(baseScore)))}).slice(0,x?24:12);
 const localMatches=x?localDirectoryMatch(raw).slice(0,12):[];
 $("#searchResults").replaceChildren(...localMatches.map(localDirectoryCard),...groups.map(placeCard));
 if(x&&!localMatches.length&&!groups.length){const box=document.createElement("div");box.className="search-empty-help";box.innerHTML="<strong>No reviewed ERN match yet.</strong><span>Try a broader place name, ask ERN Guide, or help add a real place.</span>";const g=document.createElement("button");g.type="button";g.textContent="Ask ERN Guide";g.onclick=()=>{openGuide();$("#guideInput").value=raw;runGuide(raw)};const a=document.createElement("a");a.href="./for-places.html";a.textContent="Add a place or camera";box.append(g,a);$("#searchResults").append(box)}
 $("#searchStatus").textContent=x?`${groups.length} Earth place${groups.length===1?"":"s"} · ${matches.length} current window${matches.length===1?"":"s"}${localMatches.length?" · "+localMatches.length+" reviewed local place"+(localMatches.length===1?"":"s"):""}`:"";
}
function localPlaceSignals(s){
 const hay=[s.title,s.region,s.story,...(s.categories||[])].filter(Boolean).join(" ").toLowerCase();
 const terms=[["village",3],["small town",3],["neighbourhood",2],["neighborhood",2],["local",2],["market",1],["farm",2],["harbour",1],["harbor",1],["promenade",1],["square",1],["rest camp",2],["ski area",1],["beach",1],["pier",1],["marina",1],["waterfront",1]];
 const famous=["iconic","world famous","famous","major city"].some(x=>hay.includes(x));
 const score=terms.reduce((n,[term,w])=>n+(hay.includes(term)?w:0),0);return{score,worth:score>=2&&!famous};
}
function renderLocalEarth(){
 const picks=state.sources.filter(featureEligible).map(s=>({s,...localPlaceSignals(s)})).filter(x=>x.worth).sort((a,b)=>b.score-a.score||baseScore(b.s)-baseScore(a.s)).slice(0,6).map(x=>x.s);
 $("#localEarthGrid").replaceChildren(...picks.map(wanderCard));
 $("#localEarth").hidden=picks.length===0;
}
function wanderCard(s){
 const b=document.createElement("button");b.type="button";b.className="wander-card";
 const v=document.createElement("span");v.className="wander-visual";v.style.background=generatedBackground(s);const img=cleanUrl(s.thumbnailUrl);if(img){const el=document.createElement("img");el.src=img;el.alt="";el.loading="lazy";v.append(el)}
 const copy=document.createElement("span");copy.className="wander-copy";const k=document.createElement("small");k.textContent=[truthLabel(s),localTime(s)].filter(Boolean).join(" · ");const strong=document.createElement("strong");strong.textContent=s.title;const meta=document.createElement("em");meta.textContent=[s.region,s.country].filter(Boolean).join(", ");copy.append(k,strong,meta);b.append(v,copy);b.onclick=()=>openViewer(s);return b;
}
function renderWander(){
 const used=new Set(state.watch.map(s=>s.id));
 const ranked=state.sources.filter(s=>featureEligible(s)&&!used.has(s.id)).sort((a,b)=>baseScore(b)-baseScore(a));
 const diverse=[],countries=new Set();for(const s of ranked){if(countries.has(s.country)&&diverse.length<5)continue;diverse.push(s);countries.add(s.country);if(diverse.length>=18)break}
 if(!diverse.length){$("#wanderGrid").replaceChildren();return}
 const start=(state.wanderOffset*6)%diverse.length;const pick=[];for(let i=0;i<Math.min(6,diverse.length);i++)pick.push(diverse[(start+i)%diverse.length]);
 $("#wanderGrid").replaceChildren(...pick.map(wanderCard));$("#wanderNote").textContent=`${pick.length} places beyond the current Top 20 · healthy sources only · ${visitorDaypart()} selection context`;
}
function renderNowStrip(){
 const healthy=state.sources.filter(featureEligible);
 $("#nowPlayable").textContent=healthy.filter(isInside).length;
 $("#nowDaylight").textContent=healthy.filter(isDay).length;
 $("#nowNightCities").textContent=healthy.filter(s=>!isDay(s)&&isCity(s)).length;
 $("#nowMapped").textContent=healthy.filter(s=>Number.isFinite(Number(s.lat))&&Number.isFinite(Number(s.lon))).length;
}

function renderAtlasBeyond(){
 const box=$("#atlasBeyond"),grid=$("#atlasBeyondGrid"),note=$("#atlasBeyondNote");
 const dynamic=state.sources.filter(s=>featureEligible(s)&&s.mapBehavior==="DYNAMIC_UNPINNED");
 const unmapped=state.sources.filter(s=>featureEligible(s)&&s.mapBehavior!=="DYNAMIC_UNPINNED"&&(!Number.isFinite(Number(s.lat))||!Number.isFinite(Number(s.lon))));
 if(!unmapped.length&&!dynamic.length){box.hidden=true;grid.replaceChildren();return}
 const ranked=[...unmapped].sort((a,b)=>baseScore(b)-baseScore(a));
 const pick=[],countries=new Set();
 for(const s of ranked){if(countries.has(s.country)&&pick.length<4)continue;pick.push(s);countries.add(s.country);if(pick.length>=6)break}
 const buttons=pick.map(s=>{const b=document.createElement("button");b.type="button";b.className="atlas-beyond-card";const strong=document.createElement("strong");strong.textContent=s.title;const small=document.createElement("small");small.textContent=[s.region,s.country,publicTruth(s)].filter(Boolean).join(" · ");b.append(strong,small);b.onclick=()=>openViewer(s);return b});
 grid.replaceChildren(...buttons);const parts=[];if(unmapped.length)parts.push(`${unmapped.length} current ERN place${unmapped.length===1?"":"s"} searchable but not pinned until location evidence is added`);if(dynamic.length)parts.push(`${dynamic.length} dynamic Earth view${dynamic.length===1?" is":"s are"} intentionally unpinned`);note.textContent=parts.join(" · ")+ ".";box.hidden=false;
}

function renderMap(){
 const a=$("#atlas");a.querySelectorAll(".map-pin").forEach(x=>x.remove());let count=0,insideCount=0,externalCount=0,localCount=0;
 const grouped=groupByPlace(state.sources.filter(s=>s.health!=="OFFLINE"&&Number.isFinite(Number(s.lat))&&Number.isFinite(Number(s.lon))));
 for(const group of grouped){
   const eligible=group.filter(s=>{const inside=isInside(s);if(state.mapFilter==="local")return false;if(state.category!=="all"&&state.category!=="random"&&!categoryMatch(s,state.category))return false;if(state.mapFilter==="inside"&&!inside)return false;if(state.mapFilter==="external"&&inside)return false;if(state.mapFilter==="daylight"&&!isDay(s))return false;return true});
   if(!eligible.length)continue;const s=[...eligible].sort((x,y)=>baseScore(y)-baseScore(x))[0],lat=Number(s.lat),lon=Number(s.lon),inside=isInside(s);
   const p=document.createElement("button");p.className="map-pin"+(inside?"":" external");p.type="button";p.title=`${s.title} — ${publicTruth(s)}`;p.setAttribute("aria-label",p.title);p.style.left=((lon+180)/360*100)+"%";p.style.top=((90-lat)/180*100)+"%";p.onclick=()=>openViewer(s);if(group.length>1)p.dataset.views=String(group.length);a.append(p);count++;if(inside)insideCount++;else externalCount++;
 }
 for(const x of approvedLocalPlaces()){
   const lat=Number(x.lat),lon=Number(x.lon);if(!Number.isFinite(lat)||!Number.isFinite(lon))continue;if(state.mapFilter!=="all"&&state.mapFilter!=="local")continue;
   const p=document.createElement("a");p.className="map-pin local";p.href=safeExternalUrl(x.url);p.target="_blank";p.rel="noopener noreferrer";p.title=x.name+" — reviewed local place";p.setAttribute("aria-label",p.title);p.style.left=((lon+180)/360*100)+"%";p.style.top=((90-lat)/180*100)+"%";a.append(p);count++;localCount++;
 }
 document.querySelectorAll(".atlas-filter").forEach(b=>b.classList.toggle("active",b.dataset.mapFilter===state.mapFilter));
 const basisCount=state.sources.filter(s=>s.health!=="OFFLINE"&&Number.isFinite(Number(s.lat))&&Number.isFinite(Number(s.lon))&&s.coordinateBasis).length;$("#mapNote").textContent=`${count} mapped places shown · ${insideCount} play inside ERN · ${externalCount} provider views${localCount?" · "+localCount+" reviewed local place"+(localCount===1?"":"s"):""} · ${basisCount} pins carry explicit coordinate provenance. Pin positions can be place-level references unless an exact camera position is documented.`;renderAtlasBeyond();
}
function saveFavorites(){writeSaved("ern-favorites",JSON.stringify([...state.favorites]))}
function distanceKm(a,b){
 const lat1=Number(a.lat),lon1=Number(a.lon),lat2=Number(b.lat),lon2=Number(b.lon);
 if(![lat1,lon1,lat2,lon2].every(Number.isFinite))return Infinity;
 const rad=Math.PI/180,dlat=(lat2-lat1)*rad,dlon=(lon2-lon1)*rad;
 const q=Math.sin(dlat/2)**2+Math.cos(lat1*rad)*Math.cos(lat2*rad)*Math.sin(dlon/2)**2;
 return 12742*Math.asin(Math.min(1,Math.sqrt(q)));
}
function renderContext(s){
 const box=$("#viewerContext"),story=$("#viewerStory"),tags=$("#viewerTags"),near=$("#nearbyList"),related=$("#relatedList");
 story.textContent=s.story||"A current window onto this place.";const ms=momentSignal(s);$("#viewerMomentWhy").textContent="Why now · "+ms.reason;
 tags.replaceChildren();
 const tagValues=[momentLabel(s),publicTruth(s),...(s.categories||[]).slice(0,3)];
 const confidence=$("#sourceConfidence"),age=verificationAgeDays(s);confidence.textContent=[verificationLabel(s),s.provider?("Source: "+s.provider):"",s.health==="HEALTHY"?"Catalog health: healthy":"Catalog health: "+String(s.health||"unknown").toLowerCase()].filter(Boolean).join(" · ");confidence.classList.toggle("stale",!Number.isFinite(age)||age>21);
 for(const value of tagValues){const tag=document.createElement("span");tag.textContent=value;tags.append(tag)}
 near.replaceChildren();
 const nearby=state.sources.filter(x=>x.id!==s.id&&featureEligible(x)&&(x.placeId||x.id)!==(s.placeId||s.id)).map(x=>({s:x,d:distanceKm(s,x)})).filter(x=>Number.isFinite(x.d)).sort((a,b)=>a.d-b.d).slice(0,3);
 for(const item of nearby){const b=document.createElement("button");b.type="button";b.className="nearby-item";const label=document.createElement("strong");label.textContent=item.s.title;const meta=document.createElement("small");meta.textContent=item.d<1?"Nearby":Math.round(item.d)+" km";b.append(label,meta);b.onclick=()=>openViewer(item.s);near.append(b)}
 related.replaceChildren();const sourceCats=new Set((s.categories||[]).map(x=>String(x).toLowerCase()));
 const relatedItems=state.sources.filter(x=>x.id!==s.id&&featureEligible(x)&&(x.placeId||x.id)!==(s.placeId||s.id)).map(x=>({s:x,match:(x.categories||[]).filter(c=>sourceCats.has(String(c).toLowerCase())).length,score:baseScore(x)})).filter(x=>x.match>0).sort((a,b)=>b.match-a.match||b.score-a.score).slice(0,3);
 for(const item of relatedItems){const b=document.createElement("button");b.type="button";b.className="nearby-item";const label=document.createElement("strong");label.textContent=item.s.title;const meta=document.createElement("small");meta.textContent=publicTruth(item.s);b.append(label,meta);b.onclick=()=>openViewer(item.s);related.append(b)}
 const place=[s.region,s.country,s.title].filter(Boolean).join(" ");
 const q=encodeURIComponent(place);
 $("#planStay").href="https://www.google.com/search?q="+encodeURIComponent("hotels "+place);
 $("#planEat").href="https://www.google.com/search?q="+encodeURIComponent("restaurants "+place);
 $("#planDo").href="https://www.google.com/search?q="+encodeURIComponent("things to do "+place);
 $("#planWeather").href="https://www.google.com/search?q="+encodeURIComponent("weather "+place);
 const lat=Number(s.lat),lon=Number(s.lon);$("#planMap").href=Number.isFinite(lat)&&Number.isFinite(lon)?"https://www.google.com/maps/search/?api=1&query="+lat+","+lon:"https://www.google.com/maps/search/?api=1&query="+q;
 box.hidden=!(story.textContent||tags.children.length||near.children.length);
}
function renderSaved(){
 const items=state.sources.filter(s=>state.favorites.has(s.id));$("#savedResults").replaceChildren(...items.map(s=>card(s,true)));$("#savedEmpty").hidden=items.length>0;
 const recentIds=readJSON("ern-recent",[]);const byId=new Map(state.sources.map(s=>[s.id,s]));const recent=recentIds.map(id=>byId.get(id)).filter(Boolean);
 $("#recentResults").replaceChildren(...recent.map(s=>card(s,true)));$("#recentEmpty").hidden=recent.length>0;
 const p=interactionProfile();$("#recentNote").textContent=Number(p.views||0)>=3?"Local suggestions are adapting to your exploration.":"Explore a few places and ERN will begin adapting locally.";
 const excluded=new Set([...state.favorites,...recentIds]);const recs=state.sources.filter(s=>featureEligible(s)&&!excluded.has(s.id)).sort((a,b)=>baseScore(b)-baseScore(a)).slice(0,6);
 $("#recommendedResults").replaceChildren(...recs.map(s=>card(s,true)));
}
function stopImageTimer(){if(state.imageTimer){clearInterval(state.imageTimer);state.imageTimer=null}}
let viewerLoadTimer=null;
function clearViewerLoad(){if(viewerLoadTimer){clearTimeout(viewerLoadTimer);viewerLoadTimer=null}$("#viewerLoading").hidden=true}
function bestAlternate(s){
 const same=state.sources.filter(x=>x.id!==s.id&&(x.placeId||x.id)===(s.placeId||s.id)&&x.health==="HEALTHY");
 return same.sort((a,b)=>baseScore(b)-baseScore(a))[0]||null;
}
function beginViewerLoad(s){clearViewerLoad();const link=$("#loadingSource"),source=cleanUrl(s?.sourceUrl||s?.officialUrl),alt=bestAlternate(s),tryAlt=$("#viewerTryAlternate");if(source){link.href=source;link.hidden=false}else{link.removeAttribute("href");link.hidden=true}tryAlt.hidden=!alt;tryAlt.onclick=alt?()=>openViewer(alt):null;$("#viewerLoading").hidden=false;viewerLoadTimer=setTimeout(()=>{$("#viewerLoading").hidden=false},7000)}
function mountViewerNow(s){
 stopImageTimer();clearViewerLoad();const mount=$("#viewerStage");mount.replaceChildren();mount.style.background=generatedBackground(s);const source=cleanUrl(s.sourceUrl||s.officialUrl),link=$("#sourceViewer");if(source){link.href=source;link.hidden=false}else{link.removeAttribute("href");link.hidden=true}
 if(s.playback==="EMBED"&&cleanUrl(s.embedUrl)){beginViewerLoad(s);const f=document.createElement("iframe");f.src=s.embedUrl;f.title=s.title;f.allow="autoplay; fullscreen; picture-in-picture";f.allowFullscreen=true;f.referrerPolicy="strict-origin-when-cross-origin";f.onload=()=>clearViewerLoad();mount.append(f)}
 else if(s.playback==="IMAGE_REFRESH"&&cleanUrl(s.sourceUrl)){beginViewerLoad(s);const img=document.createElement("img");img.alt=s.title;img.onload=()=>clearViewerLoad();img.onerror=()=>{$("#viewerLoading").hidden=false};const refresh=()=>{try{const u=new URL(s.sourceUrl);u.searchParams.set("ern",Date.now());img.src=u.href}catch{img.src=s.sourceUrl}};refresh();state.imageTimer=setInterval(()=>{if(document.visibilityState==="visible")refresh()},Math.max(30000,Number(s.refreshMs)||60000));mount.append(img)}
 else{const box=document.createElement("div");box.className="external-box";const h=document.createElement("h3");h.textContent=s.title;const p=document.createElement("p");p.textContent="This current window is available at its official provider. ERN opens it there rather than pretending it is embedded here.";box.append(h,p);if(source){const a=document.createElement("a");a.href=source;a.target="_blank";a.rel="noopener noreferrer";a.textContent="Open current source";box.append(a)}mount.append(box)}
}
function mountViewer(s){const stage=$("#viewerStage");stage.classList.add("changing");setTimeout(()=>{mountViewerNow(s);requestAnimationFrame(()=>stage.classList.remove("changing"))},170)}
function renderAlternates(s){
 const host=$("#viewerAlternates");const same=state.sources.filter(x=>x.id!==s.id&&(x.placeId||x.id)===(s.placeId||s.id)&&x.health!=="OFFLINE");
 host.replaceChildren();
 if(!same.length){host.hidden=true;return}
 const label=document.createElement("span");label.className="alt-label";label.textContent="More views here";host.append(label);
 for(const alt of same){const b=document.createElement("button");b.type="button";b.className="alt-view";b.innerHTML="<strong></strong><small></small>";b.querySelector("strong").textContent=alt.title;b.querySelector("small").textContent=truthLabel(alt);b.onclick=()=>openViewer(alt);host.append(b)}
 host.hidden=false;
}
function viewHash(id){return "#view="+encodeURIComponent(id)}
function openPlace(placeId){
 const group=state.sources.filter(s=>(s.placeId||s.id)===placeId&&s.health!=="OFFLINE");if(!group.length)return false;
 const best=[...group].sort((a,b)=>baseScore(b)-baseScore(a))[0];openViewer(best,{record:false,updateHash:false});return true;
}
function openViewer(s,options={record:true,updateHash:true}){if(!s)return;if($("#viewer").hidden)state.lastFocus=document.activeElement;document.title=s.title+" — Earth Right Now";if(options.record!==false){recordInterest(s);renderSaved()}state.selected=s;const i=state.watch.findIndex(x=>x.id===s.id);if(i>=0)state.watchIndex=i;$("#viewerTruth").textContent=publicTruth(s);$("#viewerTruth").dataset.truth=truthTone(s);$("#viewerTitle").textContent=s.title;$("#viewerPlace").textContent=[s.region,s.country,localTime(s)].filter(Boolean).join(" · ");$("#favoriteViewer").textContent=state.favorites.has(s.id)?"♥":"♡";renderAlternates(s);renderContext(s);if($("#viewer").hidden){$("#viewer").hidden=false;$("#viewer").classList.add("opening");setTimeout(()=>$("#viewer").classList.remove("opening"),260);setTimeout(()=>$("#closeViewer").focus(),40)}if(options.updateHash!==false&&location.hash!==viewHash(s.id))history.replaceState(null,"",viewHash(s.id));mountViewer(s);document.body.style.overflow="hidden"}
function closeViewer(options={clearHash:true,restoreFocus:true}){stopJourney();stopImageTimer();clearViewerLoad();syncFullscreenButton();document.title="Earth Right Now — See Before You Go";if(options.clearHash!==false&&location.hash.startsWith("#view="))history.replaceState(null,"",location.pathname+location.search);$("#viewer").hidden=true;$("#viewerStage").replaceChildren();$("#viewerAlternates").replaceChildren();$("#viewerAlternates").hidden=true;$("#viewerContext").hidden=true;$("#nearbyList").replaceChildren();$("#relatedList").replaceChildren();document.body.style.overflow="";if(options.restoreFocus!==false&&state.lastFocus?.focus)setTimeout(()=>state.lastFocus.focus(),0)}
function move(d,record=true){if(!state.watch.length)return;state.watchIndex=(state.watchIndex+d+state.watch.length)%state.watch.length;openViewer(state.watch[state.watchIndex],{record})}
function updateJourneyButton(){$("#journeyToggle").textContent=state.journeyTimer?t("pauseJourney"):t("playJourney")}
function startJourney(){if(state.journeyTimer)return;stopHeroRotation();state.journeyTimer=setInterval(()=>move(1,false),30000);updateJourneyButton()}
function stopJourney(){if(state.journeyTimer){clearInterval(state.journeyTimer);state.journeyTimer=null}updateJourneyButton();startHeroRotation()}
function stopHeroRotation(){if(state.heroTimer){clearInterval(state.heroTimer);state.heroTimer=null}}
function startHeroRotation(){
 stopHeroRotation();
 const reduce=globalThis.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches===true;
 if(reduce||state.watch.length<2)return;
 state.heroTimer=setInterval(()=>{
   if(document.visibilityState!=="visible"||!$("#viewer").hidden)return;
   const hp=heroPool();if(!hp.length)return;
   const current=hp.findIndex(x=>x.id===state.selected?.id);
   const next=hp[(current+1+hp.length)%hp.length];state.watchIndex=Math.max(0,state.watch.findIndex(x=>x.id===next.id));renderHero(next);
 },45000);
}
function scrollToId(id){document.getElementById(id)?.scrollIntoView({behavior:"smooth",block:"start"})}
function applyLanguage(){
 document.documentElement.lang=lang;$("#languageSelect").value=lang;
 document.querySelectorAll("[data-i18n]").forEach(el=>{const key=el.dataset.i18n;const value=t(key);if(value!==key)el.textContent=value});
 document.querySelectorAll("[data-i18n-placeholder]").forEach(el=>{const key=el.dataset.i18nPlaceholder;const value=t(key);if(value!==key)el.setAttribute("placeholder",value)});
 updateJourneyButton();if(state.sources.length){renderWatch();renderWander();renderSaved();if(state.selected){$("#viewerPlace").textContent=[state.selected.region,state.selected.country,momentLabel(state.selected),localTime(state.selected)].filter(Boolean).join(" · ");renderContext(state.selected)}}
}
function selectCategory(cat,button){state.category=cat;writeSaved("ern-category",cat);document.querySelectorAll(".category").forEach(x=>x.classList.toggle("active",x.dataset.category===cat));button?.classList.add("active");if(cat==="random")state.setOffset++;renderWatch();renderWander();renderMap();if(state.watch.length){state.watchIndex=0;renderHero(heroPool()[0]||state.watch[0])}scrollToId("watch")}
function initSectionSpy(){
 if(!("IntersectionObserver"in globalThis))return;
 const map=[["home","homeNav"],["watch","watchNav"],["destinations","destinationsNav"],["search","searchNav"],["map","mapNav"],["saved","savedNav"]];
 const obs=new IntersectionObserver(entries=>{
   const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(!visible)return;
   const active=map.find(x=>x[0]===visible.target.id)?.[1];if(!active)return;
   for(const [,id] of map){const el=document.getElementById(id);if(el)el.classList.toggle("active",id===active)}
   const mobileMap={watch:"mobileWatch",search:"mobileExplore",map:"mobileMap",saved:"mobileSaved"};for(const [section,id] of Object.entries(mobileMap)){const el=document.getElementById(id);if(el)el.classList.toggle("active",visible.target.id===section)}
 },{rootMargin:"-20% 0px -60% 0px",threshold:[0,.15,.4]});
 for(const [id] of map){const el=document.getElementById(id);if(el)obs.observe(el)}
}
async function toggleViewerFullscreen(){
 const stage=$("#viewerStage"),media=stage?.querySelector("iframe,img,video"),target=media||stage;
 if(document.fullscreenElement){try{await document.exitFullscreen();return}catch{}}
 if(document.webkitFullscreenElement&&document.webkitExitFullscreen){try{document.webkitExitFullscreen();return}catch{}}
 try{
   if(target?.requestFullscreen){await target.requestFullscreen();return}
   if(target?.webkitRequestFullscreen){target.webkitRequestFullscreen();return}
 }catch{}
 stage?.scrollIntoView({behavior:"smooth",block:"center"});
 const btn=$("#fullViewer"),old=btn.textContent;btn.textContent="Use player ⛶";setTimeout(()=>btn.textContent=old,1800);
}
function syncFullscreenButton(){
 const active=!!(document.fullscreenElement||document.webkitFullscreenElement);
 $("#fullViewer").textContent=active?"Exit full screen":t("fullscreen");$("#fullViewer").setAttribute("aria-pressed",active?"true":"false")
}
function initEvents(){
 $("#homeBtn").onclick=()=>scrollToId("home");$("#homeNav").onclick=()=>scrollToId("home");$("#topSearch").onclick=()=>{scrollToId("search");setTimeout(()=>$("#searchInput").focus(),300)};$("#topAtlas").onclick=()=>scrollToId("map");
 $("#guideLauncher").onclick=()=>$("#guidePanel").hidden?openGuide():closeGuide();$("#guideClose").onclick=closeGuide;$("#heroGuide").onclick=openGuide;
 $("#guideForm").onsubmit=e=>{e.preventDefault();const q=$("#guideInput").value.trim();if(q)runGuide(q)};
 document.querySelectorAll("[data-guide]").forEach(b=>b.onclick=()=>{$("#guideInput").value=b.dataset.guide||"";runGuide($("#guideInput").value)});
$("#watchNav").onclick=()=>scrollToId("watch");$("#searchNav").onclick=()=>{scrollToId("search");setTimeout(()=>$("#searchInput").focus(),300)};$("#destinationsNav").onclick=()=>scrollToId("destinations");$("#mapNav").onclick=()=>scrollToId("map");$("#savedNav").onclick=()=>scrollToId("saved");
 $("#mobileWatch").onclick=()=>scrollToId("watch");$("#mobileExplore").onclick=()=>{scrollToId("search");setTimeout(()=>$("#searchInput").focus(),300)};$("#mobileMap").onclick=()=>scrollToId("map");$("#mobileSaved").onclick=()=>scrollToId("saved");
 $("#heroWatch").onclick=()=>{const target=state.selected&&featureEligible(state.selected)?state.selected:(heroPool()[0]||state.watch[0]);if(target){stopHeroRotation();openViewer(target)}else scrollToId("watch")};$("#heroNext").onclick=()=>{const hp=heroPool();if(!hp.length)return;stopHeroRotation();const current=hp.findIndex(x=>x.id===state.selected?.id);const next=hp[(current+1+hp.length)%hp.length];state.watchIndex=Math.max(0,state.watch.findIndex(x=>x.id===next.id));renderHero(next);startHeroRotation()};
 $("#refreshSet").onclick=()=>{stopHeroRotation();state.mode="auto";writeSaved("ern-mode","auto");state.setOffset++;renderWatch();renderWander();if(state.watch.length){state.watchIndex=0;renderHero(heroPool()[0]||state.watch[0])}startHeroRotation()};
 document.querySelectorAll(".mode-chip").forEach(b=>b.onclick=()=>{stopHeroRotation();state.mode=b.dataset.mode||"auto";writeSaved("ern-mode",state.mode);renderWatch();renderWander();if(state.watch.length){state.watchIndex=0;renderHero(heroPool()[0]||state.watch[0])}startHeroRotation()});
 $("#wanderRefresh").onclick=()=>{state.wanderOffset++;renderWander()};
 document.querySelectorAll(".atlas-filter").forEach(b=>b.onclick=()=>{state.mapFilter=b.dataset.mapFilter||"all";renderMap()});
 document.querySelectorAll(".category").forEach(b=>b.onclick=()=>{stopHeroRotation();selectCategory(b.dataset.category,b);startHeroRotation()});
 $("#searchInput").oninput=e=>search(e.target.value,{updateUrl:true});$("#clearSearch").onclick=()=>{$("#searchInput").value="";search("",{updateUrl:true});$("#searchInput").focus()};
 /* quick-search handlers are rebuilt from current catalog in renderQuickSearches() */
 $("#closeViewer").onclick=()=>{closeViewer();startHeroRotation()};$("#prevViewer").onclick=()=>move(-1,true);$("#nextViewer").onclick=()=>move(1,true);$("#journeyToggle").onclick=()=>state.journeyTimer?stopJourney():startJourney();$("#fullViewer").onclick=toggleViewerFullscreen;document.addEventListener("fullscreenchange",syncFullscreenButton);document.addEventListener("webkitfullscreenchange",syncFullscreenButton);
 $("#shareViewer").onclick=async()=>{const s=state.selected;if(!s)return;const url=location.origin+location.pathname+viewHash(s.id);try{if(navigator.share)await navigator.share({title:s.title,text:"See this place on Earth Right Now",url});else{await navigator.clipboard.writeText(url);$("#shareViewer").textContent="Copied";setTimeout(()=>$("#shareViewer").textContent=t("share"),1200)}}catch{}};
 $("#favoriteViewer").onclick=()=>{const s=state.selected;if(!s)return;state.favorites.has(s.id)?state.favorites.delete(s.id):state.favorites.add(s.id);saveFavorites();$("#favoriteViewer").textContent=state.favorites.has(s.id)?"♥":"♡";renderSaved();renderWatch()};
 $("#resetPersonal").onclick=()=>{writeSaved("ern-profile",JSON.stringify({countries:{},categories:{},views:0}));writeSaved("ern-recent","[]");state.mode="auto";writeSaved("ern-mode","auto");renderWatch();renderWander();renderSaved();};
 $("#languageSelect").onchange=e=>{lang=e.target.value;writeSaved("ern-language",lang);applyLanguage()};
 document.addEventListener("keydown",e=>{if($("#viewer").hidden)return;if(e.key==="Escape"){closeViewer();startHeroRotation()}if(e.key==="ArrowRight")move(1);if(e.key==="ArrowLeft")move(-1)});
 let touchStart=0;$("#viewerStage").addEventListener("touchstart",e=>{touchStart=e.changedTouches?.[0]?.clientX||0},{passive:true});$("#viewerStage").addEventListener("touchend",e=>{const end=e.changedTouches?.[0]?.clientX||0,d=end-touchStart;if(Math.abs(d)>55)move(d<0?1:-1,true)},{passive:true});
 window.addEventListener("hashchange",()=>{const view=location.hash.match(/^#view=(.+)$/),place=location.hash.match(/^#place=(.+)$/);if(view){const target=state.sources.find(s=>s.id===decodeURIComponent(view[1]));if(target)openViewer(target,{record:false,updateHash:false})}else if(place){openPlace(decodeURIComponent(place[1]))}else if(!$("#viewer").hidden)closeViewer({clearHash:false,restoreFocus:false})});
 document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible")startHeroRotation();else stopHeroRotation()});
}
async function boot(){applyLanguage();initEvents();initSectionSpy();document.querySelectorAll(".category").forEach(x=>x.classList.toggle("active",x.dataset.category===state.category));try{const [r,localR]=await Promise.all([fetch("./data/sources.json",{cache:"no-store"}),fetch("./data/local-directory.json",{cache:"no-store"}).catch(()=>null)]);if(!r.ok)throw new Error("source registry "+r.status);const rows=await r.json();state.sources=Array.isArray(rows)?rows.filter(s=>s&&s.id&&s.title):[];if(localR?.ok){const localRows=await localR.json();state.localDirectory=Array.isArray(localRows)?localRows:[]}else state.localDirectory=[];renderWatch();renderWander();renderLocalEarth();renderNowStrip();renderQuickSearches();state.watchIndex=0;renderHero(heroPool()[0]||state.watch[0]||state.sources[0]);const params=new URL(location.href).searchParams,initialQ=params.get("q")||"",guideQ=params.get("guide")||"";$("#searchInput").value=initialQ;search(initialQ);if(initialQ)setTimeout(()=>scrollToId("search"),80);renderMap();renderSaved();if(guideQ){$("#guideInput").value=guideQ;openGuide();runGuide(guideQ)}const m=location.hash.match(/^#view=(.+)$/),p=location.hash.match(/^#place=(.+)$/);if(m){const id=decodeURIComponent(m[1]);const target=state.sources.find(s=>s.id===id);if(target)openViewer(target,{record:false,updateHash:false})}else if(p){openPlace(decodeURIComponent(p[1]))}startHeroRotation()}catch(err){console.error(err);$("#heroTitle").textContent="Earth will be back shortly";$("#heroMeta").textContent="ERN could not load its current-window catalog. Please refresh in a moment."}}
boot();
})();