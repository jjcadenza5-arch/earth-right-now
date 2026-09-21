const FAME_WORDS=["iconic","landmark","world famous","famous","major city"];
export function smallPlaceSignals(source={}){
 const hay=[source.title,source.region,source.story,...(source.categories||[])].filter(Boolean).join(" ").toLowerCase();
 const local=/(village|market|farm|harbour|harbor|promenade|square|local|small town|rest camp|ski area|beach|pier|marina)/.test(hay);
 const famous=FAME_WORDS.some(x=>hay.includes(x));
 return{local,famous,discoveryWorth:local&&!famous};
}
export function discoveryMix(items,{limit=6}={}){
 const rows=[...(items||[])],local=rows.filter(x=>smallPlaceSignals(x).discoveryWorth),rest=rows.filter(x=>!smallPlaceSignals(x).discoveryWorth);
 if(!local.length)return rows.slice(0,limit);
 const out=[],target=Math.min(Math.max(1,Math.floor(limit/3)),local.length);
 for(let i=0;i<target;i++)out.push(local[i]);
 for(const x of rest)if(out.length<limit)out.push(x);
 for(const x of local.slice(target))if(out.length<limit)out.push(x);
 return out.slice(0,limit);
}
