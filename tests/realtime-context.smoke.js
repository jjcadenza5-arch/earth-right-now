import assert from "node:assert/strict";
import {normalizeSeoulRealtimeContext,publicSeoulContext,seoulContextFreshness,validateSeoulMappedResponse} from "../src/realtime-context-adapter.js";
import mappingRegistry from "../data/seoul-context-place-mappings.json" with {type:"json"};

const payload={citydata_eng:{row:[{
  AREA_NM:"Gwanghwamun·Deoksugung",AREA_CD:"POI001",
  LIVE_PPLTN_STTS:[{AREA_CONGEST_LVL:"Normal",AREA_CONGEST_MSG:"Visitor flow is normal.",AREA_PPLTN_MIN:"12000",AREA_PPLTN_MAX:"14000",PPLTN_TIME:"2026-09-28T16:40:00Z"}]
}]}};
const r=normalizeSeoulRealtimeContext(payload,{areaAllowlist:["POI001"]});
assert.equal(r.ok,true);
assert.equal(r.context.cameraTruth,false);
assert.equal(r.context.mayCreateLiveLabel,false);
assert.equal(r.context.crowd.populationMin,12000);
assert.equal(publicSeoulContext(r,{now:new Date("2026-09-28T16:45:00Z"),maxAgeMinutes:15}).ok,true);
assert.equal(seoulContextFreshness(r.context,{now:new Date("2026-09-28T17:10:00Z"),maxAgeMinutes:15}).current,false);
assert.equal(publicSeoulContext(r,{now:new Date("2026-09-28T17:10:00Z"),maxAgeMinutes:15}).reason,"STALE_CONTEXT");
assert.equal(normalizeSeoulRealtimeContext(payload,{areaAllowlist:["OTHER"]}).reason,"AREA_NOT_APPROVED");
assert.equal(normalizeSeoulRealtimeContext({citydata_eng:{row:[{AREA_NM:"X",LIVE_PPLTN_STTS:[{AREA_CONGEST_LVL:"Busy"}]}]}},{observedAt:"2026-09-28T16:40:00Z"}).reason,"SOURCE_TIMESTAMP_MISSING");
assert.equal(seoulContextFreshness({sourceObservedAt:"2026-09-28T17:00:00Z"},{now:new Date("2026-09-28T16:55:00Z"),maxFutureSkewMinutes:2}).reason,"SOURCE_TIMESTAMP_IN_FUTURE");
const mapped=validateSeoulMappedResponse(payload,{registry:mappingRegistry,placeId:"seoul-plaza"});
assert.equal(mapped.ok,true);
assert.equal(mapped.publicActivationAllowed,false);
const wrongPayload={citydata_eng:{row:[{AREA_NM:"Hongdae",AREA_CD:"POI002",LIVE_PPLTN_STTS:[{AREA_CONGEST_LVL:"Busy",PPLTN_TIME:"2026-09-28T16:40:00Z"}]}]}};
assert.equal(validateSeoulMappedResponse(wrongPayload,{registry:mappingRegistry,placeId:"seoul-plaza"}).reason,"AREA_NOT_APPROVED");
console.log("ERN Seoul context adapter fails closed on stale, unmapped or untimestamped data");
