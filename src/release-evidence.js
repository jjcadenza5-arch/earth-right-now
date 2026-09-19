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

export function evidenceExpiry(checkedAt,{now=Date.now(),maxAgeDays=14}={}){
  const time=Date.parse(checkedAt),maxAgeMs=maxAgeDays*24*60*60*1000;
  if(!Number.isFinite(time))return{valid:false,expired:true,expiresAt:null,remainingMs:0};
  const expiresAt=time+maxAgeMs,remainingMs=Math.max(0,expiresAt-now);
  return{valid:true,expired:now>expiresAt,expiresAt:new Date(expiresAt).toISOString(),remainingMs};
}

export function releaseEvidenceSummary(rows,evidence={},options={}){
  const readiness=releaseReadiness(rows,{...options,...evidence}),checklist=publicationChecklist(rows,evidence,options);
  return{
    ready:readiness.ready,
    catalogReady:readiness.checks.catalog,
    passed:checklist.filter(x=>x.ok).map(x=>x.key),
    remaining:checklist.filter(x=>!x.ok).map(x=>x.key),
    blockers:readiness.blockers,
    checklist
  };
}
