export function heroRotationController({intervalMs=30000,canRotate=()=>true,onRotate=()=>{}}={}){
 let timer=null;
 const stop=()=>{if(timer!==null){clearInterval(timer);timer=null}};
 const start=()=>{stop();timer=setInterval(()=>{if(canRotate())onRotate()},Math.max(10000,intervalMs));return true};
 return{start,stop,running:()=>timer!==null};
}
