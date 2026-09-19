import { distanceLabel,nearbyDestinationViewModel } from "../src/nearby-destination-view-model.js";
console.assert(distanceLabel(.45)==="450 m away");console.assert(distanceLabel(4.26)==="4.3 km away");console.assert(distanceLabel(42.6)==="43 km away");
const origin={id:"a",lat:18.79,lon:98.98},near={id:"b",lat:18.80,lon:98.99},far={id:"c",lat:35,lon:139};const rows=nearbyDestinationViewModel(origin,[origin,far,near],{maxKm:50});console.assert(rows.length===1&&rows[0].place.id==="b"&&rows[0].distanceLabel.includes("km away"));
console.log("ERN nearby destination view model smoke checks passed");
