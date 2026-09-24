import fs from "node:fs";

const rows=JSON.parse(fs.readFileSync("data/sources.json","utf8"));
const HOLD=new Set([
  "maui-hale-pau-hana",
  "perdido-key-beach",
  "pleasant-beach-lake-ontario",
  "blouberg-table-mountain"
]);

const now=Date.now();
const futureSkewMs=5*60*1000;
const futureDated=rows.filter(source=>{
  const checked=Date.parse(source.lastSuccessfulCheck||source.checkedAt||"");
  return Number.isFinite(checked)&&checked>now+futureSkewMs;
});
const fresh=source=>{
  const checked=Date.parse(source.lastSuccessfulCheck||source.checkedAt||"");
  return Number.isFinite(checked)&&checked<=now+futureSkewMs&&(now-checked)<=21*86400000;
};

const eligible=rows.filter(source=>
  source&&
  source.health==="HEALTHY"&&
  !HOLD.has(source.id)&&
  source.truth!=="PREVIEW"&&
  source.playback!=="PREVIEW"&&
  fresh(source)
);
const inside=eligible.filter(source=>
  (source.playback==="EMBED"&&source.embedUrl)||
  (source.playback==="IMAGE_REFRESH"&&source.sourceUrl)
);
const countries=new Set(eligible.map(source=>source.country).filter(Boolean));
const providers=new Set(eligible.map(source=>source.provider).filter(Boolean));
const truth=new Set(eligible.map(source=>source.truth));

const fail=[];
const must=(ok,message)=>{if(!ok)fail.push(message);};

for(const source of futureDated){
  fail.push("future-dated verification timestamp: "+source.id+" ("+(source.lastSuccessfulCheck||source.checkedAt)+")");
}
must(eligible.length>=20,`fewer than 20 fresh non-preview Watch Earth candidates: ${eligible.length}`);
must(inside.length>=5,`fewer than 5 fresh inside-ERN candidates: ${inside.length}`);
must(countries.size>=10,`Watch Earth candidate geography too narrow: ${countries.size} countries`);
must(providers.size>=8,`Watch Earth provider diversity too narrow: ${providers.size} providers`);
for(const type of ["LIVE_VIDEO","LIVE_IMAGE","EXTERNAL_LIVE"]){
  must(truth.has(type),`Watch Earth candidate pool lost truthful type ${type}`);
}
must(eligible.every(source=>!HOLD.has(source.id)),"held source leaked into curated candidate pool");

if(fail.length){
  console.error(JSON.stringify({
    ok:false,
    fail,
    futureDated:futureDated.map(source=>({
      id:source.id,
      checkedAt:source.checkedAt||null,
      lastSuccessfulCheck:source.lastSuccessfulCheck||null
    })),
    metrics:{
      eligible:eligible.length,
      inside:inside.length,
      countries:countries.size,
      providers:providers.size,
      truth:[...truth]
    }
  },null,2));
  process.exit(1);
}

console.log(JSON.stringify({
  ok:true,
  metrics:{
    eligible:eligible.length,
    inside:inside.length,
    countries:countries.size,
    providers:providers.size,
    truth:[...truth]
  },
  held:[...HOLD]
},null,2));
