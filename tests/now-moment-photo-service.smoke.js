import assert from "node:assert/strict";
import {memoryNowMomentPhotoStores} from "../src/now-moment-photo-storage-contract.js";
import {createNowMomentPhoto,listNowMomentPhotos,reviewNowMomentPhoto,reportNowMomentPhoto,cleanupNowMomentPhotos} from "../src/now-moment-photo-service.js";

const capabilities={transport:true,objectStorage:true,durableMetadata:true,metadataSanitization:true,canonicalPlaceValidation:true,serverRateLimits:true,moderationQueue:true,abuseReporting:true,expiryCleanup:true,privacyNotice:true,secretIsolation:true,observability:true,costGuard:true};
const stores=memoryNowMomentPhotoStores();
const limiter={async check(){return{allowed:true,remaining:2}},async commit(){return{allowed:true,remaining:1}}};
const jpeg=new Uint8Array([0xff,0xd8,1,2,3,0xff,0xd9]);
const base={mimeType:"image/jpeg",sourceBytes:jpeg.length,storedBytes:jpeg.length,width:1200,height:800,placeId:"chiang-mai",placeLabel:"Chiang Mai",bytes:jpeg};
const ctx={capabilities,metadataStore:stores.metadata,objectStore:stores.objects,rateLimiter:limiter,rateSubject:"anon_abcdefgh",knownPlaceIds:["chiang-mai"],id:"p1",objectKey:"p1.jpg",now:new Date("2026-09-28T08:00:00Z")};

const created=await createNowMomentPhoto(base,ctx);
assert.equal(created.ok,true);assert.equal(created.public,null);assert.equal(created.record.moderation,"PENDING");
assert.equal((await listNowMomentPhotos({placeId:"chiang-mai"},ctx)).photos.length,0);
const approved=await reviewNowMomentPhoto({id:"p1",decision:"APPROVED"},ctx);
assert.equal(approved.public.verified,false);
assert.equal((await listNowMomentPhotos({placeId:"chiang-mai"},ctx)).photos.length,1);
assert.equal((await reportNowMomentPhoto({id:"p1"},ctx)).visible,false);
assert.equal((await listNowMomentPhotos({placeId:"chiang-mai"},ctx)).photos.length,0);

const stores2=memoryNowMomentPhotoStores();
const ctx2={...ctx,metadataStore:stores2.metadata,objectStore:stores2.objects,id:"p2",objectKey:"p2.jpg"};
await createNowMomentPhoto(base,ctx2);
const cleaned=await cleanupNowMomentPhotos({...ctx2,now:new Date("2026-09-28T09:00:00Z")});
assert.equal(cleaned.deleted,1);assert.equal(stores2.debug.objects.size,0);

await assert.rejects(()=>createNowMomentPhoto(base,{...ctx,capabilities:{}}),/NOW_MOMENT_PHOTO_NOT_ACTIVATED/);
console.log("Phase L photo service requires complete activation, moderation and expiry cleanup");
