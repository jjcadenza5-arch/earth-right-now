import { interpretEarthIntent,earthIntentHints } from "../src/earth-intent.js";
import { interpretERNQuery } from "../src/ern-ai.js";
let x=interpretEarthIntent("Show me a peaceful beach live now");console.assert(x.wantsCurrent&&x.intents.includes("water")&&x.intents.includes("beautiful"));
x=interpretEarthIntent("ดูสดตอนนี้");console.assert(x.wantsCurrent,"Thai current/live wording should be understood without pretending to translate destination terms");
console.assert(interpretERNQuery("busy city").intents.includes("human")&&interpretERNQuery("busy city").intents.includes("happening"));console.assert(interpretEarthIntent("local market street life").intents.includes("human"),"local-life prompts should map to human activity");
console.assert(interpretEarthIntent("reference photos").intents.includes("reference"),"explicit photo/reference requests should be recognized without treating photos as live");
console.assert(earthIntentHints("").empty&&earthIntentHints("Chiang").broad);
console.log("ERN Earth intent smoke checks passed");
