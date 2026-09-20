import { readFile,writeFile,mkdir,cp } from "node:fs/promises";
import { createHash } from "node:crypto";
const root=new URL("../",import.meta.url),dist=new URL("../dist/",import.meta.url);
await mkdir(dist,{recursive:true});
// Generate crawlable destination pages and sitemap from the same truth catalog used by the app.
await import("./build-destination-pages.mjs");
await cp(new URL("../index.html",import.meta.url),new URL("index.html",dist));
await cp(new URL("../src/",import.meta.url),new URL("src/",dist),{recursive:true});
await cp(new URL("../data/",import.meta.url),new URL("data/",dist),{recursive:true});
await cp(new URL("../assets/",import.meta.url),new URL("assets/",dist),{recursive:true});
await cp(new URL("../places/",import.meta.url),new URL("places/",dist),{recursive:true});
await cp(new URL("../sitemap.xml",import.meta.url),new URL("sitemap.xml",dist));
await cp(new URL("../robots.txt",import.meta.url),new URL("robots.txt",dist));
await cp(new URL("../CNAME",import.meta.url),new URL("CNAME",dist));
await cp(new URL("../manifest.webmanifest",import.meta.url),new URL("manifest.webmanifest",dist));
await cp(new URL("../privacy.html",import.meta.url),new URL("privacy.html",dist));
await cp(new URL("../about.html",import.meta.url),new URL("about.html",dist));
await cp(new URL("../deploy/_headers",import.meta.url),new URL("_headers",dist));
await cp(new URL("../deploy/_redirects",import.meta.url),new URL("_redirects",dist));
const files=["index.html","data/sources.json","data/release-evidence.json"];
const hashes={};for(const p of files){const b=await readFile(new URL(p,dist));hashes[p]=createHash("sha256").update(b).digest("hex")}
const pkg=JSON.parse(await readFile(new URL("../package.json",import.meta.url),"utf8"));
const commit=String(process.env.GITHUB_SHA||process.env.ERN_COMMIT_SHA||"").trim()||null;
const manifest={name:"Earth Right Now",version:pkg.version,commit,generatedAt:new Date().toISOString(),entry:"index.html",files,sha256:hashes,rollback:{sourceOfTruth:"Git commit SHA + this manifest",note:"Deploy this artifact as an immutable candidate; retain the prior known-good artifact before promotion."}};
await writeFile(new URL("release-manifest.json",dist),JSON.stringify(manifest,null,2)+"\n");
console.log(JSON.stringify(manifest,null,2));
