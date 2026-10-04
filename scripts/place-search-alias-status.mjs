import fs from "node:fs";
const core=JSON.parse(fs.readFileSync("data/sources.json","utf8"));
const supplemental=JSON.parse(fs.readFileSync("data/search-supplemental.json","utf8"));
const doc=JSON.parse(fs.readFileSync("data/place-search-aliases.json","utf8"));
const ids=new Set([...core,...supplemental].map(s=>String(s.placeId||s.id||"")).filter(Boolean));
const issues=[],rows=doc?.places&&typeof doc.places==="object"?doc.places:{};
const fold=s=>String(s||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^\p{L}\p{N}]+/gu," ").trim();
if(doc?.schemaVersion!==1)issues.push({code:"SCHEMA_VERSION"});
for(const [placeId,aliases] of Object.entries(rows)){
  if(!ids.has(placeId))issues.push({code:"UNKNOWN_PLACE",placeId});
  if(!Array.isArray(aliases)||!aliases.length){issues.push({code:"ALIASES_EMPTY",placeId});continue}
  const seen=new Set();
  for(const alias of aliases){
    const n=fold(alias);
    if(!n)issues.push({code:"EMPTY_ALIAS",placeId,alias});
    else if(seen.has(n))issues.push({code:"DUPLICATE_ALIAS",placeId,alias});
    else seen.add(n);
  }
}
if(Object.keys(rows).length<20)issues.push({code:"ALIAS_COVERAGE_TOO_SMALL",count:Object.keys(rows).length});
const report={schemaVersion:1,checkedAt:new Date().toISOString(),placeCount:Object.keys(rows).length,aliasCount:Object.values(rows).reduce((n,a)=>n+(Array.isArray(a)?a.length:0),0),issues,ok:issues.length===0,boundaries:{rankingChanged:false,sourceTruthChanged:false,startupPayloadChanged:false}};
console.log(JSON.stringify(report,null,2));
if(!report.ok)process.exitCode=1;
