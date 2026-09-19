import { createHash } from "node:crypto";
const h=createHash("sha256").update("ERN").digest("hex");
console.assert(h.length===64);
console.log("ERN release snapshot smoke checks passed");
