import {event} from "./telemetry.js";

function bool(v){return v==="true"||v===true}
export function commercialClickData(anchor){
  if(!anchor?.dataset?.offerId||!anchor?.dataset?.placeId||!anchor?.dataset?.intent)return null;
  return{
    offerId:String(anchor.dataset.offerId).slice(0,120),
    placeId:String(anchor.dataset.placeId).slice(0,120),
    intent:String(anchor.dataset.intent).slice(0,80),
    linkScope:anchor.dataset.linkScope==="experience"?"experience":"destination",
    affiliate:bool(anchor.dataset.affiliate),
    sponsored:bool(anchor.dataset.sponsored)
  };
}
export function installCommercialClickTelemetry(doc=document){
  const handler=e=>{
    const a=e.target?.closest?.("a[data-offer-id]");if(!a)return;
    const data=commercialClickData(a);if(!data)return;
    event("travel_option_opened",data);
  };
  doc.addEventListener("click",handler,{capture:true});
  return()=>doc.removeEventListener("click",handler,{capture:true});
}
if(typeof document!=="undefined")installCommercialClickTelemetry(document);
