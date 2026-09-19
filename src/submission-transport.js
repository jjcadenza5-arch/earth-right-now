export function submissionTransportConfig({endpoint="",enabled=false}={}){
 let url=null;try{const u=new URL(String(endpoint||""));if(u.protocol==="https:"&&!u.username&&!u.password)url=u.toString()}catch{}
 return{enabled:Boolean(enabled&&url),endpoint:url};
}
export function submissionEnvelope(record,{consent=false}={}){
 if(!record||record.status!=="PENDING_REVIEW")return{ok:false,reason:"INVALID_RECORD"};
 if(consent!==true)return{ok:false,reason:"CONSENT_REQUIRED"};
 return{ok:true,payload:{version:1,type:"CAMERA_SUBMISSION",record}};
}
export function submissionDeliveryState(record,config,{consent=false}={}){
 const envelope=submissionEnvelope(record,{consent});
 if(!envelope.ok)return{transmittable:false,reason:envelope.reason};
 if(!config?.enabled||!config.endpoint)return{transmittable:false,reason:"TRANSPORT_DISABLED"};
 return{transmittable:true,reason:null,endpoint:config.endpoint,payload:envelope.payload};
}
