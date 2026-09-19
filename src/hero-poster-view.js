import { heroPosterStyle } from "./source-poster.js";
export function applyHeroPoster(media,source,{imageFactory=()=>document.createElement("img")}={}){
 if(!media)return null;media.querySelector?.(".hero-poster-image")?.remove?.();media.classList.remove("poster-water","poster-wildlife","poster-mountain","poster-city","poster-earth","has-poster");media.style?.removeProperty?.("background-image");
 const visual=heroPosterStyle(source);media.classList.add(visual.className);
 if(!visual.backgroundImage)return{kind:"generated",className:visual.className};
 const match=visual.backgroundImage.match(/^url\(["']?(.*?)["']?\)$/);if(!match)return{kind:"generated",className:visual.className};
 const img=imageFactory();img.className="hero-poster-image";img.alt="";img.setAttribute?.("aria-hidden","true");img.loading="eager";img.decoding="async";img.fetchPriority="high";img.src=match[1];
 img.addEventListener?.("error",()=>{img.remove?.();media.classList.remove("has-poster");media.classList.add(visual.className);media.setAttribute?.("data-poster-fallback","true")},{once:true});
 media.prepend?.(img);media.classList.add("has-poster");return{kind:"remote",className:visual.className};
}
