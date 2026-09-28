import http from "node:http";
import {spawnSync} from "node:child_process";

async function run(body,target){
  const server=http.createServer((req,res)=>{res.writeHead(200,{"content-type":"application/json"});res.end(JSON.stringify(body))});
  await new Promise(resolve=>server.listen(0,"127.0.0.1",resolve));
  const {port}=server.address();
  const script=spawnSync(process.execPath,["scripts/participation-deployment-verify.mjs",target,`http://127.0.0.1:${port}`],{encoding:"utf8"});
  server.close();
  return script;
}
const usage=spawnSync(process.execPath,["scripts/participation-deployment-verify.mjs"],{encoding:"utf8"});
console.assert(usage.status===2,"Verifier must reject missing target/HTTPS endpoint");
const source=await import("node:fs/promises");
const text=await source.readFile("scripts/participation-deployment-verify.mjs","utf8");
console.assert(text.includes("secretValuesExposed")&&text.includes("rawNetworkIdentifiersStored"),"Verifier must check privacy/secret evidence");
console.assert(text.includes("contributionsEnabled")&&text.includes("submissionEnabled"),"Verifier must require both participation services to remain public-off");
console.assert(text.includes("reviewTokenConfigured")&&text.includes("retentionBounded"),"Submission evidence checks missing");
console.assert(text.includes('truth:"Health verification is deployment evidence only.'),"Verifier must not equate health with activation");
console.log("participation deployment verifier safety smoke: ok");
