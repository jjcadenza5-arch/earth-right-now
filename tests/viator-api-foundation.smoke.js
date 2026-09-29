import fs from "node:fs";
import assert from "node:assert/strict";
import {validateViatorSearchRequest,publicViatorProduct,safeViatorAffiliateUrl,viatorCampaignValue} from "../src/viator-api-contract.js";

const cfg=fs.readFileSync("travel-worker/wrangler.jsonc","utf8");
const worker=fs.readFileSync("travel-worker/src/index.js","utf8");
const deployment=JSON.parse(fs.readFileSync("data/viator-api-deployment.json","utf8"));
const map=JSON.parse(fs.readFileSync("data/viator-destination-map.json","utf8"));

assert.match(cfg,/"ERN_VIATOR_API_ENABLED": "true"/);
assert.match(cfg,/"ERN_VIATOR_PUBLIC_PRODUCTS_ENABLED": "false"/);
assert.match(cfg,/api\.sandbox\.viator\.com\/partner/);
assert.match(worker,/exp-api-key/);
assert.match(worker,/\/destinations/);
assert.doesNotMatch(worker,/\/v1\/taxonomy\/destinations/);
assert.match(worker,/\/api\/viator\/diagnostics/);
assert.match(worker,/campaign-value/);
assert.match(worker,/approvedMapping/);
assert.match(worker,/PLACE_NOT_MAPPED/);
assert.match(worker,/PUBLIC_PRODUCTS_DISABLED/);
assert.match(worker,/publicViatorProduct/);
assert.ok(!worker.includes("P00322254"),"Partner ID must not be hard-coded in API Worker");

assert.equal(deployment.status,"PRODUCT_VALIDATION_CONFIRMED_PUBLIC_OFF");
assert.equal(deployment.secretIsolation,true);
assert.equal(deployment.apiKeyConfigured,true);
assert.equal(deployment.sandboxKeyState,"ACTIVE_AUTH_CONFIRMED");
assert.equal(deployment.taxonomyVerified,true);
assert.equal(deployment.publicActivationAllowed,false);
assert.equal(map.policy.automaticFuzzyMatchingAllowed,false);
assert.equal(map.policy.publicProductsRequireApprovedMapping,true);
const auckland=map.mappings.find(x=>x.ernPlaceId==="auckland-viaduct-harbour");
assert.equal(auckland?.status,"APPROVED");
assert.equal(auckland?.viatorDestinationId,"391");

assert.equal(validateViatorSearchRequest({placeId:"p",language:"en-US",currency:"THB",count:6}).valid,true);
assert.equal(validateViatorSearchRequest({placeId:"p",language:"en-US",currency:"XYZ",count:6}).valid,false);
assert.equal(validateViatorSearchRequest({placeId:"",language:"en-US",count:6}).valid,false);
assert.equal(safeViatorAffiliateUrl("https://www.viator.com/tours/test?pid=P1"),"https://www.viator.com/tours/test?pid=P1");
assert.equal(safeViatorAffiliateUrl("https://example.com/not-viator"),"");
assert.equal(viatorCampaignValue("auckland-viaduct-harbour"),"ern-auckland-viaduct-harbour");

const p=publicViatorProduct({
  productCode:"X",
  title:"T",
  description:"D",
  productUrl:"https://www.viator.com/tours/test?pid=P1",
  reviews:{combinedAverageRating:4.8,totalReviews:10},
  pricing:{summary:{fromPrice:99},currency:"USD"}
});
assert.equal(p.provider,"Viator");
assert.equal(p.affiliate,true);
assert.equal(p.linkScope,"experience");
assert.equal(p.rating,4.8);
assert.ok(p.productUrl);

console.log("Viator API foundation smoke: ok");
