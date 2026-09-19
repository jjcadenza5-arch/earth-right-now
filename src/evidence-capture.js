import { RELEASE_EVIDENCE_KEYS,releaseEvidenceRecord } from "./release-evidence.js";
export function evidencePatch(ledger,key,{ok=false,note="",checkedAt=new Date().toISOString()}={}){
 if(!RELEASE_EVIDENCE_KEYS.includes(key))throw new Error("Unknown release evidence key");
 const record=releaseEvidenceRecord(key,{ok,note,checkedAt});
 if(record.ok&&!record.note)throw new Error("Passing evidence requires a note");
 return{...(ledger||{}),[key]:record};
}
export function evidenceCommandSummary(key,record){
 return{key,ok:record.ok===true,note:String(record.note||"").trim(),checkedAt:String(record.checkedAt||"").trim()};
}
