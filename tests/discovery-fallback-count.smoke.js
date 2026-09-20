import { discoveryStatus } from "../src/discovery-result.js";
console.assert(discoveryStatus({query:"x",count:2,windowCount:3,referenceCount:1,empty:false})==="2 destinations · 2 current/live views · 1 reference image","search status should distinguish live-like windows from reference images");
console.assert(discoveryStatus({query:"x",count:1,windowCount:1,referenceCount:1,empty:false})==="1 destination · 1 reference image","reference-only search must not call a photo a window");
console.log("ERN discovery fallback-count checks passed");
