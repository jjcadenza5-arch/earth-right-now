import { destinationSearch } from "../src/destination-search.js";import { placeAnswer } from "../src/place-answer.js";
const now=new Date("2026-09-20T05:00:00Z"),base={health:"HEALTHY",permission:"LINK_ONLY",playback:"EXTERNAL",sourceUrl:"https://example.com",checkedAt:"2026-09-20T04:00:00Z",lastSuccessfulCheck:"2026-09-20T04:00:00Z",country:"Thailand",region:"Chiang Mai",title:"Chiang Mai",placeId:"cm"};
const rows=[{...base,id:"a",truth:"EXTERNAL_LIVE",title:"Chiang Mai Gate"},{...base,id:"b",truth:"LIVE_IMAGE",playback:"IMAGE_REFRESH",imageUrl:"https://example.com/current.jpg",title:"Chiang Mai Mountain"}];
const places=destinationSearch(rows,"Chiang Mai",{now});console.assert(places.length===1&&places[0].sources.length===2,"destination search must preserve multiple truthful windows for one place");
const answer=placeAnswer(places[0],{now});console.assert(/2 views are available/.test(answer.detail),"place answer should expose choice");
const preview={...base,id:"p",truth:"PREVIEW",playback:"PREVIEW",health:"DEGRADED"};const x=placeAnswer({title:"Reference",sources:[preview],preferred:preview},{now});console.assert(x.detail.startsWith("Reference only · not live."),"preview answer must immediately state that it is not live");
console.log("ERN destination answer quality checks passed");
