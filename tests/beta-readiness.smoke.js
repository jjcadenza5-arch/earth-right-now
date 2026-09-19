import { betaReadiness } from "../src/beta-readiness.js";
const rows=Array.from({length:40},(_,i)=>({id:"s"+i,country:"C"+(i%15),provider:"P"+(i%15),categories:["Travel"],truth:"LIVE_VIDEO",health:"HEALTHY",permission:i<10?"EMBED_ALLOWED":"LINK_ONLY",playback:i<10?"EMBED":"EXTERNAL",sourceUrl:"https://example.com/"+i,embedUrl:i<10?"https://www.youtube.com/embed/"+i:null,checkedAt:"2026-09-19"}));
const none=betaReadiness(rows,{}),all=betaReadiness(rows,Object.fromEntries(["browser","mobile","providerPlayback","accessibility","performance","rollback"].map(k=>[k,{ok:true}])));
console.assert(none.score<all.score,"real-world evidence must materially increase readiness");
console.assert(all.score===100,"fully satisfied planning targets should reach 100");
console.assert(none.remainingEvidence.length===6&&all.remainingEvidence.length===0);
console.log("ERN beta readiness smoke checks passed");
