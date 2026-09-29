import fs from "node:fs";
const read=p=>fs.readFileSync(p,"utf8"),json=p=>JSON.parse(read(p));
const policy=read("src/now-moment-photo-policy.js");
const service=read("src/now-moment-photo-service.js");
const metadata=read("src/now-moment-photo-metadata.js");
const worker=read("media-worker/src/index.js");
const state=read("media-worker/src/media-state.js");
const cfg=read("media-worker/wrangler.jsonc");
const privacy=read("privacy.html");
const deployment=json("data/now-moment-media-deployment.json");
const fail=[],must=(ok,msg)=>{if(!ok)fail.push(msg)};
must(deployment.status==="NOT_DEPLOYED","media deployment evidence must remain NOT_DEPLOYED before controlled deployment");
must(deployment.publicActivationAllowed===false,"media public activation must remain false");
must(deployment.endpointUrl==null,"media endpoint must remain null before deployment");
must(cfg.includes('"ERN_NOW_MOMENT_PHOTO_ENABLED": "false"'),"media worker must deploy OFF by default");
must(policy.includes("ttlMinutes:45"),"45-minute photo TTL missing");
must(policy.includes("maxStoredBytes:1536*1024"),"stored-photo size bound missing");
must(policy.includes("maxDimensionPx:1920"),"photo dimension bound missing");
must(policy.includes("freeTextAccepted:false"),"free-text rejection policy missing");
must(policy.includes("preciseCoordinatesStored:false"),"precise-coordinate rejection policy missing");
must(policy.includes("automaticPublicationAllowed:false"),"automatic publication must remain disabled");
must(policy.includes("videoEnabled:false"),"video must remain disabled");
must(metadata.includes("EXIF_PRESENT")&&metadata.includes("XMP_PRESENT")&&metadata.includes("GPS_METADATA_SUSPECTED"),"JPEG metadata rejection incomplete");
must(metadata.includes("PNG_METADATA_CHUNK")&&metadata.includes("WEBP_METADATA_CHUNK"),"PNG/WebP metadata rejection incomplete");
must(metadata.includes("matchesAscii")&&!metadata.includes("String.fromCharCode"),"metadata scan must avoid whole-image string conversion");
must(metadata.includes("nowMomentImageDimensions")&&service.includes("width:dimensions.width")&&service.includes("height:dimensions.height")&&service.includes("storedBytes:bytes.byteLength"),"server-side encoded image fact derivation missing");
must(service.includes("moderationRequired:true")&&service.includes("reportNowMomentPhoto")&&service.includes("cleanupNowMomentPhotos"),"moderation/report/cleanup service contract incomplete");
must(service.includes("canonicalPlaceLabels")&&worker.includes("canonicalPlaceLabels:places.labels"),"trusted place-label rehydration missing");
must(!worker.includes("x-ern-place-label"),"visitor place-label header must not be accepted by media Worker");
must(worker.includes("PLACE_ID_REQUIRED"),"public media listing must require an explicit placeId");
must(worker.includes("constantTimeEqual")&&!worker.includes("got===`Bearer ${expected}`"),"review bearer token comparison must be hardened");
must(!service.includes("rateLimiter.check(")&&service.includes("rateLimiter.commit("),"photo rate limiting must use a single atomic reservation/commit");
must(worker.includes("readBodyBounded")&&worker.includes("DERIVATIVE_TOO_LARGE"),"bounded upload body verification missing");
must(!worker.includes("x-ern-photo-source-bytes")&&!worker.includes("x-ern-photo-stored-bytes")&&!worker.includes("x-ern-photo-width")&&!worker.includes("x-ern-photo-height"),"client-declared image facts must not cross the media Worker boundary");
must((worker.match(/cache-control":"private, no-store"/g)||[]).length>=2,"temporary public media must be no-store so reports/expiry take effect immediately");
must(service.includes("metadata.listExpired")&&service.indexOf("objects.delete(r.objectKey)")<service.indexOf("metadata.delete(r.id)"),"retry-safe expiry cleanup ordering missing");
must(state.includes('b.op==="list-expired"')&&state.includes('b.op==="delete"'),"retry-safe media state cleanup operations missing");
must(worker.includes("PENDING_REVIEW")&&worker.includes("published:false"),"upload must remain moderation-first");
must(worker.includes("PUBLICATION_DISABLED")&&worker.includes('body.decision==="APPROVED"&&!enabled'),"feature-OFF state must block latent approvals");
must(worker.includes("PUBLICATION_DISABLED")&&worker.includes('body.decision==="APPROVED"&&!enabled'),"pre-activation approvals must not become latent future publication");
must(worker.includes("rawNetworkIdentifiersStored:false"),"worker must explicitly avoid raw network identifier storage");
must(worker.includes("directBucketPublicAccess:false"),"R2 bucket must remain non-public");
must(state.includes("MAX_RETAINED_MEDIA=500"),"retained-media ceiling missing");
must(state.includes("MAX_PHOTOS_PER_DAY=3")&&state.includes("MAX_PHOTOS_PER_PLACE_DAY=2"),"photo rate limits missing");
must(state.includes("MAX_REPORTS_PER_DAY=10"),"report rate limit missing");
must(state.includes("ttlMinutes:45"),"worker health TTL evidence missing");
must(state.includes("expiredPendingCleanup"),"worker health must expose expired media pending cleanup");
must(worker.includes("NOW_MOMENT_CLEANUP_FAILED")&&worker.includes("throw error"),"scheduled cleanup failures must be observable");
must(privacy.includes("expire after 45 minutes")&&privacy.includes("still images only")&&privacy.includes("video remains disabled"),"published privacy notice no longer matches media policy");
const prepared=fail.length===0;
console.log(JSON.stringify({
  phase:"PHASE_L_NOW_MOMENT_MEDIA",
  state:prepared?"PREPARED_NOT_DEPLOYED_PUBLIC_OFF":"PREPARATION_INCOMPLETE",
  prepared,
  deployed:false,
  publicActivationAllowed:false,
  policy:{ttlMinutes:45,maxStoredBytes:1572864,maxDimensionPx:1920,videoEnabled:false,automaticPublicationAllowed:false,freeTextAccepted:false,preciseCoordinatesStored:false},
  safeguards:{privateObjectStorage:true,metadataScan:true,canonicalPlaceValidation:true,serverRateLimits:true,humanModeration:true,abuseReporting:true,expiryCleanup:true,retrySafeObjectDeletion:true,cleanupBacklogObservable:true,rawNetworkIdentifiersStored:false},
  next:prepared?"CONTROLLED_INFRASTRUCTURE_DEPLOYMENT_WHEN_HUMAN_APPROVES":"REPAIR_MEDIA_PREPARATION",
  fail
},null,2));
if(fail.length)process.exit(1);
