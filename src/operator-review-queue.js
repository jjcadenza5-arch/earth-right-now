import {insideERNRecoveryStatus} from "./inside-ern-recovery.js";
import {playbackEvidenceHorizon} from "./playback-evidence-horizon.js";

export function operatorReviewQueue(sources=[],observations=[],{now=new Date(),limit=10,targetReady=5}={}){
  const sourceById=new Map((sources||[]).map(s=>[String(s.id),s]));
  const horizon=playbackEvidenceHorizon(sources,{now,maxAgeHours:24});
  const renewal=(horizon.items||[])
    .filter(x=>["DUE_12H","DUE_6H","EXPIRED"].includes(x.state)&&!x.held&&x.playbackVerifiedAt)
    .map(x=>{
      const s=sourceById.get(String(x.id));
      if(!s||s.playback!=="EMBED"||s.permission!=="EMBED_ALLOWED"||s.health!=="HEALTHY")return null;
      return {...s,reviewMode:"RENEW",action:x.state==="EXPIRED"?"RENEW_EXPIRED_VISITOR_PLAYBACK":"RENEW_VISITOR_PLAYBACK",reason:x.state,remainingHours:x.remainingHours,playbackVerifiedAt:x.playbackVerifiedAt};
    })
    .filter(Boolean)
    .sort((a,b)=>(a.remainingHours??Infinity)-(b.remainingHours??Infinity)||(Number(b.quality)||0)-(Number(a.quality)||0)||String(a.id).localeCompare(String(b.id)));
  const renewable=(horizon.items||[])
    .filter(x=>["CURRENT","DUE_12H","DUE_6H"].includes(x.state)&&!x.held)
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
  const recommendedRestorationCount=Math.min(recovery.readyShortfall,restoration.length);
  const primaryItems=[...renewal,...restoration.slice(0,recommendedRestorationCount)].slice(0,limit);
  const primaryIds=new Set(primaryItems.map(x=>String(x.id)));
  const items=[...renewal,...restoration].slice(0,limit);
  const backlogItems=items.filter(x=>!primaryIds.has(String(x.id)));
  return{
    generatedAt:now instanceof Date?now.toISOString():new Date(now).toISOString(),
    ready:recovery.ready,
    targetReady:recovery.targetReady,
    readyShortfall:recovery.readyShortfall,
    renewalCount:renewal.length,
    restorationCount:restoration.length,
    recommendedRestorationCount,
    primaryItems,
    backlogItems,
    items,
    renewal:renewal.slice(0,limit),
    renewable:renewable.slice(0,Math.max(limit,targetReady)),
    restoration:restoration.slice(0,limit),
    safety:{catalogMutationAllowed:false,automaticPlaybackVerificationAllowed:false},
    note:"Operator review queue brings due or expired previously verified HUMAN_PLAYBACK proof forward as renewal debt, then recommends only enough never/currently-unverified restoration confirmations to close the ready shortfall. Expiry never renews proof automatically; review remains human and non-mutating."
  };
}
