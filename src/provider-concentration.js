export function providerConcentration(rows=[]){
 const counts=new Map(),total=(rows||[]).length;
 for(const s of rows||[]){const p=String(s?.provider||"Unknown").trim()||"Unknown";counts.set(p,(counts.get(p)||0)+1)}
 const providers=[...counts.entries()].map(([provider,count])=>({provider,count,share:total?count/total:0})).sort((a,b)=>b.count-a.count||a.provider.localeCompare(b.provider));
 const top=providers[0]||{provider:null,count:0,share:0};
 return{total,providerCount:providers.length,topProvider:top.provider,topCount:top.count,topShare:top.share,providers};
}
