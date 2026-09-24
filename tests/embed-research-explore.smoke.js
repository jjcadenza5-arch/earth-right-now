import assert from "node:assert/strict";import {preflightEmbedResearchCandidate} from "../src/embed-research-preflight.js";
const calls=[];
const fetchImpl=async url=>{calls.push(String(url));return{status:200,url:String(url),json:async()=>({title:"Brooks Falls"}),body:{cancel:async()=>{}}}};
const r=await preflightEmbedResearchCandidate({id:"explore",provider:"Explore.org",platform:"Explore",sourceUrl:"https://explore.org/livecams/currently-live/brown-bear-salmon-cam-brooks-falls",candidateEmbedUrl:"https://explore.org/livecams/player/brown-bear-salmon-cam-brooks-falls"},{fetchImpl,timeoutMs:1000});
assert.equal(r.outcome,"TECHNICALLY_READY_FOR_DEPLOYED_TEST");assert.equal(r.sourcePageReachable,true);assert.equal(r.embedPageReachable,true);assert.equal(r.technicalReady,true);assert.equal(r.permissionConfirmed,false);assert.equal(r.humanPlaybackConfirmed,false);assert.equal(r.promotionAllowed,false);assert.equal(calls.length,2);
console.log("ERN Explore research preflight passed");
