// Loaded on demand only for Living Atlas. Base markers remain clickable if import fails.
const ATLAS_STYLES=".map-pin.cluster{width:29px;height:29px;border:2px solid #fff;box-shadow:0 4px 14px rgba(7,42,34,.22);background:#206958;color:#fff;font-size:11px;font-weight:800;line-height:1;display:grid;place-items:center;z-index:2}\n.map-pin.cluster.external{background:#be8735}\n.map-pin.cluster:hover,.map-pin.cluster:focus-visible{z-index:5}\n.map-cluster-panel{position:absolute;z-index:12;transform:translate(-50%,8px);width:min(350px,calc(100% - 28px));max-height:min(310px,70%);display:flex;flex-direction:column;overflow:hidden;border:1px solid rgba(20,63,54,.16);border-radius:14px;background:#fff;color:#153b34;box-shadow:0 16px 45px rgba(5,33,27,.22)}\n.map-cluster-heading{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:12px 14px;border-bottom:1px solid #dce9e3;font-size:13px}\n.map-cluster-heading button{background:transparent;border:1px solid #c8d9d0;color:#17483f;border-radius:9px;font-size:12px;padding:6px 9px}\n.map-cluster-list{overflow-y:auto;min-height:0}\n.map-cluster-choice{width:100%;display:flex;flex-direction:column;text-align:left;gap:3px;padding:10px 14px;border:0;border-bottom:1px solid #eef3f0;background:#fff;color:#163a34}\n.map-cluster-choice:hover,.map-cluster-choice:focus-visible{background:#eaf4ef}\n.map-cluster-choice strong{font-size:12px;font-weight:700}\n.map-cluster-choice small{font-size:10px;color:#637e74}\n@media(max-width:720px){.window-card .watch-card-play{font-size:11px;padding:9px 11px}.map-cluster-panel{max-height:230px}}\n\n.atlas-beyond{margin-top:14px;padding:14px;border:1px solid rgba(24,61,55,.12);border-radius:16px;background:rgba(255,255,255,.55)}.atlas-beyond[hidden]{display:none}.atlas-beyond-head{display:flex;justify-content:space-between;gap:12px;align-items:baseline;margin-bottom:10px}.atlas-beyond-head strong{font-family:Georgia,serif;font-size:17px;font-weight:500;color:#244a42}.atlas-beyond-head span{font-size:9px;color:#6f877f;text-align:right}.atlas-beyond-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}.atlas-beyond-card{border:1px solid rgba(24,61,55,.13);background:white;color:#173c34;border-radius:12px;padding:10px 11px;text-align:left;min-width:0}.atlas-beyond-card strong{display:block;font-size:10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.atlas-beyond-card small{display:block;margin-top:3px;color:#6a827a;font-size:8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.atlas-beyond-card:hover{border-color:rgba(24,61,55,.3);transform:translateY(-1px)}@media(max-width:760px){.atlas-beyond-head{align-items:flex-start;flex-direction:column}.atlas-beyond-head span{text-align:left}.atlas-beyond-grid{grid-template-columns:1fr 1fr}}@media(max-width:460px){.atlas-beyond-grid{grid-template-columns:1fr}}.atlas-legend{display:flex;gap:14px;flex-wrap:wrap;align-items:center;margin-top:10px;color:#5f786f;font-size:8px}.atlas-legend span{display:inline-flex;align-items:center;gap:5px}.legend-pin{display:inline-block;width:10px;height:10px;border-radius:50%;border:1.5px solid white;box-shadow:0 1px 4px rgba(7,42,34,.2);background:#1b7564}.legend-pin.external{background:#d79a3e}.legend-pin.local{background:#7c6de0}\n.atlas-controls{display:flex;gap:7px;margin:-4px 0 12px}.atlas-filter{border:1px solid rgba(24,61,55,.14);background:white;color:#31574f;border-radius:999px;padding:7px 10px;font-size:9px;font-weight:700}.atlas-filter.active{background:#0d564b;color:white;border-color:#0d564b}.atlas-continent{position:absolute;background:rgba(41,118,96,.14);filter:blur(.1px);pointer-events:none}.atlas-americas{left:10%;top:18%;width:22%;height:56%;border-radius:48% 35% 55% 45% / 28% 45% 56% 68%;transform:rotate(9deg)}.atlas-europe{left:43%;top:20%;width:13%;height:16%;border-radius:48% 52% 44% 56%}.atlas-africa{left:45%;top:34%;width:15%;height:34%;border-radius:42% 46% 58% 55%;transform:rotate(-5deg)}.atlas-asia{left:55%;top:19%;width:30%;height:32%;border-radius:48% 52% 46% 58%;transform:rotate(5deg)}.atlas-australia{left:73%;top:62%;width:13%;height:14%;border-radius:52% 48% 58% 42%;transform:rotate(-8deg)}.map-pin{z-index:2}\n@media(max-width:600px){.atlas-controls{overflow:auto}.atlas-filter{flex:0 0 auto}}";
const ZOOM_STYLES=".atlas.atlas-zoom-ready{background-image:none!important;touch-action:pan-y}\n.atlas.atlas-zoom-ready.atlas-is-zoomed{touch-action:none;cursor:grab}\n.atlas.atlas-is-dragging{cursor:grabbing}\n.atlas.atlas-zoom-ready:before{opacity:0}\n.atlas-zoom-world{position:absolute;inset:0;transform-origin:0 0;will-change:transform;background:linear-gradient(rgba(232,241,236,.28),rgba(232,241,236,.28)),url(\"/assets/world-map-natural-earth.svg\") center / 100% 100% no-repeat;pointer-events:none}\n.atlas-zoom-world .map-pin{pointer-events:auto}\n.atlas-zoom-controls{position:absolute;z-index:15;top:14px;right:14px;display:flex;gap:5px;align-items:center;border:1px solid rgba(17,60,48,.18);border-radius:14px;padding:6px;background:rgba(255,255,255,.96);box-shadow:0 5px 22px rgba(6,32,26,.13)}\n.atlas-zoom-controls button{background:#ecf3ee;color:#174c40;border:1px solid #d3e2d8;min-width:35px;height:36px;border-radius:9px;font:700 19px/1 system-ui,sans-serif}\n.atlas-zoom-controls button:last-of-type{font-size:11px;padding:0 9px}\n.atlas-zoom-controls button:hover,.atlas-zoom-controls button:focus-visible{background:#d8ebe0;border-color:#72aa95}\n.atlas-zoom-controls button:disabled{opacity:.43;cursor:default}\n.atlas-zoom-level{font:700 11px/1 system-ui,sans-serif;min-width:31px;text-align:center;color:#244d42}\n@media(max-width:640px){.atlas-zoom-controls{top:9px;right:9px;padding:4px;gap:4px}.atlas-zoom-controls button{min-width:33px;height:34px}}\n";
const atlasView={scale:1,x:0,y:0};
let atlasStage=null,atlasWorld=null,atlasRedraw=null,zoomStatus=null,minusButton=null,plusButton=null;
const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));
// Pure geometry: keep the geographic point under the cursor fixed while zooming.
export function atlasZoomTransform(view,next,anchorX,anchorY,width,height){
 const old=Math.max(1,Number(view?.scale)||1),scale=clamp(Number(next)||1,1,5);
 const w=Math.max(1,width),h=Math.max(1,height);
 const px=clamp(anchorX,0,1)*w,py=clamp(anchorY,0,1)*h;
 const x=px-(px-(Number(view?.x)||0))*scale/old;
 const y=py-(py-(Number(view?.y)||0))*scale/old;
 return{scale,x:clamp(x,w*(1-scale),0),y:clamp(y,h*(1-scale),0)};
}
function paintAtlas(){
 if(!atlasStage||!atlasWorld)return;
 const w=atlasStage.clientWidth||1000,h=atlasStage.clientHeight||500;
 atlasView.x=clamp(atlasView.x,w*(1-atlasView.scale),0);
 atlasView.y=clamp(atlasView.y,h*(1-atlasView.scale),0);
 atlasWorld.style.transform="translate("+atlasView.x+"px,"+atlasView.y+"px) scale("+atlasView.scale+")";
 atlasStage.classList.toggle("atlas-is-zoomed",atlasView.scale>1.01);
 if(zoomStatus)zoomStatus.textContent=Number(atlasView.scale.toFixed(1))+"×";
 if(minusButton)minusButton.disabled=atlasView.scale<=1;
 if(plusButton)plusButton.disabled=atlasView.scale>=5;
}
function changeZoom(value,ax=.5,ay=.5){
 const w=atlasStage.clientWidth||1000,h=atlasStage.clientHeight||500;
 Object.assign(atlasView,atlasZoomTransform(atlasView,value,ax,ay,w,h));
 paintAtlas();atlasRedraw?.();
}
function ensureAtlasZoom(a,repaint){
 atlasRedraw=repaint;
 if(atlasStage===a&&atlasWorld)return atlasWorld;
 atlasStage=a;
 a.classList.add("atlas-zoom-ready");
 atlasWorld=document.createElement("div");atlasWorld.className="atlas-zoom-world";a.prepend(atlasWorld);
 const controls=document.createElement("div");controls.className="atlas-zoom-controls";
 controls.setAttribute("role","group");controls.setAttribute("aria-label","Living Atlas zoom controls");
 minusButton=document.createElement("button");minusButton.type="button";minusButton.textContent="−";minusButton.setAttribute("aria-label","Zoom out");minusButton.onclick=()=>changeZoom(atlasView.scale/1.6);
 plusButton=document.createElement("button");plusButton.type="button";plusButton.textContent="+";plusButton.setAttribute("aria-label","Zoom in");plusButton.onclick=()=>changeZoom(atlasView.scale*1.6);
 zoomStatus=document.createElement("span");zoomStatus.className="atlas-zoom-level";zoomStatus.setAttribute("aria-live","polite");
 const reset=document.createElement("button");reset.type="button";reset.textContent="World";reset.setAttribute("aria-label","Reset to world view");reset.onclick=()=>changeZoom(1);
 controls.append(minusButton,zoomStatus,plusButton,reset);a.append(controls);
 let pan=null;
 a.addEventListener("pointerdown",e=>{
  if(atlasView.scale<=1||e.button>0||e.target.closest("button,a,.map-cluster-panel"))return;
  pan={id:e.pointerId,x:e.clientX,y:e.clientY};a.classList.add("atlas-is-dragging");
  try{a.setPointerCapture(e.pointerId)}catch{}
 });
 a.addEventListener("pointermove",e=>{
  if(!pan||pan.id!==e.pointerId)return;
  atlasView.x+=e.clientX-pan.x;atlasView.y+=e.clientY-pan.y;pan.x=e.clientX;pan.y=e.clientY;
  paintAtlas();
 });
 const stopPan=e=>{if(!pan||pan.id!==e.pointerId)return;pan=null;a.classList.remove("atlas-is-dragging");atlasRedraw?.()};
 a.addEventListener("pointerup",stopPan);a.addEventListener("pointercancel",stopPan);
 a.addEventListener("wheel",e=>{
  // Ctrl/Command + scroll zooms. Ordinary scrolling still moves the page.
  if(!(e.ctrlKey||e.metaKey))return;
  e.preventDefault();const r=a.getBoundingClientRect();
  changeZoom(atlasView.scale*(e.deltaY<0?1.2:1/1.2),(e.clientX-r.left)/r.width,(e.clientY-r.top)/r.height);
 },{passive:false});
 a.addEventListener("dblclick",e=>{
  if(e.target.closest("button,a,.map-cluster-panel"))return;
  e.preventDefault();const r=a.getBoundingClientRect();
  changeZoom(atlasView.scale*1.6,(e.clientX-r.left)/r.width,(e.clientY-r.top)/r.height);
 });
 window.addEventListener("resize",()=>{paintAtlas();atlasRedraw?.()});
 paintAtlas();return atlasWorld;
}

