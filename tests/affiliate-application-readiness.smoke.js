import assert from "node:assert/strict";import {affiliateApplicationReadiness} from "../src/affiliate-application-readiness.js";
const rows=[{id:"x",name:"X",intents:["stay"],applicationRequired:true,relationshipActive:false,credentialsConfigured:false}];
const r=affiliateApplicationReadiness(rows);
assert.equal(r.ernReady,true);assert.equal(r.readyForDecision,1);assert.equal(r.next,"USER_CHOOSES_WHETHER_TO_APPLY");
assert.equal(r.rows[0].publicActivationAllowed,false);assert.equal(r.rows[0].trackedLinksAllowed,false);assert.ok(r.rows[0].remainingExternalActions.includes("SUBMIT_PROGRAM_APPLICATION_OR_ENROLLMENT"));
assert.equal(r.safety.automaticApplicationAllowed,false);assert.equal(r.safety.automaticCredentialSetupAllowed,false);assert.equal(r.safety.automaticPublicActivationAllowed,false);
console.log("ERN affiliate application readiness stops at explicit external action boundary");

const active=affiliateApplicationReadiness([{id:"travelpayouts",name:"Travelpayouts",intents:["activities"],state:"ACTIVE_OPERATOR_CONFIRMED",applicationRequired:false,relationshipActive:true,credentialsConfigured:true,publicActivationAllowed:true,trackedLinksAllowed:true}]);
assert.equal(active.activePlatforms,1);
assert.equal(active.readyForDecision,0);
assert.equal(active.rows[0].state,"ACTIVE_OPERATOR_CONFIRMED");
assert.equal(active.rows[0].publicActivationAllowed,true);
assert.equal(active.rows[0].trackedLinksAllowed,true);
assert.ok(active.rows[0].remainingExternalActions.includes("VERIFY_TRACKED_LINK_BEFORE_EACH_NEW_PUBLIC_PLACEMENT"));
assert.equal(active.safety.automaticTrackedLinkActivationAllowed,false);
assert.equal(active.safety.paidRankingAllowed,false);
