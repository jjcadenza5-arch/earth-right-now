import fs from "node:fs";import assert from "node:assert/strict";import {localDirectoryStatus} from "../src/local-directory-status.js";
const rows=JSON.parse(fs.readFileSync("data/local-directory.json","utf8"));
const sources=JSON.parse(fs.readFileSync("data/sources.json","utf8"));
const known=[...new Set(sources.map(s=>String(s.placeId||s.id||"")).filter(Boolean))];
const r=localDirectoryStatus(rows,{knownPlaceIds:known,targetApproved:10,now:new Date("2026-09-25T15:30:00Z")});
assert.equal(r.total,10);assert.equal(r.valid,10);assert.equal(r.invalid,0);assert.equal(r.approved,10);assert.equal(r.state,"PILOT_COMPLETE");assert.equal(r.nextAction,"HOLD_UNTIL_MATERIAL_LOCAL_EVIDENCE_OR_PRODUCT_DECISION");
assert.equal(r.safety.paidRankingAllowed,false);assert.equal(r.safety.affiliateRelationshipImplied,false);assert.equal(r.safety.automaticApprovalAllowed,false);assert.equal(r.safety.automaticDirectoryMutationAllowed,false);
for(const x of r.items){assert.equal(x.valid,true);assert.equal(x.paidPlacement,false);assert.equal(x.affiliate,false)}
const bad=localDirectoryStatus([{id:"x",name:"X",type:"cafe",place:"P",country:"C",summary:"S",url:"http://example.com",verifiedAt:"2026-09-25T16:00:00Z",status:"APPROVED",paidPlacement:true,affiliate:true}],{targetApproved:1,now:new Date("2026-09-25T15:30:00Z")});
assert.equal(bad.state,"INVALID_DIRECTORY");assert.ok(bad.items[0].reasons.includes("INVALID_PUBLIC_URL"));assert.ok(bad.items[0].reasons.includes("PAID_PLACEMENT_NOT_FALSE"));assert.ok(bad.items[0].reasons.includes("AFFILIATE_NOT_FALSE"));assert.ok(bad.items[0].reasons.includes("VERIFIED_AT_IN_FUTURE"));
console.log("ERN Local Earth directory pilot is finite and editorial");
