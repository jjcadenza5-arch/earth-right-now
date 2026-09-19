import { balancedLiveWindows } from "../src/balanced-live-windows.js";
const now=new Date().toISOString(),base={health:"HEALTHY",truth:"EXTERNAL_LIVE",permission:"LINK_ONLY",playback:"EXTERNAL",sourceUrl:"https://example.test",checkedAt:now,lastSuccessfulCheck:now};
const xs=[{...base,id:"a1",placeId:"a",country:"A",quality:99},{...base,id:"a2",placeId:"a",country:"A",quality:98},{...base,id:"b",placeId:"b",country:"A",quality:97},{...base,id:"c",placeId:"c",country:"A",quality:96},{...base,id:"d",placeId:"d",country:"B",quality:95}];const out=balancedLiveWindows(xs,{limit:8});console.assert(out.map(x=>x.id).join()==="a1,b,d","one place and max two country windows should prevent repetitive live shelf");
console.log("ERN balanced live windows smoke checks passed");
