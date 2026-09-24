import { readFile } from "node:fs/promises";import { watchEarthProductBalance } from "../src/watch-earth-product-balance.js";
const rows=JSON.parse(await readFile(new URL("../data/sources.json",import.meta.url),"utf8"));
console.log(JSON.stringify(watchEarthProductBalance(rows,{now:new Date()}),null,2));
