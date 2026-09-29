import {readFile,readdir,stat} from "node:fs/promises";
import path from "node:path";

const root=path.resolve(process.argv[2]||".");
const read=async p=>readFile(path.join(root,p),"utf8");
const exists=async p=>{try{return (await stat(path.join(root,p))).isFile()}catch{return false}};
const issues=[];

for(const required of ["index.html","robots.txt","sitemap.xml","places/index.html","stories.html","press.html"]){
  if(!(await exists(required)))issues.push({code:"MISSING_PUBLIC_DISCOVERY_FILE",file:required});
}

const index=await read("index.html");
if(!index.includes('<meta name="robots" content="index,follow">'))issues.push({code:"HOME_NOT_INDEXABLE"});
if(!index.includes('<link rel="canonical" href="https://earthrightnow.app/">'))issues.push({code:"HOME_CANONICAL_MISSING"});
if(!/"@type":"WebSite"/.test(index))issues.push({code:"WEBSITE_SCHEMA_MISSING"});
if(!/"@type":"Organization"/.test(index))issues.push({code:"ORGANIZATION_SCHEMA_MISSING"});
if(!index.includes('href="./places/"'))issues.push({code:"PLACES_CRAWL_LINK_MISSING"});

const robots=await read("robots.txt");
if(!/User-agent:\s*OAI-SearchBot[\s\S]*?Allow:\s*\//i.test(robots))issues.push({code:"OAI_SEARCHBOT_NOT_EXPLICITLY_ALLOWED"});
if(/User-agent:\s*OAI-SearchBot[\s\S]*?Disallow:\s*\/\s*(?:\r?\n|$)/i.test(robots))issues.push({code:"OAI_SEARCHBOT_ROOT_BLOCKED"});
if(!/Disallow:\s*\/review\//i.test(robots))issues.push({code:"REVIEW_ROBOTS_GUARD_MISSING"});

const sitemap=await read("sitemap.xml");
for(const url of ["https://earthrightnow.app/","https://earthrightnow.app/places/","https://earthrightnow.app/stories.html","https://earthrightnow.app/press.html"]){
  if(!sitemap.includes("<loc>"+url+"</loc>"))issues.push({code:"SITEMAP_ENTRY_MISSING",url});
}
if(/\/review\/|release-verification\.html/.test(sitemap))issues.push({code:"OPERATOR_URL_IN_SITEMAP"});

const stories=await read("stories.html");
if(!/CollectionPage/.test(stories))issues.push({code:"STORIES_COLLECTION_SCHEMA_MISSING"});
if(!/BreadcrumbList/.test(stories))issues.push({code:"STORIES_BREADCRUMB_SCHEMA_MISSING"});
if(!stories.includes('<link rel="canonical" href="https://earthrightnow.app/stories.html">'))issues.push({code:"STORIES_CANONICAL_MISSING"});

const placesIndex=await read("places/index.html");
if(!/CollectionPage/.test(placesIndex))issues.push({code:"PLACES_COLLECTION_SCHEMA_MISSING"});
if(!/BreadcrumbList/.test(placesIndex))issues.push({code:"PLACES_BREADCRUMB_SCHEMA_MISSING"});

const entries=await readdir(path.join(root,"places"),{withFileTypes:true});
const destinationDirs=entries.filter(x=>x.isDirectory());
if(destinationDirs.length<50)issues.push({code:"DESTINATION_PAGE_COUNT_LOW",count:destinationDirs.length});

let checked=0;
for(const entry of destinationDirs){
  const rel=path.join("places",entry.name,"index.html");
  if(!(await exists(rel))){issues.push({code:"DESTINATION_PAGE_MISSING",place:entry.name});continue}
  const html=await read(rel);
  checked++;
  if(!html.includes('<meta name="robots" content="index,follow">'))issues.push({code:"DESTINATION_NOT_INDEXABLE",place:entry.name});
  if(!/rel="canonical" href="https:\/\/earthrightnow\.app\/places\//.test(html))issues.push({code:"DESTINATION_CANONICAL_MISSING",place:entry.name});
  if(!/BreadcrumbList/.test(html))issues.push({code:"DESTINATION_BREADCRUMB_MISSING",place:entry.name});
  if(!/"@type":"Place"/.test(html))issues.push({code:"DESTINATION_PLACE_SCHEMA_MISSING",place:entry.name});
  if(/rel="sponsored noopener noreferrer"/.test(html)){
    if(!html.includes("Affiliate link"))issues.push({code:"AFFILIATE_DISCLOSURE_MISSING",place:entry.name});
    if(!html.includes("Affiliate availability never affects ERN source ranking"))issues.push({code:"AFFILIATE_RANKING_BOUNDARY_MISSING",place:entry.name});
  }
  if(html.includes("Reviewed local places")&&!html.includes("These entries are not paid placements"))issues.push({code:"LOCAL_PLACE_NONPAID_DISCLOSURE_MISSING",place:entry.name});
}

const report={
  schemaVersion:1,
  checkedAt:new Date().toISOString(),
  root,
  valid:issues.length===0,
  destinationPagesChecked:checked,
  issueCount:issues.length,
  issues,
  boundaries:{
    crawlerPolicyMutationAllowed:false,
    contentRankingMutationAllowed:false,
    commercialRankingMutationAllowed:false,
    operatorPagesIndexable:false
  },
  note:"Public discoverability preflight only. It checks crawl/index structure and never changes source truth, ranking, affiliate state or crawler policy."
};
console.log(JSON.stringify(report,null,2));
if(!report.valid)process.exitCode=1;
