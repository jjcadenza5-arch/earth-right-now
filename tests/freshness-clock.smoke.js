import { createFreshnessClock } from "../src/freshness-clock.js";
let ticks=0,fn=null,cleared=false,listener=null;const doc={visibilityState:"visible",addEventListener:(n,x)=>listener=x,removeEventListener(){}};
const clock=createFreshnessClock(()=>ticks++,{intervalMs:1,documentRef:doc,setIntervalRef:x=>{fn=x;return 7},clearIntervalRef:id=>{cleared=id===7}});
console.assert(clock.start()&&clock.running());fn();console.assert(ticks===1);doc.visibilityState="hidden";fn();console.assert(ticks===1,"hidden tabs must not spend work refreshing presentation");doc.visibilityState="visible";listener();console.assert(ticks===2,"returning visitor gets immediate truth refresh");console.assert(clock.stop()&&cleared&&!clock.running());
console.log("ERN freshness clock smoke checks passed");
