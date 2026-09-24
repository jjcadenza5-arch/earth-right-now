import {readFile} from "node:fs/promises";
import {businessReadiness} from "../src/business-readiness.js";
import {commercialInventoryStatus} from "../src/commercial-inventory-status.js";
import {submissionTransportReadiness} from "../src/submission-transport-readiness.js";

const read=async url=>JSON.parse(await readFile(url,"utf8"));
const sources=await read(new URL("../data/sources.json",import.meta.url));
const partners=await read(new URL("../data/affiliate-partners.json",import.meta.url));
const offers=await read(new URL("../data/travel-offers.json",import.meta.url));
const transportRaw=await read(new URL("../data/submission-transport.json",import.meta.url));
const inventory=commercialInventoryStatus({sources,partners,offers},{now:new Date()});
const transport=submissionTransportReadiness(transportRaw);
const r=businessReadiness({affiliateInventory:inventory.publicActivationAllowed,submissionTransport:transport.active});

console.log(JSON.stringify({
  readiness:r,
  inventory:{
    stage:inventory.stage,
    publicActivationAllowed:inventory.publicActivationAllowed,
    activePartners:inventory.partnerRegistry.active,
    currentOffers:inventory.travelOfferRegistry.current,
    placeCoverage:inventory.travelOfferRegistry.placeCoverage
  },
  submissionTransport:{status:transport.status,active:transport.active,missing:transport.missing}
},null,2));
