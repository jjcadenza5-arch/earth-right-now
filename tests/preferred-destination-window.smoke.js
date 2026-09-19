import { groupByPlace,bestWindow } from "../src/place-model.js";

const currentCheck=new Date().toISOString();
const base={placeId:"p",title:"Place",country:"X",region:"R",categories:["Beautiful Earth"],truth:"EXTERNAL_LIVE",permission:"LINK_ONLY",health:"HEALTHY",playback:"EXTERNAL",sourceUrl:"https://example.com/",officialUrl:"https://example.com/",attribution:"Provider",rightsBasis:"Test source",quality:80,freshness:80,moment:80};
const stale={...base,id:"stale",quality:99,checkedAt:"2020-01-01T00:00:00.000Z",lastSuccessfulCheck:"2020-01-01T00:00:00.000Z"};
const current={...base,id:"current",thumbnailUrl:"https://example.com/current.jpg",checkedAt:currentCheck,lastSuccessfulCheck:currentCheck};
const grouped=groupByPlace([stale,current]);
if(grouped.length!==1)throw new Error("sources should group into one destination");
if(grouped[0].preferred?.id!=="current")throw new Error(`destination preferred expected current, got ${grouped[0].preferred?.id}`);
if(bestWindow(grouped[0])?.id!=="current")throw new Error(`bestWindow expected current, got ${bestWindow(grouped[0])?.id}`);
console.log("ERN preferred destination window smoke checks passed");
