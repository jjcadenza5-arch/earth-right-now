import fs from "node:fs";import path from "node:path";
const root=path.resolve(process.argv[2]||"dist"),issues=[],warnings=[];
const read=rel=>fs.readFileSync(path.join(root,rel),"utf8");
const exists=rel=>fs.existsSync(path.join(root,rel));
const must=(ok,code,detail={})=>{if(!ok)issues.push({code,...detail})};

const robots=read("robots.txt");
must(/User-agent:\s*\*[\s\S]*?Allow:\s*\//i.test(robots),"PUBLIC_CRAWL_NOT_ALLOWED");
must(/User-agent:\s*OAI-SearchBot[\s\S]*?Allow:\s*\//i.test(robots),"OAI_SEARCHBOT_NOT_EXPLICITLY_ALLOWED");
for(const p of ["/review/","/release-verification.html"])must(robots.includes("Disallow: "+p),"PRIVATE_OR_OPERATOR_PATH_NOT_BLOCKED",{path:p});

for(const rel of ["about.html","how-ern-works.html","source-policy.html","editorial-principles.html","faq.html","privacy.html","llms.txt"]){
  must(exists(rel),"PUBLIC_AI_GUIDE_MISSING",{rel});
}
const identity=[read("about.html"),read("how-ern-works.html"),read("faq.html")].join("\n");
for(const phrase of ["Earth Right Now","The Live Discovery Engine","See before you go","Live Discovery Search Engine"])must(identity.includes(phrase),"PUBLIC_IDENTITY_INCOMPLETE",{phrase});
const policy=read("source-policy.html");
for(const phrase of ["Never fake LIVE","Embedded live stream","External live source","Current image","Source recheck due","Attribution and timestamps"])must(policy.includes(phrase),"SOURCE_POLICY_INCOMPLETE",{phrase});
const editorial=read("editorial-principles.html");
for(const phrase of ["Quality over quantity","Editorial independence","Useful context, not SEO filler"])must(editorial.includes(phrase),"EDITORIAL_POLICY_INCOMPLETE",{phrase});
const faq=read("faq.html");must(/FAQPage/.test(faq),"FAQ_STRUCTURED_DATA_MISSING");
const llms=read("llms.txt");
for(const u of ["/places/","/discover/","/how-ern-works.html","/source-policy.html","/editorial-principles.html","/faq.html","/sitemap.xml"])must(llms.includes("https://earthrightnow.app"+u),"LLMS_GUIDE_LINK_MISSING",{url:u});
for(const phrase of ["Destination understanding","local-language aliases","Related destinations","do not change source health"])must(llms.includes(phrase),"LLMS_DESTINATION_CONTEXT_MISSING",{phrase});

const placesRoot=path.join(root,"places");
const dirs=fs.readdirSync(placesRoot,{withFileTypes:true}).filter(x=>x.isDirectory()).map(x=>x.name);
let indexable=0,representative=[];
for(const d of dirs){
  const rel="places/"+d+"/index.html",html=read(rel);
  const isIndexable=/<meta name="robots" content="index,follow"/i.test(html);
  if(!isIndexable)continue;
  indexable++;
  const checks={
    canonical:/<link rel="canonical" href="https:\/\/earthrightnow\.app\/places\//i.test(html),
    placeSchema:/"@type":"Place"/.test(html),
    citation:/"citation":\[/.test(html),
    provider:/Provider:/.test(html),
    structuredProvider:/ERN source provider/.test(html),
    structuredPlayback:/ERN playback mode/.test(html),
    sourceType:/Source type:/.test(html),
    playback:/Playback:/.test(html),
    checkTime:/ERN checked <time datetime="/.test(html)||/Outside published live hours/.test(html),
    sourcePolicy:/source-policy\.html/.test(html),
    howWorks:/how-ern-works\.html/.test(html),
    editorial:/editorial-principles\.html/.test(html),
    brand:/Earth Right Now · See before you go\./.test(html),
    location:/(Country:|Region:|State\/region:|City:)/.test(html),
    relation:/Explore related places/.test(html)||/Explore:/.test(html)
  };
  for(const [key,ok] of Object.entries(checks))must(ok,"DESTINATION_AI_CONTEXT_MISSING",{rel,key});
  if(representative.length<6)representative.push({rel,...checks});
}
must(indexable>0,"NO_INDEXABLE_DESTINATIONS");
must(exists("data/place-search-aliases.json"),"PLACE_ALIAS_SIDECAR_MISSING");
let aliasPlacesChecked=0;
if(exists("data/place-search-aliases.json")){
  const aliasDoc=JSON.parse(read("data/place-search-aliases.json"));
  const placeAliases=aliasDoc?.places&&typeof aliasDoc.places==="object"?aliasDoc.places:{};
  for(const [placeId,aliases] of Object.entries(placeAliases)){
    const rel="places/"+placeId.replace(/[^a-zA-Z0-9_-]/g,"-")+"/index.html";
    if(!exists(rel))continue;
    const html=read(rel);
    if(!/<meta name="robots" content="index,follow"/i.test(html))continue;
    aliasPlacesChecked++;
    must(/"alternateName":\[/.test(html),"DESTINATION_ALTERNATE_NAME_SCHEMA_MISSING",{rel,placeId});
    const visibleAliases=(Array.isArray(aliases)?aliases:[]).filter(a=>a&&html.includes(String(a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")));
    must(visibleAliases.length>0,"DESTINATION_VISIBLE_ALIAS_MISSING",{rel,placeId});
  }
}
must(aliasPlacesChecked>=10,"PLACE_ALIAS_INDEXABLE_COVERAGE_TOO_SMALL",{aliasPlacesChecked});
const sitemap=read("sitemap.xml");
for(const rel of ["how-ern-works.html","source-policy.html","editorial-principles.html","faq.html"])must(sitemap.includes("https://earthrightnow.app/"+rel),"AI_GUIDE_NOT_IN_SITEMAP",{rel});
const report={schemaVersion:1,checkedAt:new Date().toISOString(),ready:issues.length===0,indexableDestinations:indexable,aliasPlacesChecked,representative,issues,warnings,boundaries:{publicGenerativeGuideActivated:false,publicNowMomentsActivated:false,privatePathsExposed:false,llmsTxtAuthoritative:false}};
console.log(JSON.stringify(report,null,2));if(!report.ready)process.exitCode=1;
