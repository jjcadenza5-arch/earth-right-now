import {rankForIntent} from "../src/ern-ai.js";import {buildLocalTaste} from "../src/local-taste.js";
const now=new Date("2026-03-20T12:00:00Z"),base={truth:"EXTERNAL_LIVE",permission:"LINK_ONLY",health:"HEALTHY",playback:"EXTERNAL",checkedAt:now.toISOString(),lastSuccessfulCheck:now.toISOString(),quality:85,freshness:90,moment:85,sourceUrl:"https://example.com"};
const exact={...base,id:"cm",placeId:"cm",title:"Chiang Mai Old City",region:"Chiang Mai",country:"Thailand",categories:["Cities & Streets"]},tasteSource={...base,id:"zurich",placeId:"zurich",title:"Zürich Lake",region:"Zürich",country:"Switzerland",categories:["Beautiful Earth","Cities & Harbours"]};
const taste=buildLocalTaste({sources:[exact,tasteSource],favoriteWindowIds:["zurich","zurich","zurich"]}),r=rankForIntent([tasteSource,exact],"Chiang Mai",{taste,now});
console.assert(r[0]?.id==="cm","explicit place request must outrank unrelated personalization");
console.log("ERN direct-place intent beats personalization check passed");
