import fs from "node:fs";
const read=p=>fs.readFileSync(p,"utf8");
const index=read("index.html"),app=read("src/app-lite.js"),css=read("src/styles-lite.css"),places=read("for-places.html"),moments=read("now-moments.html"),strategy=read("docs/CRISPY_PORK_SKIN_STRATEGY.md"),guide=read("docs/ERN_GUIDE_VISION.md"),sources=JSON.parse(read("data/sources.json")),localDirectory=JSON.parse(read("data/local-directory.json"));
const fail=[],must=(ok,msg)=>{if(!ok)fail.push(msg)};

for(const id of ["watch","search","map","localEarth","participate","saved","guideLauncher","guidePanel"])must(index.includes(`id="${id}"`),`whole-product surface missing: ${id}`);
for(const href of ["./for-places.html","./now-moments.html","./about.html","./privacy.html"])must(index.includes(`href="${href}"`),`public path missing: ${href}`);
for(const fn of ["function search(","function renderMap(","function renderLocalEarth(","function guideResponse(","function runGuide("])must(app.includes(fn),`runtime capability missing: ${fn}`);
must(app.includes("guidePlaceMatches(")&&app.includes('params.get("guide")'),"ERN Guide place/deep-link routing missing");
must(read("src/release-verification-console.js").includes('./#view='),"release verification provider links do not match viewer routing");
must(app.includes("localIntent="),"Search lost small/local-place intent handling");
must(app.includes("localDirectoryMatch(")&&app.includes("localDirectoryCard("),"reviewed local-place search plumbing missing");
must(Array.isArray(localDirectory),"local-directory registry must be an array");
must(css.includes("BlankMap-Equirectangular"),"Living Atlas lost its real-map base");
must(index.includes('data-map-filter="local"')&&app.includes('map-pin local'),"Living Atlas lost reviewed local-place discovery");
must(css.includes(".guide-panel"),"ERN Guide visual doorway missing");
must(css.includes("Mockup fidelity lock"),"approved ERN mockup fidelity layer missing");
must(css.includes("Landscape mobile viewer: keep the Earth window visible"),"landscape mobile viewer protection missing");
must(css.includes("Landscape action dock: always reachable"),"landscape action controls are not protected");
must(css.includes("Landscape fullscreen escape hatch"),"landscape Full screen control is not independently protected");
must(app.includes('$("#heroWatch").onclick=()=>{const target='),"Watch Earth Now no longer opens the active Earth window");
must(css.includes(".local-earth-section"),"Local Earth styling missing");
must(css.includes(".participate-section"),"places/cameras/moments participation surface missing");
must(/(payment or partner status never buys editorial ranking|no ranking for sale)/i.test(places),"commercial no-paid-ranking guardrail missing");
must(/submission delivery is not open yet/i.test(places),"camera-submission honesty boundary missing");
must(/Prepare a camera review draft/i.test(places)&&/LOCAL_DRAFT_ONLY/.test(places),"camera local-draft readiness tool missing");
must(/uploads are intentionally not active yet/i.test(moments),"Now Moments safety boundary missing");
must(/Preview an Earth Signal/i.test(moments)&&/Nothing is uploaded or transmitted/i.test(moments),"Now Moments local preview boundary missing");
must(/friendly tour guide/i.test(strategy)&&/small places and small businesses/i.test(strategy),"Crispy Pork Skin strategy has been weakened");
must(/tour guide, not a generic chatbot/i.test(guide),"ERN Guide vision has been weakened");

const truth=new Set(sources.map(s=>s.truth));
for(const type of ["LIVE_VIDEO","LIVE_IMAGE","EXTERNAL_LIVE"])must(truth.has(type),`truthful window variety missing from catalog: ${type}`);
must(sources.some(s=>Array.isArray(s.categories)&&s.categories.some(c=>/Farms|Wildlife|Beaches|Cities|Mountains/i.test(c))),"catalog lost broad discovery categories");

if(fail.length){console.error(JSON.stringify({ok:false,fail},null,2));process.exit(1)}
console.log(JSON.stringify({ok:true,surfaces:["Watch Earth","Search","Living Atlas","Local Earth","ERN Guide","Places & Cameras","Now Moments","My Earth"],truthTypes:[...truth]},null,2));
