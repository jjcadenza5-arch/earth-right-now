import { watchEarthEligible } from "./watch-earth.js";
import { playbackCapability } from "./playback-capability.js";

export function watchEarthProductBalance(sources=[],{now=new Date(),target=5,preferredInside=5,externalSoftCap=0}={}){
  const eligible=(sources||[]).filter(s=>watchEarthEligible(s,{now}));
  const inside=eligible.filter(s=>playbackCapability(s,{now}).action==="PLAY");
  const external=eligible.filter(s=>playbackCapability(s,{now}).action==="EXTERNAL");
  const recommendedLimit=Math.min(5,Math.max(0,Number(target)||0),inside.length);
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
    note:"Five verified moving camera streams at most; no provider-only or refreshed-image substitutes. Shortfalls are visible."
  };
}
