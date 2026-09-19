export function createFreshnessClock(onTick,{intervalMs=300000,documentRef=typeof document!=="undefined"?document:null,setIntervalRef=setInterval,clearIntervalRef=clearInterval}={}){
 let timer=null;
 const tick=()=>{if(documentRef?.visibilityState==="hidden")return false;onTick?.(Date.now());return true};
 const start=()=>{if(timer||typeof onTick!=="function")return false;timer=setIntervalRef(tick,Math.max(60000,Number(intervalMs)||300000));return true};
 const stop=()=>{if(!timer)return false;clearIntervalRef(timer);timer=null;return true};
 const onVisibility=()=>{if(documentRef?.visibilityState==="visible")tick()};
 documentRef?.addEventListener?.("visibilitychange",onVisibility);
 function destroy(){stop();documentRef?.removeEventListener?.("visibilitychange",onVisibility)}
 return{start,stop,tick,destroy,running:()=>Boolean(timer)};
}
