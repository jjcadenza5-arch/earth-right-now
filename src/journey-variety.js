import { mediaIdentity } from "./media-identity.js";\nfunction mediaKey(s){return s?.embedUrl||s?.imageUrl||s?.thumbnailUrl||s?.sourceUrl||s?.officialUrl||s?.id}
export function uniquePlayableJourney(sources,{limit=20}={}){
 const out=[],media=new Set(),places=new Set();
 for(const s of sources||[]){const key=mediaIdentity(s),place=s.placeId||s.id;if(!key||media.has(key)||places.has(place))continue;media.add(key);places.add(place);out.push(s);if(out.length>=limit)break}
 return out;
}
