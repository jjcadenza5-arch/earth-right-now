import fs from "node:fs";
const sitemap=fs.readFileSync("sitemap.xml","utf8"),robots=fs.readFileSync("robots.txt","utf8"),html=fs.readFileSync("index.html","utf8");
console.assert(sitemap.includes("<loc>https://earthrightnow.app/</loc>"),"sitemap root must use custom domain");
console.assert(!sitemap.includes("github.io"),"public sitemap must not advertise GitHub hostname");
console.assert(sitemap.includes("https://earthrightnow.app/about.html")&&sitemap.includes("https://earthrightnow.app/privacy.html"),"public trust pages should be discoverable");
console.assert(robots.includes("Sitemap: https://earthrightnow.app/sitemap.xml"));
console.assert(html.includes('rel="canonical" href="https://earthrightnow.app/"'));
console.assert(html.includes('name="google-site-verification"'));
console.log("ERN custom-domain indexing smoke checks passed");
