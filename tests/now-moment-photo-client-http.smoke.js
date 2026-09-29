import assert from "node:assert/strict";
import {prepareNowMomentPhoto} from "../src/now-moment-photo-client.js";
import {NOW_MOMENT_PHOTO_API,nowMomentPhotoUploadHeaders} from "../src/now-moment-photo-api-contract.js";
import {nowMomentPhotoHttpRequest} from "../src/now-moment-photo-http-adapter.js";

assert.equal(NOW_MOMENT_PHOTO_API.originalFilenameAccepted,false);assert.equal(NOW_MOMENT_PHOTO_API.placeLabelAccepted,false);
assert.equal(NOW_MOMENT_PHOTO_API.freeTextAccepted,false);
assert.equal(NOW_MOMENT_PHOTO_API.preciseCoordinatesAccepted,false);
const headers=nowMomentPhotoUploadHeaders({placeId:"x",placeLabel:"Place",mimeType:"image/jpeg",sourceBytes:100,storedBytes:80,width:10,height:10,filename:"secret.jpg"});
assert.equal(headers["x-ern-place-id"],"x");assert.ok(!("x-ern-place-label" in headers));
assert.ok(!Object.keys(headers).some(k=>/filename/i.test(k)));

const fakeFile={type:"image/jpeg",size:100};
const bitmap={width:4000,height:2000,close(){}};
const blobs=[{size:2_000_000},{size:1_000_000}];
let n=0;
const canvas={width:0,height:0,getContext(){return{drawImage(){}}},toBlob(cb){cb(blobs[n++])}};
const prepared=await prepareNowMomentPhoto(fakeFile,{createBitmap:async()=>bitmap,createCanvas:()=>canvas});
assert.equal(prepared.ok,true);assert.equal(prepared.width,1920);assert.equal(prepared.height,960);assert.equal(prepared.metadataStripped,true);assert.equal(prepared.originalNameStored,false);

const off=await nowMomentPhotoHttpRequest({method:"POST",path:"/api/now-moments/photos",body:new Uint8Array([1]),headers:{}},{capabilities:{}});
assert.equal(off.status,503);assert.equal(off.body.mode,"OFF");
console.log("Phase L client sanitizer and HTTP contract remain fail-closed");
