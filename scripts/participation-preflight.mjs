import fs from "node:fs";
const local=JSON.parse(fs.readFileSync("data/local-directory.json","utf8"));
const places=fs.readFileSync("for-places.html","utf8");
const moments=fs.readFileSync("now-moments.html","utf8");
const placesJs=fs.readFileSync("src/for-places-page.js","utf8");
const momentsJs=fs.readFileSync("src/now-moments-page.js","utf8");
const publicConfig=fs.readFileSync("src/participation-public-config.js","utf8");
const earthSignals=JSON.parse(fs.readFileSync("data/earth-signal-deployment.json","utf8"));
const submission=JSON.parse(fs.readFileSync("data/submission-transport.json","utf8"));
const media=JSON.parse(fs.readFileSync("data/now-moment-media-deployment.json","utf8"));
const mediaCfg=fs.readFileSync("media-worker/wrangler.jsonc","utf8");
const fail=[],must=(ok,msg)=>{if(!ok)fail.push(msg)};
must(Array.isArray(local),"local directory must be an array");
const ids=new Set();
for(const [i,x] of local.entries()){
 must(x&&typeof x==="object",`local entry ${i} must be an object`);
 if(!x||typeof x!=="object")continue;
 const prefix=`local entry ${i}`;
 must(x.status==="APPROVED",`${prefix} must be APPROVED before public shipping`);
 must(typeof x.id==="string"&&/^[a-z0-9][a-z0-9-]*$/.test(x.id),`${prefix} needs stable slug id`);
 if(x.id){must(!ids.has(x.id),`duplicate local id ${x.id}`);ids.add(x.id)}
 for(const k of ["name","type","place","country","summary","url","verifiedAt"])must(typeof x[k]==="string"&&x[k].trim(),`${prefix} missing ${k}`);
 if(x.url){try{const u=new URL(x.url);must(["http:","https:"].includes(u.protocol)&&!u.username&&!u.password,`${prefix} URL must be safe http/https`)}catch{must(false,`${prefix} has invalid URL`)}}
 must(Number.isFinite(Date.parse(x.verifiedAt||"")),`${prefix} verifiedAt must be a date`);
 if(x.lat!==undefined||x.lon!==undefined)must(Number.isFinite(Number(x.lat))&&Number.isFinite(Number(x.lon))&&Number(x.lat)>=-90&&Number(x.lat)<=90&&Number(x.lon)>=-180&&Number(x.lon)<=180,`${prefix} coordinates invalid`);
}
must(!/<form[^>]+action=/i.test(places),"camera form must not silently post to a backend");
must(!/<form[^>]+action=/i.test(moments),"Now Moments form must not silently post to a backend");
must(!/<input[^>]+type=["']file["']/i.test(moments),"Now Moments must not expose file uploads before media backend activation");
must(placesJs.includes("LOCAL_DRAFT_ONLY"),"camera submission local fallback missing");
must(placesJs.includes("consent?.checked!==true"),"camera submission explicit send consent missing");
must(momentsJs.includes("Preview locally"),"Now Moments local preview fallback missing");
must(momentsJs.includes("canonicalPlaces"),"Now Moments canonical ERN place boundary missing");
must(!momentsJs.includes("nearPlaceVerified")&&momentsJs.includes("nearPlaceSelfReported"),"Earth Signal public UI must treat proximity as visitor self-report, not verified location");
must(publicConfig.includes('earthSignals?.status==="DEPLOYED"')&&publicConfig.includes("publicActivationAllowed===true"),"Earth Signal public config must require deployed + explicit activation");
must(publicConfig.includes("submissions?.enabled===true"),"Submission public config must require explicit enabled transport");
must(publicConfig.includes('media?.status==="DEPLOYED"')&&publicConfig.includes("media?.publicActivationAllowed===true")&&publicConfig.includes("media?.videoEnabled===false"),"Now Moment media public config must require deployed + explicit activation + video-off boundary");
if(earthSignals.publicActivationAllowed!==true)must(earthSignals.publicActivationAllowed===false,"Earth Signals activation switch must be explicit false until intentionally enabled");
if(submission.enabled!==true)must(submission.enabled===false,"Submission transport enabled switch must be explicit false until intentionally enabled");
must(media.publicActivationAllowed===false,"Now Moment media public activation must remain false until intentionally enabled");
must(media.status==="NOT_DEPLOYED"&&media.endpointUrl==null,"Now Moment media deployment evidence must remain NOT_DEPLOYED before controlled deployment");
must(media.videoEnabled===false,"Now Moment video must remain disabled");
must(mediaCfg.includes('"ERN_NOW_MOMENT_PHOTO_ENABLED": "false"'),"Now Moment media Worker must remain OFF by default");
if(fail.length){console.error(JSON.stringify({ok:false,fail},null,2));process.exit(1)}
console.log(JSON.stringify({
 ok:true,
 approvedLocalPlaces:local.length,
 earthSignalsPublicActive:earthSignals.status==="DEPLOYED"&&earthSignals.publicActivationAllowed===true,
 submissionTransportActive:submission.enabled===true,
 nowMomentMediaUploadActive:media.status==="DEPLOYED"&&media.publicActivationAllowed===true,
 guardrails:["approved-only local directory","manifest-gated participation","explicit submission consent","no premature media upload"]
},null,2));
