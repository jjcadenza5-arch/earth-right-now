import fs from "node:fs";
const c=fs.readFileSync("src/styles-lite.css","utf8"),h=fs.readFileSync("index.html","utf8"),fail=[];
const a=(ok,msg)=>{if(!ok)fail.push(msg)};
a(c.includes("@media(max-width:600px)"),"mobile breakpoint missing");
a(c.includes(".mobile-dock"),"mobile navigation dock missing");
a(c.includes(".window-grid{grid-template-columns:1fr 1fr"),"mobile Watch Earth two-column layout missing");
a(c.includes(".viewer-bottom{padding:10px}"),"mobile viewer controls missing");
a(fs.readFileSync("src/app-lite.js","utf8").includes('classList.add("faux-fullscreen")'),"mobile fullscreen runtime fallback missing");
a(c.includes(".atlas{min-height:330px}"),"mobile Atlas sizing missing");
a(c.includes(".wander-grid{grid-template-columns:1fr}"),"mobile destination stack missing");
a(c.includes(".viewer-context{grid-template-columns:1fr}"),"mobile viewer context stack missing");
a(h.includes('name="viewport" content="width=device-width,initial-scale=1"'),"responsive viewport metadata missing");
a(h.includes('class="mobile-dock"'),"mobile dock markup missing");
if(fail.length){console.error(JSON.stringify({ok:false,fail},null,2));process.exit(1)}
console.log(JSON.stringify({ok:true,breakpoint:600,mobileDock:true,watchGrid:true,atlas:true,viewer:true},null,2));
