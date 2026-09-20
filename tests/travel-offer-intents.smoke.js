import { travelOfferInventory } from "../src/travel-offer-registry.js";
const checkedAt=new Date().toISOString(),base={verified:true,verifiedAt:checkedAt,checkedAt,health:"HEALTHY",placeId:"p",title:"Option",provider:"Provider",url:"https://example.com"};
const offers=["stay","eat","transport","activities","culture","services"].map((intent,i)=>({...base,id:"o"+i,intent}));
const x=travelOfferInventory(offers,{now:new Date()});
console.assert(x.total===6&&x.placeCount===1,"verified travel inventory should count visible offers");
console.assert(Object.keys(x.byIntent).join(",")==="stay,eat,transport,activities,culture,services","inventory intents must match the travel bridge");
console.assert(Object.values(x.byIntent).every(n=>n===1),"every supported intent should be counted");
console.log("ERN travel offer intent consistency checks passed");
