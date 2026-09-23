import fs from "node:fs";
const local=JSON.parse(fs.readFileSync("data/local-directory.json","utf8"));
const places=fs.readFileSync("for-places.html","utf8");
const moments=fs.readFileSync("now-moments.html","utf8");
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
must(/Submission delivery is not open yet/i.test(places),"camera submission page lost inactive-transport disclosure");
must(/LOCAL_DRAFT_ONLY/.test(places),"camera submission page lost local-only draft boundary");
must(!/<form[^>]+action=/i.test(places),"camera draft must not silently post to a backend");
must(/Uploads are intentionally not active yet/i.test(moments),"Now Moments page lost inactive-upload disclosure");
must(/Nothing is uploaded or transmitted/i.test(moments),"Now Moments page lost local-preview disclosure");
must(!/<input[^>]+type=["']file["']/i.test(moments),"Now Moments must not expose file uploads before backend activation");
must(!/<form[^>]+action=/i.test(moments),"Now Moments preview must not silently post to a backend");
if(fail.length){console.error(JSON.stringify({ok:false,fail},null,2));process.exit(1)}
console.log(JSON.stringify({ok:true,approvedLocalPlaces:local.length,cameraTransportActive:false,nowMomentUploadActive:false,guardrails:["approved-only local directory","no hidden form transport","no premature file upload"]},null,2));
