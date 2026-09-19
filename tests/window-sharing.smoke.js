import { placeHref,windowHref,parsePlaceHash,parseWindowHash } from "../src/place-routing.js";
import { windowShareUrl } from "../src/place-share.js";
console.assert(placeHref("a b")==="#place=a%20b");
console.assert(windowHref("cam 1","beach")==="#window=cam%201&place=beach");
console.assert(parseWindowHash("#window=cam%201&place=beach")==="cam 1");
console.assert(parsePlaceHash("#window=cam%201&place=beach")==="beach");
console.assert(windowShareUrl("cam","p",{origin:"https://ern.test",pathname:"/app"})==="https://ern.test/app#window=cam&place=p");
console.assert(parseWindowHash("#window=%E0%A4%A")===null,"malformed encoding must fail closed");
console.log("ERN window sharing smoke checks passed");
