const KEY="ern.runtime-source-health.v1",MAX_AGE=6*60*60*1000;
function store(){try{return globalThis.localStorage||null}catch{return null}}
export function loadRuntimeFailures(now=Date.now()){const s=store();if(!s)return new Map();try{const rows=JSON.parse(s.getItem(KEY)||"[]");return new Map(rows.filter(x=>x?.id&&Number.isFinite(x.at)&&now-x.at<MAX_AGE).map(x=>[x.id,x]))}catch{return new Map()}}
export function rememberRuntimeFailure(source,failure,now=Date.now()){const s=store();if(!s||!source?.id)return;const map=loadRuntimeFailures(now);map.set(source.id,{id:source.id,at:now,kind:failure?.kind||"PLAYBACK_FAILED"});try{s.setItem(KEY,JSON.stringify([...map.values()]))}catch{}}
export function clearRuntimeFailure(id){const s=store();if(!s)return;const map=loadRuntimeFailures();if(!map.delete(id))return;try{s.setItem(KEY,JSON.stringify([...map.values()]))}catch{}}
export function runtimeHealthySources(sources,now=Date.now()){const failed=loadRuntimeFailures(now);return(sources||[]).filter(s=>!failed.has(s.id))}
