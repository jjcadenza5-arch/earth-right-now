import assert from "node:assert/strict";import {rankForIntent} from "../src/ern-ai.js";
const now=new Date("2026-09-21T12:00:00Z"),base={health:"UNKNOWN",truth:"EXTERNAL LIVE",playback:"EXTERNAL",checkedAt:"2026-09-21T11:00:00Z",lat:18.7,lon:98.9};
const sources=[
 {...base,id:"city",title:"Busy city square",categories:["City","Busy"]},
 {...base,id:"market",title:"Local walking market",categories:["Market","Active"]},
 {...base,id:"quiet",title:"Quiet promenade",categories:["Promenade"]}
];
const ranked=rankForIntent(sources,"local market street life",{now});
assert.equal(ranked[0].id,"market","source matching both human activity and happening should lead a multi-intent local-life request");
assert.ok(ranked.some(x=>x.id==="quiet"),"partial intent matches remain discoverable rather than being discarded");
console.log("ERN Guide multi-intent ranking checks passed");
