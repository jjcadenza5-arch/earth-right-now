import { readFile } from "node:fs/promises";
const read=async p=>JSON.parse(await readFile(new URL(p,import.meta.url),"utf8"));
const sources=await read("../data/sources.json");
const files=["../data/recovery-candidates-2026-09-18.json","../data/recovery-candidates-tranche-02.json","../data/recovery-candidates-tranche-03.json","../data/recovery-candidates-tranche-04.json"];
const candidates=(await Promise.all(files.map(read))).flat(),active=new Map(sources.map(x=>[x.id,x]));
const canonical=id=>String(id||"").replace(/-recovered$/,"");
const migrated=[],pending=[];
for(const candidate of candidates){const id=canonical(candidate.id),source=active.get(id);if(source)migrated.push({candidateId:candidate.id,sourceId:id,title:source.title,health:source.health,checkedAt:source.checkedAt||null});else pending.push({candidateId:candidate.id,canonicalId:id,title:candidate.title,legacyHealth:candidate.health,permission:candidate.permission,playback:candidate.playback,historicalCheckedAt:candidate.checkedAt||null,requiresCurrentRevalidation:true});}
const summary={activeSources:sources.length,recoveryCandidates:candidates.length,migrated:migrated.length,pending:pending.length,pendingByLegacyHealth:Object.fromEntries(["HEALTHY","DEGRADED","UNKNOWN","OFFLINE"].map(k=>[k,pending.filter(x=>x.legacyHealth===k).length]))};
console.log(JSON.stringify({...summary,pendingCandidates:pending},null,2));
