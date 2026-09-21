import assert from "node:assert/strict";import {guideResultState,guideEmptyActionMessage} from "../src/earth-guide-flow.js";
assert.equal(guideResultState({actionType:"SEARCH",previousPlaceId:"old",resultItems:[{id:"new"}]}).placeId,"new");
assert.equal(guideResultState({actionType:"SEARCH",previousPlaceId:"old",resultItems:[{id:"a"},{id:"b"}]}).placeId,null);
assert.equal(guideResultState({actionType:"LIVE_NOW",previousPlaceId:"old"}).placeId,null);
assert.equal(guideResultState({actionType:"SURPRISE",previousPlaceId:"old"}).placeId,null);
assert.match(guideEmptyActionMessage("SURPRISE"),/suitable surprise window/);
console.log("ERN Guide flow continuity checks passed");
