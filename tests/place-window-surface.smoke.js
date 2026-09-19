import { readFileSync } from "node:fs";
const app=readFileSync(new URL("../src/app.js",import.meta.url),"utf8");
const start=app.indexOf("function openPlace");
const end=app.indexOf("function closePlace",start);
const block=app.slice(start,end);
console.assert(block.includes("windowTileView(s,i"),"destination drawer must render compact Choose a Window tiles");
console.assert(block.includes('surface:"place-windows"'),"destination window actions must keep a dedicated surface");
console.assert(!block.includes('renderInto($("#placeWindows"),list)'),"destination drawer must not fall back to full source cards");
console.log("ERN destination Choose a Window smoke checks passed");
