const HOUR=36e5;
export function embedPlaybackProofState(source,{now=Date.now(),maxAgeHours=24,futureSkewMinutes=5}={}){
  if(source?.playback!=="EMBED")return{required:false,current:true,reason:null,ageHours:0};
  const t=Date.parse(source?.playbackVerifiedAt||""),n=now instanceof Date?now.getTime():Number(now);
  if(!Number.isFinite(t)||!Number.isFinite(n))return{required:true,current:false,reason:"PLAYBACK_PROOF_MISSING",ageHours:null};
  const delta=n-t;
  if(delta < -Math.max(0,Number(futureSkewMinutes)||0)*60000)return{required:true,current:false,reason:"PLAYBACK_PROOF_IN_FUTURE",ageHours:delta/HOUR};
  const ageHours=Math.max(0,delta/HOUR);
  return ageHours<=Math.max(1,Number(maxAgeHours)||24)
    ?{required:true,current:true,reason:null,ageHours}
    :{required:true,current:false,reason:"PLAYBACK_RECHECK_DUE",ageHours};
}
export function embedPlaybackProofCurrent(source,options={}){return embedPlaybackProofState(source,options).current}
