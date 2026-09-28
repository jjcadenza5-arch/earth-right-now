import { playbackCapability } from "./playback-capability.js";

export function preserveWatchEarthInsideCore(items=[],{now=new Date(),preferredInside=5,earlyWindow=8}={}){
  const out=(items||[]).filter(Boolean);
  const windowSize=Math.min(Math.max(0,Number(earlyWindow)||0),out.length);
  if(!windowSize)return out;
  const isInside=source=>playbackCapability(source,{now}).action==="PLAY";
  const totalInside=out.filter(isInside).length;
  const target=Math.min(Math.max(0,Number(preferredInside)||0),totalInside,windowSize);
  let insideEarly=out.slice(0,windowSize).filter(isInside).length;
  if(insideEarly>=target)return out;

  const earlyExternal=[];
  for(let i=windowSize-1;i>=0;i--)if(!isInside(out[i]))earlyExternal.push(i);
  const laterInside=[];
  for(let i=windowSize;i<out.length;i++)if(isInside(out[i]))laterInside.push(i);

  const swaps=Math.min(target-insideEarly,earlyExternal.length,laterInside.length);
  for(let i=0;i<swaps;i++){
    const a=earlyExternal[i],b=laterInside[i];
    [out[a],out[b]]=[out[b],out[a]];
  }
  return out;
}
