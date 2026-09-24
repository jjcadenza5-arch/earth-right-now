import {readFile} from "node:fs/promises";import {compareOperationsTrend} from "../src/operations-trend.js";
const [previousPath,currentPath]=process.argv.slice(2);
if(!currentPath)throw new Error("usage: node scripts/operations-trend-compare.mjs <previous-or-dash> <current>");
const current=JSON.parse(await readFile(currentPath,"utf8"));
let previous=null;if(previousPath&&previousPath!=="-"){try{previous=JSON.parse(await readFile(previousPath,"utf8"))}catch(error){if(error?.code!=="ENOENT")throw error}}
console.log(JSON.stringify(compareOperationsTrend(previous,current),null,2));
