function fallbackLocation(){return typeof location!=="undefined"?location:{hash:"",origin:"",pathname:"/"}}
export function placeHref(placeId){return"#place="+encodeURIComponent(placeId)}
export function parsePlaceHash(hash=fallbackLocation().hash){if(typeof hash!=="string"||hash.length>512)return null;const m=hash.match(/^#place=([^&?#]+)$/);if(!m)return null;try{const id=decodeURIComponent(m[1]).trim();return id&&id.length<=160?id:null}catch{return null}}
export function sourcesForPlace(registry,placeId){if(!placeId)return[];return[...registry.values()].filter(s=>(s.placeId||s.id)===placeId)}
export function safePlaceFromHash(hash,places){const id=parsePlaceHash(hash);return id?places.find(p=>p.id===id)||null:null}
