import { readFileSync } from "node:fs";
const html=readFileSync(new URL("../index.html",import.meta.url),"utf8"),css=readFileSync(new URL("../src/styles.css",import.meta.url),"utf8");
console.assert(html.includes("Somewhere beautiful, right now"),"home should frame Watch Earth as a beautiful-now experience");
console.assert(html.includes("Your next window onto Earth"),"window chooser should feel like part of the cinematic journey");
console.assert(css.includes("Cinematic home composition"),"approved cinematic home composition must remain explicit");
console.assert(css.includes("#home:not([data-active-surface]) .ai-bar"),"Search Earth should remain visually integrated with the home experience");
console.log("ERN cinematic home composition checks passed");
