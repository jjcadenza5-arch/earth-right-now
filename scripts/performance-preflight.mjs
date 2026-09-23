import fs from "node:fs";
const files=["index.html","src/app-lite.js","src/styles-lite.css","data/sources.json","data/local-directory.json"];
const bytes=Object.fromEntries(files.map(p=>[p,fs.statSync(p).size]));
const fail=[],must=(ok,msg)=>{if(!ok)fail.push(msg)};
const app=fs.readFileSync("src/app-lite.js","utf8"),index=fs.readFileSync("index.html","utf8");
must(bytes["index.html"]<=45000,`index.html too large: ${bytes["index.html"]}`);
must(bytes["src/app-lite.js"]<=100000,`app-lite.js too large: ${bytes["src/app-lite.js"]}`);
must(bytes["src/styles-lite.css"]<=100000,`styles-lite.css too large: ${bytes["src/styles-lite.css"]}`);
must(bytes["data/sources.json"]<=300000,`sources.json too large: ${bytes["data/sources.json"]}`);
const core=Object.values(bytes).reduce((a,b)=>a+b,0);must(core<=550000,`lean core exceeds 550 KB: ${core}`);
must(!/<iframe/i.test(index),"homepage HTML must not contain eager iframe media");
const iframeFactories=(app.match(/createElement\(["']iframe["']\)/g)||[]).length;must(iframeFactories<=1,`runtime creates too many iframe pathways: ${iframeFactories}`);
must(!app.includes("miniLive"),"Watch Earth card live-preview iframe path returned");
must(app.includes('loading="lazy"')||app.includes('f.loading="lazy"')||iframeFactories===0,"runtime iframe should be lazy where appropriate");
if(fail.length){console.error(JSON.stringify({ok:false,fail,bytes,core,iframeFactories},null,2));process.exit(1)}
console.log(JSON.stringify({ok:true,bytes,core,iframeFactories,budgetBytes:550000,eagerHomepageIframes:0},null,2));
