import fs from "node:fs";
const html=fs.readFileSync("index.html","utf8"),css=fs.readFileSync("src/styles.css","utf8");
console.assert(/<p class="hero-promise"[^>]*>See before you go\.<\/p>/.test(html),"hero should state ERN promise immediately");
console.assert(html.includes('data-action="watch-earth" class="hero-primary-action"'),"Watch Earth should be the primary hero action");
console.assert(css.includes(".hero .hero-primary-action"),"Watch Earth should have a clear primary treatment");
console.log("ERN public-launch hero smoke checks passed");
