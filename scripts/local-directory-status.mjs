import {readFile} from "node:fs/promises";
import {localDirectoryStatus} from "../src/local-directory-status.js";
const read=async url=>JSON.parse(await readFile(url,"utf8"));
const rows=await read(new URL("../data/local-directory.json",import.meta.url));
const sources=await read(new URL("../data/sources.json",import.meta.url));
const known=[...new Set(sources.map(s=>String(s.placeId||s.id||"")).filter(Boolean))];
console.log(JSON.stringify(localDirectoryStatus(rows,{knownPlaceIds:known,targetApproved:10,now:new Date()}),null,2));
