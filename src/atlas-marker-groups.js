// Loaded on demand only for Living Atlas. Base markers remain clickable if import fails.
const ATLAS_STYLES=".map-pin.cluster{width:24px;height:24px;border:2px solid #fff;box-shadow:0 4px 14px rgba(7,42,34,.22);background:#206958;color:#fff;font-size:10px;font-weight:800;line-height:1;display:grid;place-items:center;z-index:2}\n.map-pin.cluster.external{background:#be8735}\n.map-pin.cluster:hover,.map-pin.cluster:focus-visible{z-index:5;transform:translate(-50%,-50%) scale(1.16)}\n.map-cluster-panel{position:absolute;z-index:12;transform:translate(-50%,8px);width:min(350px,calc(100% - 28px));max-height:min(310px,70%);display:flex;flex-direction:column;overflow:hidden;border:1px solid rgba(20,63,54,.16);border-radius:14px;background:#fff;color:#153b34;box-shadow:0 16px 45px rgba(5,33,27,.22)}\n.map-cluster-heading{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:12px 14px;border-bottom:1px solid #dce9e3;font-size:13px}\n.map-cluster-heading button{background:transparent;border:1px solid #c8d9d0;color:#17483f;border-radius:9px;font-size:12px;padding:6px 9px}\n.map-cluster-list{overflow-y:auto;min-height:0}\n.map-cluster-choice{width:100%;display:flex;flex-direction:column;text-align:left;gap:3px;padding:10px 14px;border:0;border-bottom:1px solid #eef3f0;background:#fff;color:#163a34}\n.map-cluster-choice:hover,.map-cluster-choice:focus-visible{background:#eaf4ef}\n.map-cluster-choice strong{font-size:12px;font-weight:700}\n.map-cluster-choice small{font-size:10px;color:#637e74}\n@media(max-width:720px){.window-card .watch-card-play{font-size:11px;padding:9px 11px}.map-cluster-panel{max-height:230px}}\n\n.atlas-beyond{margin-top:14px;padding:14px;border:1px solid rgba(24,61,55,.12);border-radius:16px;background:rgba(255,255,255,.55)}.atlas-beyond[hidden]{display:none}.atlas-beyond-head{display:flex;justify-content:space-between;gap:12px;align-items:baseline;margin-bottom:10px}.atlas-beyond-head strong{font-family:Georgia,serif;font-size:17px;font-weight:500;color:#244a42}.atlas-beyond-head span{font-size:9px;color:#6f877f;text-align:right}.atlas-beyond-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}.atlas-beyond-card{border:1px solid rgba(24,61,55,.13);background:white;color:#173c34;border-radius:12px;padding:10px 11px;text-align:left;min-width:0}.atlas-beyond-card strong{display:block;font-size:10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.atlas-beyond-card small{display:block;margin-top:3px;color:#6a827a;font-size:8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.atlas-beyond-card:hover{border-color:rgba(24,61,55,.3);transform:translateY(-1px)}@media(max-width:760px){.atlas-beyond-head{align-items:flex-start;flex-direction:column}.atlas-beyond-head span{text-align:left}.atlas-beyond-grid{grid-template-columns:1fr 1fr}}@media(max-width:460px){.atlas-beyond-grid{grid-template-columns:1fr}}.atlas-legend{display:flex;gap:14px;flex-wrap:wrap;align-items:center;margin-top:10px;color:#5f786f;font-size:8px}.atlas-legend span{display:inline-flex;align-items:center;gap:5px}.legend-pin{display:inline-block;width:10px;height:10px;border-radius:50%;border:1.5px solid white;box-shadow:0 1px 4px rgba(7,42,34,.2);background:#1b7564}.legend-pin.external{background:#d79a3e}.legend-pin.local{background:#7c6de0}\n.atlas-controls{display:flex;gap:7px;margin:-4px 0 12px}.atlas-filter{border:1px solid rgba(24,61,55,.14);background:white;color:#31574f;border-radius:999px;padding:7px 10px;font-size:9px;font-weight:700}.atlas-filter.active{background:#0d564b;color:white;border-color:#0d564b}.atlas-continent{position:absolute;background:rgba(41,118,96,.14);filter:blur(.1px);pointer-events:none}.atlas-americas{left:10%;top:18%;width:22%;height:56%;border-radius:48% 35% 55% 45% / 28% 45% 56% 68%;transform:rotate(9deg)}.atlas-europe{left:43%;top:20%;width:13%;height:16%;border-radius:48% 52% 44% 56%}.atlas-africa{left:45%;top:34%;width:15%;height:34%;border-radius:42% 46% 58% 55%;transform:rotate(-5deg)}.atlas-asia{left:55%;top:19%;width:30%;height:32%;border-radius:48% 52% 46% 58%;transform:rotate(5deg)}.atlas-australia{left:73%;top:62%;width:13%;height:14%;border-radius:52% 48% 58% 42%;transform:rotate(-8deg)}.map-pin{z-index:2}\n@media(max-width:600px){.atlas-controls{overflow:auto}.atlas-filter{flex:0 0 auto}}";

