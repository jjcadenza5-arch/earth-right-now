import { element } from "./safe-dom.js";
import { bridgeReady,travelContext } from "./travel-bridge.js";
import { safeHttpUrl,externalAttrs } from "./url-safety.js";import { currentTravelOffer } from "./travel-offer-verification.js";import { travelOfferDisclosureText } from "./travel-offer-action.js";

const LABELS={stay:"Places to stay",eat:"Food nearby",transport:"Getting there & around",activities:"Things to do",culture:"Culture & places",services:"Useful nearby"};
export function travelOfferView(offer,{now=Date.now()}={}){
 if(!currentTravelOffer(offer,{now}))return null;const href=safeHttpUrl(offer.url);if(!href)return null;
 const card=element("article",{className:"travel-offer"}),title=element("strong",{text:offer.title}),provider=element("span",{className:"travel-provider",text:offer.provider}),disclosure=element("small",{className:"travel-disclosure",text:travelOfferDisclosureText(offer)}),link=element("a",{text:"Open option",attrs:{"aria-label":`Open ${offer.title} from ${offer.provider}`}});
 link.href=href;Object.assign(link,externalAttrs());card.append(title,provider,disclosure,link);return card;
}
export function travelBridgeView(place,{onIntent,offers=[],now=Date.now()}={}){
 const section=element("section",{className:"travel-bridge"}),context=travelContext(place);
 if(!context||!bridgeReady(place)){section.hidden=true;return section}
 section.append(element("span",{className:"eyebrow",text:"AROUND THIS PLACE"}),element("h3",{text:"Thinking about going?"}),element("p",{className:"travel-bridge-copy",text:"See the place first, then explore what a real visit could include. ERN keeps the Earth view first and only connects verified travel options when you ask."}));
 const actions=element("div",{className:"travel-intents"});
 for(const intent of context.intents){const count=offers.filter(o=>currentTravelOffer(o,{now})&&o.placeId===place.id&&o.intent===intent).length,b=element("button",{text:LABELS[intent]+(count?` (${count})`:""),attrs:{"data-travel-intent":intent}});b.onclick=()=>onIntent?.(intent,context);actions.append(b)}
 section.append(actions);
 const visible=offers.filter(o=>o.placeId===place.id).map(o=>travelOfferView(o,{now})).filter(Boolean);if(visible.length)section.append(element("div",{className:"travel-offers",attrs:{"aria-label":"Verified travel options"}}));
 const mount=section.querySelector?.(".travel-offers");if(mount)mount.replaceChildren(...visible);
 return section;
}
export function travelIntentMessage(intent,place,count=0){const label=LABELS[intent]||"Travel options";return count?`${count} verified ${label.toLowerCase()} option${count===1?"":"s"} for ${place?.title||"this place"}.`:`${label} for ${place?.title||"this place"} are not connected yet. ERN will only show current, verified local or travel options here.`}
