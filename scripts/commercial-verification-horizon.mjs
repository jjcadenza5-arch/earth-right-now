import {readFile} from "node:fs/promises";
import {commercialVerificationHorizon} from "../src/commercial-verification-horizon.js";
const read=async url=>JSON.parse(await readFile(url,"utf8"));
const partners=await read(new URL("../data/affiliate-partners.json",import.meta.url));
const offers=await read(new URL("../data/travel-offers.json",import.meta.url));
console.log(JSON.stringify(commercialVerificationHorizon({partners,offers},{now:new Date()}),null,2));
