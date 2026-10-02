import fs from "node:fs";
import path from "node:path";
import {spawnSync} from "node:child_process";

const build=spawnSync(process.execPath,["scripts/build-destination-pages.mjs"],{encoding:"utf8"});
if(build.status!==0){console.error(build.stderr||build.stdout);process.exit(1)}

const roots=["index.html","about.html","privacy.html","stories.html","for-places.html","now-moments.html","press.html","places/index.html","discover/index.html"];
for(const locale of ["th","de","fr","ja","zh","es"])roots.push(locale+"/discover/index.html");
const issues=[];
const ignored=/^(?:https?:|mailto:|tel:|javascript:|#)/i;

for(const file of roots){
 if(!fs.existsSync(file)){issues.push({file,code:"PUBLIC_FILE_MISSING"});continue}
 const html=fs.readFileSync(file,"utf8");
 for(const m of html.matchAll(/(?:href|src)="([^"]+)"/g)){
   const raw=m[1];
   if(!raw||ignored.test(raw)||raw.startsWith("//"))continue;
   const clean=raw.split("#")[0].split("?")[0];
   if(!clean)continue;
   let target;
   if(clean.startsWith("/"))target=clean.slice(1);
   else target=path.normalize(path.join(path.dirname(file),clean));
   if(target.endsWith(path.sep))target=path.join(target,"index.html");
   if(!path.extname(target)&&fs.existsSync(target)&&fs.statSync(target).isDirectory())target=path.join(target,"index.html");
   if(!fs.existsSync(target))issues.push({file,code:"BROKEN_LOCAL_REFERENCE",reference:raw,target});
 }
}
const report={schemaVersion:1,phase:10,label:"Public local-link and asset audit",ok:issues.length===0,checkedFiles:roots.length,issues};
console.log(JSON.stringify(report,null,2));
if(issues.length)process.exitCode=1;
