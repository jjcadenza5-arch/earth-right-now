import fs from "node:fs";
const path="review/inside-ern.html";
if(!fs.existsSync(path)){console.error("operator review page missing");process.exit(1)}
const html=fs.readFileSync(path,"utf8");
const match=html.match(/<script>([\s\S]*?)<\/script>/);
if(!match){console.error("operator review inline script missing");process.exit(1)}
try{new Function(match[1])}catch(error){console.error("operator review inline script syntax invalid");console.error(error);process.exit(1)}
const cards=[...html.matchAll(/<article class="card"[^>]*data-id="([^"]+)"[^>]*data-embed="([^"]*)"/g)].map(m=>({id:m[1],embed:m[2]}));
const loadButtons=(html.match(/class="load"/g)||[]).length;
const loadable=cards.filter(x=>/^https:\/\//.test(x.embed));
if(loadButtons!==loadable.length){console.error("operator review load controls and loadable embed targets disagree");process.exit(1)}
if(!html.includes("Local review evidence")){console.error("operator review evidence controls missing");process.exit(1)}
console.log(JSON.stringify({ok:true,cards:cards.length,loadableEmbeds:loadable.length,ids:cards.map(x=>x.id)},null,2));
