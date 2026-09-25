import {readFile} from "node:fs/promises";
import {providerDiscoveryQueue} from "../src/provider-discovery-queue.js";
import {providerFamilyResearchStatus} from "../src/provider-family-research.js";

const sources=JSON.parse(await readFile(new URL("../data/sources.json",import.meta.url),"utf8"));
const families=JSON.parse(await readFile(new URL("../data/embed-provider-families.json",import.meta.url),"utf8"));
const familyReport=providerFamilyResearchStatus(families);
console.log(JSON.stringify(providerDiscoveryQueue(sources,familyReport),null,2));
