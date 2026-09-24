import {readFile} from "node:fs/promises";
import {submissionTransportReadiness} from "../src/submission-transport-readiness.js";
const raw=JSON.parse(await readFile(new URL("../data/submission-transport.json",import.meta.url),"utf8"));
console.log(JSON.stringify(submissionTransportReadiness(raw),null,2));
