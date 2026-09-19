export function sourceMetadataCompleteness(source){
 const important=["provider","country","region","timeZone","categories","rightsBasis","checkedAt","lastSuccessfulCheck","quality","story"],missing=important.filter(k=>source?.[k]==null||source?.[k]===""||(Array.isArray(source?.[k])&&!source[k].length));
 return{sourceId:source?.id||null,missing,complete:missing.length===0,score:Math.round((important.length-missing.length)/important.length*100)};
}
export function catalogMetadataAudit(sources=[]){const rows=sources.map(sourceMetadataCompleteness),incomplete=rows.filter(x=>!x.complete);return{total:rows.length,complete:rows.length-incomplete.length,incomplete:incomplete.length,rows:incomplete}}

export function catalogMetadataWarnings(sources=[]){const a=catalogMetadataAudit(sources);return a.rows.map(x=>({sourceId:x.sourceId,missing:[...x.missing],severity:x.score<70?"HIGH":"REVIEW"}))}
