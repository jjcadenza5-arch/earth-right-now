import { nearNowEvidence } from "./now-evidence.js";
export function guideLiveNowResult(query,items,{now=new Date()}={}){
 const rows=(items||[]).filter(Boolean),nearNowCount=rows.filter(s=>nearNowEvidence(s,{now})).length;
 return{query,items:rows,count:rows.length,windowCount:rows.length,liveLikeCount:rows.length,currentCount:nearNowCount,nearNowCount,availableNonCurrentCount:Math.max(0,rows.length-nearNowCount),referenceCount:0,empty:!rows.length,currentIntent:true};
}
