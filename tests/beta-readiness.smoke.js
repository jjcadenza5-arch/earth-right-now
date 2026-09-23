import { betaReadiness } from "../src/beta-readiness.js";
const now=Date.parse("2026-09-23T00:00:00Z"),rows=Array.from({length:40},(_,i)=>({id:"s"+i,country:"C"+(i%15),provider:"P"+(i%15),categories:["Travel"],truth:"LIVE_VIDEO",health:"HEALTHY",permission:i<10?"EMBED_ALLOWED":"LINK_ONLY",playback:i<10?"EMBED":"EXTERNAL",sourceUrl:"https://example.com/"+i,embedUrl:i<10?"https://www.youtube.com/embed/"+i:null,checkedAt:"2026-09-22T00:00:00Z"}));
const keys=["browser","mobile","providerPlayback","accessibility","performance","rollback"],evidence=Object.fromEntries(keys.map(k=>[k,{ok:true,note:k+" verified",checkedAt:"2026-09-22T00:00:00Z"}]));
const none=betaReadiness(rows,{},{now}),all=betaReadiness(rows,evidence,{now});
console.assert(none.score<all.score,"fresh real-world evidence must materially increase readiness");
console.assert(all.score===100,"fully satisfied planning targets should reach 100");
console.assert(none.remainingEvidence.length===6&&all.remainingEvidence.length===0);
console.log("ERN beta readiness smoke checks passed");
