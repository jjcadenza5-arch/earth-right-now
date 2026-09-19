import { groupByPlace,bestWindow } from "../src/place-model.js";

const currentCheck=new Date().toISOString();
const base={placeId:"p",title:"Place",country:"X",region:"R",categories:["Beautiful Earth"],truth:"EXTERNAL_LIVE",permission:"LINK_ONLY",health:"HEALTHY",playback:"EXTERNAL",sourceUrl:"https://example.com/",quality:80,freshness:80,moment:80};
const stale={...base,id:"stale",quality:99,checkedAt:"2020-01-01T00:00:00.000Z",lastSuccessfulCheck:"2020-01-01T00:00:00.000Z"};
const current={...base,id:"current",thumbnailUrl:"https://example.com/current.jpg",checkedAt:currentCheck,lastSuccessfulCheck:currentCheck};
const grouped=groupByPlace([stale,current]);
console.assert(grouped.length===1,"sources should group into one destination");
console.assert(grouped[0].preferred?.id==="current","destination model must expose the same current-first preferred window");
console.assert(bestWindow(grouped[0])?.id==="current","preferred window must remain current-first");
console.log("ERN preferred destination window smoke checks passed");
