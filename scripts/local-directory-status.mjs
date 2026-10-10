import {readFile} from "node:fs/promises";
import {localDirectoryStatus} from "../src/local-directory-status.js";
const read=async url=>JSON.parse(await readFile(url,"utf8"));
const rows=[...await read(new URL("../data/local-directory.json",import.meta.url)),...await read(new URL("../data/local-directory-supplemental.json",import.meta.url))];
const sources=[...await read(new URL("../data/sources.json",import.meta.url)),...await read(new URL("../data/search-supplemental.json",import.meta.url))];
const known=[...new Set(sources.map(s=>String(s.placeId||s.id||"")).filter(Boolean))];
const report=localDirectoryStatus(rows,{knownPlaceIds:known,targetApproved:10,now:new Date(),maxAgeDays:90});
console.log(JSON.stringify(report,null,2));
if(report.state!=="PILOT_COMPLETE")process.exit(1);
