import fs from "node:fs";
import {searchEarth} from "../src/search-engine.js";
import {foldEarthSearchText} from "../src/earth-intent.js";

const rows=JSON.parse(fs.readFileSync("data/sources.json","utf8"));
const now=new Date();
const norm=foldEarthSearchText;
const issues=[],aliasChecks=[];
const sampleQueries=["New York","NYC","New York City","Mount Rainier","Mt Rainier","ISS","Rio","Cancun","Reykjavik","Sydney","Bangkok","Seoul","Rome","Rovaniemi"];

for(const s of rows){
  const doc=norm([s.title,s.placeId,s.city,s.state,s.region,s.country,s.provider,s.story,...(s.categories||[]),...(s.tags||[]),...(s.aliases||[])].filter(Boolean).join(" "));
  for(const field of [s.title,s.placeId,s.region,s.country].filter(Boolean)){
    const tokens=norm(field).split(/\s+/).filter(Boolean);
    if(tokens.length&&!tokens.every(t=>doc.includes(t)))issues.push({id:s.id,code:"SEARCH_DOCUMENT_FIELD_MISSING",field});
  }
  const seen=new Set();
  for(const a of s.aliases||[]){
    const n=norm(a);
    if(!n){issues.push({id:s.id,code:"EMPTY_ALIAS"});continue}
    if(seen.has(n))issues.push({id:s.id,code:"DUPLICATE_ALIAS",alias:a});
    seen.add(n);
    const hits=searchEarth(rows,a,{now});
    const ok=hits.some(x=>(x.placeId||x.id)===(s.placeId||s.id));
    aliasChecks.push({id:s.id,alias:a,ok});
    if(!ok)issues.push({id:s.id,code:"ALIAS_NOT_SEARCHABLE",alias:a});
  }
}
const examples={};
for(const q of sampleQueries)examples[q]=searchEarth(rows,q,{now}).slice(0,6).map(s=>({id:s.id,placeId:s.placeId||s.id,title:s.title,current:s.health==="HEALTHY"}));
const report={schemaVersion:1,generatedAt:new Date().toISOString(),sources:rows.length,aliasRecords:rows.filter(s=>s.aliases?.length).length,aliasCount:rows.reduce((n,s)=>n+(s.aliases?.length||0),0),aliasChecks:aliasChecks.length,issues,examples,ok:issues.length===0};
console.log(JSON.stringify(report,null,2));
if(!report.ok)process.exitCode=1;
