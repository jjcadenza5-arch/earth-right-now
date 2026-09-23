import { readFile } from "node:fs/promises";import { currentSource } from "../src/discovery-eligibility.js";import { sourceScore } from "../src/source-score.js";
const rows=JSON.parse(await readFile(new URL("../data/sources.json",import.meta.url),"utf8")),now=new Date();
const mapped=rows.filter(s=>Number.isFinite(s.lat)&&Number.isFinite(s.lon));
const evidenced=mapped.filter(s=>s.coordinateBasis&&s.coordinateSourceUrl);
const missing=rows.filter(s=>!Number.isFinite(s.lat)||!Number.isFinite(s.lon)).map(s=>({id:s.id,title:s.title,region:s.region||null,country:s.country||null,provider:s.provider||null,current:currentSource(s,{now}),health:s.health,score:Number(sourceScore(s,{now}).toFixed(1)),nextAction:"VERIFY_PLACE_COORDINATES_FROM_AUTHORITATIVE_SOURCE"})).sort((a,b)=>Number(b.current)-Number(a.current)||b.score-a.score||a.id.localeCompare(b.id));
const legacy=mapped.filter(s=>!s.coordinateBasis||!s.coordinateSourceUrl).map(s=>({id:s.id,title:s.title,lat:s.lat,lon:s.lon,nextAction:"ADD_COORDINATE_PROVENANCE_WITHOUT_CHANGING_POSITION"}));
console.log(JSON.stringify({generatedAt:now.toISOString(),total:rows.length,mapped:mapped.length,mappedWithEvidence:evidenced.length,mappedLegacy:legacy.length,unmapped:missing.length,currentUnmapped:missing.filter(x=>x.current).length,legacy,worklist:missing},null,2));
