import {readFile} from "node:fs/promises";
import {commercialOnboardingPlan} from "../src/commercial-onboarding-plan.js";
const read=async url=>JSON.parse(await readFile(url,"utf8"));
const sources=await read(new URL("../data/sources.json",import.meta.url));
const offers=await read(new URL("../data/travel-offers.json",import.meta.url));
console.log(JSON.stringify(commercialOnboardingPlan({sources,offers},{now:new Date()}),null,2));
