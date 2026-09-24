import assert from "node:assert/strict";import fs from "node:fs";
const pkg=fs.readFileSync("package.json","utf8"),wf=fs.readFileSync(".github/workflows/operations-watch.yml","utf8"),cli=fs.readFileSync("scripts/operations-operator-brief.mjs","utf8"),brief=fs.readFileSync("src/operations-operator-brief.js","utf8"),integrity=fs.readFileSync("src/operations-packet-integrity.js","utf8");
assert.match(pkg,/"inside:evidence-consistency"/);assert.match(wf,/inside:evidence-consistency.*playback-evidence-consistency\.json/s);assert.match(cli,/playbackEvidenceConsistency=await optional\(args\[12\]\)/);assert.match(brief,/Playback evidence consistency/);assert.match(integrity,/"playback-evidence-consistency\.json"/);
console.log("ERN playback evidence consistency wiring passed");
