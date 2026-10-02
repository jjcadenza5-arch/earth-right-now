import fs from "node:fs";
import {spawnSync} from "node:child_process";
import {auditFallbackCoverage} from "../src/provider-fallback-audit.js";

const read=p=>fs.readFileSync(p,"utf8");
const json=p=>JSON.parse(read(p));
const issues=[],warnings=[];
const run=(name,path)=>{
 const r=spawnSync(process.execPath,[path],{encoding:"utf8"});
 if(r.status!==0)issues.push({area:name,code:"PREFLIGHT_FAILED",detail:(r.stderr||r.stdout||"").slice(0,500)});
 return r.status===0;
};

const preflights={
 publicLaunch:run("public-launch","scripts/public-launch-preflight.mjs"),
 mobile:run("mobile","scripts/mobile-layout-preflight.mjs"),
 accessibility:run("accessibility","scripts/accessibility-preflight.mjs"),
 performance:run("performance","scripts/performance-preflight.mjs"),
 commercial:run("commercial","scripts/commercial-placement-preflight.mjs")
};

const index=read("index.html"),brand=json("data/public-brand-facts.json"),sources=json("data/sources.json");
if(!index.includes("Earth Right Now — The Live Discovery Engine"))issues.push({area:"identity",code:"LIVE_DISCOVERY_ENGINE_TITLE_MISSING"});
if(!index.includes("EARTH RIGHT NOW · THE LIVE DISCOVERY ENGINE"))issues.push({area:"identity",code:"LIVE_DISCOVERY_ENGINE_HERO_MISSING"});
if(brand.category!=="The Live Discovery Engine")issues.push({area:"identity",code:"BRAND_CATEGORY_MISMATCH"});
if(JSON.stringify(brand.discoveryJourney)!==JSON.stringify(["Search","See Live","Discover","Decide","Go"]))issues.push({area:"identity",code:"DISCOVERY_JOURNEY_MISMATCH"});

const allowedTruth=new Set(["LIVE_VIDEO","LIVE_IMAGE","EXTERNAL_LIVE","PARTNER","PREVIEW"]);
const allowedHealth=new Set(["HEALTHY","DEGRADED","OFFLINE","UNKNOWN"]);
const important=s=>s.health==="HEALTHY"&&Number(s.quality||0)>=80&&s.truth!=="PREVIEW";
for(const s of sources){
 if(!s.id||!s.placeId||!s.title||!s.sourceUrl)issues.push({area:"source",code:"CORE_FIELDS_MISSING",id:s.id||null});
 if(!allowedTruth.has(s.truth))issues.push({area:"source",code:"TRUTH_LABEL_INVALID",id:s.id});
 if(!allowedHealth.has(s.health))issues.push({area:"source",code:"HEALTH_INVALID",id:s.id});
 if(important(s)){
  if(!s.provider||!s.attribution)issues.push({area:"source",code:"IMPORTANT_SOURCE_ATTRIBUTION_MISSING",id:s.id});
  const unpinned=["DYNAMIC_ORBIT","MULTI_SITE_COLLECTION"].includes(s.coordinateBasis);
  if(!unpinned&&(!Number.isFinite(s.lat)||!Number.isFinite(s.lon)))issues.push({area:"source",code:"IMPORTANT_SOURCE_LOCATION_MISSING",id:s.id});
  if(!s.coordinateBasis)issues.push({area:"source",code:"IMPORTANT_SOURCE_COORDINATE_BASIS_MISSING",id:s.id});
  if(!s.rightsBasis)issues.push({area:"source",code:"IMPORTANT_SOURCE_RIGHTS_BASIS_MISSING",id:s.id});
  if(!s.lastSuccessfulCheck)issues.push({area:"source",code:"IMPORTANT_SOURCE_SUCCESS_CHECK_MISSING",id:s.id});
 }
 if(s.truth==="LIVE_VIDEO"&&s.playback==="EMBED"&&!s.embedUrl)issues.push({area:"source",code:"LIVE_VIDEO_EMBED_MISSING",id:s.id});
 if(s.truth==="EXTERNAL_LIVE"&&s.playback!=="EXTERNAL")issues.push({area:"source",code:"EXTERNAL_LIVE_PLAYBACK_MISMATCH",id:s.id});
 if(s.truth==="LIVE_IMAGE"&&!["EXTERNAL","IMAGE_REFRESH"].includes(s.playback))issues.push({area:"source",code:"LIVE_IMAGE_PLAYBACK_MISMATCH",id:s.id});
}
for(const row of auditFallbackCoverage(sources))issues.push({area:"fallback",...row});

const guide=json("data/guide-ai-deployment.json"),moments=json("data/now-moment-media-deployment.json");
if(guide.publicActivation===true||guide.publicEnabled===true)issues.push({area:"gate",code:"GENERATIVE_GUIDE_PUBLIC_ON"});
if(moments.publicActivation===true||moments.publicEnabled===true)issues.push({area:"gate",code:"NOW_MOMENT_MEDIA_PUBLIC_ON"});
if(!index.includes("./discover/")||!index.includes('id="searchInput"')||!index.includes('id="watch"')||!index.includes('id="destinations"'))issues.push({area:"journey",code:"DISCOVERY_PATHWAY_MISSING"});
if(!index.includes("./about.html")||!index.includes("./privacy.html"))issues.push({area:"journey",code:"TRUST_PATHWAY_MISSING"});

const report={
 schemaVersion:1,
 phase:10,
 label:"ERN Launch & Business Readiness — Production Audit",
 ok:issues.length===0,
 preflights,
 importantSourceCount:sources.filter(important).length,
 totalSourceCount:sources.length,
 issues,
 warnings,
 gates:{pilot2:false,submissionPublic:false,nowMomentMedia:false,generativeGuidePublic:false,analytics:false,socialActions:false,payoutActions:false},
 safety:{automaticExternalActionsAllowed:false,paidRankingAllowed:false,spendAllowed:false}
};
console.log(JSON.stringify(report,null,2));
if(issues.length)process.exitCode=1;
