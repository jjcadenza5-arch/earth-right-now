export function candidateFingerprint({commitSha="",catalogSha="",generatedAt=""}={}){
 const clean=x=>String(x||"").trim();
 return{commitSha:clean(commitSha),catalogSha:clean(catalogSha),generatedAt:clean(generatedAt)};
}
export function rollbackRecord({candidate={},previous={},procedure="",verified=false,checkedAt=""}={}){
 const c=candidateFingerprint(candidate),p=candidateFingerprint(previous);
 return{candidate:c,previous:p,procedure:String(procedure||"").trim(),verified:verified===true,checkedAt:String(checkedAt||"").trim()};
}
export function rollbackReady(record){
 return Boolean(record?.verified&&record.candidate?.commitSha&&record.previous?.commitSha&&record.procedure&&Number.isFinite(Date.parse(record.checkedAt)));
}
