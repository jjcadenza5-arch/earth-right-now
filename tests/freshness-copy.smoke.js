import { sourceFreshness,freshnessCopy,ageCopy } from "../src/freshness-copy.js";
const now=Date.parse("2026-09-19T12:00:00Z"),base={truth:"EXTERNAL_LIVE",playback:"EXTERNAL",checkedAt:"2026-09-19T10:00:00Z"};
let x=sourceFreshness(base,{now});console.assert(x.state==="CURRENT_CHECK"&&x.ageHours===2&&freshnessCopy(base,{now})==="Checked 2h ago");
const stale={...base,checkedAt:"2026-09-15T12:00:00Z"};console.assert(sourceFreshness(stale,{now}).state==="STALE_CHECK"&&freshnessCopy(stale,{now}).startsWith("Recheck due"));
console.assert(freshnessCopy({...base,checkedAt:""},{now})==="Not yet verified");
console.assert(ageCopy(.4)==="within the last hour"&&ageCopy(47)==="47h ago"&&ageCopy(49)==="2d ago");
console.assert(freshnessCopy({...base,checkedAt:"2026-09-16T12:00:00Z"},{now}).includes("3d ago"));
console.log("ERN freshness copy smoke checks passed");
