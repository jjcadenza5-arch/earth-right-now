import {readFile} from "node:fs/promises";
import {execFileSync} from "node:child_process";
import {assessPhase4EarthSignalsObservation} from "../src/phase4-earth-signals-observation.js";
import {assessPhase5Readiness} from "../src/phase5-readiness.js";

function run(path){return JSON.parse(execFileSync(process.execPath,[path],{encoding:"utf8"}))}
const readJson=async path=>JSON.parse(await readFile(new URL("../"+path,import.meta.url),"utf8"));

const [pilot,deployment]=await Promise.all([
  readJson("data/phase4-earth-signals-pilot.json"),
  readJson("data/earth-signal-deployment.json")
]);
let liveHealth={};
const healthPath=process.argv[2]||null;
if(healthPath)liveHealth=JSON.parse(await readFile(healthPath,"utf8"));

const observation=assessPhase4EarthSignalsObservation({pilot,deployment,liveHealth,now:new Date()});
const core=run("scripts/whole-product-status.mjs");
const participation=run("scripts/participation-infrastructure-status.mjs");
const media=run("scripts/now-moment-media-status.mjs");
const guide=run("scripts/guide-ai-status.mjs");
const gates=run("scripts/external-gate-register.mjs");
// Phase 5 entry approval is explicit, persisted, and independent of all feature gates.
const approval=await readJson("data/phase5-entry-approval.json");

const report=assessPhase5Readiness({
  core,
  phase4Observation:observation,
  participation,
  media,
  guide,
  gates,
  explicitHumanReviewApproved:approval?.approved===true
});
console.log(JSON.stringify({
  schemaVersion:1,
  generatedAt:new Date().toISOString(),
  phase5Label:"Broader Public Operations & Monetization",
  currentHealthEvidenceSupplied:Boolean(healthPath),
  phase4Observation:observation,
  ...report
},null,2));
