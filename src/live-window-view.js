import { element } from "./safe-dom.js";
import { sourceActionMeta } from "./source-action-labels.js";
import { currentWindowEyebrow } from "./current-window-label.js";
import { applyPoster } from "./source-poster.js";import { freshnessCopy } from "./freshness-copy.js";import { watchEarthMomentLabel } from "./watch-earth-moment-copy.js";

export function liveWindowView(source,{onOpen,index=0,now=new Date()}={}){
  const action=sourceActionMeta(source,{now}),b=element("button",{className:"live-window-card",attrs:{"aria-label":action.aria}});
  b.disabled=action.disabled;
  const visual=element("span",{className:"live-window-visual",attrs:{"aria-hidden":"true"}});
  applyPoster(visual,source,{label:false,surface:"live",index});
  const moment=element("span",{className:"live-window-moment",text:watchEarthMomentLabel(source,now)}),title=element("strong",{text:source.title}),meta=element("small",{text:[source.region,source.country].filter(Boolean).join(" · ")}),truth=element("small",{className:"window-truth-line",text:`${currentWindowEyebrow(source,{now})} · ${freshnessCopy(source,{now})}`});
  b.append(visual,moment,title,meta,truth);
  b.onclick=()=>{if(!b.disabled)onOpen?.(source)};
  return b;
}
