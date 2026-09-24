import {insideERNRecoveryStatus} from "./inside-ern-recovery.js";
import {playbackEvidenceHorizon} from "./playback-evidence-horizon.js";

export function operatorReviewQueue(sources=[],observations=[],{now=new Date(),limit=10,targetReady=5}={}){
  const sourceById=new Map((sources||[]).map(s=>[String(s.id),s]));
  const horizon=playbackEvidenceHorizon(sources,{now,maxAgeHours:24});
  const renewal=(horizon.items||[])
    .filter(x=>["DUE_12H","DUE_6H"].includes(x.state)&&!x.held)
    .map(x=>{
      const s=sourceById.get(String(x.id));
      if(!s||s.playback!=="EMBED"||s.permission!=="EMBED_ALLOWED"||s.health!=="HEALTHY")return null;
      return {...s,reviewMode:"RENEW",action:"RENEW_VISITOR_PLAYBACK",reason:x.state,remainingHours:x.remainingHours,playbackVerifiedAt:x.playbackVerifiedAt};
    })
    .filter(Boolean)
    .sort((a,b)=>(a.remainingHours??Infinity)-(b.remainingHours??Infinity)||(Number(b.quality)||0)-(Number(a.quality)||0)||String(a.id).localeCompare(String(b.id)));
  const renewalIds=new Set(renewal.map(x=>String(x.id)));
  const recovery=insideERNRecoveryStatus(sources,observations,{now,limit:Math.max(limit,20),targetReady});
  const restoration=(recovery.restorationCandidates||[])
    .filter(x=>x.embedUrl&&!renewalIds.has(String(x.id)))
    .map(x=>({...x,reviewMode:"RESTORE"}));
  const items=[...renewal,...restoration].slice(0,limit);
  return{
    generatedAt:now instanceof Date?now.toISOString():new Date(now).toISOString(),
    renewalCount:renewal.length,
    restorationCount:restoration.length,
    items,
    renewal:renewal.slice(0,limit),
    restoration:restoration.slice(0,limit),
    safety:{catalogMutationAllowed:false,automaticPlaybackVerificationAllowed:false},
    note:"Operator review queue brings expiring HUMAN_PLAYBACK proof forward before expiry, then fills remaining capacity with restoration candidates. Review remains human and non-mutating."
  };
}
