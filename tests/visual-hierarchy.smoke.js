import { readFileSync } from "node:fs";
const css=readFileSync(new URL("../src/styles.css",import.meta.url),"utf8");
console.assert(css.includes(".window-visual,.live-window-visual{display:block"),"window visuals need explicit geometry");
console.assert(css.includes(".featured-moment.has-poster{background-size:cover"),"featured moment supplied imagery must cover the visual surface");
console.assert(css.includes(".featured-moment.has-poster>*{position:relative;z-index:1}"),"moment copy must remain legible over imagery");
console.assert(css.includes("@media(max-width:760px){.window-visual,.live-window-visual{height:112px}"),"mobile windows need useful preview height");
console.log("ERN visual hierarchy smoke checks passed");
