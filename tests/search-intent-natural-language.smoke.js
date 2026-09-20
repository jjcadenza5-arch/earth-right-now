import { searchEarth } from "../src/search-engine.js";
const now=new Date("2026-03-20T12:00:00Z"),base={health:"HEALTHY",permission:"PUBLIC",checkedAt:"2026-03-20T11:00:00Z",truth:"LIVE_VIDEO",playback:"EMBED",provider:"x",quality:5,moment:5,freshness:5};
const sources=[
 {...base,id:"beach",title:"Blue Coast",categories:["Beaches"],lat:0,lon:0},
 {...base,id:"city-night",title:"Night City",categories:["Cities"],lat:0,lon:180},
 {...base,id:"mountain",title:"Alpine Peak",categories:["Mountains"],lat:0,lon:0},
 {...base,id:"zoo",title:"Wild Place",categories:["Wildlife"],lat:0,lon:0}
];
console.assert(searchEarth(sources,"show me a beach live now",{now})[0]?.id==="beach","natural current beach request should resolve by intent");
console.assert(searchEarth(sources,"city lights tonight",{now}).some(x=>x.id==="city-night"),"night city intent should understand local darkness");
console.assert(searchEarth(sources,"mountains",{now})[0]?.id==="mountain","category intent should work without exact title match");
console.assert(searchEarth(sources,"animals live",{now})[0]?.id==="zoo","wildlife synonyms should resolve naturally");
console.log("ERN natural-language Search Earth checks passed");
