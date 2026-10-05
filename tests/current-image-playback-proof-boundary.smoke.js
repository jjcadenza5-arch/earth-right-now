import assert from "node:assert/strict";
import {embedPlaybackProofState,embedPlaybackProofCurrent} from "../src/playback-proof.js";
for(const playback of ["IMAGE_REFRESH","EXTERNAL","PREVIEW"]){
 const source={playback,truth:playback==="IMAGE_REFRESH"?"LIVE_IMAGE":"EXTERNAL_LIVE"};
 const state=embedPlaybackProofState(source,{now:new Date("2026-10-05T10:00:00Z")});
 assert.equal(state.required,false,playback+" must not require human embed playback proof");
 assert.equal(state.current,true,playback+" must not be blocked by embed proof");
 assert.equal(embedPlaybackProofCurrent(source,{now:new Date("2026-10-05T10:00:00Z")}),true);
}
const embed={playback:"EMBED",truth:"LIVE_VIDEO"};
assert.equal(embedPlaybackProofState(embed,{now:new Date("2026-10-05T10:00:00Z")}).required,true);
assert.equal(embedPlaybackProofCurrent(embed,{now:new Date("2026-10-05T10:00:00Z")}),false);
console.log("Current-image sources stay machine-first while EMBED sources retain human playback-proof requirements");
