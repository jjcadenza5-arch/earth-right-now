import {readFile} from "node:fs/promises";
import {operatorReviewQueue} from "../src/operator-review-queue.js";
const read=async url=>JSON.parse(await readFile(url,"utf8"));
const sources=await read(new URL("../data/sources.json",import.meta.url));
let observations=[];try{observations=await read(new URL("../data/provider-observations.json",import.meta.url))}catch{}
console.log(JSON.stringify(operatorReviewQueue(sources,observations,{now:new Date(),limit:10,targetReady:5}),null,2));
