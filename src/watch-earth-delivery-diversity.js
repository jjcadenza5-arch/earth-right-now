function host(source){for(const raw of [source?.embedUrl,source?.sourceUrl,source?.officialUrl]){try{if(raw)return new URL(raw).hostname.toLowerCase().replace(/^www\./,"")}catch{}}return source?.provider?String(source.provider).trim().toLowerCase():"unknown"}
export function diversifyDeliveryHosts(ranked=[],{limit=20,maxPerHost=4}={}){
 const pool=(ranked||[]).filter(Boolean),target=Math.min(Math.max(0,limit),pool.length),out=[],used=new Set(),counts=new Map();
 for(const s of pool){if(out.length>=target)break;const key=host(s),n=counts.get(key)||0;if(key!=="unknown"&&n>=maxPerHost)continue;out.push(s);used.add(s.id);counts.set(key,n+1)}
 for(const s of pool){if(out.length>=target)break;if(used.has(s.id))continue;out.push(s);used.add(s.id)}
 return out
}
