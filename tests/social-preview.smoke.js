import assert from "node:assert/strict";
import fs from "node:fs";
const html=fs.readFileSync(new URL("../index.html",import.meta.url),"utf8");
const imageUrl="https://earthrightnow.app/assets/ern-social-card.png?v=20261005-social2";
for(const [key,value] of [
["property=\"og:title\"","Earth Right Now — The Live Discovery Engine"],
["property=\"og:description\"","Search real places, see truthful live and current windows, discover, decide and go. See before you go."],
["property=\"og:url\"","https://earthrightnow.app/"],
["property=\"og:image\"",imageUrl],
["property=\"og:image:width\"","1200"],
["property=\"og:image:height\"","630"],
["property=\"og:image:alt\"","Earth Right Now — The Live Discovery Engine. See before you go."],
["name=\"twitter:card\"","summary_large_image"],
["name=\"twitter:image\"",imageUrl]
]) assert.ok(html.includes(key)&&html.includes(`content="${value}"`),`missing social metadata ${key}`);
const png=fs.readFileSync(new URL("../assets/ern-social-card.png",import.meta.url));
assert.deepEqual([...png.subarray(0,8)],[137,80,78,71,13,10,26,10],"social preview must be PNG");
assert.equal(png.readUInt32BE(16),1200,"social preview width");
assert.equal(png.readUInt32BE(20),630,"social preview height");
assert.ok(png.byteLength>1000,"social preview must contain real image data");
console.log("ERN social preview metadata and 1200x630 PNG asset passed");
