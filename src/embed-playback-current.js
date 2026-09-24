export function embedPlaybackCurrent(source,{now=Date.now(),maxAgeHours=24}={}){
 if(!source||source.playback!=="EMBED")return true;
 const raw=source.playbackVerifiedAt;if(!raw)return false;
 const t=Date.parse(raw),n=now instanceof Date?now.getTime():Number(now);
 if(!Number.isFinite(t)||!Number.isFinite(n))return false;
 return Math.max(0,(n-t)/36e5)<=maxAgeHours;
}
