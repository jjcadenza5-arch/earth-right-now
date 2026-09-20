import { solarMoment } from "../src/solar-moment.js";
const now=new Date("2026-03-20T12:00:00Z");
for(const source of [{},{lat:null,lon:null},{lat:"",lon:""},{lat:undefined,lon:0}]){
 console.assert(solarMoment(source,now).phase==="UNKNOWN","missing coordinates must stay unknown rather than becoming 0,0");
}
console.assert(solarMoment({lat:0,lon:0},now).phase!=="UNKNOWN","real zero coordinates remain valid");
console.log("ERN solar coordinate truth checks passed");
