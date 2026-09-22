function providerKey(source){return source?.provider?String(source.provider).trim().toLowerCase():"unknown"}
export function watchEarthSequenceDiagnostics(items=[]){
 const rows=(items||[]).filter(Boolean),counts=new Map();let longestRun=0,currentRun=0,previous=null;
 for(const source of rows){const key=providerKey(source);counts.set(key,(counts.get(key)||0)+1);if(key===previous)currentRun++;else{previous=key;currentRun=1}longestRun=Math.max(longestRun,currentRun)}
 const dominantCount=Math.max(0,...counts.values());
 return{count:rows.length,providers:counts.size,dominantProviderShare:rows.length?Number((dominantCount/rows.length).toFixed(3)):0,longestProviderRun:longestRun,adjacentProviderRepeat:longestRun>1};
}
