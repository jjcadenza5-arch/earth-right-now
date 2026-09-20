import fs from "node:fs";import { watchEarthSnapshot,buildWatchEarth } from "../src/watch-earth.js";
const sources=JSON.parse(fs.readFileSync(new URL("../data/sources.json",import.meta.url),"utf8"));
const checks=sources.flatMap(s=>[s.lastSuccessfulCheck,s.checkedAt]).map(Date.parse).filter(Number.isFinite),anchor=new Date(Math.max(...checks)),day=anchor.toISOString().slice(0,10);
const hours=[0,6,12,18],rows=hours.map(hour=>{const now=new Date(`${day}T${String(hour).padStart(2,"0")}:00:00Z`),snap=watchEarthSnapshot(sources,{limit:20,now}),items=buildWatchEarth(sources,{limit:20,now});return{utc:now.toISOString(),...snap,titles:items.map(s=>s.title)}});console.log(JSON.stringify({anchorCheck:anchor.toISOString(),audits:rows},null,2));
