import { safeHttpUrl } from "./url-safety.js";
export function canonicalBase({origin=typeof location!=="undefined"?location.origin:"",pathname=typeof location!=="undefined"?location.pathname:"/"}={}){
 const raw=(origin||"")+(pathname||"/"),safe=safeHttpUrl(raw,"https://ern.invalid/");if(!safe)return null;const u=new URL(safe);u.search="";u.hash="";return u.toString();
}
export function canonicalUrl(hash="",env={}){const base=canonicalBase(env);if(!base)return null;try{const u=new URL(base);u.hash=String(hash||"").replace(/^#/,"");return u.toString()}catch{return null}}
