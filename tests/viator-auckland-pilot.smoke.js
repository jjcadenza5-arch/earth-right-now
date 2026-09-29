import fs from "node:fs";
import assert from "node:assert/strict";

const offers=JSON.parse(fs.readFileSync("data/travel-offers.json","utf8"));
const x=offers.find(o=>o.id==="viator-auckland-activities-pilot");
assert.ok(x);
assert.equal(x.placeId,"auckland-viaduct-harbour");
assert.equal(x.intent,"activities");
assert.equal(x.provider,"Viator");
assert.equal(x.affiliate,true);
assert.equal(x.sponsored,false);
assert.equal(x.linkScope,"destination");
assert.equal(x.resolvedBehavior,"DESTINATION_RESULTS");
assert.equal(x.verified,true);
assert.match(x.url,/pid=P00322254/);
assert.match(x.url,/medium=link/);

const staging=JSON.parse(fs.readFileSync("data/affiliate-staging.json","utf8"));
assert.equal(staging.programs.viator.privateStagingVerified,true);
assert.equal(staging.programs.viator.publicLinksEnabled,true);
assert.equal(staging.programs["booking-com"].publicLinksEnabled,false);

const deployment=JSON.parse(fs.readFileSync("data/viator-api-deployment.json","utf8"));
assert.equal(deployment.publicActivationAllowed,false);
assert.equal(deployment.sandboxKeyState,"ACTIVE_AUTH_CONFIRMED");
assert.equal(deployment.lastDiagnostic.destinationsStatus,200);
assert.equal(deployment.lastDiagnostic.sampleProductStatus,200);
assert.equal(deployment.taxonomyVerified,true);
assert.equal(deployment.productSearchVerified,false);
assert.equal(deployment.affiliateAttributionVerified,false);

console.log("Viator Auckland limited pilot: ok");
