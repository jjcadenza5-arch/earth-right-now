function fallbackLocation(){return typeof location!=="undefined"?location:{hash:"",origin:"",pathname:"/"}}
function cleanId(value){const id=String(value||"").trim();return id&&id.length<=160&&/^[A-Za-z0-9._~-]+$/.test(id)?id:null}
export function placeHref(placeId){const id=cleanId(placeId);return id?"#place="+encodeURIComponent(id):null}
export function windowHref(sourceId,placeId){const sid=cleanId(sourceId),pid=cleanId(placeId);if(!sid)return placeHref(pid);return"#window="+encodeURIComponent(sid)+(pid?"&place="+encodeURIComponent(pid):"")}
export function parsePlaceHash(hash=fallbackLocation().hash){if(typeof hash!=="string"||hash.length>512)return null;let m=hash.match(/^#place=([^&?#]+)$/);if(!m)m=hash.match(/^#window=[^&?#]+&place=([^&?#]+)$/);if(!m)return null;try{return cleanId(decodeURIComponent(m[1]))}catch{return null}}
export function parseWindowHash(hash=fallbackLocation().hash){if(typeof hash!=="string"||hash.length>512)return null;const m=hash.match(/^#window=([^&?#]+)(?:&place=[^&?#]+)?$/);if(!m)return null;try{return cleanId(decodeURIComponent(m[1]))}catch{return null}}
export function sourcesForPlace(registry,placeId){if(!placeId)return[];return[...registry.values()].filter(s=>(s.placeId||s.id)===placeId)}
export function safePlaceFromHash(hash,places){const id=parsePlaceHash(hash);return id?places.find(p=>p.id===id)||null:null}
