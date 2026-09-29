import {buildStoryDeck,storyCard,STORY_PRINCIPLE} from "../src/ern-stories.js";
const now=new Date("2026-09-28T08:00:00Z");
const base={health:"HEALTHY",permission:"LINK_ONLY",playback:"EXTERNAL",truth:"LIVE_VIDEO",checkedAt:"2026-09-28T07:50:00Z",lastSuccessfulCheck:"2026-09-28T07:50:00Z",sourceUrl:"https://example.com/live",categories:["Cities"],lat:35,lon:139,quality:80,moment:80};
const rows=[
 {...base,id:"a",placeId:"tokyo",place:"Tokyo",title:"Tokyo current",country:"Japan",categories:["Cities","Beautiful Earth"],quality:99,moment:99},
 {...base,id:"b",placeId:"tokyo",place:"Tokyo",title:"Tokyo second",country:"Japan",sourceUrl:"https://example.com/live2"},
 {...base,id:"c",placeId:"bergen",place:"Bergen",title:"Bergen current",country:"Norway",sourceUrl:"https://example.org/live",lat:60,lon:5,categories:["Useful Earth"],quality:60,moment:60},
 {...base,id:"d",placeId:"market",place:"Market",title:"Interesting market",country:"Thailand",sourceUrl:"https://example.net/live",lat:18,lon:99,categories:["Interesting Earth"],quality:55,moment:55},
 {...base,id:"e",placeId:"coast",place:"Coast",title:"Beautiful coast",country:"Portugal",sourceUrl:"https://example.edu/live",lat:38,lon:-9,categories:["Beautiful Earth"],quality:95,moment:95}
];
const story=storyCard(rows[0],{now});console.assert(story.question.endsWith("?"),"Story hook must be a question");
console.assert(!/amazing|must see|happening now|crowd|raining/i.test(story.question),"Story question must not manufacture a condition");
const deck=buildStoryDeck(rows,{now,limit:9});
console.assert(deck.length===4,"Story deck must deduplicate places");
console.assert(new Set(deck.map(x=>x.placeId)).size===deck.length,"Story deck place identity must stay unique");
const lenses=new Set(deck.flatMap(x=>x.editorialLenses||[]));
console.assert(lenses.has("USEFUL"),"Story deck should preserve a useful-current lane when available");
console.assert(lenses.has("INTERESTING"),"Story deck should preserve an interesting-current lane when available");
console.assert(lenses.has("BEAUTIFUL"),"Story deck should preserve a beautiful-current lane when available");
const topThree=buildStoryDeck(rows,{now,limit:3});
console.assert(topThree.some(x=>x.editorialLenses.includes("USEFUL")),"Top three should include Useful Earth when current evidence exists");
console.assert(topThree.some(x=>x.editorialLenses.includes("INTERESTING")),"Top three should include Interesting Earth when current evidence exists");
console.assert(topThree.some(x=>x.editorialLenses.includes("BEAUTIFUL")),"Top three should include Beautiful Earth when current evidence exists");
console.assert(STORY_PRINCIPLE==="Do not push the answer. Create the question.");
console.log("ERN Stories stays curiosity-first, truth-gated and editorially balanced");
