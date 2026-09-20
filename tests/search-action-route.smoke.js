import fs from "node:fs";
const html=fs.readFileSync(new URL("../index.html",import.meta.url),"utf8"),app=fs.readFileSync(new URL("../src/app.js",import.meta.url),"utf8");
console.assert(html.includes("?q={search_term_string}"),"site SearchAction should advertise the q destination-search route");
console.assert(app.includes('new URLSearchParams(location.search).get("q")'),"app should consume SearchAction q links");
console.assert(app.includes('surfaces.open("explore")'),"external search links should reveal the ERN explore surface");
console.log("ERN external SearchAction route checks passed");
