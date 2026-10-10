import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const app=readFileSync(new URL("../src/app-lite.js",import.meta.url),"utf8");
const css=readFileSync(new URL("../src/styles-lite.css",import.meta.url),"utf8")+
  readFileSync(new URL("../src/premium-cards.css",import.meta.url),"utf8");
const build=readFileSync(new URL("../scripts/build-release-snapshot.mjs",import.meta.url),"utf8");

assert.match(app,/function wanderCard\(s\)[\s\S]*watchPosterUrl\(s\)[\s\S]*installVisualFallback\(el,v,s\)/,
  "wander cards should prefer safe source/poster media and retain image-failure fallback");
assert.match(app,/dataset\.scene=a\.dataset\.scene/,
  "fallback containers should inherit the scenic family");
assert.match(css,/\.wander-card\{position:relative;display:block;min-height:210px/,
  "More places cards should keep premium image-led composition");
assert.match(css,/\.my-earth \.result-card>\.result-visual,.search-section \.result-card>\.result-visual\{width:100%;height:150px/,
  "Search and saved cards should keep editorial image-led composition");
assert.match(css,/content:"ILLUSTRATIVE"/,"illustrative artwork must remain labeled");
assert.match(css,/content:"VIDEO POSTER"/,"derived video posters must remain labeled");
assert.match(css,/scenic-poster\[data-scene="island"\]/,"island fallback art should exist");
assert.match(css,/scenic-poster\[data-scene="city"\][\s\S]*#e8c37b/,
  "city fallback art should include visible light detail");
assert.match(css,/scenic-poster\[data-scene="water"\][\s\S]*#8ed3e4/,
  "water fallback art should be visibly brighter than a flat panel");
assert.doesNotMatch(readFileSync(new URL("../src/premium-cards.css",import.meta.url),"utf8"),/photo-(1771945484043|1784536424390|1767749505538|1759128312246)/,"generic remote photos must not stand in for unrelated destinations");
assert.match(css,/right:auto;bottom:auto/,"badges must clear inherited opposite edges");
assert.match(css,/\.wander-card>\.wander-visual\{position:absolute;inset:0\}/,"fallback layer must retain full-card positioning");
assert.match(build,/editorial-card-photos\.js/,"lazy photo module must ship in release");
const {approvedPhotos,eligibleVisual}=await import("../src/editorial-card-photos.js");
const register=JSON.parse(readFileSync(new URL("../data/destination-photo-rights-candidates.json",import.meta.url),"utf8"));
assert.equal(approvedPhotos(register).size,13);
assert.ok(approvedPhotos(register).has("oeschinensee")&&approvedPhotos(register).has("flam-aurlandsfjord"));
assert.ok(approvedPhotos(register).has("slovenia-bohinj-lake-colnarna")&&approvedPhotos(register).has("austria-zell-am-see-kaprun"));
assert.ok(approvedPhotos(register).has("south-africa-camps-bay")&&approvedPhotos(register).has("san-marino-piazza-liberta"));
assert.ok(approvedPhotos(register).has("taiwan-yehliu")&&approvedPhotos(register).has("lithuania-vilnius-cathedral-square"));
assert.ok(approvedPhotos(register).has("madeira-camara-de-lobos"));
assert.equal(approvedPhotos({...register,homepageActivationAllowed:false}).size,0);
assert.equal(approvedPhotos({...register,candidates:[{...register.candidates[0],imageUrl:"https://example.com/photo.jpg"}]}).size,0);
assert.equal(approvedPhotos(register).has("unrelated-place"),false);
let selector;eligibleVisual({querySelector:s=>{selector=s;return null}});
assert.equal(selector,'.result-visual[data-visual-kind="illustrative"],.wander-visual[data-visual-kind="illustrative"]',"source and video posters cannot be overwritten");
assert.match(build,/premium-cards\.css/,"static release must include premium card stylesheet");
assert.match(css,/ern-fuji-mockup-hero\.jpg/,"approved Mount Fuji hero image must remain active");
assert.doesNotMatch(css,/commons\.wikimedia\.org\/wiki\/Special:Redirect\/file\/FujiSunriseKawaguchiko2025WP/,
  "hero must not depend on a remote Wikimedia redirect");
assert.match(app,/data\.scene="snow"|dataset\.scene="snow"/,
  "fallback system should retain the snow family");

console.log("ERN premium image-led cards, safe posters and scenic fallbacks passed");
