import { sourceStatus,promotionFor } from "../src/health-policy.js";
const now=new Date("2026-03-20T12:00:00Z"),s={truth:"LIVE_VIDEO",permission:"EMBED_ALLOWED",health:"HEALTHY",playback:"EMBED",checkedAt:now.toISOString(),lastSuccessfulCheck:now.toISOString(),quality:90};
console.assert(sourceStatus(s,{now}).live&&promotionFor(s,{now})==="PRIMARY","health policy should accept explicit Date moment");
const future=new Date("2026-04-20T12:00:00Z");console.assert(!sourceStatus(s,{now:future}).live&&promotionFor(s,{now:future})==="ATLAS","expired verification must downgrade consistently at supplied moment");
console.log("ERN health-policy moment checks passed");
