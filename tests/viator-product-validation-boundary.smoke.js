import fs from "node:fs";
import assert from "node:assert/strict";

const cfg=fs.readFileSync("travel-worker/wrangler.jsonc","utf8");
const worker=fs.readFileSync("travel-worker/src/index.js","utf8");
const contract=fs.readFileSync("src/viator-api-contract.js","utf8");
const deployment=JSON.parse(fs.readFileSync("data/viator-api-deployment.json","utf8"));

assert.match(cfg,/"ERN_VIATOR_PUBLIC_PRODUCTS_ENABLED": "false"/);
assert.match(cfg,/"ERN_VIATOR_PRODUCT_VALIDATION_ENABLED": "false"/);
assert.match(worker,/\/api\/viator\/product-validation/);
assert.match(worker,/ERN_VIATOR_VALIDATION_TOKEN/);
assert.match(worker,/x-ern-validation-token/);
assert.match(worker,/VIATOR_AFFILIATE_PID/);
assert.match(worker,/VALIDATION_NOT_AUTHORIZED/);
assert.match(worker,/AFFILIATE_PID_NOT_CONFIGURED/);
assert.match(worker,/validationOnly:true/);
assert.match(worker,/publicActivationAllowed:false/);
assert.match(worker,/PLACE_NOT_MAPPED/);
assert.match(worker,/approvedMapping/);
assert.match(contract,/VIATOR_PRODUCT_VALIDATION_PATH/);
assert.equal(deployment.publicActivationAllowed,false);
assert.equal(deployment.productSearchVerified,false);
assert.equal(deployment.affiliateAttributionVerified,false);
assert.ok(!cfg.includes("ERN_VIATOR_VALIDATION_TOKEN"),"validation token must be a Worker secret, not wrangler vars");
assert.ok(!cfg.includes("VIATOR_AFFILIATE_PID"),"affiliate PID must be a Worker secret, not wrangler vars");
assert.ok(!worker.includes("P00322254"),"affiliate PID must not be hard-coded in Worker source");

console.log("Viator product validation boundary: prepared, secret-gated, public OFF");
