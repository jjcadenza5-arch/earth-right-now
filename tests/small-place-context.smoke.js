import assert from "node:assert/strict";import {smallPlaceContext} from "../src/small-place-context.js";
assert.equal(smallPlaceContext({sources:[{title:"Small village market"}]}),"A lesser-known place worth a look");
assert.equal(smallPlaceContext({sources:[{title:"World famous landmark"}]}),"");
assert.equal(smallPlaceContext({sources:[{title:"Major City Square"}]}),"");
console.log("ERN small-place visitor context checks passed");
