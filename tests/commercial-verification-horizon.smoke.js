import assert from "node:assert/strict";import {commercialVerificationHorizon} from "../src/commercial-verification-horizon.js";
const now=new Date("2026-09-24T12:00:00Z");
const partners=[
 {id:"p-current",name:"Current",intent:"stay",baseUrl:"https://example.com/a",affiliate:true,sponsored:false,enabled:true,verifiedAt:"2026-09-20T00:00:00Z",expiresAt:"2026-11-30T00:00:00Z"},
 {id:"p-due",name:"Due",intent:"stay",baseUrl:"https://example.com/b",affiliate:true,sponsored:false,enabled:true,verifiedAt:"2026-09-01T00:00:00Z",expiresAt:"2026-10-02T12:00:00Z"},
 {id:"p-expired",name:"Expired",intent:"stay",baseUrl:"https://example.com/c",affiliate:true,sponsored:false,enabled:true,verifiedAt:"2026-08-01T00:00:00Z",expiresAt:"2026-09-20T00:00:00Z"},
 {id:"p-off",name:"Off",intent:"stay",baseUrl:"https://example.com/d",affiliate:true,sponsored:false,enabled:false,verifiedAt:"2026-09-01T00:00:00Z",expiresAt:"2026-12-01T00:00:00Z"}
];
const offers=[
 {id:"o-current",placeId:"x",intent:"stay",title:"Current Offer",provider:"Provider",url:"https://example.com/o1",verified:true,verifiedAt:"2026-09-01T00:00:00Z"},
 {id:"o-due",placeId:"x",intent:"stay",title:"Due Offer",provider:"Provider",url:"https://example.com/o2",verified:true,verifiedAt:"2026-07-03T12:00:00Z"},
 {id:"o-old",placeId:"x",intent:"stay",title:"Old Offer",provider:"Provider",url:"https://example.com/o3",verified:true,verifiedAt:"2026-06-01T00:00:00Z"},
 {id:"o-bad",placeId:"x",intent:"stay",title:"Bad Offer",provider:"Provider",url:"https://example.com/o4",verified:false,verifiedAt:"2026-09-20T00:00:00Z"}
];
const r=commercialVerificationHorizon({partners,offers},{now});
assert.equal(r.summary.partners.current,1);assert.equal(r.summary.partners.due14,1);assert.equal(r.summary.partners.expired,1);assert.equal(r.summary.partners.inactive,1);
assert.equal(r.summary.offers.current,1);assert.equal(r.summary.offers.due7,1);assert.equal(r.summary.offers.expired,1);assert.equal(r.summary.offers.reviewRequired,1);
assert.ok(r.urgent.some(x=>x.id==="p-due"));assert.ok(r.urgent.some(x=>x.id==="o-due"));
assert.equal(r.safety.automaticActivationAllowed,false);assert.equal(r.safety.automaticRenewalAllowed,false);assert.equal(r.safety.publicRankingAffected,false);assert.equal(r.safety.inventedInventoryAllowed,false);
console.log("ERN commercial verification horizon passed");
