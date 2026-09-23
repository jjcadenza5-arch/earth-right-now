import { execFileSync } from "node:child_process";
const host=process.argv[2]||"earthrightnow.app";
function run(cmd,args){try{return{ok:true,out:execFileSync(cmd,args,{encoding:"utf8",stdio:["ignore","pipe","pipe"]}).trim()}}catch(e){return{ok:false,out:String(e.stdout||"").trim(),err:String(e.stderr||e.message||"").trim()}}}
const dns4=run("getent",["ahostsv4",host]),dns6=run("getent",["ahostsv6",host]);
const tls=run("bash",["-lc",`echo | openssl s_client -connect "${host}:443" -servername "${host}" 2>/dev/null | openssl x509 -noout -subject -issuer -ext subjectAltName -dates`]);
const curl=run("curl",["--fail","--silent","--show-error","--location","--max-time","15",`https://${host}/`]);
let state="OK";
if(!dns4.ok&&!dns6.ok)state="DNS_UNRESOLVED";
else if(!tls.ok)state="TLS_HANDSHAKE_FAILED";
else if(!tls.out.includes(`DNS:${host}`)&&!tls.out.includes(`DNS:*.${host.split(".").slice(1).join(".")}`))state="TLS_HOSTNAME_MISMATCH";
else if(!curl.ok)state="HTTPS_REQUEST_FAILED";
const report={host,state,dns:{ipv4:dns4.ok?dns4.out.split("\n").slice(0,8):[],ipv6:dns6.ok?dns6.out.split("\n").slice(0,8):[]},certificate:tls.out||tls.err,https:{ok:curl.ok,error:curl.ok?null:curl.err}};
console.log(JSON.stringify(report,null,2));if(state!=="OK")process.exitCode=1;
