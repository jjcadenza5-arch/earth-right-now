import fs from "node:fs";import assert from "node:assert/strict";import {operationsOperatorBrief} from "../src/operations-operator-brief.js";
const partners=JSON.parse(fs.readFileSync("data/affiliate-partners.json","utf8"));const offers=JSON.parse(fs.readFileSync("data/travel-offers.json","utf8"));
assert.deepEqual(partners,[]);assert.deepEqual(offers,[]);
const md=operationsOperatorBrief({snapshot:{generatedAt:"x",catalog:{},watchEarth:{},insideERN:{},providers:{},release:{},maintenance:{}},delta:{direction:"UNCHANGED",score:0,improved:[],regressed:[]},commercialInventory:{stage:"EMPTY_STAGING",publicActivationAllowed:false,partnerRegistry:{active:0,total:0},travelOfferRegistry:{current:0,total:0,placeCoverage:0}}});
assert.match(md,/Commercial staging/);assert.match(md,/public activation off/);assert.match(md,/payment never buys prominence/);assert.match(md,/Keep the public experience non-commercial/);
new Function(fs.readFileSync("src/operations-operator-brief.js","utf8").replace(/^export /gm,""));
console.log("ERN commercial staging brief and empty registries passed");
