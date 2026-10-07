import fs from "node:fs";
import {searchEarth} from "../src/search-engine.js";
import {foldEarthSearchText} from "../src/earth-intent.js";
const analyticsPath=process.argv[2];
if(!analyticsPath)throw new Error("usage: analytics-search-gap-triage <analytics.json>");
const analytics=JSON.parse(fs.readFileSync(analyticsPath,"utf8"));
const sources=JSON.parse(fs.readFileSync("data/sources.json","utf8"));
const supplemental=JSON.parse(fs.readFileSync("data/search-supplemental.json","utf8"));
const aliases=JSON.parse(fs.readFileSync("data/place-search-aliases.json","utf8"))?.places||{};
const pool=[...sources,...supplemental].map(s=>({...s,aliases:[...(s.aliases||[]),...(aliases[s.placeId||s.id]||[])]}));
const rows=(analytics.searchGaps||[]).map(g=>{
 const query=String(g.value||"").trim(),matches=searchEarth(pool,query,{now:new Date()});
 const normalized=query.normalize("NFKC").replace(/\s+/g," ").trim(),terms=foldEarthSearchText(normalized).split(/\s+/).filter(Boolean);
 const strict=matches.filter(s=>{if(terms.length<=1)return true;const hay=foldEarthSearchText([s.title,s.placeId,s.city,s.state,s.region,s.country,s.provider,s.story,...(s.categories||[]),...(s.tags||[]),...(s.aliases||[])].filter(Boolean).join(" "));return terms.every(t=>hay.includes(t))});
 const resolved=terms.length>1?strict:matches,compact=[...new Map(resolved.map(s=>[s.placeId||s.id,{placeId:s.placeId||s.id,title:s.title,country:s.country||null}])).values()].slice(0,5);
 const latin=/^[\x00-\x7F]+$/.test(normalized),lowConfidencePartial=latin&&normalized.replace(/[^a-z0-9]/gi,"").length<=3;
 return{
   query,count:Number(g.count)||0,
   state:compact.length?"CURRENTLY_RESOLVES":lowConfidencePartial?"LOW_CONFIDENCE_PARTIAL":"GENUINE_CURRENT_GAP",
   matchCount:compact.length,
   matches:compact,
   automaticCatalogMutationAllowed:false
 };
});
const out={
 schemaVersion:1,
 generatedAt:analytics.generatedAt||new Date().toISOString(),
 analyticsWindowDays:analytics.windowDays||null,
 totalZeroResultEvents:rows.reduce((n,x)=>n+x.count,0),
 currentlyResolves:rows.filter(x=>x.state==="CURRENTLY_RESOLVES").length,
 genuineCurrentGaps:rows.filter(x=>x.state==="GENUINE_CURRENT_GAP").length,
 lowConfidencePartial:rows.filter(x=>x.state==="LOW_CONFIDENCE_PARTIAL").length,
 rows,
 safety:{automaticCatalogMutationAllowed:false,automaticAliasMutationAllowed:false,demandForecastInferred:false},
 note:"Read-only replay of aggregate historical zero-result terms against the current ERN catalog/search metadata. A historical zero result that resolves now should not trigger a catalog change."
};
console.log(JSON.stringify(out,null,2));
