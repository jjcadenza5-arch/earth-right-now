import { submissionTransportConfig,submissionDeliveryState } from "../src/submission-transport.js";
const record={status:"PENDING_REVIEW",businessName:"Example"};
console.assert(!submissionTransportConfig({endpoint:"http://example.com",enabled:true}).enabled);
console.assert(submissionDeliveryState(record,submissionTransportConfig(),{consent:true}).reason==="TRANSPORT_DISABLED");
console.assert(submissionDeliveryState(record,submissionTransportConfig({endpoint:"https://submit.example.com/inbox",enabled:true}),{consent:false}).reason==="CONSENT_REQUIRED");
console.assert(submissionDeliveryState(record,submissionTransportConfig({endpoint:"https://submit.example.com/inbox",enabled:true}),{consent:true}).transmittable);
console.log("ERN submission transport smoke checks passed");
