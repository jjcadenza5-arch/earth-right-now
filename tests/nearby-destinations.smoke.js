import { destinationCentroid,distanceKm,nearbyDestinations } from "../src/nearby-destinations.js";
const origin={id:"a",lat:18.7883,lon:98.9853},near={id:"b",lat:18.80,lon:99.00},far={id:"c",lat:13.7563,lon:100.5018};
console.assert(destinationCentroid({sources:[{lat:10,lon:20},{lat:12,lon:24}]}).lat===11);
console.assert(distanceKm(origin,near)<10&&distanceKm(origin,far)>500);
const results=nearbyDestinations(origin,[origin,far,near],{maxKm:300,limit:4});console.assert(results.length===1&&results[0].place.id==="b","nearby discovery must exclude origin and distant places");
console.assert(nearbyDestinations({id:"x"},[near]).length===0,"missing coordinates must fail closed without asking for visitor location");
console.log("ERN nearby destination smoke checks passed");
