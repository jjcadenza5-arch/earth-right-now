import {readFile} from "node:fs/promises";import {runSourceAvailabilityProbe} from "../src/source-availability-observer.js";
const rows=JSON.parse(await readFile(new URL("../data/sources.json",import.meta.url),"utf8"));
const report=await runSourceAvailabilityProbe(rows,{now:new Date(),limit:24,maxPerHost:4,concurrency:4,timeoutMs:7000});
console.log(JSON.stringify(report,null,2));
