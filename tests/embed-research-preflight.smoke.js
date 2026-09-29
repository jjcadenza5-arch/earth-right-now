import assert from "node:assert/strict";
import {preflightEmbedResearchCandidate} from "../src/embed-research-preflight.js";

const calls=[];
const fetchImpl=async (url)=>{
  const u=String(url);calls.push(u);
  if(u.startsWith("https://www.youtube.com/oembed?")){
    return {status:200,url:u,json:async()=>({title:"Live @ Santa Claus Village",author_name:"City of Rovaniemi",provider_name:"YouTube"}),body:{cancel:async()=>{}}};
  }
  if(u==="https://www.youtube-nocookie.com/embed/Cp4RRAEgpeU"){
    return {status:200,url:u,body:{cancel:async()=>{}}};
  }
  if(u==="https://santaclausvillage.info/live-video-webcam/"){
    return {status:200,url:u,body:{cancel:async()=>{}}};
  }
  throw new Error("unexpected url "+u);
};

const result=await preflightEmbedResearchCandidate({
  id:"youtube-rovaniemi-santa-claus-village",
  provider:"Santa Claus Village / City of Rovaniemi",
  platform:"YouTube",
  sourceUrl:"https://santaclausvillage.info/live-video-webcam/",
  candidateEmbedUrl:"https://www.youtube-nocookie.com/embed/Cp4RRAEgpeU"
},{fetchImpl,timeoutMs:1000});

assert.equal(result.outcome,"TECHNICALLY_READY_FOR_DEPLOYED_TEST");
assert.equal(result.sourcePageReachable,true);
assert.equal(result.embedPageReachable,true);
assert.equal(result.metadataAvailable,true);
assert.equal(result.technicalReady,true);
assert.equal(result.permissionConfirmed,false);
assert.equal(result.humanPlaybackConfirmed,false);
assert.equal(result.promotionAllowed,false);
assert.match(result.oembed.target,/watch\?v=Cp4RRAEgpeU/);
assert.ok(calls.includes("https://santaclausvillage.info/live-video-webcam/"));

const unsupported=await preflightEmbedResearchCandidate({
  id:"bad",
  platform:"YouTube",
  sourceUrl:"https://example.com/current",
  candidateEmbedUrl:"https://example.com/not-youtube"
},{fetchImpl:async()=>{throw new Error("should not fetch")},timeoutMs:1000});
assert.equal(unsupported.outcome,"UNSUPPORTED_CANDIDATE");

console.log("ERN YouTube research preflight supports exact players embedded on official provider pages without promoting them");
