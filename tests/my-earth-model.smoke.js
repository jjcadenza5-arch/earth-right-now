import "./test-browser-env.mjs";
import { buildMyEarth } from "../src/my-earth-model.js";
localStorage.clear();
localStorage.setItem("ern:favorite-places:v1",'["p1"]');
localStorage.setItem("ern:favorites:v1",'["s2"]');
localStorage.setItem("ern:recent-places:v1",'["p2","p1"]');
localStorage.setItem("ern:recent:v1",'["s2","s1"]');
const sources=[
 {id:"s1",health:"OFFLINE",permission:"LINK_ONLY",playback:"EXTERNAL",sourceUrl:"https://example.test/1"},
 {id:"s2",health:"HEALTHY",permission:"LINK_ONLY",playback:"EXTERNAL",sourceUrl:"https://example.test/2"}
],places=[{id:"p1"},{id:"p2"}],m=buildMyEarth({sources,places});
console.assert(m.favoritePlaces[0].id==="p1"&&m.favoriteWindows[0].id==="s2"&&m.recentPlaces.length===2);
console.assert(m.recentWindows.map(x=>x.id).join(",")==="s2,s1","recent windows preserve viewing order");
console.assert(m.availableRecentWindows.map(x=>x.id).join(",")==="s2","My Earth must not offer an offline recent window as actionable");
console.log("ERN My Earth model smoke checks passed");
