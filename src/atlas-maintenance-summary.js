import {currentSource} from "./discovery-eligibility.js";import {sourceScore} from "./source-score.js";
export function atlasMaintenanceSummary(sources=[], {now=new Date(),limit=10}={}){
 const mapped=sources.filter(s=>Number.isFinite(s.lat)&&Number.isFinite(s.lon));
 const evidenced=mapped.filter(s=>s.coordinateBasis&&s.coordinateSourceUrl);
 const score=s=>Number(sourceScore(s,{now}).toFixed(1));
 const sort=(a,b)=>Number(b.current)-Number(a.current)||b.score-a.score||a.id.localeCompare(b.id);
 const intentionalUnpinned=sources.filter(s=>["DYNAMIC_UNPINNED","MULTI_SITE_UNPINNED"].includes(s.mapBehavior));
 const unmapped=sources.filter(s=>!["DYNAMIC_UNPINNED","MULTI_SITE_UNPINNED"].includes(s.mapBehavior)&&(!Number.isFinite(s.lat)||!Number.isFinite(s.lon))).map(s=>({id:s.id,title:s.title,current:currentSource(s,{now}),score:score(s),health:s.health,provider:s.provider||null,action:"VERIFY_PLACE_COORDINATES_FROM_AUTHORITATIVE_SOURCE"})).sort(sort);
 const legacy=mapped.filter(s=>!s.coordinateBasis||!s.coordinateSourceUrl).map(s=>({id:s.id,title:s.title,current:currentSource(s,{now}),score:score(s),health:s.health,provider:s.provider||null,lat:s.lat,lon:s.lon,action:"ADD_COORDINATE_PROVENANCE_WITHOUT_CHANGING_POSITION"})).sort(sort);
 return{total:sources.length,mapped:mapped.length,intentionalUnpinned:intentionalUnpinned.length,mappedWithEvidence:evidenced.length,provenanceCompletionPct:mapped.length?Number((evidenced.length/mapped.length*100).toFixed(1)):100,unmapped:unmapped.length,currentUnmapped:unmapped.filter(x=>x.current).length,legacy:legacy.length,currentLegacy:legacy.filter(x=>x.current).length,next:{unmapped:unmapped.slice(0,limit),legacy:legacy.slice(0,limit)}};
}
