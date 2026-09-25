import fs from "node:fs";
import assert from "node:assert/strict";

const src=fs.readFileSync("scripts/build-operator-review.mjs","utf8");
assert.match(src,/reviewQueue\.renewable/);
assert.match(src,/Renew verified LIVE HERE windows anytime/);
assert.match(src,/proof becomes due after this page was deployed/);
assert.match(src,/evergreenRenewals\.map\(x=>card\(x,"restore"\)\)/);
assert.match(src,/\["renew-anytime",x\.id/);
console.log("Operator review keeps current verified windows manually renewable between deploys");
