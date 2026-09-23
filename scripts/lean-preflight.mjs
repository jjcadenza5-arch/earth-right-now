import fs from "node:fs";

const index=fs.readFileSync("index.html","utf8");
const app=fs.readFileSync("src/app-lite.js","utf8");
const css=fs.readFileSync("src/styles-lite.css","utf8");
const sources=JSON.parse(fs.readFileSync("data/sources.json","utf8"));

if(!index.includes("./src/app-lite.js")) throw new Error("index is not using app-lite.js");
if(!index.includes("./src/styles-lite.css")) throw new Error("index is not using styles-lite.css");
if(!css.trim()) throw new Error("lite stylesheet is empty");
new Function(app);

if(!Array.isArray(sources) || sources.length < 20) throw new Error("source catalog is unexpectedly small");
const ids=new Set();
let inside=0;
for(const s of sources){
  if(!s?.id || !s?.title) throw new Error("source missing id/title");
  if(ids.has(s.id)) throw new Error("duplicate source id: "+s.id);
  ids.add(s.id);
  if(s.health!=="OFFLINE" && ((s.playback==="EMBED"&&s.embedUrl)||(s.playback==="IMAGE_REFRESH"&&s.sourceUrl))) inside++;
}
if(inside < 10) throw new Error("not enough playable inside-ERN windows: "+inside);
console.log(JSON.stringify({ok:true,sources:sources.length,playableInsideERN:inside}));
