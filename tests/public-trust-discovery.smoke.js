import assert from "node:assert/strict";
import fs from "node:fs";
const files=[["about.html","AboutPage"],["contact.html","AboutPage"],["privacy.html","WebPage"],["for-places.html","WebPage"],["press.html","AboutPage"]];
for(const [file,type] of files){
 const html=fs.readFileSync(new URL("../"+file,import.meta.url),"utf8");
 assert.ok(html.includes('"@type":"'+type+'"'),file+" structured page type missing");
 assert.ok(html.includes("BreadcrumbList"),file+" breadcrumb schema missing");
 assert.ok(/aria-label="Breadcrumb"/.test(html),file+" visible breadcrumb missing");
 assert.ok(html.includes('<link rel="canonical" href="https://earthrightnow.app/'+file+'">'),file+" canonical missing");
}
const contact=fs.readFileSync(new URL("../contact.html",import.meta.url),"utf8");
assert.ok(contact.includes("mailto:jjcadenza6@gmail.com"),"approved business contact email must be visible");
const home=fs.readFileSync(new URL("../index.html",import.meta.url),"utf8");
assert.ok(home.includes('href="./contact.html"'),"homepage must link to Contact");
const dist=fs.readFileSync(new URL("../scripts/distribution-readiness.mjs",import.meta.url),"utf8");
assert.match(dist,/structuredSiteIdentity===true/,"AI/search readiness must require structured identity");
console.log("Public trust pages and AI-search readiness keep structured identity");
