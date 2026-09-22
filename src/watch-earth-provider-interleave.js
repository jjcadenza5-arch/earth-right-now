function key(s){return s?.provider?String(s.provider).trim().toLowerCase():"unknown"}
export function interleaveWatchEarthProviders(items=[]){
 const pool=(items||[]).filter(Boolean),out=[],remaining=[...pool];let previous=null;
 while(remaining.length){let index=remaining.findIndex(s=>key(s)!==previous);if(index<0)index=0;const [next]=remaining.splice(index,1);out.push(next);previous=key(next)}
 return out
}
