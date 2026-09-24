import fs from "node:fs";
const path="review/inside-ern.html";
if(!fs.existsSync(path)){console.error("operator review page missing");process.exit(1)}
const html=fs.readFileSync(path,"utf8");
const match=html.match(/<script>([\s\S]*?)<\/script>/);
if(!match){console.error("operator review inline script missing");process.exit(1)}
try{new Function(match[1])}catch(error){console.error("operator review inline script syntax invalid");console.error(error);process.exit(1)}
const cards=[...html.matchAll(/class="card"[^>]*data-id="([^"]+)"[\s\S]*?<button class="load"/g)].map(m=>m[1]);
const required=["ponte-di-legno-adamello","metung-gippsland-lakes","explore-brooks-falls"];
const missing=required.filter(id=>!html.includes('data-id="'+id+'"'));
const embeds=[...html.matchAll(/data-embed="(https:[^"]+)"/g)].map(m=>m[1]);
if(missing.length){console.error("operator review required cards missing: "+missing.join(", "));process.exit(1)}
if(embeds.length<3){console.error("operator review has fewer than three loadable embed targets");process.exit(1)}
if(!html.includes('class="load"')){console.error("operator review load controls missing");process.exit(1)}
console.log(JSON.stringify({ok:true,cards:cards.length,loadableEmbeds:embeds.length,requiredPresent:required},null,2));
