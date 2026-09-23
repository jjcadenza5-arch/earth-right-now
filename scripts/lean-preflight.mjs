import fs from "node:fs";

const index=fs.readFileSync("index.html","utf8");
const app=fs.readFileSync("src/app-lite.js","utf8");
const css=fs.readFileSync("src/styles-lite.css","utf8");
const sources=JSON.parse(fs.readFileSync("data/sources.json","utf8"));
const manifest=JSON.parse(fs.readFileSync("manifest.webmanifest","utf8"));

if(!index.includes("./src/app-lite.js")) throw new Error("index is not using app-lite.js");
if(!index.includes("./src/styles-lite.css")) throw new Error("index is not using styles-lite.css");
if(!css.trim()) throw new Error("lite stylesheet is empty");
new Function(app);

const htmlIds=new Set([...index.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]));
const jsIds=[...app.matchAll(/\$\("#([^"]+)"\)/g)].map(m=>m[1]);
const missingIds=[...new Set(jsIds.filter(id=>!htmlIds.has(id)))];
if(missingIds.length) throw new Error("app references missing HTML ids: "+missingIds.join(", "));
for(const id of ["heroLive","watchGrid","searchResults","atlas","viewer","viewerStage","languageSelect","savedResults","recommendedResults"]){
  if(!htmlIds.has(id)) throw new Error("required lean UI id missing: "+id);
}
if(!app.includes('"golden"')) throw new Error("Golden Hour mode is missing from the lean runtime");
if(!index.includes('data-mode="golden"')) throw new Error("Golden Hour control is missing from the lean page");
if(manifest.theme_color!=="#062f2b") throw new Error("manifest theme color is out of sync with ERN");
for(const shortcut of manifest.shortcuts||[]){
  if(!/^\/#(?:watch|search|map)$/.test(shortcut.url||"")) throw new Error("manifest shortcut points to an unsupported route: "+shortcut.url);
}

if(!Array.isArray(sources) || sources.length < 20) throw new Error("source catalog is unexpectedly small");
const ids=new Set(),allowedTruth=new Set(["LIVE_VIDEO","LIVE_IMAGE","EXTERNAL_LIVE","PARTNER","PREVIEW"]),allowedPlayback=new Set(["EMBED","IMAGE_REFRESH","EXTERNAL"]);
let inside=0,checked=0;
for(const s of sources){
  if(!s?.id || !s?.title) throw new Error("source missing id/title");
  if(ids.has(s.id)) throw new Error("duplicate source id: "+s.id);
  ids.add(s.id);
  if(s.truth&&!allowedTruth.has(s.truth)) throw new Error("unknown truth label on "+s.id+": "+s.truth);
  if(s.playback&&!allowedPlayback.has(s.playback)) throw new Error("unknown playback mode on "+s.id+": "+s.playback);
  if(s.checkedAt||s.lastSuccessfulCheck) checked++;
  if(s.health!=="OFFLINE" && ((s.playback==="EMBED"&&s.embedUrl)||(s.playback==="IMAGE_REFRESH"&&s.sourceUrl))) inside++;
}
if(inside < 10) throw new Error("not enough playable inside-ERN windows: "+inside);
if(checked < Math.ceil(sources.length*.9)) throw new Error("too many sources lack verification timestamps");

console.log(JSON.stringify({ok:true,sources:sources.length,playableInsideERN:inside,verifiedTimestampCoverage:checked,htmlIds:htmlIds.size,appIdRefs:new Set(jsIds).size}));
