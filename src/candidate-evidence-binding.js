export const RELEASE_EVIDENCE_KEYS=["browser","mobile","providerPlayback","accessibility","performance","rollback"];
export function candidateEvidenceStatus(evidence={},candidateCommit=""){
 const expected=String(candidateCommit||"").trim().toLowerCase();
 const candidateValid=/^[0-9a-f]{40}$/.test(expected);
 const rows=RELEASE_EVIDENCE_KEYS.map(key=>{
   const row=evidence[key]||{},commit=String(row.commit||"").trim().toLowerCase(),commitValid=/^[0-9a-f]{40}$/.test(commit);
   return{key,commit:commit||null,commitValid,matches:Boolean(candidateValid&&commitValid&&commit===expected)};
 });
 return{candidateCommit:expected||null,candidateValid,allBound:candidateValid&&rows.every(x=>x.matches),unbound:rows.filter(x=>!x.matches).map(x=>x.key),rows};
}
