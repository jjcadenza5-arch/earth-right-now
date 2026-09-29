import assert from "node:assert/strict";
import fs from "node:fs";
import {NOW_MOMENT_PHOTO_POLICY,nowMomentPhotoInput,nowMomentPhotoPublicRecord} from "../src/now-moment-photo-policy.js";
import {nowMomentMetadataScan,nowMomentImageDimensions} from "../src/now-moment-photo-metadata.js";

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

const jpeg=new Uint8Array([0xff,0xd8,0xff,0xc0,0x00,0x11,0x08,0x03,0x20,0x04,0xb0,0x03,0x01,0x11,0x00,0x02,0x11,0x00,0x03,0x11,0x00,0xff,0xd9]);
assert.equal(nowMomentMetadataScan(jpeg,"image/jpeg").ok,true);
assert.deepEqual(nowMomentImageDimensions(jpeg,"image/jpeg"),{ok:true,width:1200,height:800});
const png=new Uint8Array(24);png.set([137,80,78,71,13,10,26,10],0);png.set(new TextEncoder().encode("IHDR"),12);png.set([0,0,4,176,0,0,3,32],16);assert.deepEqual(nowMomentImageDimensions(png,"image/png"),{ok:true,width:1200,height:800});
const webp=new Uint8Array(30);webp.set(new TextEncoder().encode("RIFF"),0);webp.set(new TextEncoder().encode("WEBP"),8);webp.set(new TextEncoder().encode("VP8X"),12);const ww=1199,wh=799;webp[24]=ww&255;webp[25]=(ww>>8)&255;webp[26]=(ww>>16)&255;webp[27]=wh&255;webp[28]=(wh>>8)&255;webp[29]=(wh>>16)&255;assert.deepEqual(nowMomentImageDimensions(webp,"image/webp"),{ok:true,width:1200,height:800});
const exif=new Uint8Array([0xff,0xd8,...new TextEncoder().encode("Exif\0\0GPS"),0xff,0xd9]);
assert.equal(nowMomentMetadataScan(exif,"image/jpeg").ok,false);
const largeJpeg=new Uint8Array(1536*1024);largeJpeg[0]=0xff;largeJpeg[1]=0xd8;largeJpeg[largeJpeg.length-2]=0xff;largeJpeg[largeJpeg.length-1]=0xd9;assert.equal(nowMomentMetadataScan(largeJpeg,"image/jpeg").ok,true);
const pub=nowMomentPhotoPublicRecord({id:"1",placeId:"x",lat:1,lon:2,createdAt:"2026-09-28T08:00:47.912Z",storageExpiryAt:"2026-09-28T08:45:47.912Z"});
assert.equal(pub.verified,false);assert.ok(!("lat" in pub));assert.ok(!("lon" in pub));assert.equal(pub.createdAt,"2026-09-28T08:00:00.000Z");assert.equal(pub.expiresAt,"2026-09-28T08:45:00.000Z");

const deployment=JSON.parse(fs.readFileSync("data/now-moment-media-deployment.json","utf8"));
assert.equal(deployment.status,"NOT_DEPLOYED");
assert.equal(deployment.publicActivationAllowed,false);
assert.equal(deployment.videoEnabled,false);
console.log("Phase L still-photo foundation remains bounded, temporary and fail-closed");
