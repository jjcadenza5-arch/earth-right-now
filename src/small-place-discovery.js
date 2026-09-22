const FAME_WORDS=["iconic","world famous","famous","major city"];
const LOCAL_PATTERNS=[
 ["village",3],["small town",3],["neighbourhood",2],["neighborhood",2],["local",2],
 ["market",1],["farm",2],["harbour",1],["harbor",1],["promenade",1],["square",1],
 ["rest camp",2],["ski area",1],["beach",1],["pier",1],["marina",1],["waterfront",1]
];
function sourceText(source={}){
 return [source.title,source.region,source.story,...(source.categories||[])].filter(Boolean).join(" ").toLowerCase();
}
export function smallPlaceSignals(source={}){
 const hay=sourceText(source);
 const famous=FAME_WORDS.some(x=>hay.includes(x));
 const matched=LOCAL_PATTERNS.filter(([term])=>hay.includes(term));
 const localScore=matched.reduce((sum,[,weight])=>sum+weight,0);
 const local=localScore>0;
 return{local,famous,localScore,signals:matched.map(([term])=>term),discoveryWorth:localScore>=2&&!famous};
}
function discoveryKey(item={}){
 const s=(item.sources||[])[0]||item;
 return String(item.id||item.placeId||item.title||s.id||s.title||"").toLowerCase();
}
export function discoveryMix(items,{limit=6,promote=false}={}){
 const rows=[...(items||[])];
 if(!promote||limit<=0)return rows.slice(0,Math.max(0,limit));
 const local=rows.map((item,index)=>{
  const sources=item.sources?.length?item.sources:[item];
  const score=Math.max(...sources.map(s=>smallPlaceSignals(s).localScore));
  const worth=sources.some(s=>smallPlaceSignals(s).discoveryWorth);
  return{item,index,score,worth,key:discoveryKey(item)};
 }).filter(x=>x.worth).sort((a,b)=>b.score-a.score||a.index-b.index);
 if(!local.length)return rows.slice(0,limit);
 const target=Math.min(Math.max(1,Math.floor(limit/3)),local.length);
 const promoted=local.slice(0,target).map(x=>x.item);
 const chosen=new Set(promoted);
 const out=[...promoted];
 for(const item of rows)if(out.length<limit&&!chosen.has(item)){out.push(item);chosen.add(item);}
 return out.slice(0,limit);
}
