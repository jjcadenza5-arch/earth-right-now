import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const html=readFileSync(new URL("../index.html",import.meta.url),"utf8");
const app=readFileSync(new URL("../src/app-lite.js",import.meta.url),"utf8");
const required=[
["heroWatch","watch"],["watchNav","watch"],["searchNav","search"],["mapNav","map"],
["destinationsNav","destinations"],["savedNav","saved"],["topSearch","search"],["topAtlas","map"],
["mobileWatch","watch"],["mobileExplore","search"],["mobileMap","map"],["mobileSaved","saved"],
["heroNext","editorialCollections"],["proofExplore","search"]
];
for(const [id,target] of required){
  assert.match(html,new RegExp(`id=["']${id}["'][^>]*href=["']#${target}["']|href=["']#${target}["'][^>]*id=["']${id}["']`),`${id} must have native #${target} fallback`);
  assert.match(html,new RegExp(`id=["']${target}["']`),`target #${target} must exist`);
}
assert.match(app,/document\.querySelectorAll\("\[data-query\]"\)/,"search suggestion chips must be wired");
assert.match(app,/function scrollToId\(id\)/,"enhanced section scrolling must remain available");
assert.match(app,/\$\("#heroWatch"\)\.onclick=e=>\{[\s\S]*openViewer\(target\)/,"hero Watch Earth Now must open a current window");
console.log("ERN visible navigation controls retain native fallbacks and dynamic search-chip wiring");
