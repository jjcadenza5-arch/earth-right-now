import "./test-browser-env.mjs";
import { performSourceAction } from "../src/source-action.js";
let played=0;const player={play(){played++}};
const source={id:"x",health:"HEALTHY",truth:"LIVE_VIDEO",permission:"EMBED_ALLOWED",playback:"EMBED",embedUrl:"https://www.youtube.com/embed/x",sourceUrl:"https://www.youtube.com/watch?v=x",checkedAt:new Date().toISOString()};
console.assert(performSourceAction(source,player,{networkState:{online:true,constrained:false}})==="PLAY"&&played===1);
console.assert(performSourceAction(source,player,{networkState:{online:false,constrained:false}})==="UNAVAILABLE"&&played===1,"offline activation must not start inside media");
console.log("ERN network-aware source action smoke checks passed");
