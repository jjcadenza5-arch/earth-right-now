(() => {
"use strict";

const $ = (s) => document.querySelector(s);
const state = { sources: [], watch: [], selected: null, watchIndex: 0, journeyTimer: null, imageTimer: null, favorites: new Set(JSON.parse(localStorage.getItem("ern-favorites") || "[]")) };

const translations = {
  en:{liveEarth:"EARTH RIGHT NOW",watchHere:"Watch here",nextWindow:"Next window",searchEarth:"Search Earth",truthNote:"Live means live. Refreshed images and external provider views are labeled honestly.",watchEarth:"WATCH EARTH",bestMoments:"Beautiful moments around Earth",watchCopy:"A curated set of current windows chosen for quality, variety and the local moment.",whereLook:"Where do you want to look?",searchCopy:"Search a city, beach, mountain, park, wildlife camera or destination.",clear:"Clear",livingAtlas:"LIVING ATLAS",worldMap:"A simple map of current Earth windows",mapCopy:"Choose a pin, then open the best available current view for that place.",myEarth:"MY EARTH",savedWindows:"Saved windows",savedCopy:"Favorites stay in this browser.",nothingSaved:"Nothing saved yet. Tap ♡ while watching a window.",footerLine:"See before you go.",previous:"Previous",playJourney:"Play journey",pauseJourney:"Pause journey",next:"Next",source:"Source",fullScreen:"Full screen"},
  th:{liveEarth:"โลกในเวลานี้",watchHere:"ดูที่นี่",nextWindow:"ภาพถัดไป",searchEarth:"ค้นหาโลก",truthNote:"LIVE คือสดจริง ภาพรีเฟรชและแหล่งภายนอกจะระบุให้ชัดเจน",watchEarth:"WATCH EARTH",bestMoments:"ช่วงเวลาสวยงามจากทั่วโลก",watchCopy:"คัดเลือกภาพปัจจุบันโดยดูคุณภาพ ความหลากหลาย และเวลาท้องถิ่น",whereLook:"อยากดูที่ไหน?",searchCopy:"ค้นหาเมือง ชายหาด ภูเขา สวน สัตว์ป่า หรือจุดหมาย",clear:"ล้าง",livingAtlas:"LIVING ATLAS",worldMap:"แผนที่หน้าต่างโลกปัจจุบัน",mapCopy:"เลือกหมุดแล้วเปิดภาพปัจจุบันที่ดีที่สุดของสถานที่นั้น",myEarth:"MY EARTH",savedWindows:"หน้าต่างที่บันทึก",savedCopy:"รายการโปรดเก็บไว้ในเบราว์เซอร์นี้",nothingSaved:"ยังไม่มีรายการที่บันทึก กด ♡ ตอนกำลังดู",footerLine:"ดูก่อนเดินทาง",previous:"ก่อนหน้า",playJourney:"เล่นต่อเนื่อง",pauseJourney:"หยุดชั่วคราว",next:"ถัดไป",source:"แหล่งที่มา",fullScreen:"เต็มจอ"},
  de:{liveEarth:"ERDE JETZT",watchHere:"Hier ansehen",nextWindow:"Nächstes Fenster",searchEarth:"Erde suchen",truthNote:"Live bedeutet live. Aktualisierte Bilder und externe Quellen sind klar gekennzeichnet.",watchEarth:"WATCH EARTH",bestMoments:"Schöne Momente rund um die Erde",watchCopy:"Aktuelle Fenster nach Qualität, Vielfalt und lokalem Moment kuratiert.",whereLook:"Wohin möchtest du schauen?",searchCopy:"Suche Stadt, Strand, Berg, Park, Tierkamera oder Reiseziel.",clear:"Löschen",livingAtlas:"LIVING ATLAS",worldMap:"Eine einfache Karte aktueller Erd-Fenster",mapCopy:"Wähle einen Punkt und öffne die beste verfügbare aktuelle Ansicht.",myEarth:"MY EARTH",savedWindows:"Gespeicherte Fenster",savedCopy:"Favoriten bleiben in diesem Browser.",nothingSaved:"Noch nichts gespeichert. Beim Ansehen ♡ tippen.",footerLine:"Sieh nach, bevor du gehst.",previous:"Zurück",playJourney:"Reise starten",pauseJourney:"Pause",next:"Weiter",source:"Quelle",fullScreen:"Vollbild"},
  fr:{liveEarth:"LA TERRE MAINTENANT",watchHere:"Regarder ici",nextWindow:"Vue suivante",searchEarth:"Rechercher",truthNote:"Live signifie vraiment en direct. Les images actualisées et sources externes sont clairement indiquées.",watchEarth:"WATCH EARTH",bestMoments:"De beaux moments autour de la Terre",watchCopy:"Des vues actuelles choisies pour leur qualité, diversité et moment local.",whereLook:"Où voulez-vous regarder ?",searchCopy:"Cherchez une ville, plage, montagne, parc, faune ou destination.",clear:"Effacer",livingAtlas:"LIVING ATLAS",worldMap:"Une carte simple des vues actuelles",mapCopy:"Choisissez un point puis ouvrez la meilleure vue actuelle disponible.",myEarth:"MY EARTH",savedWindows:"Vues enregistrées",savedCopy:"Les favoris restent dans ce navigateur.",nothingSaved:"Aucun favori. Touchez ♡ pendant une vue.",footerLine:"Voir avant de partir.",previous:"Précédent",playJourney:"Lancer",pauseJourney:"Pause",next:"Suivant",source:"Source",fullScreen:"Plein écran"},
  ja:{liveEarth:"いまの地球",watchHere:"ここで見る",nextWindow:"次の窓",searchEarth:"地球を検索",truthNote:"LIVE は本当にライブです。更新画像と外部ソースは明確に表示します。",watchEarth:"WATCH EARTH",bestMoments:"世界の美しい今",watchCopy:"品質、多様性、現地時間から現在の窓を厳選します。",whereLook:"どこを見たいですか？",searchCopy:"都市、ビーチ、山、公園、野生動物、目的地を検索。",clear:"クリア",livingAtlas:"LIVING ATLAS",worldMap:"現在の地球を示すシンプルな地図",mapCopy:"ピンを選び、その場所で利用できる最良の現在ビューを開きます。",myEarth:"MY EARTH",savedWindows:"保存した窓",savedCopy:"お気に入りはこのブラウザに保存されます。",nothingSaved:"まだ保存されていません。視聴中に ♡ を押してください。",footerLine:"行く前に見る。",previous:"前へ",playJourney:"自動再生",pauseJourney:"一時停止",next:"次へ",source:"ソース",fullScreen:"全画面"},
  zh:{liveEarth:"此刻地球",watchHere:"在这里观看",nextWindow:"下一个窗口",searchEarth:"搜索地球",truthNote:"LIVE 就是真直播。刷新图片和外部来源都会清楚标注。",watchEarth:"WATCH EARTH",bestMoments:"世界各地此刻的美好",watchCopy:"按质量、多样性和当地时刻精选当前窗口。",whereLook:"你想看哪里？",searchCopy:"搜索城市、海滩、山脉、公园、野生动物或目的地。",clear:"清除",livingAtlas:"LIVING ATLAS",worldMap:"当前地球窗口的简洁地图",mapCopy:"选择一个点，再打开该地点最佳的当前视图。",myEarth:"MY EARTH",savedWindows:"已保存窗口",savedCopy:"收藏只保存在这个浏览器。",nothingSaved:"还没有收藏。观看时点击 ♡。",footerLine:"出发前先看看。",previous:"上一个",playJourney:"自动播放",pauseJourney:"暂停",next:"下一个",source:"来源",fullScreen:"全屏"},
  es:{liveEarth:"LA TIERRA AHORA",watchHere:"Ver aquí",nextWindow:"Siguiente ventana",searchEarth:"Buscar en la Tierra",truthNote:"Live significa en directo. Las imágenes actualizadas y fuentes externas se etiquetan claramente.",watchEarth:"WATCH EARTH",bestMoments:"Momentos hermosos alrededor del mundo",watchCopy:"Vistas actuales elegidas por calidad, variedad y momento local.",whereLook:"¿Dónde quieres mirar?",searchCopy:"Busca ciudad, playa, montaña, parque, fauna o destino.",clear:"Limpiar",livingAtlas:"LIVING ATLAS",worldMap:"Un mapa simple de ventanas actuales",mapCopy:"Elige un punto y abre la mejor vista actual disponible.",myEarth:"MY EARTH",savedWindows:"Ventanas guardadas",savedCopy:"Los favoritos se quedan en este navegador.",nothingSaved:"Aún no hay favoritos. Pulsa ♡ mientras miras una ventana.",footerLine:"Mira antes de ir.",previous:"Anterior",playJourney:"Reproducir viaje",pauseJourney:"Pausar",next:"Siguiente",source:"Fuente",fullScreen:"Pantalla completa"}
};
let lang = localStorage.getItem("ern-language") || "en";
if (!translations[lang]) lang = "en";

function t(key){ return translations[lang]?.[key] || translations.en[key] || key; }
function applyLanguage(){
  document.documentElement.lang = lang;
  $("#languageSelect").value = lang;
  document.querySelectorAll("[data-t]").forEach(el => { el.textContent = t(el.dataset.t); });
  $("#searchInput").placeholder = lang === "th" ? "ค้นหาโลก…" : lang === "ja" ? "地球を検索…" : lang === "zh" ? "搜索地球…" : lang === "de" ? "Erde suchen…" : lang === "fr" ? "Rechercher sur Terre…" : lang === "es" ? "Buscar en la Tierra…" : "Search Earth…";
  updateJourneyButton();
}
function cleanUrl(value){
  try{ const u = new URL(value, location.href); return /^https?:$/.test(u.protocol) ? u.href : null; }catch{return null;}
}
function truthLabel(s){
  if (s.truth === "LIVE_VIDEO") return "LIVE VIDEO";
  if (s.truth === "LIVE_IMAGE") return "LIVE IMAGE";
  if (s.truth === "EXTERNAL_LIVE") return "EXTERNAL LIVE";
  if (s.truth === "PARTNER") return "PARTNER";
  return "PREVIEW";
}
function isInside(s){ return s && s.health !== "OFFLINE" && ((s.playback === "EMBED" && cleanUrl(s.embedUrl)) || (s.playback === "IMAGE_REFRESH" && cleanUrl(s.sourceUrl))); }
function localHour(s){
  if (!s?.timeZone) return null;
  try{
    const parts = new Intl.DateTimeFormat("en-US",{timeZone:s.timeZone,hour:"2-digit",hour12:false}).formatToParts(new Date());
    const h = Number(parts.find(p=>p.type==="hour")?.value);
    return Number.isFinite(h) ? h % 24 : null;
  }catch{return null;}
}
function localTime(s){
  if (!s?.timeZone) return "";
  try{return new Intl.DateTimeFormat(undefined,{timeZone:s.timeZone,hour:"numeric",minute:"2-digit"}).format(new Date());}catch{return "";}
}
function score(s){
  let n = Number(s.quality||0) + Number(s.moment||0)*.65 + Number(s.freshness||0)*.35;
  if (s.health === "HEALTHY") n += 35; else if (s.health === "DEGRADED") n += 8;
  if (isInside(s)) n += 45;
  const h = localHour(s);
  if (h !== null && h >= 6 && h < 19) n += 18;
  else if (h !== null && /city|street|skyline|urban/i.test((s.categories||[]).join(" "))) n += 14;
  if (state.favorites.has(s.id)) n += 4;
  return n;
}
function buildWatch(sources){
  const sorted = [...sources].filter(s=>s.health!=="OFFLINE").sort((a,b)=>score(b)-score(a));
  const inside = sorted.filter(isInside), rest = sorted.filter(s=>!isInside(s));
  const out=[], countries=new Map();
  for(const pool of [inside,rest]){
    for(const s of pool){
      const country=s.country||"";
      const count=countries.get(country)||0;
      if(count>=2 && out.length<14) continue;
      if(out.some(x=>x.id===s.id)) continue;
      out.push(s);countries.set(country,count+1);
      if(out.length>=20) break;
    }
    if(out.length>=20) break;
  }
  for(const s of sorted){ if(out.length>=20) break; if(!out.some(x=>x.id===s.id)) out.push(s); }
  return out;
}
function visualClass(s){
  const c=(s.categories||[]).join(" ").toLowerCase();
  if(/beach|water|sea|harbour|coast|surf/.test(c)) return "water";
  if(/mountain|snow|ski|volcano|alps/.test(c)) return "mountain";
  if(/wildlife|zoo|animal|aquarium/.test(c)) return "wildlife";
  if(/city|street|skyline|urban/.test(c)) return "city";
  return "earth";
}
function generatedBackground(s){
  const type=visualClass(s);
  const backgrounds={
    water:"radial-gradient(circle at 70% 18%,rgba(255,232,174,.6),transparent 20%),linear-gradient(155deg,#6aa9b2,#2a6471 50%,#0e4149)",
    mountain:"radial-gradient(circle at 55% 20%,rgba(255,255,255,.75),transparent 16%),linear-gradient(145deg,#b7c2b5,#6f8d7e 48%,#294b42)",
    wildlife:"radial-gradient(circle at 68% 25%,rgba(222,185,116,.55),transparent 22%),linear-gradient(145deg,#8b8a54,#53683e 50%,#283c2d)",
    city:"radial-gradient(circle at 66% 24%,rgba(251,193,105,.7),transparent 18%),linear-gradient(150deg,#374b61,#1f3448 50%,#0d2635)",
    earth:"radial-gradient(circle at 64% 24%,rgba(164,211,190,.62),transparent 20%),linear-gradient(145deg,#557f70,#2b5e53 52%,#12382f)"
  }; return backgrounds[type];
}
function posterMarkup(s){
  const img=cleanUrl(s.thumbnailUrl);
  return img ? `<img src="${img.replace(/"/g,"&quot;")}" alt="" loading="lazy">` : "";
}
function card(s, compact=false){
  const b=document.createElement("button"); b.className=compact?"result-card":"window-card";
  b.type="button"; b.setAttribute("aria-label",`${truthLabel(s)} — ${s.title}`);
  if(compact){
    b.innerHTML=`<span class="truth">${truthLabel(s)}</span><strong></strong><small></small>`;
    b.querySelector("strong").textContent=s.title;
    b.querySelector("small").textContent=[s.region,s.country].filter(Boolean).join(" · ");
  }else{
    b.innerHTML=`<div class="card-visual"></div><div class="card-body"><div class="card-kicker"><span>${truthLabel(s)}</span><span></span></div><strong></strong><small></small></div>`;
    const v=b.querySelector(".card-visual");v.style.background=generatedBackground(s);v.innerHTML=posterMarkup(s);
    b.querySelector(".card-kicker span:last-child").textContent=localTime(s);
    b.querySelector("strong").textContent=s.title;
    b.querySelector("small").textContent=[s.region,s.country].filter(Boolean).join(" · ");
  }
  b.onclick=()=>openViewer(s);
  return b;
}
function renderHero(s){
  state.selected=s;if(!s)return;
  $("#heroTitle").textContent=s.title;
  $("#heroMeta").textContent=[s.region,s.country,s.story].filter(Boolean).join(" · ");
  $("#heroTruth").textContent=truthLabel(s);
  $("#heroLocal").textContent=localTime(s) ? localTime(s)+" local" : "";
  const mount=$("#heroLive");mount.replaceChildren();mount.style.background=generatedBackground(s);
  const img=cleanUrl(s.thumbnailUrl);
  if(img){const el=document.createElement("img");el.src=img;el.alt="";el.decoding="async";mount.append(el);}
  else if(s.playback==="EMBED" && cleanUrl(s.embedUrl)){
    const f=document.createElement("iframe");f.src=s.embedUrl;f.title=s.title;f.allow="autoplay; fullscreen; picture-in-picture";f.loading="eager";f.referrerPolicy="strict-origin-when-cross-origin";f.tabIndex=-1;mount.append(f);
  }
}
function renderWatch(){
  const g=$("#watchGrid");g.replaceChildren(...state.watch.map(s=>card(s,false)));
}
function search(query){
  const q=String(query||"").trim().toLowerCase();
  const items=!q ? state.sources.slice().sort((a,b)=>score(b)-score(a)).slice(0,12) :
    state.sources.filter(s=>[s.title,s.region,s.country,...(s.categories||[])].filter(Boolean).join(" ").toLowerCase().includes(q)).sort((a,b)=>score(b)-score(a)).slice(0,24);
  $("#searchResults").replaceChildren(...items.map(s=>card(s,true)));
  $("#searchStatus").textContent=q ? `${items.length} result${items.length===1?"":"s"}` : "";
}
function renderMap(){
  const atlas=$("#atlas");atlas.replaceChildren();let count=0;
  for(const s of state.sources){
    const lat=Number(s.lat),lon=Number(s.lon);if(!Number.isFinite(lat)||!Number.isFinite(lon))continue;
    const p=document.createElement("button");p.className="map-pin"+(isInside(s)?"":" external");p.type="button";p.title=`${s.title} — ${truthLabel(s)}`;p.setAttribute("aria-label",p.title);
    p.style.left=((lon+180)/360*100)+"%";p.style.top=((90-lat)/180*100)+"%";p.onclick=()=>openViewer(s);atlas.append(p);count++;
  }
  $("#mapNote").textContent=`${count} mapped current-window locations · green opens inside ERN when available · amber opens or links to an external provider.`;
}
function saveFavorites(){ localStorage.setItem("ern-favorites",JSON.stringify([...state.favorites])); }
function renderSaved(){
  const items=state.sources.filter(s=>state.favorites.has(s.id));
  $("#savedResults").replaceChildren(...items.map(s=>card(s,true)));
  $("#savedEmpty").hidden=items.length>0;
}
function stopImageTimer(){ if(state.imageTimer){clearInterval(state.imageTimer);state.imageTimer=null;} }
function mountViewer(s){
  stopImageTimer();const mount=$("#viewerStage");mount.replaceChildren();mount.style.background=generatedBackground(s);
  const source=cleanUrl(s.sourceUrl||s.officialUrl);const link=$("#sourceViewer");if(source){link.href=source;link.hidden=false}else{link.removeAttribute("href");link.hidden=true}
  if(s.playback==="EMBED" && cleanUrl(s.embedUrl)){
    const f=document.createElement("iframe");f.src=s.embedUrl;f.title=s.title;f.allow="autoplay; fullscreen; picture-in-picture";f.allowFullscreen=true;f.referrerPolicy="strict-origin-when-cross-origin";mount.append(f);
  }else if(s.playback==="IMAGE_REFRESH" && cleanUrl(s.sourceUrl)){
    const img=document.createElement("img");img.alt=s.title;const refresh=()=>{try{const u=new URL(s.sourceUrl);u.searchParams.set("ern",Date.now());img.src=u.href}catch{img.src=s.sourceUrl}};refresh();state.imageTimer=setInterval(()=>{if(document.visibilityState==="visible")refresh()},Math.max(30000,Number(s.refreshMs)||60000));mount.append(img);
  }else{
    const box=document.createElement("div");box.className="external-box";const h=document.createElement("h3");h.textContent=s.title;const p=document.createElement("p");p.textContent="This current window is available at its official provider. ERN opens it there rather than pretending it is embedded here.";box.append(h,p);if(source){const a=document.createElement("a");a.href=source;a.target="_blank";a.rel="noopener noreferrer";a.textContent="Open current source";box.append(a)}mount.append(box);
  }
}
function openViewer(s){
  if(!s)return;state.selected=s;const idx=state.watch.findIndex(x=>x.id===s.id);if(idx>=0)state.watchIndex=idx;
  $("#viewerTruth").textContent=truthLabel(s);$("#viewerTitle").textContent=s.title;$("#viewerPlace").textContent=[s.region,s.country,localTime(s)].filter(Boolean).join(" · ");
  $("#favoriteViewer").textContent=state.favorites.has(s.id)?"♥":"♡";mountViewer(s);$("#viewer").hidden=false;document.body.style.overflow="hidden";
}
function closeViewer(){stopJourney();stopImageTimer();$("#viewer").hidden=true;$("#viewerStage").replaceChildren();document.body.style.overflow="";}
function move(delta){
  if(!state.watch.length)return;state.watchIndex=(state.watchIndex+delta+state.watch.length)%state.watch.length;openViewer(state.watch[state.watchIndex]);
}
function updateJourneyButton(){ const b=$("#journeyToggle");if(b)b.textContent=state.journeyTimer?t("pauseJourney"):t("playJourney"); }
function startJourney(){ if(state.journeyTimer)return;state.journeyTimer=setInterval(()=>move(1),30000);updateJourneyButton(); }
function stopJourney(){ if(state.journeyTimer){clearInterval(state.journeyTimer);state.journeyTimer=null;}updateJourneyButton(); }
function scrollToId(id){document.getElementById(id)?.scrollIntoView({behavior:"smooth",block:"start"});}
function initEvents(){
  $("#homeBtn").onclick=()=>scrollToId("home");$("#watchNav").onclick=()=>scrollToId("watch");$("#searchNav").onclick=()=>{scrollToId("search");setTimeout(()=>$("#searchInput").focus(),350)};$("#mapNav").onclick=()=>scrollToId("map");$("#savedNav").onclick=()=>scrollToId("saved");
  $("#heroWatch").onclick=()=>openViewer(state.selected);$("#heroNext").onclick=()=>{if(!state.watch.length)return;state.watchIndex=(state.watchIndex+1)%state.watch.length;renderHero(state.watch[state.watchIndex])};$("#heroSearch").onclick=()=>$("#searchNav").click();
  $("#searchInput").oninput=e=>search(e.target.value);$("#clearSearch").onclick=()=>{$("#searchInput").value="";search("");$("#searchInput").focus()};
  $("#closeViewer").onclick=closeViewer;$("#prevViewer").onclick=()=>move(-1);$("#nextViewer").onclick=()=>move(1);$("#journeyToggle").onclick=()=>state.journeyTimer?stopJourney():startJourney();
  $("#fullViewer").onclick=()=>$("#viewer").requestFullscreen?.();$("#favoriteViewer").onclick=()=>{const s=state.selected;if(!s)return;state.favorites.has(s.id)?state.favorites.delete(s.id):state.favorites.add(s.id);saveFavorites();$("#favoriteViewer").textContent=state.favorites.has(s.id)?"♥":"♡";renderSaved();};
  $("#languageSelect").onchange=e=>{lang=e.target.value;localStorage.setItem("ern-language",lang);applyLanguage();};
  document.addEventListener("keydown",e=>{if($("#viewer").hidden)return;if(e.key==="Escape")closeViewer();if(e.key==="ArrowRight")move(1);if(e.key==="ArrowLeft")move(-1)});
}
async function boot(){
  applyLanguage();initEvents();
  try{
    const res=await fetch("./data/sources.json",{cache:"no-store"});if(!res.ok)throw new Error("source registry "+res.status);
    const rows=await res.json();state.sources=Array.isArray(rows)?rows.filter(s=>s&&s.id&&s.title):[];
    state.watch=buildWatch(state.sources);state.watchIndex=0;
    renderHero(state.watch[0]||state.sources[0]);renderWatch();search("");renderMap();renderSaved();
  }catch(err){
    console.error(err);$("#heroTitle").textContent="Earth will be back shortly";$("#heroMeta").textContent="ERN could not load its current-window catalog. Please refresh in a moment.";
  }
}
boot();
})();