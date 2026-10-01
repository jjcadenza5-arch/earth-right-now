import assert from "node:assert/strict";
import fs from "node:fs";
import {spawnSync} from "node:child_process";

const state=JSON.parse(fs.readFileSync("data/distribution-channels.json","utf8"));
assert.equal(state.safety?.inventAccountClaimsAllowed,false);
assert.equal(state.safety?.automaticAccountCreationAllowed,false);
assert.equal(state.safety?.automaticPostingAllowed,false);
assert.equal(state.safety?.paidPromotionAssumed,false);
assert.equal(state.safety?.commercialRankingAffected,false);
assert.ok((state.channels||[]).every(c=>c.state==="CONNECTED"||c.automaticPostingAllowed===false));

const r=spawnSync(process.execPath,["scripts/distribution-readiness.mjs"],{encoding:"utf8"});
assert.equal(r.status,0,r.stderr||"distribution readiness failed");
const out=JSON.parse(r.stdout);
assert.equal(out.phase,"PHASE_5_DISTRIBUTION_READINESS");
assert.equal(out.websiteShareReady,true);
assert.equal(out.aiSearchReady,true);
assert.equal(out.ok,true);
assert.ok(out.externalConnectionRequired.includes("instagram"));
assert.ok(out.externalConnectionRequired.includes("line"));
assert.deepEqual(out.connectedChannels,[]);assert.equal(out.next,"HUMAN_GATE_SOCIAL_CONNECTION_DEFERRED_WEBSITE_AND_AI_SEARCH_READY");
console.log("Organic distribution stays search-ready while social account claims remain fail-closed");
