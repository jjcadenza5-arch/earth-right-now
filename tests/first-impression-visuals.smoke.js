import {runInNewContext} from "node:vm";
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
assert.doesNotMatch(css,/content:"(?:ARTWORK|PHOTO|VIDEO POSTER|Illustrative)"/i,"card images should remain free of media-type badges");

assert.match(css,/scenic-poster\[data-scene="island"\]/,"island fallback art should exist");
assert.match(css,/scenic-poster\[data-scene="city"\][\s\S]*#e8c37b/,
  "city fallback art should include visible light detail");
assert.match(css,/scenic-poster\[data-scene="water"\][\s\S]*#8ed3e4/,
  "water fallback art should be visibly brighter than a flat panel");
assert.doesNotMatch(readFileSync(new URL("../src/premium-cards.css",import.meta.url),"utf8"),/photo-(1771945484043|1784536424390|1767749505538|1759128312246)/,"generic remote photos must not stand in for unrelated destinations");
assert.match(css,/right:auto;bottom:auto/,"badges must clear inherited opposite edges");
assert.match(css,/\.wander-card>\.wander-visual\{position:absolute;inset:0\}/,"fallback layer must retain full-card positioning");
assert.match(build,/editorial-card-photos\.js/,"lazy photo module must ship in release");
const {approvedPhotos,eligibleVisual,approvedPhotoLicense}=await import("../src/editorial-card-photos.js");
const register=JSON.parse(readFileSync(new URL("../data/destination-photo-rights-candidates.json",import.meta.url),"utf8"));
assert.equal(approvedPhotos(register).size,24);
assert.ok(approvedPhotos(register).has("oeschinensee")&&approvedPhotos(register).has("flam-aurlandsfjord"));
assert.ok(approvedPhotos(register).has("slovenia-bohinj-lake-colnarna")&&approvedPhotos(register).has("austria-zell-am-see-kaprun"));
assert.ok(approvedPhotos(register).has("south-africa-camps-bay")&&approvedPhotos(register).has("san-marino-piazza-liberta"));
assert.ok(approvedPhotos(register).has("taiwan-yehliu")&&approvedPhotos(register).has("lithuania-vilnius-cathedral-square"));
assert.ok(approvedPhotos(register).has("madeira-camara-de-lobos"));
assert.ok(approvedPhotos(register).has("us-grand-teton-national-park"));
assert.equal(approvedPhotos({...register,homepageActivationAllowed:false}).size,0);
assert.equal(approvedPhotos({...register,candidates:[{...register.candidates[0],imageUrl:"https://example.com/photo.jpg"}]}).size,0);
assert.equal(approvedPhotos(register).has("unrelated-place"),false);
let selector;eligibleVisual({querySelector:s=>{selector=s;return null}});
assert.equal(selector,'.result-visual[data-visual-kind]:not([data-visual-kind="editorial"]),.wander-visual[data-visual-kind]:not([data-visual-kind="editorial"]),.card-visual[data-visual-kind]:not([data-visual-kind="editorial"])',"approved photos can cover static discovery posters without selecting viewer media");
assert.match(build,/premium-cards\.css/,"static release must include premium card stylesheet");
assert.match(css,/ern-fuji-mockup-hero\.jpg/,"approved Mount Fuji hero image must remain active");
assert.doesNotMatch(css,/commons\.wikimedia\.org\/wiki\/Special:Redirect\/file\/FujiSunriseKawaguchiko2025WP/,
  "hero must not depend on a remote Wikimedia redirect");
assert.match(app,/data\.scene="snow"|dataset\.scene="snow"/,
  "fallback system should retain the snow family");

console.log("ERN premium image-led cards, safe posters and scenic fallbacks passed");

for(const license of ["CC BY-SA 4.0","CC BY-SA 2.0","CC BY 2.0","CC BY-SA 2.5","CC BY 4.0"]){
 const photo=register.candidates.find(p=>p.license===license);assert.ok(photo&&approvedPhotoLicense(photo));
 assert.equal(approvedPhotoLicense({...photo,licenseUrl:"https://creativecommons.org/licenses/by-nc/4.0/"}),false);
 assert.equal(approvedPhotos({...register,candidates:[{...photo,status:"PENDING"}]}).size,0);
}
assert.equal(approvedPhotoLicense({license:"CC BY-NC 4.0",licenseUrl:"https://creativecommons.org/licenses/by-nc/4.0/"}),false);
assert.equal(approvedPhotoLicense({license:"toString",licenseUrl:"anything"}),false);

assert.match(build,/editorial-card-photos\\.js|editorial-card-photos\.js/,"release must retain deferred cover module");
const versioning=build.match(/html=html[\s\S]*?;\n/)[0];
const releaseHtml=runInNewContext(`${versioning}html`,{html:readFileSync(new URL("../index.html",import.meta.url),"utf8"),ERN_BUILD_CACHE_BUST:"regression123"});
assert.match(releaseHtml,/import\("\.\/src\/editorial-card-photos\.js\?v=[^"\s]+"\)/,"each release must invalidate cached photographic module imports");

assert.equal(approvedPhotoLicense({license:"CC BY 4.0",licenseUrl:"https://creativecommons.org/licenses/by-sa/4.0/"}),false);
assert.equal(approvedPhotoLicense({license:"CC BY-SA 2.5",licenseUrl:"https://creativecommons.org/licenses/by-sa/2.0/"}),false);

// Exercise the actual URL construction so a cached previous register cannot hide new metadata.
const photoModule=readFileSync(new URL("../src/editorial-card-photos.js",import.meta.url),"utf8");
const registerUrlCode=photoModule.match(/const registerUrl=new URL[\s\S]*?registerUrl\.search=new URL\(import\.meta\.url\)\.search;/)[0];
const registerRequest=runInNewContext(registerUrlCode.replaceAll("import.meta.url","moduleUrl")+"registerUrl.href",{URL,moduleUrl:"https://earthrightnow.app/src/editorial-card-photos.js?v=release123"});
assert.equal(registerRequest,"https://earthrightnow.app/data/destination-photo-rights-candidates.json?v=release123");
