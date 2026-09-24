import fs from "node:fs";import assert from "node:assert/strict";import {operationsOperatorBrief} from "../src/operations-operator-brief.js";
const pkg=JSON.parse(fs.readFileSync("package.json","utf8"));assert.equal(pkg.scripts["business:onboarding-plan"],"node scripts/commercial-onboarding-plan.mjs");
const yml=fs.readFileSync(".github/workflows/operations-watch.yml","utf8");assert.match(yml,/business:onboarding-plan/);assert.match(yml,/commercial-onboarding-plan\.json/);
const md=operationsOperatorBrief({snapshot:{generatedAt:"x",catalog:{},watchEarth:{},insideERN:{},providers:{},release:{},maintenance:{}},delta:{direction:"UNCHANGED",score:0,improved:[],regressed:[]},commercialOnboarding:{items:[{title:"Alpha",country:"A",recommendedAction:"RESEARCH_REAL_TRAVEL_OPTIONS",score:120}]}});
assert.match(md,/Commercial onboarding research/);assert.match(md,/editorial research queue only/);assert.match(md,/Research real travel options/);
console.log("ERN commercial onboarding workflow and brief passed");
