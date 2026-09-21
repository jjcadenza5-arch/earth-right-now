function privateHost(host){const h=String(host||"").toLowerCase().replace(/^\[|\]$/g,"");if(h==="localhost"||h.endsWith(".localhost")||h==="0.0.0.0"||h==="127.0.0.1"||h==="::1"||h==="::")return true;if(/^127\./.test(h)||/^10\./.test(h)||/^192\.168\./.test(h)||/^169\.254\./.test(h))return true;const m=h.match(/^172\.(\d+)\./);if(m&&Number(m[1])>=16&&Number(m[1])<=31)return true;if(/^fc|^fd|^fe8|^fe9|^fea|^feb/.test(h))return true;return false}
export function submissionTransportConfig({endpoint="",enabled=false}={}){
 let url=null;try{const u=new URL(String(endpoint||""));if(u.protocol==="https:"&&!u.username&&!u.password&&u.hostname&&!privateHost(u.hostname))url=u.toString()}catch{}
 return{enabled:Boolean(enabled&&url),endpoint:url};
}
export function submissionEnvelope(record,{consent=false}={}){
 if(!record||record.status!=="PENDING_REVIEW")return{ok:false,reason:"INVALID_RECORD"};
 if(consent!==true)return{ok:false,reason:"CONSENT_REQUIRED"};
 const payloadRecord={businessName:record.businessName,placeName:record.placeName,sourceUrl:record.sourceUrl,contact:record.contact||null,rightsConfirmed:record.rightsConfirmed===true,status:record.status,submittedAt:record.submittedAt};return{ok:true,payload:{version:1,type:"CAMERA_SUBMISSION",record:payloadRecord}};
}
export function submissionDeliveryState(record,config,{consent=false}={}){
 const envelope=submissionEnvelope(record,{consent});
 if(!envelope.ok)return{transmittable:false,reason:envelope.reason};
 if(!config?.enabled||!config.endpoint)return{transmittable:false,reason:"TRANSPORT_DISABLED"};
 return{transmittable:true,reason:null,endpoint:config.endpoint,payload:envelope.payload};
}
