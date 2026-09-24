import {readFile} from "node:fs/promises";import {operationsReport} from "../src/operations-report.js";import {operationsTrendSnapshot} from "../src/operations-trend.js";
const readJson=async path=>JSON.parse(await readFile(path,"utf8"));
const sources=await readJson(new URL("../data/sources.json",import.meta.url));
const releaseEvidence=await readJson(new URL("../data/release-evidence.json",import.meta.url));
let providerObservations=null;try{providerObservations=await readJson(new URL("../data/provider-observations.json",import.meta.url));}catch(error){if(error?.code!=="ENOENT")throw error}
let availability=null;const availabilityPath=process.argv[2]||null;if(availabilityPath){try{availability=await readJson(availabilityPath)}catch(error){if(error?.code!=="ENOENT")throw error}}
const report=operationsReport(sources,{releaseEvidence,providerObservations});
console.log(JSON.stringify(operationsTrendSnapshot(report,{availability}),null,2));
