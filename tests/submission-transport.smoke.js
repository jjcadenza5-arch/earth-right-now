import { submissionTransportConfig,submissionDeliveryState } from "../src/submission-transport.js";
const record={status:"PENDING_REVIEW",businessName:"Example",placeName:"Beach",sourceUrl:"https://example.com/cam",contact:"owner@example.com",rightsConfirmed:true,submittedAt:"2026-09-20T00:00:00Z",internalNote:"SECRET",reviewChecks:{rights:true}};
console.assert(!submissionTransportConfig({endpoint:"http://example.com",enabled:true}).enabled);
console.assert(submissionDeliveryState(record,submissionTransportConfig(),{consent:true}).reason==="TRANSPORT_DISABLED");
console.assert(submissionDeliveryState(record,submissionTransportConfig({endpoint:"https://submit.example.com/inbox",enabled:true}),{consent:false}).reason==="CONSENT_REQUIRED");
const delivery=submissionDeliveryState(record,submissionTransportConfig({endpoint:"https://submit.example.com/inbox",enabled:true}),{consent:true});console.assert(delivery.transmittable);console.assert(!("internalNote" in delivery.payload.record)&&!("reviewChecks" in delivery.payload.record),"transport must whitelist submission fields rather than serializing arbitrary internal state");
console.log("ERN submission transport smoke checks passed");
