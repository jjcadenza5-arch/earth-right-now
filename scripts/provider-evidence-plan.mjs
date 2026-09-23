import { readFile } from "node:fs/promises";
const sources=JSON.parse(await readFile(new URL("../data/sources.json",import.meta.url),"utf8"));
const embeds=sources.filter(x=>x.playback==="EMBED"&&x.permission==="EMBED_ALLOWED");
const groups=new Map();
for(const source of embeds){const key=source.provider||"Unknown";if(!groups.has(key))groups.set(key,[]);groups.get(key).push(source)}
const providers=[...groups.entries()].map(([provider,rows])=>{const degraded=rows.filter(x=>x.health==="DEGRADED"),healthy=rows.filter(x=>x.health==="HEALTHY").sort((a,b)=>(b.quality||0)-(a.quality||0));const representatives=[...degraded,...healthy.slice(0,Math.max(1,2-degraded.length))].filter((x,i,a)=>a.findIndex(y=>y.id===x.id)===i);return{provider,total:rows.length,healthy:healthy.length,degraded:degraded.length,representatives:representatives.map(x=>({id:x.id,title:x.title,health:x.health,sourceUrl:x.sourceUrl,embedUrl:x.embedUrl,requiredEvidence:["MEDIA_ENDPOINT","HUMAN_PLAYBACK"],recordCommand:`npm run provider:record -- ${x.id} <http-status> <MEDIA_ENDPOINT|HUMAN_PLAYBACK> "" "<evidence note>"`}))}});
console.log(JSON.stringify({insideERN:embeds.length,providerFamilies:providers.length,providers,note:"Representative healthy sources reduce duplicate provider-family checks; every degraded source remains mandatory. A passing record still requires real media confirmation."},null,2));
