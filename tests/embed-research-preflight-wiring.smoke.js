import fs from "node:fs";import assert from "node:assert/strict";import {operationsOperatorBrief} from "../src/operations-operator-brief.js";
const pkg=JSON.parse(fs.readFileSync("package.json","utf8"));assert.equal(pkg.scripts["inside:research-preflight"],"node scripts/embed-research-preflight.mjs");
const yml=fs.readFileSync(".github/workflows/operations-watch.yml","utf8");assert.match(yml,/inside:research-preflight/);assert.match(yml,/embed-research-preflight\.json/);
const snapshot={generatedAt:"x",catalog:{},watchEarth:{},insideERN:{},providers:{families:1,targetFamilies:2,dominantShare:1},release:{},maintenance:{}};
const research={next:[{id:"youtube-monterey-bay-cam",provider:"Monterey Bay Aquarium",permissionReview:"PER_VIDEO_EMBED_PERMISSION_REQUIRES_DEPLOYED_TEST",playbackReview:"HUMAN_PLAYBACK_REQUIRED"}]};
const researchPreflight={rows:[{id:"youtube-monterey-bay-cam",technicalReady:true,outcome:"TECHNICALLY_READY_FOR_DEPLOYED_TEST"}]};
const md=operationsOperatorBrief({snapshot,delta:{direction:"BASELINE",score:0,improved:[],regressed:[]},research,researchPreflight});assert.match(md,/TECHNICALLY READY/);assert.match(md,/HUMAN_PLAYBACK_REQUIRED/);
console.log("ERN embed research preflight wiring and brief passed");
