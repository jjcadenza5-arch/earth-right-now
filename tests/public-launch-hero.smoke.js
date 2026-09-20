import fs from "node:fs";
const html=fs.readFileSync("index.html","utf8"),css=fs.readFileSync("src/styles.css","utf8");
console.assert(html.includes('<p class="hero-welcome">See before you go.</p>'),"hero should state ERN promise immediately");
console.assert(html.indexOf('data-action="watch-earth"')<html.indexOf('data-action="watch-live"'),"Watch Earth should be the first hero action");
console.assert(css.includes(".hero .hero-primary-action"),"Watch Earth should have a clear primary treatment");
console.log("ERN public-launch hero smoke checks passed");
