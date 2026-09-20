import { discoverableSource } from "./discovery-eligibility.js";
import { sourceScore } from "./source-score.js";
import { interpretEarthIntent,foldEarthSearchText } from "./earth-intent.js";
import { sourceMatchesEarthIntents } from "./earth-intent-match.js";
import { nearNowEvidence } from "./now-evidence.js";
const norm=foldEarthSearchText;

const stopWords=new Set(["show","me","find","see","watch","look","at","in","on","the","a","an","of","for","please","i","want","to","go","going","visit","before","what","is","like","there","can","you","right"]);
export function searchEarth(sources,q,{now=new Date()}={}){
 const terms=norm(q).split(/\s+/).filter(Boolean),intent=interpretEarthIntent(q),wantsCurrent=intent.wantsCurrent,intentWords=new Set(intent.intents.flatMap(i=>({wildlife:["wildlife","animal","animals","elephant","bird","birds","zoo","nature"],water:["beach","beaches","sea","ocean","coast","coastal","water","surf","harbour","harbor"],mountains:["mountain","mountains","volcano","volcanoes","snow","summit","alpine"],human:["city","cities","street","streets","people","urban","square","harbour","harbor"],beautiful:["beautiful","scenic","view","views","relax","relaxing","calm","peaceful"],happening:["happening","active","event","busy","crowd","crowds"],night:["night","nighttime","lights","after","dark"],daylight:["daylight","sunny","daytime"],golden:["sunrise","sunset","golden","hour","dawn","dusk"],reference:["photo","photos","image","images","reference","picture","pictures"]}[i]||[]))),currentTerms=new Set((intent.currentTerms||[]).flatMap(x=>x.split(" "))),semanticTerms=terms.filter(t=>!currentTerms.has(t)&&!stopWords.has(t)&&!intentWords.has(t)),pool=sources.filter(s=>wantsCurrent?nearNowEvidence(s,{now}):discoverableSource(s));
 if(!terms.length)return[...pool].sort((a,b)=>sourceScore(b,{now})-sourceScore(a,{now}));
 const intentMatch=s=>sourceMatchesEarthIntents(s,intent.intents,now);
 const intentPool=intent.intents.length?pool.filter(intentMatch):pool;
 if(!semanticTerms.length)return[...intentPool].sort((a,b)=>sourceScore(b,{now})-sourceScore(a,{now}));
 return intentPool.map(s=>{const title=norm(s.title),country=norm(s.country),region=norm(s.region),hay=norm([s.title,s.region,s.country,s.provider,s.story,...(s.categories||[]),...(s.aliases||[])].join(" "));let score=sourceScore(s,{now})*.15,hits=0;for(const t of semanticTerms){let hit=false;if(hay.includes(t)){score+=10;hit=true}if(title.includes(t)){score+=18;hit=true}if(country.includes(t)||region.includes(t)){score+=9;hit=true}if(hit)hits++}return{s,score,hits}}).filter(x=>x.hits>0).sort((a,b)=>b.hits-a.hits||b.score-a.score).map(x=>x.s)
}
