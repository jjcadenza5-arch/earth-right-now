import { safeHttpUrl } from "./url-safety.js";
import { posterLoadingAttrs } from "./image-loading-policy.js";import { installPosterFallback } from "./poster-fallback.js";

export function posterFor(source){const url=safeHttpUrl(source?.thumbnailUrl);if(url)return{kind:"image",url,alt:source?.title||"Earth Right Now"};return{kind:"generated",url:null,alt:source?.title||"Earth Right Now"}}
export function posterClass(source){const cats=(source?.categories||[]).join(" ").toLowerCase();if(/sea|coast|harbour|beach|water/.test(cats))return"poster-water";if(/wildlife|animal/.test(cats))return"poster-wildlife";if(/mountain|volcano/.test(cats))return"poster-mountain";if(/city|urban/.test(cats))return"poster-city";return"poster-earth"}
export function posterPresentation(source){const poster=posterFor(source);return{...poster,className:poster.kind==="image"?"has-poster":posterClass(source),backgroundImage:poster.kind==="image"?`url("${poster.url.replaceAll('"',"%22")}")`:"",generated:poster.kind!=="image"}}
export function heroPosterStyle(source){const poster=posterPresentation(source);return{className:poster.className,backgroundImage:poster.backgroundImage}}
export function applyPoster(el,source,{label=true,surface="",index=0}={}){
 if(!el)return null;const poster=posterPresentation(source);el.classList?.add("source-poster",poster.className);
 if(poster.kind==="image"&&typeof document!=="undefined"){const img=document.createElement("img"),attrs=posterLoadingAttrs({surface,index});img.src=poster.url;img.alt=label?poster.alt:"";img.loading=attrs.loading;img.decoding=attrs.decoding;img.setAttribute("fetchpriority",attrs.fetchpriority);img.className="source-poster-image";if(!label)img.setAttribute("aria-hidden","true");installPosterFallback(img,el,source,{fallbackClass:posterClass(source)});el.replaceChildren(img);el.style.removeProperty?.("background-image")}else if(poster.backgroundImage)el.style.backgroundImage=poster.backgroundImage;
 if(label&&poster.kind!=="image")el.setAttribute?.("aria-label",poster.alt);el.setAttribute?.("data-poster-kind",poster.kind);return poster;
}
