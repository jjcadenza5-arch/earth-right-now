import { element } from "./safe-dom.js";
import { bridgeReady,travelContext } from "./travel-bridge.js";

const LABELS={stay:"Places to stay",eat:"Food nearby",transport:"Getting around",tickets:"Tickets & activities"};
export function travelBridgeView(place,{onIntent}={}){
 const section=element("section",{className:"travel-bridge"});
 const context=travelContext(place);
 if(!context||!bridgeReady(place)){section.hidden=true;return section}
 section.append(element("span",{className:"eyebrow",text:"PLAN FROM HERE"}),element("h3",{text:"When you are ready to go"}),element("p",{className:"travel-bridge-copy",text:"ERN can connect this view to verified travel options without changing what the camera itself means."}));
 const actions=element("div",{className:"travel-intents"});
 for(const intent of context.intents){const b=element("button",{text:LABELS[intent],attrs:{"data-travel-intent":intent}});b.onclick=()=>onIntent?.(intent,context);actions.append(b)}
 section.append(actions);return section;
}
export function travelIntentMessage(intent,place){
 const label=LABELS[intent]||"Travel options";
 return `${label} for ${place?.title||"this place"} are not connected yet. ERN only shows travel partners after verification.`;
}
