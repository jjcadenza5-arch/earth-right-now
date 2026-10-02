import fs from "node:fs";import {execFileSync} from "node:child_process";import assert from "node:assert/strict";import {createHash} from "node:crypto";
const h=createHash("sha256").update("ERN").digest("hex");assert.equal(h.length,64);
execFileSync(process.execPath,["scripts/build-release-snapshot.mjs"],{stdio:"ignore"});
const manifest=JSON.parse(fs.readFileSync("dist/release-manifest.json","utf8"));
const required=["index.html","manifest.webmanifest","service-worker.js","offline.html","sitemap.xml","robots.txt","CNAME","about.html","privacy.html","data/sources.json","data/release-evidence.json","discover/index.html","discover/beaches-water/index.html","discover/mountains-snow/index.html","discover/cities-streets/index.html","discover/wildlife-nature/index.html","discover/calm-scenic/index.html"];
for(const path of required){assert.ok(manifest.files.includes(path),path+" must be integrity-tracked");const bytes=fs.readFileSync("dist/"+path);assert.equal(manifest.sha256[path],createHash("sha256").update(bytes).digest("hex"),path+" hash must match artifact");}
console.log("ERN release snapshot integrity checks passed");
