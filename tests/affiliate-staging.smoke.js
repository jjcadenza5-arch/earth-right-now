import fs from "node:fs";
const a=JSON.parse(fs.readFileSync("data/affiliate-staging.json","utf8"));
for(const [id,p] of Object.entries(a.programs||{})){
 console.assert(p.publicLinksEnabled===false,`${id} must remain public-off before approval`);
 console.assert(p.trackingConfigured===false,`${id} tracking must remain unconfigured before approval`);
 console.assert(p.privateStagingVerified===false,`${id} cannot be staging-verified before setup`);
 console.assert(!p.acceptanceEvidence,`${id} must not claim acceptance evidence`);
}
console.assert(a.publicActivationAllowed===false);
console.log("affiliate staging smoke: ok");
