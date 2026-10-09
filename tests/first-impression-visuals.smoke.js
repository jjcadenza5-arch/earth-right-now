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
assert.match(css,/photo-1771945484043-3a17fbf57a4b/,"water/island fallback should use the approved editorial beach photo");
assert.match(css,/photo-1784536424390-b6e653809373/,"mountain/snow/volcano fallback should use the approved editorial mountain photo");
assert.match(css,/photo-1767749505538-23e71d1af2c5/,"city/science fallback should use the approved editorial city photo");
assert.match(css,/photo-1759128312246-0a18fae0d46a/,"wildlife/farm fallback should use the approved editorial nature photo");
assert.match(build,/premium-cards\.css/,"static release must include premium card stylesheet");
assert.match(css,/ern-fuji-mockup-hero\.jpg/,"approved Mount Fuji hero image must remain active");
assert.doesNotMatch(css,/commons\.wikimedia\.org\/wiki\/Special:Redirect\/file\/FujiSunriseKawaguchiko2025WP/,
  "hero must not depend on a remote Wikimedia redirect");
assert.match(app,/data\.scene="snow"|dataset\.scene="snow"/,
  "fallback system should retain the snow family");

console.log("ERN premium image-led cards, safe posters and scenic fallbacks passed");
