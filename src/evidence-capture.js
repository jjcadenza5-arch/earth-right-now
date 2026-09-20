import { RELEASE_EVIDENCE_KEYS,releaseEvidenceRecord } from "./release-evidence.js";
export function evidencePatch(ledger,key,{ok=false,note="",checkedAt=new Date().toISOString(),commit=""}={}){
 if(!RELEASE_EVIDENCE_KEYS.includes(key))throw new Error("Unknown release evidence key");
 const record=releaseEvidenceRecord(key,{ok,note,checkedAt});
 const candidate=String(commit||"").trim().toLowerCase();
 if(record.ok&&!record.note)throw new Error("Passing evidence requires a note");
 if(record.ok&&!/^[0-9a-f]{40}$/.test(candidate))throw new Error("Passing evidence requires the exact 40-character candidate commit");
 return{...(ledger||{}),[key]:{...record,commit:candidate||null}};
}
export function evidenceCommandSummary(key,record){
 return{key,ok:record.ok===true,note:String(record.note||"").trim(),checkedAt:String(record.checkedAt||"").trim(),commit:String(record.commit||"").trim()||null};
}
