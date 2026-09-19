import { sourceFreshness,freshnessCopy } from "../src/freshness-copy.js";
const now=Date.parse("2026-09-19T12:00:00Z"),base={truth:"EXTERNAL_LIVE",playback:"EXTERNAL",checkedAt:"2026-09-19T10:00:00Z"};
let x=sourceFreshness(base,{now});console.assert(x.state==="CURRENT_CHECK"&&x.ageHours===2&&freshnessCopy(base,{now})==="Checked 2h ago");
const stale={...base,checkedAt:"2026-09-15T12:00:00Z"};console.assert(sourceFreshness(stale,{now}).state==="STALE_CHECK"&&freshnessCopy(stale,{now}).startsWith("Recheck due"));
console.assert(freshnessCopy({...base,checkedAt:""},{now})==="Not yet verified");
console.log("ERN freshness copy smoke checks passed");
