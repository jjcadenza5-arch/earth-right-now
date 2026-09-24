import assert from "node:assert/strict";import {commercialInventoryStatus} from "../src/commercial-inventory-status.js";
const sources=[{id:"p1",placeId:"p1",title:"Place",country:"X",region:"Y"}],now=new Date("2026-09-24T12:00:00Z");
let r=commercialInventoryStatus({sources,partners:[],offers:[]},{now});
assert.equal(r.stage,"EMPTY_STAGING");assert.equal(r.publicActivationAllowed,false);assert.equal(r.partnerRegistry.total,0);assert.equal(r.travelOfferRegistry.total,0);
assert.equal(r.safety.inventPartnersAllowed,false);assert.equal(r.safety.unverifiedOffersVisible,false);assert.equal(r.safety.undisclosedAffiliateLinksAllowed,false);assert.equal(r.safety.paidRankingAllowed,false);

const partners=[{id:"stay-1",name:"Example Stay",intent:"stay",baseUrl:"https://example.com/",affiliate:true,sponsored:false,enabled:true,verifiedAt:"2026-09-20T00:00:00Z",expiresAt:"2026-12-31T00:00:00Z"}];
const offers=[{id:"offer-1",placeId:"p1",intent:"stay",title:"Example Stay",provider:"Example Stay",url:"https://example.com/book",affiliate:true,sponsored:false,verified:true,verifiedAt:"2026-09-20T00:00:00Z"}];
r=commercialInventoryStatus({sources,partners,offers},{now});
assert.equal(r.stage,"ACTIVE");assert.equal(r.publicActivationAllowed,true);assert.equal(r.partnerRegistry.active,1);assert.equal(r.travelOfferRegistry.current,1);assert.equal(r.travelOfferRegistry.placeCoverage,1);assert.equal(r.travelOfferRegistry.rows[0].disclosure,"Affiliate link");
console.log("ERN commercial inventory staging passed");
