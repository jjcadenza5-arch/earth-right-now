import {readFile} from "node:fs/promises";
import {currentImagePromotionPlan} from "../src/current-image-promotion-plan.js";
const root=new URL("../",import.meta.url);
const [targets,families,sources]=await Promise.all([
 readFile(new URL("data/provider-generated-targets.json",root),"utf8").then(JSON.parse),
 readFile(new URL("data/embed-provider-families.json",root),"utf8").then(JSON.parse),
 readFile(new URL("data/sources.json",root),"utf8").then(JSON.parse)
]);
const p=process.argv[2];if(!p)throw new Error("verification report path required");
const verification=JSON.parse(await readFile(p,"utf8"));
console.log(JSON.stringify(currentImagePromotionPlan({targets,families,sources,verification}),null,2));
