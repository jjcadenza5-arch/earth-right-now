import { submissionTransportConfig,submissionDeliveryState } from "../src/submission-transport.js";
const record={status:"PENDING_REVIEW",businessName:"Example",placeName:"Beach",sourceUrl:"https://example.com/cam",contact:"owner@example.com",rightsConfirmed:true,submittedAt:"2026-09-20T00:00:00Z",internalNote:"SECRET",reviewChecks:{rights:true}};
console.assert(!submissionTransportConfig({endpoint:"http://example.com",enabled:true}).enabled);
for(const endpoint of ["https://localhost/inbox","https://127.0.0.1/inbox","https://10.0.0.4/inbox","https://192.168.1.10/inbox","https://172.16.0.2/inbox","https://[::1]/inbox"])console.assert(!submissionTransportConfig({endpoint,enabled:true}).enabled,`private transport endpoint must stay disabled: ${endpoint}`);
console.assert(submissionDeliveryState(record,submissionTransportConfig(),{consent:true}).reason==="TRANSPORT_DISABLED");
console.assert(submissionDeliveryState(record,submissionTransportConfig({endpoint:"https://submit.example.com/inbox",enabled:true}),{consent:false}).reason==="CONSENT_REQUIRED");
const delivery=submissionDeliveryState(record,submissionTransportConfig({endpoint:"https://submit.example.com/inbox",enabled:true}),{consent:true});console.assert(delivery.transmittable);console.assert(!("internalNote" in delivery.payload.record)&&!("reviewChecks" in delivery.payload.record),"transport must whitelist submission fields rather than serializing arbitrary internal state");
console.log("ERN submission transport smoke checks passed");
