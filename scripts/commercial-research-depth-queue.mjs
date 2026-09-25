import {readFile} from "node:fs/promises";
import {commercialResearchStatus} from "../src/commercial-research-candidates.js";
import {commercialResearchDepthQueue} from "../src/commercial-research-depth-queue.js";
const read=async url=>JSON.parse(await readFile(url,"utf8"));
const sources=await read(new URL("../data/sources.json",import.meta.url));
const researchCandidates=await read(new URL("../data/commercial-research-candidates.json",import.meta.url));
const known=[...new Set(sources.map(s=>String(s.placeId||s.id||"")).filter(Boolean))];
const researchStatus=commercialResearchStatus(researchCandidates,{knownPlaceIds:known,now:Date.now()});
console.log(JSON.stringify(commercialResearchDepthQueue({sources,researchStatus}),null,2));
