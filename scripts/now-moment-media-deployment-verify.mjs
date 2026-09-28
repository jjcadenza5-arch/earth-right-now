const base=String(process.argv[2]||"").replace(/\/$/,"");
if(!/^https:\/\//.test(base)){console.error("Usage: node scripts/now-moment-media-deployment-verify.mjs <https-worker-endpoint>");process.exit(2)}
let r,b;
try{r=await fetch(base+"/health",{headers:{accept:"application/json","user-agent":"ERN-Media-Verify/1.0"}});b=await r.json()}catch(error){console.error(JSON.stringify({ok:false,reason:"HEALTH_UNREACHABLE",detail:String(error?.message||error)},null,2));process.exit(1)}
const checks={
  healthOk:r.ok&&b?.ok===true,
  service:b?.service==="ERN Now Moment Media API",
  photoPublicOff:b?.photoEnabled===false,
  videoOff:b?.videoEnabled===false,
  objectStorage:b?.objectStorage===true,
  durableMetadata:b?.durableMetadata===true,
  rateSecret:b?.rateSubjectSecretConfigured===true,
  reviewToken:b?.reviewTokenConfigured===true,
  privateBucket:b?.directBucketPublicAccess===false,
  automaticPublicationOff:b?.automaticPublicationAllowed===false,
  rawNetworkIdentifiersStored:b?.rawNetworkIdentifiersStored===false,
  secretsNotExposed:b?.secretValuesExposed===false,
  storageBounded:Number(b?.state?.maxRetainedMedia)>0,
  ttl45:Number(b?.state?.ttlMinutes)===45
};
const ok=Object.values(checks).every(Boolean);
console.log(JSON.stringify({ok,endpoint:base,observedAt:new Date().toISOString(),checks,health:b,truth:"Deployment verification does not activate photo upload or public media."},null,2));
if(!ok)process.exitCode=1;
