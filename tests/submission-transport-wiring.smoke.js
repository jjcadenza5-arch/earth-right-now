import fs from "node:fs";import assert from "node:assert/strict";import {operationsOperatorBrief} from "../src/operations-operator-brief.js";
const pkg=JSON.parse(fs.readFileSync("package.json","utf8"));assert.equal(pkg.scripts["business:submission-transport"],"node scripts/submission-transport-readiness.mjs");
const cfg=JSON.parse(fs.readFileSync("data/submission-transport.json","utf8"));assert.equal(cfg.enabled,false);assert.equal(cfg.endpoint,"");assert.equal(cfg.retentionDays,null);
const yml=fs.readFileSync(".github/workflows/operations-watch.yml","utf8");assert.match(yml,/business:submission-transport/);assert.match(yml,/submission-transport-readiness\.json/);
const md=operationsOperatorBrief({snapshot:{generatedAt:"x",catalog:{},watchEarth:{},insideERN:{},providers:{},release:{},maintenance:{}},delta:{direction:"UNCHANGED",score:0,improved:[],regressed:[]},submissionTransport:{status:"DISABLED",active:false,missing:["HTTPS_REVIEW_ENDPOINT","RETENTION_POLICY"]}});
assert.match(md,/Submission transport/);assert.match(md,/delivery off/);assert.match(md,/HTTPS_REVIEW_ENDPOINT/);assert.match(md,/Keep camera\/place submission delivery closed/);
console.log("ERN submission transport workflow and brief passed");
