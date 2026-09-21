import {earthGuideContextPlace,earthGuidePlaceAction} from "../src/earth-guide-place-context.js";
const a={id:"a",title:"Springfield",region:"North"},b={id:"b",title:"Springfield",region:"South"};
console.assert(earthGuideContextPlace("Springfield",[a,b])===null,"ambiguous place search must not bind context");
console.assert(earthGuideContextPlace("North",[a,b])===a,"unique exact region may bind context");
console.assert(earthGuideContextPlace("anything",[a])===a,"single result may bind context");
console.assert(earthGuidePlaceAction("What's nearby?",{placeId:null})===null,"follow-up needs established context");
console.log("ERN Guide context safety checks passed");
