import assert from "node:assert/strict";import{placeHref,windowHref,parsePlaceHash,parseWindowHash}from"../src/place-routing.js";
assert.equal(placeHref("chiang-mai"),"#place=chiang-mai");
assert.equal(windowHref("cam_01","chiang-mai"),"#window=cam_01&place=chiang-mai");
for(const bad of ["<script>","a/b","a?b","a#b","a b","%2F"])assert.equal(placeHref(bad),null);
assert.equal(parsePlaceHash("#place=%3Cscript%3E"),null);
assert.equal(parseWindowHash("#window=a%2Fb"),null);
assert.equal(parsePlaceHash("#window=cam_01&place=chiang-mai"),"chiang-mai");
console.log("share route identifier safety passed");
