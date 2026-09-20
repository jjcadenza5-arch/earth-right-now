import fs from "node:fs";import { watchEarthSnapshot } from "../src/watch-earth.js";
const sources=JSON.parse(fs.readFileSync(new URL("../data/sources.json",import.meta.url),"utf8")),checks=sources.flatMap(s=>[s.lastSuccessfulCheck,s.checkedAt]).map(Date.parse).filter(Number.isFinite),day=new Date(Math.max(...checks)).toISOString().slice(0,10);
for(const h of [0,6,12,18]){const now=new Date(`${day}T${String(h).padStart(2,"0")}:00:00Z`),x=watchEarthSnapshot(sources,{limit:20,now});console.assert(x.count<=20&&x.places<=x.count&&x.countries<=x.count,"Watch Earth audit invariants must hold");console.assert(Object.values(x.phases).reduce((a,b)=>a+b,0)===x.count,"solar phase totals must equal Watch Earth count")}
console.log("ERN Watch Earth representative-time audit invariants passed");
