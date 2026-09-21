import { safeHttpUrl } from "../src/url-safety.js";console.assert(safeHttpUrl("https://example.test/cam"));console.assert(safeHttpUrl("javascript:alert(1)")===null);console.log("ERN URL safety smoke checks passed");
console.assert(safeHttpUrl("https://user:pass@example.test/live")===null,"credential-bearing URLs must be rejected");
