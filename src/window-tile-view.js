import { element } from "./safe-dom.js";
import { windowStripLabel } from "./window-strip.js";
import { sourceActionMeta } from "./source-action-labels.js";
import { applyPoster } from "./source-poster.js";import { freshnessCopy } from "./freshness-copy.js";import { watchEarthMomentLabel } from "./watch-earth-moment-copy.js";

export function windowTileView(source,index,{onOpen,now=new Date()}={}){
  const x=windowStripLabel(source,index,{now}),action=sourceActionMeta(source,{now});
  const b=element("button",{className:"window-tile",attrs:{role:"listitem","aria-label":action.aria,title:`${action.label} — ${source.title}`}});
  b.disabled=action.disabled;
  const visual=element("span",{className:"window-visual",attrs:{"aria-hidden":"true"}});
  applyPoster(visual,source,{label:false,surface:"windows",index});
  b.append(visual,element("span",{className:"window-moment",text:watchEarthMomentLabel(source,now)}),element("span",{className:"window-state",text:x.eyebrow}),element("strong",{text:x.title}),element("small",{text:x.meta}),element("small",{className:"source-freshness",text:freshnessCopy(source,{now})}));
  b.onclick=()=>{if(!b.disabled)onOpen?.(source)};
  return b;
}
