import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const img=readFileSync(new URL("../assets/ern-fuji-mockup-hero.jpg",import.meta.url));
assert.ok(img.length>50000,"Mount Fuji mockup hero asset is unexpectedly small");
assert.equal(img[0],0xff,"Mount Fuji hero must begin with JPEG marker");
assert.equal(img[1],0xd8,"Mount Fuji hero must begin with JPEG marker");
assert.equal(img.at(-2),0xff,"Mount Fuji hero must end with JPEG marker");
assert.equal(img.at(-1),0xd9,"Mount Fuji hero must end with JPEG marker");
console.log("ERN photographic Mount Fuji hero asset integrity passed");
