import {guidePlaceTarget} from "../src/earth-guide-place-target.js";
console.assert(guidePlaceTarget("SEE_NOW").target==="placeWindows");
console.assert(guidePlaceTarget("STAY").target==="placeTravel");
console.assert(guidePlaceTarget("NEARBY",{nearbyCount:2}).target==="placeNearby");
console.assert(guidePlaceTarget("NEARBY",{nearbyCount:0}).message==="NO_NEARBY");
console.log("ERN Guide place target checks passed");
