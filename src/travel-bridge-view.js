import { element } from "./safe-dom.js";
import { bridgeReady,travelContext,travelDisclosure,visibleTravelOffer } from "./travel-bridge.js";
import { safeHttpUrl,externalAttrs } from "./url-safety.js";

const LABELS={stay:"Places to stay",eat:"Food nearby",transport:"Getting around",tickets:"Tickets & activities"};
export function travelOfferView(offer){
 if(!visibleTravelOffer(offer))return null;const href=safeHttpUrl(offer.url);if(!href)return null;
 const card=element("article",{className:"travel-offer"}),title=element("strong",{text:offer.title}),provider=element("span",{className:"travel-provider",text:offer.provider}),disclosure=element("small",{className:"travel-disclosure",text:travelDisclosure(offer)}),link=element("a",{text:"Open option",attrs:{"aria-label":`Open ${offer.title} from ${offer.provider}`}});
 link.href=href;Object.assign(link,externalAttrs());card.append(title,provider,disclosure,link);return card;
}
export function travelBridgeView(place,{onIntent,offers=[]}={}){
 const section=element("section",{className:"travel-bridge"}),context=travelContext(place);
 if(!context||!bridgeReady(place)){section.hidden=true;return section}
 section.append(element("span",{className:"eyebrow",text:"PLAN FROM HERE"}),element("h3",{text:"When you are ready to go"}),element("p",{className:"travel-bridge-copy",text:"ERN can connect this view to verified travel options without changing what the camera itself means."}));
 const actions=element("div",{className:"travel-intents"});
 for(const intent of context.intents){const count=offers.filter(o=>visibleTravelOffer(o)&&o.intent===intent).length,b=element("button",{text:LABELS[intent]+(count?` (${count})`:""),attrs:{"data-travel-intent":intent}});b.onclick=()=>onIntent?.(intent,context);actions.append(b)}
 section.append(actions);
 const visible=offers.map(travelOfferView).filter(Boolean);if(visible.length)section.append(element("div",{className:"travel-offers",attrs:{"aria-label":"Verified travel options"}}),...[]);
 const mount=section.querySelector?.(".travel-offers");if(mount)mount.replaceChildren(...visible);
 return section;
}
export function travelIntentMessage(intent,place,count=0){const label=LABELS[intent]||"Travel options";return count?`${count} verified ${label.toLowerCase()} option${count===1?"":"s"} for ${place?.title||"this place"}.`:`${label} for ${place?.title||"this place"} are not connected yet. ERN only shows travel partners after verification.`}
