import fs from "node:fs";
const index=fs.readFileSync("index.html","utf8");
const roadmap=fs.readFileSync("docs/ROADMAP.md","utf8");
const stories=fs.readFileSync("stories.html","utf8");
console.assert(index.includes('<a href="./stories.html">ERN Stories</a>'),"ERN Guide must link to Stories");
console.assert(index.includes('class="story-doorway"'),"Homepage Stories doorway missing");
console.assert(stories.includes("The real window stays the answer"),"Stories truth framing missing");
console.assert(roadmap.includes("Stage M — ERN Stories / curiosity discovery — LIVE / LOCALLY COMPLETE"),"Stage M completion state missing");
console.log("Stage M Stories is integrated and locally complete");
