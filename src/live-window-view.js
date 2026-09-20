import { element } from "./safe-dom.js";
import { sourceBadges } from "./source-badges.js";
import { sourceActionMeta } from "./source-action-labels.js";
import { currentWindowEyebrow } from "./current-window-label.js";
import { applyPoster } from "./source-poster.js";import { freshnessCopy } from "./freshness-copy.js";import { watchEarthMomentLabel } from "./watch-earth-moment-copy.js";import { windowEvidenceTier } from "./window-evidence.js";

export function liveWindowView(source,{onOpen,index=0,now=new Date()}={}){
  const action=sourceActionMeta(source,{now}),b=element("button",{className:"live-window-card",attrs:{"aria-label":action.aria}});
  b.disabled=action.disabled;
  const visual=element("span",{className:"live-window-visual",attrs:{"aria-hidden":"true"}});
  applyPoster(visual,source,{label:false,surface:"live",index});
  const moment=element("span",{className:"live-window-moment",text:watchEarthMomentLabel(source,now)}),evidence=element("span",{className:"window-evidence",text:windowEvidenceTier(source,{now}).label}),top=element("span",{className:"live-window-state",text:currentWindowEyebrow(source,{now})}),title=element("strong",{text:source.title}),meta=element("small",{text:[source.region,source.country].filter(Boolean).join(" · ")}),fresh=element("small",{className:"source-freshness",text:freshnessCopy(source,{now})}),badges=element("span",{className:"live-window-badges",text:sourceBadges(source,{now}).join(" · ")});
  b.append(visual,moment,evidence,top,title,meta,fresh,badges);
  b.onclick=()=>{if(!b.disabled)onOpen?.(source)};
  return b;
}
