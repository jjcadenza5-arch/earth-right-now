import fs from "node:fs";import {createHash} from "node:crypto";
const manifest=JSON.parse(fs.readFileSync("dist/release-manifest.json","utf8"));const failures=[];
if(!manifest.commit)failures.push("release manifest has no candidate commit");
else if(process.env.GITHUB_SHA&&manifest.commit!==process.env.GITHUB_SHA)failures.push("release manifest commit does not match GITHUB_SHA");
for(const path of manifest.files||[]){const full="dist/"+path;if(!fs.existsSync(full)){failures.push(path+": missing");continue}const hash=createHash("sha256").update(fs.readFileSync(full)).digest("hex");if(hash!==manifest.sha256?.[path])failures.push(path+": hash mismatch")}
if(!manifest.files?.length)failures.push("release manifest tracks no files");
if(failures.length){console.error(failures.join("\n"));process.exit(1)}
console.log("ERN release artifact verified: "+manifest.files.length+" integrity-tracked files at "+manifest.commit);
