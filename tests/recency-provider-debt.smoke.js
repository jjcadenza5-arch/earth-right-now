import assert from "node:assert/strict";
import {recencyProviderDebt} from "../src/recency-provider-debt.js";
const r=recencyProviderDebt([
  {id:"a",provider:"P",playback:"EMBED",health:"HEALTHY"},
  {id:"b",provider:"P",playback:"EMBED",health:"HEALTHY"},
  {id:"c",provider:"P",playback:"EMBED",health:"DEGRADED"},
  {id:"d",provider:"Q",playback:"EXTERNAL",health:"HEALTHY"}
]);
assert.equal(r.total,4);
assert.equal(r.providerCount,2);
assert.equal(r.primary.provider,"P");
assert.equal(r.primary.total,3);
assert.equal(r.primary.share,0.75);
assert.equal(r.concentrated,true);
console.log("ERN recency provider debt detects maintenance concentration");