function ensureStyles(){if(document.getElementById("ern-atlas-groups-style"))return;const style=document.createElement("style");style.id="ern-atlas-groups-style";style.textContent=ATLAS_STYLES+ZOOM_STYLES;document.head.append(style)}
export function renderAtlasMarkerGroups(a,markers,repaint){ensureStyles();
const world=ensureAtlasZoom(a,repaint);world.querySelectorAll(".map-pin").forEach(x=>x.remove());
a.querySelector(".map-cluster-panel")?.remove();
const cols=Math.max(12,Math.floor(((a.clientWidth||1000)*atlasView.scale)/42));
const rows=Math.max(8,Math.floor(((a.clientHeight||520)*atlasView.scale)/42));
const cells=new Map();
for(const marker of markers){
 const x=Math.min(cols-1,Math.max(0,Math.floor(((marker.lon+180)/360)*cols)));
 const y=Math.min(rows-1,Math.max(0,Math.floor(((90-marker.lat)/180)*rows)));
 const key=x+":"+y;if(!cells.has(key))cells.set(key,[]);cells.get(key).push(marker);
}
function showMapGroup(entries,pin){
 a.querySelector(".map-cluster-panel")?.remove();
 const panel=document.createElement("div");panel.className="map-cluster-panel";panel.setAttribute("role","dialog");
 panel.setAttribute("aria-label",entries.length+" mapped places");
 const x=entries.reduce((n,m)=>n+(m.lon+180)/360*100,0)/entries.length;
 const y=entries.reduce((n,m)=>n+(90-m.lat)/180*100,0)/entries.length;
 panel.style.left=clamp((atlasView.x+(x/100)*(a.clientWidth||1000)*atlasView.scale)/(a.clientWidth||1000)*100,18,82)+"%";
 panel.style.top=clamp((atlasView.y+(y/100)*(a.clientHeight||500)*atlasView.scale)/(a.clientHeight||500)*100,6,55)+"%";
 const heading=document.createElement("div");heading.className="map-cluster-heading";
 const title=document.createElement("strong");title.textContent=entries.length+" places to explore";
 const close=document.createElement("button");close.type="button";close.textContent="Close";close.setAttribute("aria-label","Close map group");close.onclick=()=>{panel.remove();pin.focus()};
 heading.append(title,close);panel.append(heading);
 const list=document.createElement("div");list.className="map-cluster-list";
 for(const entry of entries){
  const option=document.createElement("button");option.type="button";option.className="map-cluster-choice";
  const name=document.createElement("strong");name.textContent=entry.name;
  const label=document.createElement("small");label.textContent=entry.label;
  option.append(name,label);option.onclick=()=>{panel.remove();entry.node.click()};list.append(option);
 }
 panel.append(list);panel.onkeydown=e=>{if(e.key==="Escape"){e.preventDefault();panel.remove();pin.focus()}};
 a.append(panel);close.focus();
}
for(const group of cells.values()){
 if(group.length===1){world.append(group[0].node);continue}
 const pin=document.createElement("button");pin.type="button";
 pin.className="map-pin cluster"+(group.every(x=>x.node.classList.contains("external"))?" external":"");
 const left=group.reduce((n,x)=>n+(x.lon+180)/360*100,0)/group.length;
 const top=group.reduce((n,x)=>n+(90-x.lat)/180*100,0)/group.length;
 pin.style.left=left+"%";pin.style.top=top+"%";pin.textContent=String(group.length);
 pin.title=group.length+" mapped places — choose a place";
 pin.setAttribute("aria-label",pin.title);pin.setAttribute("aria-haspopup","dialog");
 pin.onclick=()=>showMapGroup(group,pin);world.append(pin);
}
if(!a.dataset.mapClusterDismiss){a.addEventListener("click",e=>{
 if(!e.target.closest(".map-pin,.map-cluster-panel"))a.querySelector(".map-cluster-panel")?.remove();
 });a.dataset.mapClusterDismiss="true";}

return cells.size;
}
