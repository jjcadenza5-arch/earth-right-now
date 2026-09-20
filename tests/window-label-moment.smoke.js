import { currentWindowEyebrow,currentWindowAction } from "../src/current-window-label.js";import { sourceActionMeta } from "../src/source-action-labels.js";import { windowStripLabel } from "../src/window-strip.js";
const now=new Date("2026-03-20T12:00:00Z"),s={id:"x",title:"City",truth:"EXTERNAL_LIVE",permission:"LINK_ONLY",health:"HEALTHY",playback:"EXTERNAL",sourceUrl:"https://example.com",checkedAt:now.toISOString(),lastSuccessfulCheck:now.toISOString(),quality:80};
console.assert(currentWindowEyebrow(s,{now})==="CURRENT AT SOURCE"&&currentWindowAction(s,{now})==="Open current source","current labels should use supplied moment");
const future=new Date("2026-04-20T12:00:00Z");console.assert(currentWindowEyebrow(s,{now:future})==="SOURCE"&&currentWindowAction(s,{now:future})==="Open source","expired labels must stop saying current");
console.assert(sourceActionMeta(s,{now:future}).label==="Open source"&&windowStripLabel(s,0,{now:future}).eyebrow==="SOURCE","action and strip labels must agree");
console.log("ERN window-label moment checks passed");
