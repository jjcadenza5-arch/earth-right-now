import { recencyState,ageHours,verificationWindowHours } from "./source-recency.js";
export function sourceFreshness(source,{now=Date.now()}={}){
 const checked=source?.lastSuccessfulCheck||source?.checkedAt||null,state=recencyState(source,{now}),age=ageHours(checked,now),windowHours=verificationWindowHours(source);
 return{state,checkedAt:checked,ageHours:Number.isFinite(age)?age:null,windowHours,recheckDue:state!=="CURRENT_CHECK"};
}
export function freshnessCopy(source,options={}){
 const x=sourceFreshness(source,options);
 if(!x.checkedAt)return"Not yet verified";
 const h=Math.max(0,Math.floor(x.ageHours||0));
 if(x.state==="CURRENT_CHECK")return h<1?"Checked within the last hour":`Checked ${h}h ago`;
 if(x.state==="STALE_CHECK")return`Recheck due · last checked ${h}h ago`;
 return`Verification expired · last checked ${h}h ago`;
}
