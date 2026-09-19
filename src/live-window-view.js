import { element } from "./safe-dom.js";
import { sourceBadges } from "./source-badges.js";
import { sourceActionMeta } from "./source-action-labels.js";
import { currentWindowEyebrow } from "./current-window-label.js";
import { applyPoster } from "./source-poster.js";

export function liveWindowView(source,{onOpen,index=0}={}){
  const action=sourceActionMeta(source),b=element("button",{className:"live-window-card",attrs:{"aria-label":action.aria}});
  b.disabled=action.disabled;
  const visual=element("span",{className:"live-window-visual",attrs:{"aria-hidden":"true"}});
  applyPoster(visual,source,{label:false,surface:"live",index});
  const top=element("span",{className:"live-window-state",text:currentWindowEyebrow(source)}),title=element("strong",{text:source.title}),meta=element("small",{text:[source.region,source.country].filter(Boolean).join(" · ")}),badges=element("span",{className:"live-window-badges",text:sourceBadges(source).join(" · ")});
  b.append(visual,top,title,meta,badges);
  b.onclick=()=>{if(!b.disabled)onOpen?.(source)};
  return b;
}
