import {buildStoryDeck,STORY_PRINCIPLE} from "./ern-stories.js";

const grid=document.getElementById("storiesGrid");
const status=document.getElementById("storiesStatus");
const refresh=document.getElementById("storiesRefresh");

function safeUrl(raw){
  try{const u=new URL(String(raw||""),location.href);return["http:","https:"].includes(u.protocol)?u.toString():null}catch{return null}
}
function actionFor(story){
  if(story.playback==="EMBED"||story.playback==="IMAGE_REFRESH")return "./#view="+encodeURIComponent(story.id);
  const url=safeUrl(story.sourceUrl);return url||("./?q="+encodeURIComponent(story.place));
}
function card(story,index){
  const a=document.createElement("a");a.className="story-card";a.href=actionFor(story);
  if(/^https?:/.test(a.href)&&!a.href.startsWith(location.origin)){a.target="_blank";a.rel="noopener noreferrer"}
  const image=safeUrl(story.imageUrl);
  if(image){
    const img=document.createElement("img");img.src=image;img.alt="";img.loading="lazy";img.referrerPolicy="no-referrer";a.append(img);
  }else{
    const art=document.createElement("div");art.className="story-art";art.textContent=["◒","≈","△","◎"][index%4];a.append(art);
  }
  const shade=document.createElement("div");shade.className="story-shade";
  const copy=document.createElement("div");copy.className="story-copy";
  const truth=document.createElement("small");truth.textContent=story.truthLabel;
  const q=document.createElement("h2");q.textContent=story.question;
  const place=document.createElement("span");place.textContent=[story.place,story.country].filter(Boolean).join(" · ");
  const open=document.createElement("b");open.textContent=story.playback==="EMBED"||story.playback==="IMAGE_REFRESH"?"Open the window →":"Open current source →";
  copy.append(truth,q,place,open);a.append(shade,copy);return a;
}
async function render(){
  refresh.disabled=true;status.textContent="Finding truthful current windows…";
  try{
    const r=await fetch("./data/sources.json",{cache:"no-store"});if(!r.ok)throw new Error("catalog "+r.status);
    const rows=await r.json(),stories=buildStoryDeck(Array.isArray(rows)?rows:[],{now:new Date(),limit:9});
    grid.replaceChildren(...stories.map(card));
    status.textContent=stories.length?`${stories.length} current questions from around Earth. The window is the answer.`:"No strong current story windows are available right now.";
  }catch(error){
    console.error(error);grid.replaceChildren();status.textContent="Stories could not load the current ERN catalog. Try again shortly.";
  }finally{refresh.disabled=false}
}
document.getElementById("storyPrinciple").textContent=STORY_PRINCIPLE;
refresh.addEventListener("click",render);
render();
