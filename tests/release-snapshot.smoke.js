import fs from "node:fs";import {execFileSync} from "node:child_process";import assert from "node:assert/strict";import {createHash} from "node:crypto";
const h=createHash("sha256").update("ERN").digest("hex");assert.equal(h.length,64);
fs.mkdirSync("dist",{recursive:true});fs.writeFileSync("dist/stale-phase5-file.txt","must not ship");
execFileSync(process.execPath,["scripts/build-release-snapshot.mjs"],{stdio:"ignore"});
const manifest=JSON.parse(fs.readFileSync("dist/release-manifest.json","utf8"));assert.equal(fs.existsSync("dist/stale-phase5-file.txt"),false,"release build must remove stale prior-artifact files");assert.equal(manifest.files.includes("stale-phase5-file.txt"),false,"release manifest must not track stale prior-artifact files");
const required=["index.html","manifest.webmanifest","service-worker.js","offline.html","sitemap.xml","robots.txt","CNAME","about.html","contact.html","privacy.html","data/sources.json","data/release-evidence.json","discover/index.html","discover/beaches-water/index.html","discover/mountains-snow/index.html","discover/cities-streets/index.html","discover/wildlife-nature/index.html","discover/calm-scenic/index.html"];
for(const path of required){assert.ok(manifest.files.includes(path),path+" must be integrity-tracked");const bytes=fs.readFileSync("dist/"+path);assert.equal(manifest.sha256[path],createHash("sha256").update(bytes).digest("hex"),path+" hash must match artifact");}
const builtContact=fs.readFileSync("dist/contact.html","utf8");
assert.ok(builtContact.includes("mailto:jjcadenza6@gmail.com"),"released Contact email must match approved address");
const builtSitemap=fs.readFileSync("dist/sitemap.xml","utf8");
assert.ok(builtSitemap.includes("<loc>https://earthrightnow.app/contact.html</loc>"),"generated sitemap must list Contact");
const builtIndex=fs.readFileSync("dist/index.html","utf8");
assert.match(builtIndex,/\.\/src\/styles-lite\.css\?v=[A-Za-z0-9._-]+/,"homepage assets must be cache-busted in the release artifact");
assert.match(builtIndex,/\.\/src\/app-lite\.js\?v=[A-Za-z0-9._-]+/,"homepage runtime must be cache-busted in the release artifact");
console.log("ERN release snapshot integrity checks passed");
