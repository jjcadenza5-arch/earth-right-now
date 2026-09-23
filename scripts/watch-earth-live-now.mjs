import { readFile } from "node:fs/promises";import { watchEarthLiveNowStatus } from "../src/watch-earth-live-now-status.js";
const rows=JSON.parse(await readFile(new URL("../data/sources.json",import.meta.url),"utf8"));
console.log(JSON.stringify(watchEarthLiveNowStatus(rows,{now:new Date(),limit:20}),null,2));
