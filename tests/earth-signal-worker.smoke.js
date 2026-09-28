import fs from "node:fs";
const cfg=fs.readFileSync("signals-worker/wrangler.jsonc","utf8");
const worker=fs.readFileSync("signals-worker/src/index.js","utf8");
const state=fs.readFileSync("signals-worker/src/signal-state.js","utf8");

console.assert(cfg.includes('"ERN_EARTH_SIGNALS_ENABLED": "false"'),"Earth Signals must deploy fail-closed by default");
console.assert(cfg.includes('"class_name": "SignalState"')&&cfg.includes('"storage": "sqlite"'),"Earth Signals durable state must use SQLite");
console.assert(worker.includes("earthSignalHttpRequest"),"Worker must reuse the canonical Earth Signal HTTP contract");
console.assert(worker.includes("ERN_RATE_HMAC_KEY")&&worker.includes("CF-Connecting-IP"),"Worker must derive rate subjects server-side");
console.assert(worker.includes("rawNetworkIdentifiersStored:false"),"Health response must state raw network identifiers are not stored");
console.assert(worker.includes("TRUSTED_CATALOG_UNAVAILABLE")&&worker.includes("ERN_CATALOG_URL"),"Worker must validate places from ERN's server-fetched catalog");
console.assert(state.includes("CREATE TABLE IF NOT EXISTS signals")&&state.includes("CREATE TABLE IF NOT EXISTS reports"),"Durable signal/report storage missing");
console.assert(state.includes("CREATE TABLE IF NOT EXISTS rate_events"),"Durable subject-scoped rate state missing");
console.assert(state.includes("DELETE FROM signals WHERE expiry_at <= ?"),"Expiry cleanup must be implemented");
console.assert(state.includes("DUPLICATE_REPORT")&&state.includes("PLACE_LIMIT"),"Moderation rate boundaries missing");
console.log("earth-signal-worker deployable fail-closed foundation smoke: ok");
