import fs from "node:fs";
const read=p=>fs.readFileSync(p,"utf8");
const index=read("index.html"),app=read("src/app-lite.js"),css=read("src/styles-lite.css"),places=read("for-places.html"),moments=read("now-moments.html"),strategy=read("docs/CRISPY_PORK_SKIN_STRATEGY.md"),guide=read("docs/ERN_GUIDE_VISION.md"),sources=JSON.parse(read("data/sources.json"));
const fail=[],must=(ok,msg)=>{if(!ok)fail.push(msg)};

for(const id of ["watch","search","map","localEarth","participate","saved","guideLauncher","guidePanel"])must(index.includes(`id="${id}"`),`whole-product surface missing: ${id}`);
for(const href of ["./for-places.html","./now-moments.html","./about.html","./privacy.html"])must(index.includes(`href="${href}"`),`public path missing: ${href}`);
for(const fn of ["function search(","function renderMap(","function renderLocalEarth(","function guideResponse(","function runGuide("])must(app.includes(fn),`runtime capability missing: ${fn}`);
must(css.includes("BlankMap-Equirectangular"),"Living Atlas lost its real-map base");
must(css.includes(".guide-panel"),"ERN Guide visual doorway missing");
must(css.includes(".local-earth-section"),"Local Earth styling missing");
must(css.includes(".participate-section"),"places/cameras/moments participation surface missing");
must(/payment never buys editorial ranking/i.test(places),"commercial no-paid-ranking guardrail missing");
must(/submission delivery is not open yet/i.test(places),"camera-submission honesty boundary missing");
must(/uploads are intentionally not active yet/i.test(moments),"Now Moments safety boundary missing");
must(/not a generic chatbot/i.test(strategy)&&/small-place and small-business discoverability/i.test(strategy),"Crispy Pork Skin strategy has been weakened");
must(/tour guide, not a generic chatbot/i.test(guide),"ERN Guide vision has been weakened");

const truth=new Set(sources.map(s=>s.truth));
for(const type of ["LIVE_VIDEO","LIVE_IMAGE","EXTERNAL_LIVE"])must(truth.has(type),`truthful window variety missing from catalog: ${type}`);
must(sources.some(s=>Array.isArray(s.categories)&&s.categories.some(c=>/Farms|Wildlife|Beaches|Cities|Mountains/i.test(c))),"catalog lost broad discovery categories");

if(fail.length){console.error(JSON.stringify({ok:false,fail},null,2));process.exit(1)}
console.log(JSON.stringify({ok:true,surfaces:["Watch Earth","Search","Living Atlas","Local Earth","ERN Guide","Places & Cameras","Now Moments","My Earth"],truthTypes:[...truth]},null,2));
