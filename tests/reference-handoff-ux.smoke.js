import assert from "node:assert/strict";import fs from "node:fs";
const app=fs.readFileSync("src/app-lite.js","utf8"),css=fs.readFileSync("src/styles-lite.css","utf8");
for(const phrase of ["Source recheck due","Open source","Live view unavailable","ERN has no usable live/current source for this place.","Live stream available at the source","Open live source"])assert.ok(app.includes(phrase),phrase+" missing");
assert.ok(app.includes("safeExternalUrl"),"reference handoff must use URL-safety path");
assert.ok(css.includes(".map-pin.reference"),"reference-only Atlas pin styling missing");
assert.ok(css.includes(".reference-handoff"),"main-area reference recovery styling missing");
console.log("ERN reference-only visitor recovery UX passed");

const {runInNewContext}=await import('node:vm');
const start=app.indexOf('function mountViewerNow(s)'),end=app.indexOf('}function mountViewer(s)',start)+1;
assert.ok(start>=0&&end>start);
function handoff(source){
 const element=()=>({children:[],dataset:{},style:{},append(...nodes){this.children.push(...nodes)},replaceChildren(){this.children=[]},removeAttribute(){}});
 const stage=element(),link=element();
 runInNewContext(app.slice(start,end)+';mountViewerNow(source)',{source,$:id=>id==='#viewerStage'?stage:link,document:{createElement:element},stopImageTimer(){},clearViewerLoad(){},generatedBackground:()=>'',cleanUrl:u=>u||null,humanPlaybackReviewMode:()=>false,currentTruthClaim:s=>s.fresh});
 const box=stage.children[0];return {heading:box.children[0].textContent,copy:box.children[1].textContent,cta:box.children[2],sourceLink:link};
}
const image={id:'image',truth:'LIVE_IMAGE',playback:'EXTERNAL',health:'HEALTHY',fresh:true,sourceUrl:'https://camera.example.test/viewer/',officialUrl:'https://operator.example.test/cameras/'};
const imageView=handoff(image);
assert.equal(imageView.heading,'Current image available at the source');
assert.equal(imageView.cta.textContent,'Open current image source');
assert.equal(imageView.cta.href,image.sourceUrl);assert.equal(imageView.sourceLink.href,image.sourceUrl);
assert.ok(!imageView.copy.includes('live'));
const videoView=handoff({...image,truth:'EXTERNAL_LIVE'});
assert.equal(videoView.heading,'Live stream available at the source');
assert.equal(videoView.cta.textContent,'Open live source');assert.equal(videoView.cta.href,image.officialUrl);
const staleView=handoff({...image,fresh:false});
assert.equal(staleView.heading,'Source recheck due');assert.equal(staleView.cta.textContent,'Open source');
console.log('External image/video handoffs and stale-source recovery preserve truthful copy and exact links');
