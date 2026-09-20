import { interpretEarthIntent } from "./earth-intent.js";
const label=i=>({water:"water and coast",mountains:"mountains and snow",wildlife:"wildlife",human:"city life",beautiful:"beautiful scenery",happening:"places with activity",night:"city lights at night",daylight:"daylight",golden:"sunrise, sunset or golden light",reference:"reference images"}[i]||i);
export function earthGuideReply(result,{tasteSignals=0}={}){
 const q=String(result?.query||"").trim();if(!q)return{tone:"WELCOME",text:"Tell me where you want to go or what you want to see. I’ll show current views when available, and clearly labeled reference views when they’re not."};
 const intent=interpretEarthIntent(q);
 if(result?.empty)return{tone:"EMPTY",text:intent.wantsCurrent?"I couldn't find a verified-current match for that yet. Try the same place without “live” to see other available views or clearly labeled reference images.":"I don't have a good match for that yet. Try a place, landscape, city, coast, mountain or wildlife view."};
 const first=result.items?.[0],where=first?.title||first?.region||first?.country||"somewhere on Earth",theme=intent.intents.map(label).slice(0,2).join(" and ");
 const current=intent.wantsCurrent?"current ":"",evidence=!intent.wantsCurrent&&result.nearNowCount?` ${result.nearNowCount} near-now ${result.nearNowCount===1?"view is":"views are"} supported by current evidence.`:"",unchecked=!intent.wantsCurrent&&result.availableNonCurrentCount?` ${result.availableNonCurrentCount} additional ${result.availableNonCurrentCount===1?"view is":"views are"} available but visual currentness is not confirmed.`:"",fallback=!intent.wantsCurrent&&result.referenceCount?` ${result.referenceCount} reference ${result.referenceCount===1?"image is":"images are"} clearly labeled as not current.`:"",personal=tasteSignals?" I also used your local My Earth taste as a gentle preference, after your request.":"";
 const currentEvidence=intent.wantsCurrent&&result.nearNowCount?` ${result.nearNowCount} near-now ${result.nearNowCount===1?"view is":"views are"} supported by current evidence.`:"";return{tone:"FOUND",text:`I found ${result.count} ${current}destination${result.count===1?"":"s"}${theme?` for ${theme}`:""}. Start with ${where}.${currentEvidence}${evidence}${unchecked}${fallback}${personal}`};
}
export function earthGuideFollowUps(result){
 if(!result?.count)return["Surprise me","Beautiful Earth","Show me a live beach"];
 const intent=interpretEarthIntent(result.query);const out=[];
 if(!intent.wantsCurrent)out.push("Show me what is live right now");
 if(!intent.intents.includes("beautiful"))out.push("Make it peaceful and beautiful");
 if(!intent.intents.includes("night")&&!intent.intents.includes("golden"))out.push("Show me sunrise, sunset or golden hour now");
 out.push("Show me somewhere completely different");return out.slice(0,3);
}
