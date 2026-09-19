import {solarElevation,solarMoment,beautifulNow} from "../src/solar-moment.js";
const equator={id:"eq",lat:0,lon:0,quality:80,moment:80,categories:["Beautiful Earth"]};
console.assert(solarElevation(0,0,new Date("2026-03-20T12:00:00Z"))>80);
console.assert(solarMoment(equator,new Date("2026-03-20T06:00:00Z")).phase==="SUNRISE");
console.assert(solarMoment(equator,new Date("2026-03-20T18:00:00Z")).phase==="SUNSET");
const sunset={...equator,id:"sunset",quality:90},night={...equator,id:"night",lon:90,quality:90};
console.assert(beautifulNow([night,sunset],{now:new Date("2026-03-20T18:00:00Z")})[0].id==="sunset");
console.log("ERN solar moment / beautiful-now smoke checks passed");
