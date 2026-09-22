function providerKey(source){return source?.provider?String(source.provider).trim().toLowerCase():"unknown"}
export function diversifyWatchEarthProviders(ranked=[],{limit=20,maxPerProvider=6}={}){
 const pool=(ranked||[]).filter(Boolean),target=Math.min(Math.max(0,limit),pool.length),out=[],used=new Set(),counts=new Map();
 for(const s of pool){if(out.length>=target)break;const key=providerKey(s),n=counts.get(key)||0;if(key!=="unknown"&&n>=maxPerProvider)continue;out.push(s);used.add(s.id);counts.set(key,n+1)}
 for(const s of pool){if(out.length>=target)break;if(used.has(s.id))continue;out.push(s);used.add(s.id)}
 return out
}
