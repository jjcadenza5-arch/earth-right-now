const weights={favoriteWindow:5,favoritePlace:4,recentWindow:2,recentPlace:1};
function add(map,key,value){if(!key)return;map.set(key,(map.get(key)||0)+value)}
export function buildLocalTaste({sources=[],places=[],favoriteWindowIds=[],favoritePlaceIds=[],recentWindowIds=[],recentPlaceIds=[]}={}){
 const sourceMap=new Map(sources.map(s=>[s.id,s])),placeMap=new Map(places.map(p=>[p.id,p])),categories=new Map(),countries=new Map(),placesScore=new Map();
 const learn=(source,w)=>{if(!source)return;(source.categories||[]).forEach(x=>add(categories,x,w));add(countries,source.country,w);add(placesScore,source.placeId,w)};
 favoriteWindowIds.forEach(id=>learn(sourceMap.get(id),weights.favoriteWindow));recentWindowIds.forEach(id=>learn(sourceMap.get(id),weights.recentWindow));
 favoritePlaceIds.forEach(id=>{const p=placeMap.get(id);if(!p)return;(p.categories||[]).forEach(x=>add(categories,x,weights.favoritePlace));add(countries,p.country,weights.favoritePlace);add(placesScore,p.id,weights.favoritePlace)});
 recentPlaceIds.forEach(id=>{const p=placeMap.get(id);if(!p)return;(p.categories||[]).forEach(x=>add(categories,x,weights.recentPlace));add(countries,p.country,weights.recentPlace);add(placesScore,p.id,weights.recentPlace)});
 return{categories,countries,places:placesScore,signals:favoriteWindowIds.length+favoritePlaceIds.length+recentWindowIds.length+recentPlaceIds.length};
}
export function tasteScore(source,taste){if(!source||!taste?.signals)return 0;let n=taste.places.get(source.placeId)||0;n+=(taste.countries.get(source.country)||0)*.35;for(const c of source.categories||[])n+=(taste.categories.get(c)||0)*.55;return n}
export function personalizeSources(sources,taste,{limit=8}={}){return[...(sources||[])].sort((a,b)=>tasteScore(b,taste)-tasteScore(a,taste)).slice(0,limit)}