function ensureStyles(){
 if(document.getElementById("ern-atlas-groups-style"))return;
 const style=document.createElement("style");style.id="ern-atlas-groups-style";
 style.textContent=ATLAS_STYLES;document.head.append(style);
}
// World map: a numbered pin opens a readable list, never triggers a zoom.
export function renderAtlasMarkerGroups(a,markers){
 ensureStyles();
 a.classList.remove("atlas-zoom-ready","atlas-is-zoomed","atlas-is-dragging");
 a.querySelectorAll(".atlas-zoom-world,.atlas-zoom-controls,.map-pin,.map-cluster-panel").forEach(el=>el.remove());
 const cols=Math.max(12,Math.floor((a.clientWidth||1000)/42));
 const rows=Math.max(8,Math.floor((a.clientHeight||520)/42));
 const cells=new Map();
 for(const marker of markers){
  const x=Math.min(cols-1,Math.max(0,Math.floor((marker.lon+180)/360*cols)));
  const y=Math.min(rows-1,Math.max(0,Math.floor((90-marker.lat)/180*rows)));
  const key=x+":"+y;
  if(!cells.has(key))cells.set(key,[]);
  cells.get(key).push(marker);
 }
 function showMapGroup(entries,pin){
  a.querySelector(".map-cluster-panel")?.remove();
  const panel=document.createElement("div");panel.className="map-cluster-panel";
  panel.setAttribute("role","dialog");panel.setAttribute("aria-label",entries.length+" mapped places");
  const x=entries.reduce((n,m)=>n+(m.lon+180)/360*100,0)/entries.length;
  const y=entries.reduce((n,m)=>n+(90-m.lat)/180*100,0)/entries.length;
  panel.style.left=Math.min(82,Math.max(18,x))+"%";
  panel.style.top=Math.min(51,Math.max(6,y))+"%";
  const heading=document.createElement("div");heading.className="map-cluster-heading";
  const title=document.createElement("strong");title.textContent=entries.length+" places to explore";
  const close=document.createElement("button");close.type="button";
  close.textContent="Close";close.setAttribute("aria-label","Close map group");
  close.onclick=()=>{panel.remove();pin.focus()};
  heading.append(title,close);panel.append(heading);
  const list=document.createElement("div");list.className="map-cluster-list";
  entries=[...entries].sort((a,b)=>(/LIVE HERE|CURRENT IMAGE/.test(b.label)?1:0)-(/LIVE HERE|CURRENT IMAGE/.test(a.label)?1:0)||a.name.localeCompare(b.name));
  for(const entry of entries){
   const option=document.createElement("button");option.type="button";option.className="map-cluster-choice";
   const name=document.createElement("strong");name.textContent=entry.name;
   const label=document.createElement("small");label.textContent=entry.label;
   option.append(name,label);
   option.onclick=()=>{panel.remove();entry.node.click()};
   list.append(option);
  }
  panel.append(list);panel.onkeydown=e=>{if(e.key==="Escape"){e.preventDefault();panel.remove();pin.focus()}};
  a.append(panel);close.focus();
 }
 for(const group of cells.values()){
  if(group.length===1){a.append(group[0].node);continue}
  const pin=document.createElement("button");pin.type="button";
  pin.className="map-pin cluster"+(group.every(x=>x.node.classList.contains("external"))?" external":"");
  const left=group.reduce((n,x)=>n+(x.lon+180)/360*100,0)/group.length;
  const top=group.reduce((n,x)=>n+(90-x.lat)/180*100,0)/group.length;
  pin.style.left=left+"%";pin.style.top=top+"%";pin.textContent=String(group.length);
  pin.title=group.length+" mapped places — choose a place";
  pin.setAttribute("aria-label",pin.title);pin.setAttribute("aria-haspopup","dialog");
  pin.onclick=()=>showMapGroup(group,pin);a.append(pin);
 }
 if(!a.dataset.mapClusterDismiss){a.addEventListener("click",e=>{
  if(!e.target.closest(".map-pin,.map-cluster-panel"))a.querySelector(".map-cluster-panel")?.remove();
 });a.dataset.mapClusterDismiss="true";}
 return cells.size;
}
