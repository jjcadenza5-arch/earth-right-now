import assert from "node:assert/strict";import {preflightEmbedResearchCandidate,runEmbedResearchPreflight} from "../src/embed-research-preflight.js";
const candidate={id:"yt",provider:"Monterey Bay Aquarium",platform:"YouTube",sourceUrl:"https://www.youtube.com/watch?v=abc123",candidateEmbedUrl:"https://www.youtube-nocookie.com/embed/abc123"};
const fetchOk=async url=>{
 if(url.includes("/oembed?"))return{status:200,url,json:async()=>({title:"Live Cam",author_name:"Monterey Bay Aquarium",provider_name:"YouTube"})};
 return{status:200,url,body:{cancel:async()=>{}}};
};
let r=await preflightEmbedResearchCandidate(candidate,{fetchImpl:fetchOk,timeoutMs:100});
assert.equal(r.outcome,"TECHNICALLY_READY_FOR_DEPLOYED_TEST");assert.equal(r.metadataAvailable,true);assert.equal(r.embedPageReachable,true);assert.equal(r.technicalReady,true);assert.equal(r.permissionConfirmed,false);assert.equal(r.humanPlaybackConfirmed,false);assert.equal(r.promotionAllowed,false);
const fetchPartial=async url=>url.includes("/oembed?")?{status:404,url,json:async()=>({})}:{status:200,url,body:{cancel:async()=>{}}};
r=await preflightEmbedResearchCandidate(candidate,{fetchImpl:fetchPartial,timeoutMs:100});assert.equal(r.outcome,"PARTIAL_TECHNICAL_EVIDENCE");assert.equal(r.technicalReady,false);
const unsupported=await preflightEmbedResearchCandidate({...candidate,sourceUrl:"https://example.com/x"},{fetchImpl:fetchOk,timeoutMs:100});assert.equal(unsupported.outcome,"UNSUPPORTED_CANDIDATE");
const batch=await runEmbedResearchPreflight([candidate],{fetchImpl:fetchOk,timeoutMs:100});assert.equal(batch.technicalReady,1);assert.equal(batch.total,1);
console.log("ERN embed research technical preflight passed");
