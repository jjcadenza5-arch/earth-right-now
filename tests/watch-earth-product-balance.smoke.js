import assert from "node:assert/strict";import {watchEarthProductBalance} from "../src/watch-earth-product-balance.js";
const now=new Date("2026-09-24T09:00:00Z"),base={health:"HEALTHY",permission:"LINK_ONLY",truth:"EXTERNAL_LIVE",playback:"EXTERNAL",sourceUrl:"https://example.com",checkedAt:now.toISOString(),lastSuccessfulCheck:now.toISOString(),quality:90,moment:90,freshness:90,categories:["Cities & Streets"],lat:0,lon:0};
const external=Array.from({length:20},(_,i)=>({...base,id:"e"+i,placeId:"e"+i,country:"E"+i}));
const inside=Array.from({length:3},(_,i)=>({...base,id:"i"+i,placeId:"i"+i,country:"I"+i,truth:"LIVE_VIDEO",permission:"EMBED_ALLOWED",playback:"EMBED",embedUrl:"https://couchtourist.com/embed/cam/"+(9100+i)+"/"}));
const r=watchEarthProductBalance([...external,...inside],{now,target:20,preferredInside:5,externalSoftCap:12});
assert.equal(r.strongCurrent,23);assert.equal(r.insideCurrent,3);assert.equal(r.externalCurrent,20);assert.equal(r.insideShortfall,2);assert.equal(r.recommendedLimit,15);assert.equal(r.recommendedReduction,5);assert.equal(r.status,"INSIDE_SHORTFALL");
console.log("ERN Watch Earth product balance diagnostic passed");
