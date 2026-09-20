import { commercialPlacementAllowed,commercialLabel,rankingMayUsePayment } from "../src/commercial-policy.js";
const place={id:"chiang-mai"},verified={verified:true,url:"https://example.test",placeId:"chiang-mai",affiliate:true};
console.assert(commercialPlacementAllowed({offer:verified,place}));
console.assert(!commercialPlacementAllowed({offer:{...verified,verified:false},place}));
console.assert(!commercialPlacementAllowed({offer:{...verified,placeId:"other"},place}));
console.assert(commercialLabel(verified)==="Affiliate link");
console.assert(rankingMayUsePayment()===false,"payment must never influence ERN view ranking");
console.log("ERN commercial policy smoke checks passed");
