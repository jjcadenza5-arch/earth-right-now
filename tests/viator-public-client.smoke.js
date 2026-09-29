import assert from "node:assert/strict";
import {loadViatorPublicConfig,fetchViatorProducts} from "../src/viator-public-client.js";

const response=(body,{ok=true,status=200}={})=>({ok,status,json:async()=>body});

let cfg=await loadViatorPublicConfig({fetchImpl:async()=>response({
  status:"PRODUCT_VALIDATION_CONFIRMED_PUBLIC_OFF",
  endpointUrl:"https://ern-travel-api.example.workers.dev",
  publicActivationAllowed:false,
  taxonomyVerified:true,
  productSearchVerified:true,
  affiliateAttributionVerified:true
})});
assert.equal(cfg.enabled,false);
assert.equal(cfg.reason,"PUBLIC_ACTIVATION_OFF");

cfg=await loadViatorPublicConfig({fetchImpl:async()=>response({
  status:"PRODUCT_VALIDATION_CONFIRMED_PUBLIC_OFF",
  endpointUrl:"https://ern-travel-api.example.workers.dev",
  publicActivationAllowed:true,
  taxonomyVerified:true,
  productSearchVerified:true,
  affiliateAttributionVerified:true
})});
assert.equal(cfg.enabled,true);

let called=0;
let result=await fetchViatorProducts("auckland",{config:{...cfg,affiliateAttributionVerified:false},fetchImpl:async()=>{called++;return response({})}});
assert.equal(result.ok,false);
assert.equal(result.reason,"VERIFICATION_INCOMPLETE");
assert.equal(called,0);

result=await fetchViatorProducts("auckland",{config:cfg,fetchImpl:async(url,init)=>{
  called++;
  assert.match(url,/\/api\/viator\/products$/);
  assert.equal(init.credentials,"omit");
  return response({ok:true,destination:{id:"391",name:"Auckland"},products:[{productCode:"X",title:"Experience",productUrl:"https://www.viator.com/tours/test"}]});
}});
assert.equal(result.ok,true);
assert.equal(result.products.length,1);
assert.equal(called,1);

console.log("Viator public client gate: ok");
