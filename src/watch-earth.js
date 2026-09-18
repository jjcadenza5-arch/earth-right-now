import { sourceStatus } from "./health-policy.js";
export function buildWatchEarth(sources,{limit=20}={}){return sources.filter(s=>sourceStatus(s).live&&s.health==="HEALTHY"&&s.permission!=="UNKNOWN").sort((a,b)=>((b.moment||0)*.45+(b.quality||0)*.4+(b.freshness||0)*.15)-((a.moment||0)*.45+(a.quality||0)*.4+(a.freshness||0)*.15)).slice(0,limit)}
export function watchEarthFallback(sources,{limit=20}={}){return sources.filter(s=>s.health!=="OFFLINE"&&s.truth!=="PREVIEW").sort((a,b)=>(b.quality||0)-(a.quality||0)).slice(0,limit)}
