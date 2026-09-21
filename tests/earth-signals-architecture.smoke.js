import assert from "node:assert/strict";import fs from "node:fs";
const files=["src/earth-signals.js","src/earth-signal-view-model.js","src/earth-signal-guide.js","src/earth-signal-input-policy.js","src/earth-signal-media-policy.js","src/earth-signal-moderation.js","src/earth-signal-activation.js","src/earth-signal-launch-readiness.js","src/earth-now-feed.js"];
for(const file of files)assert.ok(fs.existsSync(file),`missing Earth Signals layer: ${file}`);
const doc=fs.readFileSync("docs/EARTH_SIGNALS_ARCHITECTURE.md","utf8");
for(const phrase of ["45 minutes","Near this place ✓","read-only","automatic expiry/deletion","visitor reporting"])assert.ok(doc.includes(phrase),`architecture must preserve: ${phrase}`);
console.log("Earth Signals architecture coherence checks passed");
