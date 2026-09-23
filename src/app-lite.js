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
 const p=interactionProfile();p.countries=p.countries||{};p.categories=p.categories||{};p.views=Number(p.views||0)+1;
 if(s.country)p.countries[s.country]=(p.countries[s.country]||0)+1;
 for(const c of (s.categories||[]).slice(0,4))p.categories[c]=(p.categories[c]||0)+1;
 const trim=o=>Object.fromEntries(Object.entries(o).sort((a,b)=>b[1]-a[1]).slice(0,12));p.countries=trim(p.countries);p.categories=trim(p.categories);
 writeSaved("ern-profile",JSON.stringify(p));
}
const savedMode=readSavedText("ern-mode","auto");
const savedCategory=readSavedText("ern-category","all");
const state={sources:[],watch:[],selected:null,watchIndex:0,journeyTimer:null,imageTimer:null,heroTimer:null,setOffset:0,wanderOffset:0,mode:["auto","beautiful","cities","calm","night"].includes(savedMode)?savedMode:"auto",category:["all","mountain","beach","city","nature","wildlife","island","park","landmark","weather","random"].includes(savedCategory)?savedCategory:"all",favorites:readSavedSet("ern-favorites")};
const translations={
 en:{playJourney:"Play journey",pauseJourney:"Pause journey"},
 th:{playJourney:"เล่นต่อเนื่อง",pauseJourney:"หยุดชั่วคราว"},
 de:{playJourney:"Reise starten",pauseJourney:"Pause"},
 fr:{playJourney:"Lancer",pauseJourney:"Pause"},
 ja:{playJourney:"自動再生",pauseJourney:"一時停止"},
 zh:{playJourney:"自动播放",pauseJourney:"暂停"},
 es:{playJourney:"Reproducir viaje",pauseJourney:"Pausar"}
};
let lang=readSavedText("ern-language","en");if(!translations[lang])lang="en";
const t=k=>translations[lang]?.[k]||translations.en[k]||k;
function cleanUrl(v){try{const u=new URL(v,location.href);return /^https?:$/.test(u.protocol)?u.href:null}catch{return null}}
function truthLabel(s){if(s.truth==="LIVE_VIDEO")return"LIVE VIDEO";if(s.truth==="LIVE_IMAGE")return"LIVE IMAGE";if(s.truth==="EXTERNAL_LIVE")return"EXTERNAL LIVE";if(s.truth==="PARTNER")return"PARTNER";return"PREVIEW"}
function isInside(s){return!!(s&&s.health!=="OFFLINE"&&((s.playback==="EMBED"&&cleanUrl(s.embedUrl))||(s.playback==="IMAGE_REFRESH"&&cleanUrl(s.sourceUrl))))}
function localHour(s){if(!s?.timeZone)return null;try{const p=new Intl.DateTimeFormat("en-US",{timeZone:s.timeZone,hour:"2-digit",hour12:false}).formatToParts(new Date());const h=Number(p.find(x=>x.type==="hour")?.value);return Number.isFinite(h)?h%24:null}catch{return null}}
function localTime(s){if(!s?.timeZone)return"";try{return new Intl.DateTimeFormat(undefined,{timeZone:s.timeZone,hour:"numeric",minute:"2-digit"}).format(new Date())}catch{return""}}
function momentLabel(s){const h=localHour(s);if(h===null)return"Current";if(h>=5&&h<8)return"Morning light";if(h>=8&&h<17)return"Daylight";if(h>=17&&h<20)return"Evening light";return"Night";}
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
 const p=interactionProfile();if(Number(p.views||0)<3)return 0;
 let n=0;if(s.country)n+=Math.min(10,Number(p.countries?.[s.country]||0)*2);
 for(const c of s.categories||[])n+=Math.min(4,Number(p.categories?.[c]||0));
 return Math.min(18,n);
}
function baseScore(s){
 let n=Number(s.quality||0)+Number(s.moment||0)*.72+Number(s.freshness||0)*.35;
 if(s.health==="HEALTHY")n+=32;else if(s.health==="DEGRADED")n-=38;else n-=100;
 if(isInside(s))n+=22;
 if(isDay(s)&&isScenic(s))n+=32;
 if(!isDay(s)&&!isCity(s))n-=50;
 if(!isDay(s)&&isCity(s))n+=16;
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
  night:{id:"night",label:"Night Lights",reason:"City and harbour windows that stay interesting after dark.",boost:s=>(!isDay(s)&&isCity(s)?60:0)-(!isDay(s)&&!isCity(s)?30:0)}
 };
 return fixed[state.mode]||automatic;
}
function buildWatch(sources){
 const profile=setProfile();
 let pool=sources.filter(s=>s.health==="HEALTHY"&&!FEATURED_HOLD.has(s.id));
 if(state.category!=="all"&&state.category!=="random")pool=pool.filter(s=>categoryMatch(s,state.category));
 const sorted=[...pool].sort((a,b)=>(baseScore(b)+profile.boost(b))-(baseScore(a)+profile.boost(a)));
 const out=[],countries=new Map(),providers=new Map(),places=new Map();
 const reserveInside=sorted.filter(s=>isInside(s)&&s.health==="HEALTHY").slice(0,5);
 for(const s of reserveInside){
   const place=s.placeId||s.id;if(places.has(place))continue;
   out.push(s);places.set(place,1);countries.set(s.country||"", (countries.get(s.country||"")||0)+1);providers.set(s.provider||"", (providers.get(s.provider||"")||0)+1)
 }
 for(const s of sorted){
   if(out.length>=20)break;if(out.some(x=>x.id===s.id))continue;
   const country=s.country||"",provider=s.provider||"",place=s.placeId||s.id;
   const cc=countries.get(country)||0,pc=providers.get(provider)||0,pl=places.get(place)||0;
   if(pl>=1&&out.length<16)continue;
   if(cc>=2&&out.length<15)continue;
   if(pc>=7&&out.length<15)continue;
   out.push(s);places.set(place,pl+1);countries.set(country,cc+1);providers.set(provider,pc+1);
 }
 for(const s of sorted){if(out.length>=20)break;if(!out.some(x=>x.id===s.id))out.push(s)}
 if(state.category==="random")out.sort(()=>Math.random()-.5);
 $("#setLabel").textContent=profile.label;$("#setReason").textContent=profile.reason;const p=interactionProfile();$("#personalNote").textContent=Number(p.views||0)>=3?"Adapting locally to places you explore":"Personalized locally as you explore";
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
function renderHero(s){
 state.selected=s;if(!s)return;const mount=$("#heroLive");mount.classList.add("is-changing");
 setTimeout(()=>{mount.replaceChildren();mount.style.background=generatedBackground(s);const img=cleanUrl(s.thumbnailUrl);
  if(img){const el=document.createElement("img");el.src=img;el.alt="";el.decoding="async";mount.append(el)}
  else if(s.playback==="EMBED"&&cleanUrl(s.embedUrl)){const f=document.createElement("iframe");f.src=s.embedUrl;f.title=s.title;f.allow="autoplay; fullscreen; picture-in-picture";f.loading="eager";f.referrerPolicy="strict-origin-when-cross-origin";f.tabIndex=-1;mount.append(f)}
  $("#heroTitle").textContent=s.title;$("#heroMeta").textContent=[s.region,s.country,momentLabel(s),localTime(s)].filter(Boolean).join(" · ");$("#heroTruth").textContent=truthLabel(s).replace(" VIDEO","").replace("EXTERNAL ","");mount.classList.remove("is-changing");
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
   b.innerHTML=`<span class="truth"></span><strong></strong><small></small>`;
   b.prepend(compactVisual(s));b.querySelector(".truth").textContent=truthLabel(s);b.querySelector("strong").textContent=s.title;b.querySelector("small").textContent=[s.region,s.country].filter(Boolean).join(" · ");
 }
 else{b.innerHTML=`<div class="card-visual"></div><div class="card-body"><div class="card-kicker"><span></span><span></span></div><strong></strong><small></small><span class="card-favorite" aria-hidden="true">${state.favorites.has(s.id)?"♥":"♡"}</span></div>`;const v=b.querySelector(".card-visual");v.style.background=generatedBackground(s);v.innerHTML=posterMarkup(s);
 const miniLive=index>=0&&index<3&&globalThis.innerWidth>=1100&&s.playback==="EMBED"&&isInside(s)&&cleanUrl(s.embedUrl);
 if(miniLive&&!v.querySelector("img")){const f=document.createElement("iframe");f.src=s.embedUrl;f.title=s.title+" live preview";f.loading="lazy";f.tabIndex=-1;f.setAttribute("aria-hidden","true");f.allow="autoplay; fullscreen; picture-in-picture";f.referrerPolicy="strict-origin-when-cross-origin";v.append(f);b.classList.add("has-live-preview")}
 b.querySelector(".card-kicker span:first-child").textContent=isInside(s)?"LIVE HERE":(s.truth==="EXTERNAL_LIVE"?"LIVE ↗":truthLabel(s));b.querySelector(".card-kicker span:last-child").textContent=[momentLabel(s),localTime(s)].filter(Boolean).join(" · ");b.querySelector("strong").textContent=s.title;b.querySelector("small").textContent=[s.region,s.country].filter(Boolean).join(", ")}
 b.onclick=()=>openViewer(s);return b;
}
function renderModeChips(){document.querySelectorAll(".mode-chip").forEach(b=>b.classList.toggle("active",b.dataset.mode===state.mode))}
function renderWatch(){state.watch=buildWatch(state.sources);$("#watchGrid").replaceChildren(...state.watch.map((s,i)=>card(s,false,i)));$("#watchCount").textContent=state.watch.length;renderModeChips();state.watchIndex=Math.min(state.watchIndex,Math.max(0,state.watch.length-1));if(state.watch.length&&!state.selected)renderHero(heroPool()[0]||state.watch[0])}
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
function search(q){
 const x=String(q||"").trim().toLowerCase();
 const matches=!x?state.sources:state.sources.filter(s=>[s.title,s.region,s.country,...(s.categories||[])].filter(Boolean).join(" ").toLowerCase().includes(x));
 const groups=groupByPlace(matches).sort((a,b)=>Math.max(...b.map(baseScore))-Math.max(...a.map(baseScore))).slice(0,x?24:12);
 $("#searchResults").replaceChildren(...groups.map(placeCard));
 $("#searchStatus").textContent=x?`${groups.length} place${groups.length===1?"":"s"} · ${matches.length} current window${matches.length===1?"":"s"}`:"";
}
function wanderCard(s){
 const b=document.createElement("button");b.type="button";b.className="wander-card";
 const v=document.createElement("span");v.className="wander-visual";v.style.background=generatedBackground(s);const img=cleanUrl(s.thumbnailUrl);if(img){const el=document.createElement("img");el.src=img;el.alt="";el.loading="lazy";v.append(el)}
 const copy=document.createElement("span");copy.className="wander-copy";const k=document.createElement("small");k.textContent=[truthLabel(s),localTime(s)].filter(Boolean).join(" · ");const strong=document.createElement("strong");strong.textContent=s.title;const meta=document.createElement("em");meta.textContent=[s.region,s.country].filter(Boolean).join(", ");copy.append(k,strong,meta);b.append(v,copy);b.onclick=()=>openViewer(s);return b;
}
function renderWander(){
 const used=new Set(state.watch.map(s=>s.id));
 const ranked=state.sources.filter(s=>s.health==="HEALTHY"&&!FEATURED_HOLD.has(s.id)&&!used.has(s.id)).sort((a,b)=>baseScore(b)-baseScore(a));
 const diverse=[],countries=new Set();for(const s of ranked){if(countries.has(s.country)&&diverse.length<5)continue;diverse.push(s);countries.add(s.country);if(diverse.length>=18)break}
 if(!diverse.length){$("#wanderGrid").replaceChildren();return}
 const start=(state.wanderOffset*6)%diverse.length;const pick=[];for(let i=0;i<Math.min(6,diverse.length);i++)pick.push(diverse[(start+i)%diverse.length]);
 $("#wanderGrid").replaceChildren(...pick.map(wanderCard));$("#wanderNote").textContent=`${pick.length} places beyond the current Top 20 · healthy sources only · ${visitorDaypart()} selection context`;
}
function renderMap(){
 const a=$("#atlas");a.querySelectorAll(".map-pin").forEach(x=>x.remove());let count=0,insideCount=0,externalCount=0;
 for(const s of state.sources){
   const lat=Number(s.lat),lon=Number(s.lon);if(!Number.isFinite(lat)||!Number.isFinite(lon)||s.health==="OFFLINE")continue;
   const inside=isInside(s);if(state.mapFilter==="inside"&&!inside)continue;if(state.mapFilter==="external"&&inside)continue;
   const p=document.createElement("button");p.className="map-pin"+(inside?"":" external");p.type="button";p.title=`${s.title} — ${truthLabel(s)}`;p.setAttribute("aria-label",p.title);p.style.left=((lon+180)/360*100)+"%";p.style.top=((90-lat)/180*100)+"%";p.onclick=()=>openViewer(s);a.append(p);count++;if(inside)insideCount++;else externalCount++;
 }
 document.querySelectorAll(".atlas-filter").forEach(b=>b.classList.toggle("active",b.dataset.mapFilter===state.mapFilter));
 $("#mapNote").textContent=`${count} mapped windows shown · ${insideCount} play inside ERN · ${externalCount} open at their provider.`;
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
 const box=$("#viewerContext"),story=$("#viewerStory"),tags=$("#viewerTags"),near=$("#nearbyList");
 story.textContent=s.story||"A current window onto this place.";
 tags.replaceChildren();
 const tagValues=[momentLabel(s),truthLabel(s),...(s.categories||[]).slice(0,3)];
 for(const value of tagValues){const tag=document.createElement("span");tag.textContent=value;tags.append(tag)}
 near.replaceChildren();
 const nearby=state.sources.filter(x=>x.id!==s.id&&x.health==="HEALTHY"&&(x.placeId||x.id)!==(s.placeId||s.id)).map(x=>({s:x,d:distanceKm(s,x)})).filter(x=>Number.isFinite(x.d)).sort((a,b)=>a.d-b.d).slice(0,3);
 for(const item of nearby){const b=document.createElement("button");b.type="button";b.className="nearby-item";const label=document.createElement("strong");label.textContent=item.s.title;const meta=document.createElement("small");meta.textContent=item.d<1?"Nearby":Math.round(item.d)+" km";b.append(label,meta);b.onclick=()=>openViewer(item.s);near.append(b)}
 const place=[s.region,s.country,s.title].filter(Boolean).join(" ");
 const q=encodeURIComponent(place);
 $("#planStay").href="https://www.google.com/search?q="+encodeURIComponent("hotels "+place);
 $("#planEat").href="https://www.google.com/search?q="+encodeURIComponent("restaurants "+place);
 $("#planDo").href="https://www.google.com/search?q="+encodeURIComponent("things to do "+place);
 box.hidden=!(story.textContent||tags.children.length||near.children.length);
}
function renderSaved(){const items=state.sources.filter(s=>state.favorites.has(s.id));$("#savedResults").replaceChildren(...items.map(s=>card(s,true)));$("#savedEmpty").hidden=items.length>0}
function stopImageTimer(){if(state.imageTimer){clearInterval(state.imageTimer);state.imageTimer=null}}
let viewerLoadTimer=null;
function clearViewerLoad(){if(viewerLoadTimer){clearTimeout(viewerLoadTimer);viewerLoadTimer=null}$("#viewerLoading").hidden=true}
function beginViewerLoad(){clearViewerLoad();$("#viewerLoading").hidden=false;viewerLoadTimer=setTimeout(()=>{$("#viewerLoading").hidden=false},7000)}
function mountViewerNow(s){
 stopImageTimer();clearViewerLoad();const mount=$("#viewerStage");mount.replaceChildren();mount.style.background=generatedBackground(s);const source=cleanUrl(s.sourceUrl||s.officialUrl),link=$("#sourceViewer");if(source){link.href=source;link.hidden=false}else{link.removeAttribute("href");link.hidden=true}
 if(s.playback==="EMBED"&&cleanUrl(s.embedUrl)){beginViewerLoad();const f=document.createElement("iframe");f.src=s.embedUrl;f.title=s.title;f.allow="autoplay; fullscreen; picture-in-picture";f.allowFullscreen=true;f.referrerPolicy="strict-origin-when-cross-origin";f.onload=()=>clearViewerLoad();mount.append(f)}
 else if(s.playback==="IMAGE_REFRESH"&&cleanUrl(s.sourceUrl)){beginViewerLoad();const img=document.createElement("img");img.alt=s.title;img.onload=()=>clearViewerLoad();img.onerror=()=>{$("#viewerLoading").hidden=false};const refresh=()=>{try{const u=new URL(s.sourceUrl);u.searchParams.set("ern",Date.now());img.src=u.href}catch{img.src=s.sourceUrl}};refresh();state.imageTimer=setInterval(()=>{if(document.visibilityState==="visible")refresh()},Math.max(30000,Number(s.refreshMs)||60000));mount.append(img)}
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
function openViewer(s){if(!s)return;recordInterest(s);state.selected=s;const i=state.watch.findIndex(x=>x.id===s.id);if(i>=0)state.watchIndex=i;$("#viewerTruth").textContent=truthLabel(s);$("#viewerTitle").textContent=s.title;$("#viewerPlace").textContent=[s.region,s.country,localTime(s)].filter(Boolean).join(" · ");$("#favoriteViewer").textContent=state.favorites.has(s.id)?"♥":"♡";renderAlternates(s);renderContext(s);if($("#viewer").hidden){$("#viewer").hidden=false;$("#viewer").classList.add("opening");setTimeout(()=>$("#viewer").classList.remove("opening"),260)}mountViewer(s);document.body.style.overflow="hidden"}
function closeViewer(){stopJourney();stopImageTimer();clearViewerLoad();$("#viewer").hidden=true;$("#viewerStage").replaceChildren();$("#viewerAlternates").replaceChildren();$("#viewerAlternates").hidden=true;$("#viewerContext").hidden=true;$("#nearbyList").replaceChildren();document.body.style.overflow=""}
function move(d){if(!state.watch.length)return;state.watchIndex=(state.watchIndex+d+state.watch.length)%state.watch.length;openViewer(state.watch[state.watchIndex])}
function updateJourneyButton(){$("#journeyToggle").textContent=state.journeyTimer?t("pauseJourney"):t("playJourney")}
function startJourney(){if(state.journeyTimer)return;stopHeroRotation();state.journeyTimer=setInterval(()=>move(1),30000);updateJourneyButton()}
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
function applyLanguage(){document.documentElement.lang=lang;$("#languageSelect").value=lang;updateJourneyButton()}
function selectCategory(cat,button){state.category=cat;writeSaved("ern-category",cat);document.querySelectorAll(".category").forEach(x=>x.classList.toggle("active",x.dataset.category===cat));button?.classList.add("active");if(cat==="random")state.setOffset++;renderWatch();renderWander();if(state.watch.length){state.watchIndex=0;renderHero(heroPool()[0]||state.watch[0])}scrollToId("watch")}
function initSectionSpy(){
 if(!("IntersectionObserver"in globalThis))return;
 const map=[["home","homeNav"],["watch","watchNav"],["destinations","destinationsNav"],["search","searchNav"],["map","mapNav"],["saved","savedNav"]];
 const obs=new IntersectionObserver(entries=>{
   const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(!visible)return;
   const active=map.find(x=>x[0]===visible.target.id)?.[1];if(!active)return;
   for(const [,id] of map){const el=document.getElementById(id);if(el)el.classList.toggle("active",id===active)}
 },{rootMargin:"-20% 0px -60% 0px",threshold:[0,.15,.4]});
 for(const [id] of map){const el=document.getElementById(id);if(el)obs.observe(el)}
}
function initEvents(){
 $("#homeBtn").onclick=()=>scrollToId("home");$("#homeNav").onclick=()=>scrollToId("home");$("#watchNav").onclick=()=>scrollToId("watch");$("#searchNav").onclick=()=>{scrollToId("search");setTimeout(()=>$("#searchInput").focus(),300)};$("#destinationsNav").onclick=()=>scrollToId("destinations");$("#mapNav").onclick=()=>scrollToId("map");$("#savedNav").onclick=()=>scrollToId("saved");
 $("#mobileWatch").onclick=()=>scrollToId("watch");$("#mobileExplore").onclick=()=>{scrollToId("search");setTimeout(()=>$("#searchInput").focus(),300)};$("#mobileMap").onclick=()=>scrollToId("map");$("#mobileSaved").onclick=()=>scrollToId("saved");
 $("#heroWatch").onclick=()=>scrollToId("watch");$("#heroNext").onclick=()=>{const hp=heroPool();if(!hp.length)return;stopHeroRotation();const current=hp.findIndex(x=>x.id===state.selected?.id);const next=hp[(current+1+hp.length)%hp.length];state.watchIndex=Math.max(0,state.watch.findIndex(x=>x.id===next.id));renderHero(next);startHeroRotation()};
 $("#refreshSet").onclick=()=>{stopHeroRotation();state.mode="auto";writeSaved("ern-mode","auto");state.setOffset++;renderWatch();renderWander();if(state.watch.length){state.watchIndex=0;renderHero(heroPool()[0]||state.watch[0])}startHeroRotation()};
 document.querySelectorAll(".mode-chip").forEach(b=>b.onclick=()=>{stopHeroRotation();state.mode=b.dataset.mode||"auto";writeSaved("ern-mode",state.mode);renderWatch();renderWander();if(state.watch.length){state.watchIndex=0;renderHero(heroPool()[0]||state.watch[0])}startHeroRotation()});
 $("#wanderRefresh").onclick=()=>{state.wanderOffset++;renderWander()};
 document.querySelectorAll(".atlas-filter").forEach(b=>b.onclick=()=>{state.mapFilter=b.dataset.mapFilter||"all";renderMap()});
 document.querySelectorAll(".category").forEach(b=>b.onclick=()=>{stopHeroRotation();selectCategory(b.dataset.category,b);startHeroRotation()});
 $("#searchInput").oninput=e=>search(e.target.value);$("#clearSearch").onclick=()=>{$("#searchInput").value="";search("");$("#searchInput").focus()};
 document.querySelectorAll(".search-suggestions button").forEach(b=>b.onclick=()=>{$("#searchInput").value=b.dataset.query||"";search($("#searchInput").value);scrollToId("search")});
 $("#closeViewer").onclick=()=>{closeViewer();startHeroRotation()};$("#prevViewer").onclick=()=>move(-1);$("#nextViewer").onclick=()=>move(1);$("#journeyToggle").onclick=()=>state.journeyTimer?stopJourney():startJourney();$("#fullViewer").onclick=()=>$("#viewer").requestFullscreen?.();
 $("#favoriteViewer").onclick=()=>{const s=state.selected;if(!s)return;state.favorites.has(s.id)?state.favorites.delete(s.id):state.favorites.add(s.id);saveFavorites();$("#favoriteViewer").textContent=state.favorites.has(s.id)?"♥":"♡";renderSaved();renderWatch()};
 $("#languageSelect").onchange=e=>{lang=e.target.value;writeSaved("ern-language",lang);applyLanguage()};
 document.addEventListener("keydown",e=>{if($("#viewer").hidden)return;if(e.key==="Escape"){closeViewer();startHeroRotation()}if(e.key==="ArrowRight")move(1);if(e.key==="ArrowLeft")move(-1)});
 document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible")startHeroRotation();else stopHeroRotation()});
}
async function boot(){applyLanguage();initEvents();initSectionSpy();document.querySelectorAll(".category").forEach(x=>x.classList.toggle("active",x.dataset.category===state.category));try{const r=await fetch("./data/sources.json",{cache:"no-store"});if(!r.ok)throw new Error("source registry "+r.status);const rows=await r.json();state.sources=Array.isArray(rows)?rows.filter(s=>s&&s.id&&s.title):[];renderWatch();renderWander();state.watchIndex=0;renderHero(heroPool()[0]||state.watch[0]||state.sources[0]);search("");renderMap();renderSaved();startHeroRotation()}catch(err){console.error(err);$("#heroTitle").textContent="Earth will be back shortly";$("#heroMeta").textContent="ERN could not load its current-window catalog. Please refresh in a moment."}}
boot();
})();