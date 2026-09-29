import { playbackCapability } from "./playback-capability.js";
import { currentSource } from "./discovery-eligibility.js";
import { nowEvidenceClass } from "./now-evidence.js";

function embedPlaybackCurrent(source,now=new Date()){
 if(source?.playback!=="EMBED")return true;
 const t=Date.parse(source?.playbackVerifiedAt||""),n=now instanceof Date?now.getTime():Number(now);
 return Number.isFinite(t)&&Number.isFinite(n)&&Math.max(0,(n-t)/36e5)<=24;
}
export function currentWindowEyebrow(source,{now=new Date()}={}){
 if(!source)return"SOURCE";
 if(source.truth==="PREVIEW"||source.playback==="PREVIEW")return"REFERENCE IMAGE";
 if(!currentSource(source,{now}))return source.health==="UNKNOWN"?"SOURCE CHECK":source.health==="DEGRADED"?"LIMITED SOURCE":"SOURCE";
 if(source.playback==="EMBED"&&!embedPlaybackCurrent(source,now))return"PLAYBACK RECHECK DUE";
 if(source.truth==="LIVE_IMAGE")return nowEvidenceClass(source,{now}).nearNow?"NEAR-NOW IMAGE":"IMAGE SOURCE";
 const cap=playbackCapability(source,{now});
 if(cap.action==="EXTERNAL")return nowEvidenceClass(source,{now}).nearNow?"NEAR-NOW AT SOURCE":"RECENTLY CHECKED SOURCE";
 if(source.truth==="PARTNER")return"PARTNER SOURCE";
 return"LIVE WINDOW";
}
export function currentWindowAction(source,{now=new Date()}={}){
 const cap=playbackCapability(source,{now});
 if(cap.action==="UNAVAILABLE")return"Unavailable";
 if(source?.truth==="PREVIEW"||source?.playback==="PREVIEW")return"View reference image";
 if(!currentSource(source,{now}))return cap.action==="EXTERNAL"?"Open source":"View source";
 if(source.playback==="EMBED"&&!embedPlaybackCurrent(source,now))return"View source";
 if(cap.action==="EXTERNAL")return nowEvidenceClass(source,{now}).nearNow?"Open near-now source":"Open source";
 if(source.truth==="LIVE_IMAGE")return nowEvidenceClass(source,{now}).nearNow?"View near-now image":"View image source";
 if(cap.action==="PLAY")return"Watch live";
 return"Unavailable";
}
