import fs from "node:fs";
const rows=JSON.parse(fs.readFileSync("data/sources.json","utf8"));
const HOLD=new Set(["maui-hale-pau-hana","perdido-key-beach","pleasant-beach-lake-ontario","blouberg-table-mountain"]);
const now=Date.now(),futureSkewMs=5*60*1000,futureDated=rows.filter(s=>{const d=Date.parse(s.lastSuccessfulCheck||s.checkedAt||"");return Number.isFinite(d)&&d>now+futureSkewMs});
const fresh=s=>{const d=Date.parse(s.lastSuccessfulCheck||s.checkedAt||"");return Number.isFinite(d)&&d<=now+futureSkewMs&&(now-d)<=21*86400000};
const eligible=rows.filter(s=>s&&s.health==="HEALTHY"&&!HOLD.has(s.id)&&s.truth!=="PREVIEW"&&s.playback!=="PREVIEW"&&fresh(s));
const inside=eligible.filter(s=>(s.playback==="EMBED"&&s.embedUrl)||(s.playback==="IMAGE_REFRESH"&&s.sourceUrl));
const countries=new Set(eligible.map(s=>s.country).filter(Boolean)),providers=new Set(eligible.map(s=>s.provider).filter(Boolean)),truth=new Set(eligible.map(s=>s.truth));
const fail=[],must=(ok,msg)=>{if(!ok)fail.push(msg)};
for(const s of futureDated)fail.push("future-dated verification timestamp: "+s.id+" ("+(s.lastSuccessfulCheck||s.checkedAt)+")");
must(eligible.length>=20,`fewer than 20 fresh non-preview Watch Earth candidates: ${eligible.length}`);
must(inside.length>=5,`fewer than 5 fresh inside-ERN candidates: ${inside.length}`);
must(countries.size>=10,`Watch Earth candidate geography too narrow: ${countries.size} countries`);
must(providers.size>=8,`Watch Earth provider diversity too narrow: ${providers.size} providers`);
for(const t of ["LIVE_VIDEO","LIVE_IMAGE","EXTERNAL_LIVE"])must(truth.has(t),`Watch Earth candidate pool lost truthful type ${t}`);
must(eligible.every(s=>!HOLD.has(s.id)),"held source leaked into curated candidate pool");
if(fail.length){console.error(JSON.stringify({ok:false,fail,futureDated:futureDated.map(s=>({id:s.id,checkedAt:s.checkedAt||null,lastSuccessfulCheck:s.lastSuccessfulCheck||null})),metrics:{eligible:eligible.length,inside:inside.length,countries:countries.size,providers:providers.size,truth:[...truth]}},null,2));process.exit(1)}
console.log(JSON.stringify({ok:true,metrics:{eligible:eligible.length,inside:inside.length,countries:countries.size,providers:providers.size,truth:[...truth]},held:[...HOLD]},null,2));
