import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
const app=await readFile(new URL("../src/app-lite.js",import.meta.url),"utf8");
for(const needle of [
  "function renderMapStable(){renderMap();requestAnimationFrame(renderMap)}",
  'renderMapStable();renderSaved()',
  'window.addEventListener("pageshow",()=>state.sources.length&&renderMapStable())',
  '$("#mapNav").onclick=()=>{renderMapStable();scrollToId("map")}',
  '$("#mobileMap").onclick=()=>{renderMapStable();scrollToId("map")}',
  '$("#topAtlas").onclick=()=>{renderMapStable();scrollToId("map")}',
  'else if(location.hash==="#map")requestAnimationFrame(()=>{renderMap();scrollToId("map")})'
]) assert.ok(app.includes(needle),"Atlas initial-load resilience missing: "+needle);
console.log("ERN Atlas initial-load hydration checks passed");
