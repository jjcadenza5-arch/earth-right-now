import assert from"node:assert/strict";import{travelOffer}from"../src/travel-bridge.js";const place={id:"p",title:"Place",country:"TH"};
const base={id:"o",intent:"stay",title:"Stay",provider:"Provider",url:"https://example.com/hotel"};
assert.ok(travelOffer(base,{place,verified:true}));
assert.equal(travelOffer({...base,url:"http://example.com/"},{place,verified:true}),null);
assert.equal(travelOffer({...base,url:"https://user:pass@example.com/"},{place,verified:true}),null);
assert.equal(travelOffer({...base,url:"javascript:alert(1)"},{place,verified:true}),null);
console.log("travel link HTTPS safety passed");