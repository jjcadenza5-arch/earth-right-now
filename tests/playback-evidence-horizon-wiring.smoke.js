import fs from "node:fs";import assert from "node:assert/strict";import {operationsOperatorBrief} from "../src/operations-operator-brief.js";
const pkg=JSON.parse(fs.readFileSync("package.json","utf8"));assert.equal(pkg.scripts["inside:playback-horizon"],"node scripts/playback-evidence-horizon.mjs");
const yml=fs.readFileSync(".github/workflows/operations-watch.yml","utf8");assert.match(yml,/inside:playback-horizon/);assert.match(yml,/inside-playback-horizon\.json/);
const md=operationsOperatorBrief({snapshot:{generatedAt:"x",catalog:{},watchEarth:{},insideERN:{},providers:{},release:{},maintenance:{}},delta:{direction:"BASELINE",score:0,improved:[],regressed:[]},playbackHorizon:{summary:{current:1,due6h:1,due12h:0,expired:0,missing:2,held:0},urgent:[{id:"a",title:"A",state:"DUE_6H",remainingHours:5.5}]}});
assert.match(md,/Inside-ERN playback evidence horizon/);assert.match(md,/Renew expiring inside-ERN HUMAN_PLAYBACK evidence/);
console.log("ERN playback horizon workflow and brief wiring passed");
