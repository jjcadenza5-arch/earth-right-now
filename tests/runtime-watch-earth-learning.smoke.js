import { rememberRuntimeFailure,runtimeWatchEarthSources,runtimeFailureState,clearAllRuntimeFailures } from "../src/runtime-source-health.js";
const mem=new Map();globalThis.localStorage={getItem:k=>mem.get(k)||null,setItem:(k,v)=>mem.set(k,v),removeItem:k=>mem.delete(k)};
clearAllRuntimeFailures();const s={id:"bad-window"},good={id:"good-window"},now=Date.now();
console.assert(runtimeWatchEarthSources([s,good],now).length===2,"one-off failure should not instantly erase a window");
rememberRuntimeFailure(s,{kind:"PLAYBACK_FAILED"},now);console.assert(runtimeFailureState(s.id,now).count===1);console.assert(runtimeWatchEarthSources([s,good],now).length===2);
rememberRuntimeFailure(s,{kind:"PLAYBACK_FAILED"},now+1);console.assert(runtimeFailureState(s.id,now+1).count===2);console.assert(runtimeWatchEarthSources([s,good],now+1).map(x=>x.id).join(",")==="good-window","repeated failure should quarantine the window for this visit");
console.log("ERN runtime Watch Earth quality learning checks passed");
