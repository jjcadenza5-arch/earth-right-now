import {insideERNRecoveryStatus} from "./inside-ern-recovery.js";
import {playbackEvidenceHorizon} from "./playback-evidence-horizon.js";

function scheduleOpen(s,now){const a=s?.availabilitySchedule;if(!a?.timeZone||!a.start||!a.end)return true;try{const parts=new Intl.DateTimeFormat("en-GB",{timeZone:a.timeZone,hour:"2-digit",minute:"2-digit",hourCycle:"h23"}).formatToParts(now instanceof Date?now:new Date(now));const h=Number(parts.find(x=>x.type==="hour")?.value),m=Number(parts.find(x=>x.type==="minute")?.value),cur=h*60+m;const toMin=v=>{const [hh,mm]=String(v).split(":").map(Number);return hh*60+mm};return cur>=toMin(a.start)&&cur<toMin(a.end)}catch{return false}}
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
    .filter(s=>scheduleOpen(s,now))
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
  const pendingExpiryCount=renewal.filter(x=>["DUE_12H","DUE_6H"].includes(x.reason)).length;
  const projectedReadyWithoutRenewal=Math.max(0,recovery.ready-pendingExpiryCount);
  const renewalRequiredCount=Math.min(renewal.length,Math.max(0,targetReady-projectedReadyWithoutRenewal));
  const primaryRenewal=renewal.slice(0,renewalRequiredCount);
  const projectedReadyAfterPrimaryRenewal=projectedReadyWithoutRenewal+primaryRenewal.length;
  const restorationNeededAfterRenewal=Math.max(0,targetReady-projectedReadyAfterPrimaryRenewal);
  const recommendedRestorationCount=Math.min(restorationNeededAfterRenewal,restoration.length);
  const primaryItems=[...primaryRenewal,...restoration.slice(0,recommendedRestorationCount)].slice(0,limit);
  const primaryIds=new Set(primaryItems.map(x=>String(x.id)));
  const items=[...renewal,...restoration].slice(0,limit);
  const backlogItems=items.filter(x=>!primaryIds.has(String(x.id)));
  return{
    generatedAt:now instanceof Date?now.toISOString():new Date(now).toISOString(),
    ready:recovery.ready,
    targetReady:recovery.targetReady,
    readyShortfall:recovery.readyShortfall,
    renewalCount:renewal.length,
    renewalRequiredCount,
    projectedReadyWithoutRenewal,
    projectedReadyAfterPrimaryRenewal,
    restorationCount:restoration.length,
    recommendedRestorationCount,
    primaryItems,
    backlogItems,
    items,
    renewal:renewal.slice(0,limit),
    renewable:renewable.slice(0,Math.max(limit,targetReady)),
    restoration:restoration.slice(0,limit),
    safety:{catalogMutationAllowed:false,automaticPlaybackVerificationAllowed:false},
    note:"Operator review queue excludes provider-scheduled cameras while their published live window is closed. It brings due or expired previously verified HUMAN_PLAYBACK proof forward as renewal debt, but makes only the minimum renewals needed to preserve the ready target primary. Additional renewals stay visible as backlog. It then recommends only enough restoration confirmations to close any remaining projected shortfall. Expiry never renews proof automatically; review remains human and non-mutating."
  };
}
