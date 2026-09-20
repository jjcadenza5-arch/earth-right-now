const KEY="ern.runtime-source-health.v2",MAX_AGE=6*60*60*1000,THRESHOLD=2;
function store(){try{return globalThis.localStorage||null}catch{return null}}
function time(value){if(value instanceof Date)return value.getTime();const n=Number(value);return Number.isFinite(n)?n:Date.now()}
export function loadRuntimeFailures(now=Date.now()){now=time(now);const s=store();if(!s)return new Map();try{const rows=JSON.parse(s.getItem(KEY)||"[]");return new Map(rows.filter(x=>x?.id&&Number.isFinite(x.lastAt)&&now-x.lastAt<MAX_AGE).map(x=>[x.id,x]))}catch{return new Map()}}
export function rememberRuntimeFailure(source,failure,now=Date.now()){now=time(now);const s=store();if(!s||!source?.id)return;const map=loadRuntimeFailures(now),old=map.get(source.id),within=old&&now-old.lastAt<MAX_AGE,count=within?(old.count||1)+1:1;map.set(source.id,{id:source.id,firstAt:within?(old.firstAt||old.lastAt):now,lastAt:now,count,kind:failure?.kind||"PLAYBACK_FAILED"});try{s.setItem(KEY,JSON.stringify([...map.values()]))}catch{}}
export function clearAllRuntimeFailures(){const s=store();if(!s)return false;try{s.removeItem(KEY);return true}catch{return false}}
export function clearRuntimeFailure(id){const s=store();if(!s)return;const map=loadRuntimeFailures();if(!map.delete(id))return;try{s.setItem(KEY,JSON.stringify([...map.values()]))}catch{}}
export function runtimeFailureState(id,now=Date.now()){const x=loadRuntimeFailures(now).get(id);return x?{...x,quarantined:(x.count||1)>=THRESHOLD}:null}
export function runtimeHealthySources(sources,now=Date.now()){const failed=loadRuntimeFailures(now);return(sources||[]).filter(s=>{const x=failed.get(s.id);return!x||(x.count||1)<THRESHOLD})}
