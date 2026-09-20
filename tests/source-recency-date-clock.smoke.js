import { ageHours,recencyState } from "../src/source-recency.js";
const now=new Date("2026-03-20T12:00:00Z"),s={truth:"LIVE_VIDEO",playback:"EMBED",checkedAt:now.toISOString(),lastSuccessfulCheck:now.toISOString()};
console.assert(ageHours(s.checkedAt,now)===0,"recency clock should accept Date objects");
console.assert(recencyState(s,{now})==="CURRENT_CHECK","Date-based supplied moment should preserve current source");
console.assert(recencyState(s,{now:new Date("2026-03-22T12:00:00Z")})==="STALE_CHECK","Date-based future moment should age source normally");
console.log("ERN recency Date-clock checks passed");
