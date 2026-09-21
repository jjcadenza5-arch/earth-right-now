import assert from "node:assert/strict";import {guideTransientState} from "../src/earth-guide-ui-state.js";
assert.deepEqual(guideTransientState({type:"MISSING_CONTEXT"}),{clearResults:true,clearStatus:true,clearFollowUps:true});
assert.deepEqual(guideTransientState({type:"PRICE"},{hasPlace:true}),{clearResults:false,clearStatus:true,clearFollowUps:false});
assert.equal(guideTransientState({type:"QUIET"},{hasPlace:false}).clearResults,true);
assert.equal(guideTransientState(null).clearResults,false);
console.log("ERN Guide transient UI state checks passed");
