import {readFile,readdir,stat} from "node:fs/promises";
import path from "node:path";

const root=path.resolve(process.argv[2]||"dist");
const missing=[],checked=new Set(),entryScripts=new Set();

async function exists(file){try{return(await stat(file)).isFile()}catch{return false}}
async function walk(dir){
  const out=[];
  for(const e of await readdir(dir,{withFileTypes:true})){
    const p=path.join(dir,e.name);
    if(e.isDirectory())out.push(...await walk(p));
    else out.push(p);
  }
  return out;
}
const publicFiles=await walk(root);
const htmlFiles=publicFiles.filter(p=>p.endsWith(".html"));
for(const file of htmlFiles){
  const html=await readFile(file,"utf8");
  for(const m of html.matchAll(/<script\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi)){
    const raw=m[1];
    if(/^(?:https?:)?\/\//i.test(raw))continue;
    const clean=raw.split(/[?#]/)[0];
    const resolved=clean.startsWith("/")?path.join(root,clean.replace(/^\/+/, "")):path.resolve(path.dirname(file),clean);
    entryScripts.add(resolved);
    if(!(await exists(resolved)))missing.push({from:path.relative(root,file),dependency:raw,resolved:path.relative(root,resolved),kind:"HTML_SCRIPT"});
  }
}
async function checkModule(file){
  if(checked.has(file)||!(await exists(file)))return;
  checked.add(file);
  if(!/\.(?:m?js)$/i.test(file))return;
  const code=await readFile(file,"utf8");
  const specs=[];
  for(const re of [/\b(?:import|export)\s+(?:[^"'()]*?\s+from\s+)?["']([^"']+)["']/g,/\bimport\(\s*["']([^"']+)["']\s*\)/g]){
    for(const m of code.matchAll(re))specs.push(m[1]);
  }
  for(const spec of specs){
    if(!spec.startsWith("."))continue;
    const resolved=path.resolve(path.dirname(file),spec);
    const candidates=path.extname(resolved)?[resolved]:[resolved+".js",resolved+".mjs",path.join(resolved,"index.js")];
    let hit=null;for(const c of candidates){if(await exists(c)){hit=c;break}}
    if(!hit)missing.push({from:path.relative(root,file),dependency:spec,resolved:path.relative(root,candidates[0]),kind:"MODULE_IMPORT"});
    else await checkModule(hit);
  }
}
for(const entry of entryScripts)await checkModule(entry);
const report={ok:missing.length===0,root,htmlFiles:htmlFiles.length,entryScripts:entryScripts.size,moduleFilesChecked:checked.size,missing};
console.log(JSON.stringify(report,null,2));
if(missing.length)process.exit(1);
