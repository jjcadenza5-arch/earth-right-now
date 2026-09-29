import assert from "node:assert/strict";
import fs from "node:fs";
import {NOW_MOMENT_PHOTO_POLICY,nowMomentPhotoInput,nowMomentPhotoPublicRecord} from "../src/now-moment-photo-policy.js";
import {nowMomentMetadataScan} from "../src/now-moment-photo-metadata.js";

assert.equal(NOW_MOMENT_PHOTO_POLICY.enabled,false);
assert.equal(NOW_MOMENT_PHOTO_POLICY.videoEnabled,false);
assert.equal(NOW_MOMENT_PHOTO_POLICY.ttlMinutes,45);
assert.equal(NOW_MOMENT_PHOTO_POLICY.automaticPublicationAllowed,false);
assert.deepEqual(NOW_MOMENT_PHOTO_POLICY.allowedMimeTypes,["image/jpeg","image/png","image/webp"]);

const valid=nowMomentPhotoInput({mimeType:"image/jpeg",sourceBytes:1000,storedBytes:900,width:1200,height:800,placeId:"x",metadataStripped:true});
assert.equal(valid.ok,true);
for(const bad of [
 {mimeType:"image/gif",sourceBytes:1000,storedBytes:900,width:1200,height:800,placeId:"x",metadataStripped:true},
 {mimeType:"image/jpeg",sourceBytes:1000,storedBytes:900,width:3000,height:800,placeId:"x",metadataStripped:true},
 {mimeType:"image/jpeg",sourceBytes:1000,storedBytes:900,width:1200,height:800,placeId:"",metadataStripped:true},
 {mimeType:"image/jpeg",sourceBytes:1000,storedBytes:900,width:1200,height:800,placeId:"x",metadataStripped:false},
 {mimeType:"image/jpeg",sourceBytes:1000,storedBytes:900,width:1200,height:800,placeId:"x",metadataStripped:true,caption:"hello"}
])assert.equal(nowMomentPhotoInput(bad).ok,false);

const jpeg=new Uint8Array([0xff,0xd8,1,2,3,0xff,0xd9]);
assert.equal(nowMomentMetadataScan(jpeg,"image/jpeg").ok,true);
const exif=new Uint8Array([0xff,0xd8,...new TextEncoder().encode("Exif\0\0GPS"),0xff,0xd9]);
assert.equal(nowMomentMetadataScan(exif,"image/jpeg").ok,false);
const largeJpeg=new Uint8Array(1536*1024);largeJpeg[0]=0xff;largeJpeg[1]=0xd8;largeJpeg[largeJpeg.length-2]=0xff;largeJpeg[largeJpeg.length-1]=0xd9;assert.equal(nowMomentMetadataScan(largeJpeg,"image/jpeg").ok,true);
const pub=nowMomentPhotoPublicRecord({id:"1",placeId:"x",lat:1,lon:2});
assert.equal(pub.verified,false);assert.ok(!("lat" in pub));assert.ok(!("lon" in pub));

const deployment=JSON.parse(fs.readFileSync("data/now-moment-media-deployment.json","utf8"));
assert.equal(deployment.status,"NOT_DEPLOYED");
assert.equal(deployment.publicActivationAllowed,false);
assert.equal(deployment.videoEnabled,false);
console.log("Phase L still-photo foundation remains bounded, temporary and fail-closed");
