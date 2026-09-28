import assert from "node:assert/strict";
import {normalizeSeoulRealtimeContext,publicSeoulContext,seoulContextFreshness} from "../src/realtime-context-adapter.js";

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
assert.equal(normalizeSeoulRealtimeContext({citydata_eng:{row:[{AREA_NM:"X",LIVE_PPLTN_STTS:[{AREA_CONGEST_LVL:"Busy"}]}]}}).reason,"SOURCE_TIMESTAMP_MISSING");
console.log("ERN Seoul context adapter fails closed on stale, unmapped or untimestamped data");
