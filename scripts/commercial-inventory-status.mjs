import {readFile} from "node:fs/promises";
import {commercialInventoryStatus} from "../src/commercial-inventory-status.js";
const read=async url=>JSON.parse(await readFile(url,"utf8"));
const sources=await read(new URL("../data/sources.json",import.meta.url));
const partners=await read(new URL("../data/affiliate-partners.json",import.meta.url));
const offers=await read(new URL("../data/travel-offers.json",import.meta.url));
console.log(JSON.stringify(commercialInventoryStatus({sources,partners,offers},{now:new Date()}),null,2));
