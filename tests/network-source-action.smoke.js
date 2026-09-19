import { sourceActionForNetwork } from "../src/network-source-action.js";
const embed={id:"x",health:"HEALTHY",truth:"LIVE_VIDEO",permission:"EMBED_ALLOWED",playback:"EMBED",embedUrl:"https://www.youtube.com/embed/x",sourceUrl:"https://www.youtube.com/watch?v=x",checkedAt:new Date().toISOString()};
console.assert(sourceActionForNetwork(embed,{online:true,constrained:false}).action==="PLAY");
const slow=sourceActionForNetwork(embed,{online:true,constrained:true});console.assert(slow.action==="EXTERNAL"&&slow.networkReason==="CONSTRAINED_EMBED");
console.assert(sourceActionForNetwork(embed,{online:false,constrained:false}).action==="UNAVAILABLE");
console.log("ERN network source action smoke checks passed");
