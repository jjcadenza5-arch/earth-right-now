function ranked(counts,total,key){
 return[...counts.entries()].map(([name,count])=>({[key]:name,count,share:total?count/total:0})).sort((a,b)=>b.count-a.count||String(a[key]).localeCompare(String(b[key])));
}
function hostOf(raw){const m=String(raw||"").match(/^https?:\/\/([^/]+)/i);return m?m[1].replace(/^www\./,"").toLowerCase():null}
export function providerConcentration(rows=[]){
 const list=rows||[],total=list.length,providerCounts=new Map(),domainSets=new Map();
 for(const s of list){
  const p=String(s?.provider||"Unknown").trim()||"Unknown";providerCounts.set(p,(providerCounts.get(p)||0)+1);
  for(const raw of [s?.sourceUrl,s?.officialUrl]){const host=hostOf(raw);if(!host)continue;let set=domainSets.get(host);if(!set){set=new Set();domainSets.set(host,set)}set.add(String(s?.id||""))}
 }
 const providers=ranked(providerCounts,total,"provider");
 const domains=ranked(new Map([...domainSets].map(([h,set])=>[h,set.size])),total,"domain");
 const topProvider=providers[0]||{provider:null,count:0,share:0},topDomain=domains[0]||{domain:null,count:0,share:0};
 return{total,providerCount:providers.length,domainCount:domains.length,topProvider:topProvider.provider,topProviderCount:topProvider.count,topProviderShare:topProvider.share,topDomain:topDomain.domain,topDomainCount:topDomain.count,topDomainShare:topDomain.share,providers,domains};
}
