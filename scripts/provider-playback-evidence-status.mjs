import { readFile } from "node:fs/promises";
import { providerPlaybackEvidenceStatus } from "../src/provider-playback-evidence.js";

const sources=JSON.parse(await readFile(new URL("../data/sources.json",import.meta.url),"utf8"));
let observations=[];
try{observations=JSON.parse(await readFile(new URL("../data/provider-observations.json",import.meta.url),"utf8"))}catch(error){if(error?.code!=="ENOENT")throw error}
console.log(JSON.stringify(providerPlaybackEvidenceStatus(sources,observations),null,2));
