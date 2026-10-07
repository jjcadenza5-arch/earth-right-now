import fs from "node:fs";
const root=process.argv[2]||"dist";
const base="https://earthrightnow.app";
const key=fs.readFileSync("indexnow-key.txt","utf8").trim();
if(!/^[A-Za-z0-9-]{8,128}$/.test(key))throw new Error("invalid IndexNow key");
const feedPath=root.replace(/\/$/,"")+"/updates.xml";
const xml=fs.readFileSync(feedPath,"utf8");
const urls=new Set([base+"/",base+"/places/",base+"/countries/",base+"/discover/",base+"/updates.xml"]);
for(const m of xml.matchAll(/href="(https:\/\/earthrightnow\.app\/[^"]*)"/g))urls.add(m[1].replace(/&amp;/g,"&"));
const urlList=[...urls].filter(u=>{try{return new URL(u).host==="earthrightnow.app"}catch{return false}}).slice(0,100);
const payload={host:"earthrightnow.app",key,keyLocation:base+"/indexnow-key.txt",urlList};
try{
 const r=await fetch("https://api.indexnow.org/indexnow",{method:"POST",headers:{"content-type":"application/json; charset=utf-8","user-agent":"EarthRightNow-IndexNow/1.0"},body:JSON.stringify(payload)});
 const body=await r.text();
 const out={ok:r.status===200||r.status===202,status:r.status,submitted:urlList.length,keyLocation:payload.keyLocation,note:"IndexNow acceptance means URLs were received; it does not guarantee crawl, indexing or ranking."};
 console.log(JSON.stringify(out,null,2));
 if([400,403,422].includes(r.status))process.exitCode=1;
 else if(!out.ok)console.warn("IndexNow temporary/non-fatal response:",body.slice(0,300));
}catch(error){
 console.warn("IndexNow network notification skipped without blocking the production deployment:",String(error?.message||error));
}
