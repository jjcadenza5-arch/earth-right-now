import {currentDiscoveryPool} from "./discovery-eligibility.js";
import {solarMoment,beautifulNowScore} from "./solar-moment.js";
import {mediaIdentity} from "./media-identity.js";
import {embedPlaybackProofCurrent} from "./playback-proof.js";

function placeLabel(source){
  return String(source?.place||source?.region||source?.title||"this place").trim();
}
function categories(source){
  return (source?.categories||[]).join(" ").toLowerCase();
}
function questionFor(source,now=new Date()){
  const place=placeLabel(source),phase=solarMoment(source,now).phase,cats=categories(source);
  if(phase==="SUNRISE")return `How is the light changing over ${place} right now?`;
  if(phase==="SUNSET")return `What does the last light look like over ${place}?`;
  if(phase==="MORNING_GOLDEN")return `What does early light reveal at ${place}?`;
  if(phase==="EVENING_GOLDEN")return `How does ${place} change in evening light?`;
  if(phase==="NIGHT"&&/(city|cities|harbour|skyline|urban|street|landmark)/.test(cats))return `What is still visible across ${place} after dark?`;
  if(/beach|coast|ocean|island|harbour|water/.test(cats))return `What does the water look like at ${place} right now?`;
  if(/mountain|alpine|volcano|snow/.test(cats))return `How does ${place} look under its current light?`;
  if(/wildlife|nature|park/.test(cats))return `What can this window show you about ${place} right now?`;
  return `What does ${place} look like right now?`;
}
function truthLabel(source){
  if(source?.playback==="EMBED")return"CURRENT WINDOW · PLAYS IN ERN";
  if(source?.playback==="IMAGE_REFRESH")return"CURRENT IMAGE";
  return"CURRENT SOURCE";
}
function editorialLenses(source){
  const raw=(source?.categories||[]).map(x=>String(x).toLowerCase()),out=[];
  if(raw.some(x=>x.includes("useful earth")))out.push("USEFUL");
  if(raw.some(x=>x.includes("interesting earth")))out.push("INTERESTING");
  if(raw.some(x=>x.includes("beautiful earth")))out.push("BEAUTIFUL");
  return out;
}
export function storyCard(source,{now=new Date()}={}){
  if(!source)return null;
  return{
    id:String(source.id),
    placeId:String(source.placeId||source.id),
    title:String(source.title||placeLabel(source)),
    place:placeLabel(source),
    country:String(source.country||""),
    question:questionFor(source,now),
    truthLabel:truthLabel(source),
    playback:source.playback||null,
    imageUrl:source.thumbnail||source.imageUrl||source.poster||null,
    sourceUrl:source.sourceUrl||source.officialUrl||null,
    momentPhase:solarMoment(source,now).phase,
    editorialLenses:editorialLenses(source),
    score:beautifulNowScore(source,now)
  };
}
export function buildStoryDeck(sources,{now=new Date(),limit=9}={}){
  const pool=currentDiscoveryPool(sources||[],{now})
    .filter(s=>s?.featuredHold!==true&&embedPlaybackProofCurrent(s,{now}))
    .sort((a,b)=>beautifulNowScore(b,now)-beautifulNowScore(a,now)||String(a.id).localeCompare(String(b.id)));
  const usedMedia=new Set(),usedPlaces=new Set(),out=[];
  const canUse=source=>{
    const media=mediaIdentity(source),place=String(source.placeId||source.id);
    return !((media&&usedMedia.has(media))||usedPlaces.has(place));
  };
  const add=source=>{
    if(!source||!canUse(source)||out.length>=limit)return false;
    const card=storyCard(source,{now});if(!card)return false;
    const media=mediaIdentity(source),place=String(source.placeId||source.id);
    out.push(card);if(media)usedMedia.add(media);usedPlaces.add(place);return true;
  };
  if(limit>=3){
    for(const lens of ["USEFUL","INTERESTING","BEAUTIFUL"]){
      const source=pool.find(s=>canUse(s)&&editorialLenses(s).includes(lens));
      if(source)add(source);
    }
  }
  for(const source of pool){
    add(source);
    if(out.length>=limit)break;
  }
  return out;
}
export const STORY_PRINCIPLE="Do not push the answer. Create the question.";
