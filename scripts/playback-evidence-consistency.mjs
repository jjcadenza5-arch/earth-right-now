import {readFile} from "node:fs/promises";
import {playbackEvidenceConsistency} from "../src/playback-evidence-consistency.js";
const read=async url=>JSON.parse(await readFile(url,"utf8"));
const sources=await read(new URL("../data/sources.json",import.meta.url));
const observations=await read(new URL("../data/provider-observations.json",import.meta.url));
console.log(JSON.stringify(playbackEvidenceConsistency(sources,observations,{now:new Date(),freshHours:24,toleranceMinutes:2}),null,2));
