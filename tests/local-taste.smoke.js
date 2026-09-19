import {buildLocalTaste,tasteScore,personalizeSources} from "../src/local-taste.js";
const sources=[{id:"jp1",placeId:"tak",country:"Japan",categories:["Mountains & Snow","Beautiful Earth"]},{id:"jp2",placeId:"fuji",country:"Japan",categories:["Mountains & Snow"]},{id:"city",placeId:"ny",country:"United States",categories:["Cities & Streets"]}];
const places=[{id:"tak",country:"Japan",categories:["Mountains & Snow","Beautiful Earth"]}];
const taste=buildLocalTaste({sources,places,favoriteWindowIds:["jp1"],favoritePlaceIds:["tak"]});
console.assert(taste.signals===2);console.assert(tasteScore(sources[1],taste)>tasteScore(sources[2],taste));console.assert(personalizeSources([sources[2],sources[1]],taste)[0].id==="jp2");console.assert(buildLocalTaste({sources}).signals===0);console.log("ERN local taste smoke checks passed");
