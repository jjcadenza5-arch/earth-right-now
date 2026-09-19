import { releaseReadiness } from "./release-readiness.js";

export const RELEASE_EVIDENCE_KEYS=["browser","mobile","providerPlayback","accessibility","performance","rollback"];

export function blankReleaseEvidence(){
  return Object.fromEntries(RELEASE_EVIDENCE_KEYS.map(key=>[key,{ok:false,note:"",checkedAt:""}]));
}

export function releaseEvidenceRecord(key,{ok=false,note="",checkedAt=new Date().toISOString()}={}){
  if(!RELEASE_EVIDENCE_KEYS.includes(key))throw new Error("Unknown release evidence key");
  return{ok:ok===true,note:String(note||"").trim(),checkedAt:String(checkedAt||"").trim()};
}

export function publicationChecklist(rows,evidence={},options={}){
  const readiness=releaseReadiness(rows,{...options,...evidence});
  return RELEASE_EVIDENCE_KEYS.map(key=>({
    key,
    ok:readiness.checks[key],
    note:readiness.evidence[key].note,
    checkedAt:readiness.evidence[key].checkedAt,
    fresh:readiness.evidence[key].fresh
  }));
}
