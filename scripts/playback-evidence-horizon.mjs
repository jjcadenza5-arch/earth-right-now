import {readFile} from "node:fs/promises";import {playbackEvidenceHorizon} from "../src/playback-evidence-horizon.js";
const rows=JSON.parse(await readFile(new URL("../data/sources.json",import.meta.url),"utf8"));
console.log(JSON.stringify(playbackEvidenceHorizon(rows,{now:new Date(),maxAgeHours:24}),null,2));
