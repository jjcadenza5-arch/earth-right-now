import {buildStoryDeck,storyCard,STORY_PRINCIPLE} from "../src/ern-stories.js";
const now=new Date("2026-09-28T08:00:00Z");
const base={health:"HEALTHY",permission:"LINK_ONLY",playback:"EXTERNAL",truth:"LIVE_VIDEO",checkedAt:"2026-09-28T07:50:00Z",lastSuccessfulCheck:"2026-09-28T07:50:00Z",sourceUrl:"https://example.com/live",categories:["Cities"],lat:35,lon:139};
const rows=[
 {...base,id:"a",placeId:"tokyo",place:"Tokyo",title:"Tokyo current",country:"Japan"},
 {...base,id:"b",placeId:"tokyo",place:"Tokyo",title:"Tokyo second",country:"Japan",sourceUrl:"https://example.com/live2"},
 {...base,id:"c",placeId:"bergen",place:"Bergen",title:"Bergen current",country:"Norway",sourceUrl:"https://example.org/live",lat:60,lon:5}
];
const story=storyCard(rows[0],{now});console.assert(story.question.endsWith("?"),"Story hook must be a question");
console.assert(!/amazing|must see|happening now|crowd|raining/i.test(story.question),"Story question must not manufacture a condition");
const deck=buildStoryDeck(rows,{now,limit:9});
console.assert(deck.length===2,"Story deck must deduplicate places");
console.assert(new Set(deck.map(x=>x.placeId)).size===deck.length,"Story deck place identity must stay unique");
console.assert(STORY_PRINCIPLE==="Do not push the answer. Create the question.");
console.log("ERN Stories stays curiosity-first and truth-gated");
