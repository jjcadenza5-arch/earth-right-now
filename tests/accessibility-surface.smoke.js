import { readFileSync } from "node:fs";
const html=readFileSync(new URL("../index.html",import.meta.url),"utf8"),css=readFileSync(new URL("../src/styles.css",import.meta.url),"utf8");
for(const id of["ernAiInput","earthSearch","atlasSearch"])console.assert(new RegExp(`id="${id}"[^>]*aria-label=`).test(html),id+" must have an accessible name");
for(const name of["businessName","placeName","sourceUrl","contact"])console.assert(new RegExp(`name="${name}"[^>]*aria-label=`).test(html),name+" must have an accessible name");
console.assert(css.includes(":focus-visible")&&css.includes("prefers-contrast:more"),"focus and high-contrast affordances must be present");
console.log("ERN accessibility surface smoke checks passed");
