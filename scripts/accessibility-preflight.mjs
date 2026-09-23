import fs from "node:fs";
const h=fs.readFileSync("index.html","utf8"),c=fs.readFileSync("src/styles-lite.css","utf8"),a=fs.readFileSync("src/app-lite.js","utf8"),fail=[];
const must=(ok,msg)=>{if(!ok)fail.push(msg)};
must(/<html[^>]*lang="[^"]+"/i.test(h),"html language missing");
must(h.includes('class="skip-link"')&&h.includes('href="#mainContent"'),"skip link missing");
must(/id="viewer"[^>]*role="dialog"[^>]*aria-modal="true"/.test(h),"viewer must be an aria-modal dialog");
must(/id="guidePanel"[^>]*aria-label=/.test(h),"ERN Guide panel needs an accessible name");
must(/id="atlas"[^>]*aria-label=/.test(h),"Living Atlas needs an accessible name");
for(const id of ["languageSelect","topSearch","savedNav","topAtlas","closeViewer"])must(new RegExp(`id="${id}"[^>]*(aria-label|title)=`).test(h),`${id} needs an accessible name`);
must(/id="searchInput"[^>]*(placeholder|aria-label)=/.test(h),"Search input needs an accessible name or prompt");
must(c.includes(":focus-visible"),"visible focus styles missing");
must(c.includes("@media(prefers-reduced-motion:reduce)"),"reduced-motion handling missing");
must(c.includes("env(safe-area-inset-bottom)"),"mobile safe-area handling missing");
must(a.includes('e.key==="Escape"')&&a.includes('e.key==="ArrowRight"')&&a.includes('e.key==="ArrowLeft"'),"viewer keyboard navigation missing");
must(a.includes("state.lastFocus")&&a.includes("state.lastFocus.focus()"),"viewer focus restoration missing");
must(h.includes('role="status"')&&h.includes('aria-live="polite"'),"live status messaging missing");
if(fail.length){console.error(JSON.stringify({ok:false,fail},null,2));process.exit(1)}
console.log(JSON.stringify({ok:true,skipLink:true,viewerDialog:true,guideNamed:true,atlasNamed:true,focusVisible:true,reducedMotion:true,safeArea:true,keyboardViewer:true,focusRestore:true},null,2));
