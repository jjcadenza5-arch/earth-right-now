import assert from "node:assert/strict";
import {memoryNowMomentPhotoStores} from "../src/now-moment-photo-storage-contract.js";
import {createNowMomentPhoto,listNowMomentPhotos,reviewNowMomentPhoto,reportNowMomentPhoto,cleanupNowMomentPhotos} from "../src/now-moment-photo-service.js";

const capabilities={transport:true,objectStorage:true,durableMetadata:true,metadataSanitization:true,canonicalPlaceValidation:true,serverRateLimits:true,moderationQueue:true,abuseReporting:true,expiryCleanup:true,privacyNotice:true,secretIsolation:true,observability:true,costGuard:true};
const stores=memoryNowMomentPhotoStores();
const limiter={async check(){throw new Error("NON_ATOMIC_RATE_CHECK_USED")},async commit(){return{allowed:true,remaining:1}}};
const jpeg=new Uint8Array([0xff,0xd8,0xff,0xc0,0x00,0x11,0x08,0x03,0x20,0x04,0xb0,0x03,0x01,0x11,0x00,0x02,0x11,0x00,0x03,0x11,0x00,0xff,0xd9]);
const base={mimeType:"image/jpeg",sourceBytes:jpeg.length,storedBytes:jpeg.length,width:1200,height:800,placeId:"chiang-mai",placeLabel:"Spoofed visitor label",bytes:jpeg};
const ctx={capabilities,metadataStore:stores.metadata,objectStore:stores.objects,rateLimiter:limiter,rateSubject:"anon_abcdefgh",knownPlaceIds:["chiang-mai"],canonicalPlaceLabels:new Map([["chiang-mai","Chiang Mai — ERN"]]),id:"p1",objectKey:"p1.jpg",now:new Date("2026-09-28T08:00:00Z")};

assert.equal((await createNowMomentPhoto({...base,storedBytes:jpeg.length+1},ctx)).reason,"STORED_SIZE_MISMATCH");
assert.equal((await createNowMomentPhoto({...base,width:1199},ctx)).reason,"IMAGE_DIMENSIONS_MISMATCH");
const rateLimited=await createNowMomentPhoto(base,{...ctx,id:"blocked",objectKey:"blocked.jpg",rateLimiter:{async commit(){return{allowed:false,reason:"PHOTO_RATE_LIMIT"}}}});assert.equal(rateLimited.reason,"PHOTO_RATE_LIMIT");
const created=await createNowMomentPhoto(base,ctx);
assert.equal(created.ok,true);assert.equal(created.public,null);assert.equal(created.record.moderation,"PENDING");assert.equal(created.record.placeLabel,"Chiang Mai — ERN");assert.notEqual(created.record.placeLabel,base.placeLabel);
assert.equal((await listNowMomentPhotos({placeId:"chiang-mai"},ctx)).photos.length,0);
const approved=await reviewNowMomentPhoto({id:"p1",decision:"APPROVED"},ctx);
assert.equal(approved.public.verified,false);
assert.equal((await listNowMomentPhotos({placeId:"chiang-mai"},ctx)).photos.length,1);
assert.equal((await reportNowMomentPhoto({id:"p1"},ctx)).visible,false);
assert.equal((await reviewNowMomentPhoto({id:"p1",decision:"APPROVED"},{...ctx,now:new Date("2026-09-28T09:00:00Z")})).reason,"PHOTO_EXPIRED");
assert.equal((await listNowMomentPhotos({placeId:"chiang-mai"},ctx)).photos.length,0);

const stores2=memoryNowMomentPhotoStores();
const ctx2={...ctx,metadataStore:stores2.metadata,objectStore:stores2.objects,id:"p2",objectKey:"p2.jpg"};
await createNowMomentPhoto(base,ctx2);
const cleaned=await cleanupNowMomentPhotos({...ctx2,now:new Date("2026-09-28T09:00:00Z")});
assert.equal(cleaned.deleted,1);assert.equal(stores2.debug.objects.size,0);assert.equal(stores2.debug.metadata.size,0);

const stores3=memoryNowMomentPhotoStores();
const ctx3={...ctx,metadataStore:stores3.metadata,objectStore:stores3.objects,id:"p3",objectKey:"p3.jpg"};
await createNowMomentPhoto(base,ctx3);
let firstDelete=true;
const flakyObjects={...stores3.objects,async delete(key){if(firstDelete){firstDelete=false;throw new Error("R2_TEMPORARY_FAILURE")}return stores3.objects.delete(key)}};
const failedCleanup=await cleanupNowMomentPhotos({...ctx3,objectStore:flakyObjects,now:new Date("2026-09-28T09:00:00Z")});
assert.equal(failedCleanup.ok,false);assert.equal(failedCleanup.deleted,0);assert.equal(stores3.debug.metadata.has("p3"),true,"metadata must remain so cleanup can retry");assert.equal(stores3.debug.objects.has("p3.jpg"),true);
const retryCleanup=await cleanupNowMomentPhotos({...ctx3,now:new Date("2026-09-28T09:01:00Z")});
assert.equal(retryCleanup.ok,true);assert.equal(retryCleanup.deleted,1);assert.equal(stores3.debug.metadata.size,0);assert.equal(stores3.debug.objects.size,0);

await assert.rejects(()=>createNowMomentPhoto(base,{...ctx,capabilities:{}}),/NOW_MOMENT_PHOTO_NOT_ACTIVATED/);
console.log("Phase L photo service requires complete activation, moderation and expiry cleanup");
