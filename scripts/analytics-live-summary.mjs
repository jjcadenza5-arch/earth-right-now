import fs from "node:fs";
const d=JSON.parse(fs.readFileSync("data/analytics-deployment.json","utf8"));
const token=String(process.env.ERN_ANALYTICS_REVIEW_TOKEN||"").trim();
const days=Math.max(1,Math.min(Number(process.argv[2])||30,90));
if(!token){console.error("ERN_ANALYTICS_REVIEW_TOKEN_REQUIRED");process.exit(2)}
const url=new URL(d.endpoint);url.pathname="/internal/analytics/summary";url.search="days="+days;
try{
 const r=await fetch(url,{headers:{authorization:"Bearer "+token,accept:"application/json","user-agent":"ERN-Operations/1.0"}});
 const text=await r.text();if(!r.ok){console.error("ANALYTICS_SUMMARY_HTTP_"+r.status);process.exit(1)}
 const x=JSON.parse(text);
 if(x?.ok!==true||x?.privacy?.rawIpStored!==false||x?.privacy?.eventRowsStored!==false)throw new Error("ANALYTICS_SUMMARY_PRIVACY_INVARIANT");
 process.stdout.write(JSON.stringify(x,null,2)+"\n");
}catch(error){console.error(String(error?.message||error));process.exit(1)}
