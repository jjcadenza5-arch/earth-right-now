import fs from "node:fs";const h=fs.readFileSync("index.html","utf8");
for(const x of ['property="og:url" content="https://earthrightnow.app/"','property="og:locale" content="en_US"','name="twitter:url" content="https://earthrightnow.app/"'])console.assert(h.includes(x),`missing ${x}`);
console.assert(!/property="og:image"/.test(h),"do not invent a current Earth social image until a stable public asset is chosen");
console.log("ERN public social metadata checks passed");
