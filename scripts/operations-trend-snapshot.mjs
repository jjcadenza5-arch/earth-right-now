import {readFile} from "node:fs/promises";import {operationsReport} from "../src/operations-report.js";import {operationsTrendSnapshot} from "../src/operations-trend.js";
const readJson=async url=>JSON.parse(await readFile(url,"utf8"));
const sources=await readJson(new URL("../data/sources.json",import.meta.url));
const releaseEvidence=await readJson(new URL("../data/release-evidence.json",import.meta.url));
let providerObservations=null;try{providerObservations=await readJson(new URL("../data/provider-observations.json",import.meta.url));}catch(error){if(error?.code!=="ENOENT")throw error}
const report=operationsReport(sources,{releaseEvidence,providerObservations});
console.log(JSON.stringify(operationsTrendSnapshot(report),null,2));
