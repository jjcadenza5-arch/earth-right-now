import { execFileSync } from "node:child_process";
import { pagesDnsAssessment,domainNextAction,certificateCoverage } from "../src/pages-domain-diagnostics.js";

const host=process.argv[2]||"earthrightnow.app";
function run(cmd,args){try{return{ok:true,out:execFileSync(cmd,args,{encoding:"utf8",stdio:["ignore","pipe","pipe"]}).trim()}}catch(e){return{ok:false,out:String(e.stdout||"").trim(),err:String(e.stderr||e.message||"").trim()}}}
function lines(result){return result.ok&&result.out?result.out.split("\n").map(x=>x.trim()).filter(Boolean):[]}
function dns(type){const direct=run("dig",["+short",type,host]);if(direct.ok)return lines(direct);if(type==="A"){const r=run("getent",["ahostsv4",host]);return lines(r).map(x=>x.split(/\s+/)[0])}if(type==="AAAA"){const r=run("getent",["ahostsv6",host]);return lines(r).map(x=>x.split(/\s+/)[0])}return[]}

const a=dns("A"),aaaa=dns("AAAA"),cname=dns("CNAME"),caa=dns("CAA");
const dnsAssessment=pagesDnsAssessment({host,a,aaaa,cname,caa});
const tls=run("bash",["-lc",`echo | openssl s_client -connect "${host}:443" -servername "${host}" 2>/dev/null | openssl x509 -noout -subject -issuer -ext subjectAltName -dates`]);
const curl=run("curl",["--fail","--silent","--show-error","--location","--max-time","15",`https://${host}/`]);
let state="OK";
if(!a.length&&!aaaa.length&&!cname.length)state="DNS_UNRESOLVED";
else if(dnsAssessment.dnsState!=="OK")state=dnsAssessment.dnsState;
else if(!tls.ok)state="TLS_HANDSHAKE_FAILED";
else if(certificateCoverage({host,certificate:tls.out,dnsState:dnsAssessment.dnsState})!=="OK")state=certificateCoverage({host,certificate:tls.out,dnsState:dnsAssessment.dnsState});
else if(!curl.ok)state="HTTPS_REQUEST_FAILED";
const report={
 host,state,
 dns:dnsAssessment,
 certificate:tls.out||tls.err,
 https:{ok:curl.ok,error:curl.ok?null:curl.err},
 nextAction:domainNextAction({state,dns:dnsAssessment}),
 guidance:"GitHub Pages apex DNS should use GitHub Pages A/AAAA (or ALIAS/ANAME) records; if CAA is present it must allow letsencrypt.org."
};
console.log(JSON.stringify(report,null,2));if(state!=="OK")process.exitCode=1;
