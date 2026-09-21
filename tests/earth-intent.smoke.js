import { interpretEarthIntent,earthIntentHints } from "../src/earth-intent.js";
import { interpretERNQuery } from "../src/ern-ai.js";
let x=interpretEarthIntent("Show me a peaceful beach live now");console.assert(x.wantsCurrent&&x.intents.includes("water")&&x.intents.includes("beautiful"));
x=interpretEarthIntent("ดูสดตอนนี้");console.assert(x.wantsCurrent,"Thai current/live wording should be understood without pretending to translate destination terms");
console.assert(interpretERNQuery("busy city").intents.includes("human")&&interpretERNQuery("busy city").intents.includes("happening"));const localLife=interpretEarthIntent("local market street life");console.assert(localLife.intents.includes("human")&&localLife.intents.includes("happening"),"local-life prompts should map to both human activity and happening");console.assert(!interpretEarthIntent("wildlife nature").intents.includes("happening"),"generic life wording must not imply active human/current activity");
console.assert(interpretEarthIntent("reference photos").intents.includes("reference"),"explicit photo/reference requests should be recognized without treating photos as live");
for(const q of ["What can I see at the moment?","Show me what is currently live","What is happening at this moment?"])console.assert(interpretEarthIntent(q).wantsCurrent,`natural current wording should be understood: ${q}`);
console.assert(earthIntentHints("").empty&&earthIntentHints("Chiang").broad);
console.log("ERN Earth intent smoke checks passed");
