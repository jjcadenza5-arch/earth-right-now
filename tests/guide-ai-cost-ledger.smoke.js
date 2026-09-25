import assert from "node:assert/strict";
import {createInMemoryGuideAiCostGuard} from "../src/guide-ai-cost-ledger.js";

const guard=createInMemoryGuideAiCostGuard({monthlyCeilingUsd:1,maxRequestReservationUsd:0.4,now:()=>new Date("2026-09-25T00:00:00Z")});
const a=await guard.allow();assert.equal(a.allowed,true);assert.equal(a.held,0.4);
const c=await guard.commit({usage:{estimatedCostUsd:0.25}});assert.equal(c.allowed,true);assert.equal(c.used,0.25);assert.equal(c.held,0);
await guard.allow();const c2=await guard.commit({usage:{estimatedCostUsd:0.35}});assert.equal(c2.allowed,true);assert.equal(c2.used,0.6);
const third=await guard.allow();assert.equal(third.allowed,true);
const over=await guard.commit({usage:{estimatedCostUsd:0.5}});assert.equal(over.allowed,false);assert.equal(over.reason,"USAGE_EXCEEDS_REQUEST_RESERVATION");
const final=await guard.allow();assert.equal(final.allowed,true);
await guard.release();assert.equal(guard.snapshot().held,0);
const conservative=createInMemoryGuideAiCostGuard({monthlyCeilingUsd:1,maxRequestReservationUsd:0.2,now:()=>new Date("2026-09-25T00:00:00Z")});
await conservative.allow();
const forfeited=await conservative.forfeit();
assert.equal(forfeited.forfeited,true);
assert.equal(conservative.snapshot().held,0);
assert.equal(conservative.snapshot().used,0.2);
assert.throws(()=>createInMemoryGuideAiCostGuard({monthlyCeilingUsd:1,maxRequestReservationUsd:2}),/MAX_REQUEST_RESERVATION_REQUIRED/);
console.log("Guide AI cost ledger reserves, releases pre-model failures and conservatively forfeits uncertain post-model spend");
