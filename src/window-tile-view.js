import { element } from "./safe-dom.js";
import { windowStripLabel } from "./window-strip.js";
import { sourceActionMeta } from "./source-action-labels.js";
import { applyPoster } from "./source-poster.js";

export function windowTileView(source,index,{onOpen}={}){
  const x=windowStripLabel(source,index),action=sourceActionMeta(source);
  const b=element("button",{className:"window-tile",attrs:{role:"listitem","aria-label":action.aria,title:`${action.label} — ${source.title}`}});
  b.disabled=action.disabled;
  const visual=element("span",{className:"window-visual",attrs:{"aria-hidden":"true"}});
  applyPoster(visual,source,{label:false,surface:"windows",index});
  b.append(visual,element("span",{className:"window-state",text:x.eyebrow}),element("strong",{text:x.title}),element("small",{text:x.meta}));
  b.onclick=()=>{if(!b.disabled)onOpen?.(source)};
  return b;
}
