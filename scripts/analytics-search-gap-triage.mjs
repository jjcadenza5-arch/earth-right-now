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
const rawGaps=(analytics.searchGaps||[]).map(g=>({query:String(g.value||"").trim(),count:Number(g.count)||0}));
const folded=v=>foldEarthSearchText(String(v||"").normalize("NFKC").replace(/\s+/g," ").trim());
const geography=[...new Set(pool.flatMap(s=>[s.city,s.state,s.region,s.country,...(s.aliases||[])])
 .map(folded).filter(x=>x&&x.length>=4))].sort((a,b)=>b.length-a.length);
const venueOrUtility=/\b(museum|opera|symphony|orchestra|concert hall|theatre|theater|outlet|mall|shopping|restaurant|cafe|hotel|resort)\b/i;
const researchClusterKey=query=>{
 const q=folded(query);
 if(/\b(bejin|bejing|beijing)\b/.test(q))return"beijing";
 if(q.includes("chiangmai")||q.includes("chiang mai"))return"chiang-mai";
 if(q.includes("dolphin bay"))return"dolphin-bay-sam-roi-yot";
 if(q.includes("mae hong sorn")||q.includes("mae hong son"))return"mae-hong-son";
 if(q.includes("phuket"))return"phuket";
 if(q.includes("wat rong khun")||q.includes("white temple")||q.includes("วัดร่องขุ่น"))return"chiang-rai-white-temple";
 return q.replace(/[^\p{L}\p{N}]+/gu,"-").replace(/^-+|-+$/g,"")||null;
};
const rows=rawGaps.map(g=>{
 const query=g.query,matches=searchEarth(pool,query,{now:new Date()});
 const normalized=query.normalize("NFKC").replace(/\s+/g," ").trim(),fq=folded(normalized),terms=fq.split(/\s+/).filter(Boolean);
 const strict=matches.filter(s=>{if(terms.length<=1)return true;const hay=folded([s.title,s.placeId,s.city,s.state,s.region,s.country,s.provider,s.story,...(s.categories||[]),...(s.tags||[]),...(s.aliases||[])].filter(Boolean).join(" "));return terms.every(t=>hay.includes(t))});
 const resolved=terms.length>1?strict:matches,compact=[...new Map(resolved.map(s=>[s.placeId||s.id,{placeId:s.placeId||s.id,title:s.title,country:s.country||null}])).values()].slice(0,5);
 const latin=/^[\x00-\x7F]+$/.test(normalized),lowConfidencePartial=latin&&terms.length===1&&normalized.replace(/[^a-z0-9]/gi,"").length<=4;
 const progressive=!compact.length&&fq.length>=2&&rawGaps.some(o=>{const fo=folded(o.query);return fo!==fq&&fo.length>fq.length&&(fo.startsWith(fq+" ")||fo.startsWith(fq))});
 const matchedGeo=geography.find(g=>fq===g||fq.includes(" "+g)||fq.startsWith(g+" ")||fq.endsWith(" "+g))||null;
 const venue=venueOrUtility.test(fq);
 let state=compact.length?"CURRENTLY_RESOLVES":lowConfidencePartial?"LOW_CONFIDENCE_PARTIAL":progressive?"PROGRESSIVE_QUERY_FRAGMENT":venue&&matchedGeo?"SUBPLACE_OR_VENUE_GAP":venue?"NON_DESTINATION_OR_VENUE_QUERY":"GENUINE_CURRENT_GAP";
 return{query,count:g.count,state,matchCount:compact.length,matches:compact,matchedGeography:matchedGeo,researchClusterKey:state==="GENUINE_CURRENT_GAP"?researchClusterKey(query):null,automaticCatalogMutationAllowed:false};
});
const countState=s=>rows.filter(x=>x.state===s).length;
const researchClusters=[...new Map(rows.filter(x=>x.state==="GENUINE_CURRENT_GAP"&&x.researchClusterKey).map(x=>[x.researchClusterKey,{key:x.researchClusterKey,queries:rows.filter(r=>r.state==="GENUINE_CURRENT_GAP"&&r.researchClusterKey===x.researchClusterKey).map(r=>r.query),eventCount:rows.filter(r=>r.state==="GENUINE_CURRENT_GAP"&&r.researchClusterKey===x.researchClusterKey).reduce((n,r)=>n+r.count,0)}])).values()];
const out={
 schemaVersion:2,
 generatedAt:analytics.generatedAt||new Date().toISOString(),
 analyticsWindowDays:analytics.windowDays||null,
 totalZeroResultEvents:rows.reduce((n,x)=>n+x.count,0),
 currentlyResolves:countState("CURRENTLY_RESOLVES"),
 genuineCurrentGaps:countState("GENUINE_CURRENT_GAP"),
 genuineDestinationClusters:researchClusters.length,
 researchClusters,
 subplaceOrVenueGaps:countState("SUBPLACE_OR_VENUE_GAP"),
 nonDestinationOrVenueQueries:countState("NON_DESTINATION_OR_VENUE_QUERY"),
 progressiveQueryFragments:countState("PROGRESSIVE_QUERY_FRAGMENT"),
 lowConfidencePartial:countState("LOW_CONFIDENCE_PARTIAL"),
 rows,
 safety:{automaticCatalogMutationAllowed:false,automaticAliasMutationAllowed:false,demandForecastInferred:false,rawCountsPreserved:true},
 note:"Read-only replay of aggregate historical zero-result terms. Raw zero-result counts are preserved, research priority separates true destination gaps from typing fragments and venue/utility intent, and repeated spelling/language variants are grouped into destination research clusters. No classification or cluster may auto-create a source or alias."
};
console.log(JSON.stringify(out,null,2));
