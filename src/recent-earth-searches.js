const recentKey="ern:recent-searches:v1";
const read=()=>{try{const x=JSON.parse(localStorage.getItem(recentKey)||"[]");return Array.isArray(x)?x.filter(v=>typeof v==="string"):[]}catch{return[]}};
export function recentEarthSearches(){if(typeof localStorage==="undefined")return[];return read().filter(Boolean).slice(0,8)}
export function rememberEarthSearch(query){if(typeof localStorage==="undefined")return[];const q=String(query||"").trim().replace(/\s+/g," ").slice(0,120);if(!q)return recentEarthSearches();const next=[q,...read().filter(x=>x.toLowerCase()!==q.toLowerCase())].slice(0,8);try{localStorage.setItem(recentKey,JSON.stringify(next))}catch{}return next}
export function clearEarthSearches(){try{localStorage.removeItem(recentKey)}catch{}}
