import { recencyState,ageHours,verificationWindowHours } from "./source-recency.js";
export function sourceFreshness(source,{now=Date.now()}={}){
 const checked=source?.lastSuccessfulCheck||source?.checkedAt||null,state=recencyState(source,{now}),age=ageHours(checked,now),windowHours=verificationWindowHours(source);
 return{state,checkedAt:checked,ageHours:Number.isFinite(age)?age:null,windowHours,recheckDue:state!=="CURRENT_CHECK"};
}
export function ageCopy(hours){const h=Math.max(0,Math.floor(hours||0));if(h<1)return"within the last hour";if(h<48)return`${h}h ago`;const d=Math.max(2,Math.floor(h/24));return`${d}d ago`}
export function freshnessCopy(source,options={}){
 const x=sourceFreshness(source,options);
 if(!x.checkedAt)return"Not yet verified";
 const age=ageCopy(x.ageHours);
 if(x.state==="CURRENT_CHECK")return`Checked ${age}`;
 if(x.state==="STALE_CHECK")return`Recheck due · last checked ${age}`;
 return`Verification expired · last checked ${age}`;
}
