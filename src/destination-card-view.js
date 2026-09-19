import { element } from "./safe-dom.js";
import { destinationSummary } from "./destination-engine.js";
import { applyPoster } from "./source-poster.js";import { sourceChoiceSummary } from "./source-choice-summary.js";import { destinationActionSemantics } from "./destination-action-semantics.js";

export function destinationCardView(place,{onOpen,context=""}={}){
  const x=destinationSummary(place),card=element("article",{className:"card destination-card"});
  const visual=element("div",{className:"card-visual destination-visual",attrs:{"aria-hidden":"true"}});
  applyPoster(visual,place.preferred||place.sources?.[0]||place,{label:false,surface:"discovery"});
  const copy=element("div"),meta=element("span",{className:"meta",text:place.country||""}),title=element("h3",{text:place.title}),region=element("p",{text:place.region||""}),status=x.current?x.current+" current"+(x.current===1?" window":" windows"):x.windows?x.windows+" available "+(x.windows===1?"source":"sources")+" · current check not confirmed":"No available windows",count=element("span",{className:"count",text:status+(x.hasChoice?" · choose your view":"")}),actions=element("div",{className:"card-actions"}),choice=sourceChoiceSummary(place),action=destinationActionSemantics(place,x,choice),open=element("button",{text:action.label,attrs:{"aria-label":action.aria}});
  open.disabled=action.disabled;
  open.onclick=()=>{if(!open.disabled)onOpen?.(place)};
  copy.append(meta,title,region,count,element("small",{className:"destination-choice-summary",text:choice}));if(context)copy.append(element("span",{className:"destination-context",text:context}));actions.append(open);card.append(visual,copy,actions);return card;
}
