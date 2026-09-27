import fs from "node:fs";
import assert from "node:assert/strict";

const h=fs.readFileSync("index.html","utf8");
for(const x of [
  'property="og:url" content="https://earthrightnow.app/"',
  'property="og:site_name" content="Earth Right Now"',
  'property="og:image" content="https://earthrightnow.app/assets/ern-social-card.png"',
  'name="twitter:card" content="summary_large_image"'
]) assert.ok(h.includes(x),`missing ${x}`);

assert.match(h,/"@type":"WebSite"/);
assert.match(h,/"@type":"Organization"/);
assert.match(h,/"@id":"https:\/\/earthrightnow\.app\/#organization"/);
assert.match(h,/"logo":\{"@type":"ImageObject"/);
assert.match(h,/href="\.\/places\/"/);

console.log("ERN public social/entity metadata checks passed");
