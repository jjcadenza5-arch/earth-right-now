import { PlaybackController } from "../src/playback-controller.js";
const src={id:"x",truth:"LIVE_VIDEO",permission:"EMBED_ALLOWED",health:"HEALTHY",playback:"EMBED",embedUrl:"https://example.test/embed",sourceUrl:"https://example.test"};
const p=new PlaybackController({registry:new Map([["x",src]])});
console.assert(p.resolveMode(src)==="EMBED","healthy embed routes EMBED");
console.assert(p.resolveMode({...src,health:"OFFLINE"})==="UNAVAILABLE","offline routes unavailable");
console.assert(p.resolveMode({...src,permission:"LINK_ONLY"})==="EXTERNAL","link-only routes external");
p.play("x",{surface:"atlas"});console.assert(p.state.surface==="atlas","play preserves click context");
console.assert(!PlaybackController.toString().includes("scrollIntoView"),"controller never scrolls to Hero");
console.log("ERN playback smoke checks passed");
