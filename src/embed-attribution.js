import { safeHttpUrl,externalAttrs } from "./url-safety.js";
import { element } from "./safe-dom.js";
import { currentSource } from "./discovery-eligibility.js";

export function attributionModel(source){
 const href=safeHttpUrl(source?.attributionUrl||source?.sourceUrl||source?.officialUrl);
 return{
  provider:source?.provider||"Source",
  label:source?.attribution||source?.provider||"Source",
  href,
  required:source?.permission==="EMBED_ALLOWED"||source?.permission==="PARTNER_PERMISSION",
  current:currentSource(source)
 };
}
export function attributionView(source){
 const m=attributionModel(source),wrap=element("div",{className:"ern-media-credit"});
 wrap.append(element("span",{text:m.current?"Current source: ":"Source: "}));
 if(m.href){
  const a=element("a",{text:m.label});a.href=m.href;Object.assign(a,externalAttrs());wrap.append(a);
 }else wrap.append(element("span",{text:m.label}));
 return wrap;
}
