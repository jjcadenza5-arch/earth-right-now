import fs from "node:fs";
const s=fs.readFileSync(new URL("../scripts/build-destination-pages.mjs",import.meta.url),"utf8");
console.assert(s.includes("See '+esc(title)+' before you go"),"destination pages should use destination-first truthful heading");
console.assert(s.includes("<h2>Available views</h2>"),"static destination pages must not call every fallback current");
console.assert(!s.includes("<h2>Current windows</h2>"),"future preview-only places must not inherit current-window heading");
console.log("ERN static destination truth-language checks passed");
