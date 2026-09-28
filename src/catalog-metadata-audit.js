function empty(value){return value==null||value===""||(Array.isArray(value)&&!value.length)}
export function sourceMetadataCompleteness(source){
 const important=["provider","country","region","categories","rightsBasis","freshnessEvidence","checkedAt","quality","story","attribution"];
 if(source?.coordinateBasis!=="DYNAMIC_ORBIT")important.push("timeZone");
 const missing=important.filter(k=>empty(source?.[k]));
 const hasCheckOutcome=!empty(source?.lastSuccessfulCheck)||!empty(source?.lastFailedCheck);
 if(!hasCheckOutcome)missing.push("lastCheckOutcome");
 const total=important.length+1;
 return{sourceId:source?.id||null,missing,complete:missing.length===0,score:Math.round((total-missing.length)/total*100)};
}
export function catalogMetadataAudit(sources=[]){const rows=sources.map(sourceMetadataCompleteness),incomplete=rows.filter(x=>!x.complete);return{total:rows.length,complete:rows.length-incomplete.length,incomplete:incomplete.length,rows:incomplete}}
export function catalogMetadataWarnings(sources=[]){const a=catalogMetadataAudit(sources);return a.rows.map(x=>({sourceId:x.sourceId,missing:[...x.missing],severity:x.score<70?"HIGH":"REVIEW"}))}
