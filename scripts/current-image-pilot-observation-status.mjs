import {readFile} from "node:fs/promises";
import {pilotObservationStatus} from "../src/current-image-pilot-observation.js";
const ledger=JSON.parse(await readFile(new URL("../data/current-image-pilot-observations.json",import.meta.url),"utf8"));
console.log(JSON.stringify(pilotObservationStatus(ledger,{now:new Date()}),null,2));
