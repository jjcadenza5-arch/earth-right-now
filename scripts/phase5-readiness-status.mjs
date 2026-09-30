import {execFileSync} from "node:child_process";
import {assessPhase5Readiness} from "../src/phase5-readiness.js";

function run(path,args=[]){return JSON.parse(execFileSync(process.execPath,[path,...args],{encoding:"utf8"}))}
const core=run("scripts/whole-product-status.mjs");
const participation=run("scripts/participation-infrastructure-status.mjs");
const media=run("scripts/now-moment-media-status.mjs");
const guide=run("scripts/guide-ai-status.mjs");
const gates=run("scripts/external-gate-register.mjs");
const observation=run("scripts/phase4-earth-signals-observation-status.mjs");

const report=assessPhase5Readiness({
  core,
  phase4Observation:observation,
  participation,
  media,
  guide,
  gates,
  explicitHumanReviewApproved:false
});
console.log(JSON.stringify({
  schemaVersion:1,
  generatedAt:new Date().toISOString(),
  phase5Label:"Broader Public Operations & Monetization",
  ...report
},null,2));
