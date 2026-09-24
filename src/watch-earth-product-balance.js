import { watchEarthEligible } from "./watch-earth.js";
import { playbackCapability } from "./playback-capability.js";
import { adaptiveWatchEarthLimit } from "./watch-earth-balance-policy.js";

export function watchEarthProductBalance(sources=[],{now=new Date(),target=20,preferredInside=5,externalSoftCap=12}={}){
  const eligible=(sources||[]).filter(s=>watchEarthEligible(s,{now}));
  const inside=eligible.filter(s=>playbackCapability(s,{now}).action==="PLAY");
  const external=eligible.filter(s=>playbackCapability(s,{now}).action==="EXTERNAL");
  const recommendedLimit=adaptiveWatchEarthLimit({insideCount:inside.length,externalCount:external.length,target,preferredInside,externalSoftCap});
  const insideShare=recommendedLimit?Math.min(inside.length,recommendedLimit)/recommendedLimit:0;
  const externalShare=recommendedLimit?Math.min(external.length,Math.max(0,recommendedLimit-inside.length))/recommendedLimit:0;
  const insideShortfall=Math.max(0,preferredInside-inside.length);
  return{
    target,
    preferredInside,
    externalSoftCap,
    strongCurrent:eligible.length,
    insideCurrent:inside.length,
    externalCurrent:external.length,
    insideShortfall,
    recommendedLimit,
    recommendedReduction:Math.max(0,target-recommendedLimit),
    insideShare:Number(insideShare.toFixed(3)),
    externalShare:Number(externalShare.toFixed(3)),
    status:inside.length<preferredInside?"INSIDE_SHORTFALL":externalShare>.75?"EXTERNAL_HEAVY":"BALANCED",
    note:"Shared product policy. Watch Earth treats target as a ceiling and applies this adaptive cap when inside-ERN playback is below the preferred floor."
  };
}
