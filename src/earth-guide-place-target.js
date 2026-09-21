const FOCUSABLE='button:not([disabled]):not([hidden]),a[href]:not([hidden]),input:not([disabled]):not([hidden]),select:not([disabled]):not([hidden]),textarea:not([disabled]):not([hidden]),[tabindex]:not([tabindex="-1"]):not([hidden])';
export function guidePlaceTarget(type,{nearbyCount=0}={}){
 if(type==="NEARBY")return nearbyCount>0?{target:"placeNearby",message:"NEARBY"}:{target:"placeWindows",message:"NO_NEARBY"};
 if(type==="STAY")return{target:"placeTravel",message:"STAY"};
 return{target:"placeWindows",message:"SEE_NOW"};
}
export function focusGuidePlaceTarget(document,target){
 const el=document?.getElementById?.(target);if(!el||el.hidden||el.getAttribute?.("aria-hidden")==="true")return false;
 el.scrollIntoView?.({block:"nearest",behavior:"smooth"});
 const candidate=el.querySelector?.(FOCUSABLE);
 if(candidate&&candidate.getAttribute?.("aria-hidden")!=="true"){candidate.focus?.({preventScroll:true});return true}
 if(el.matches?.('[tabindex]:not([tabindex="-1"])')){el.focus?.({preventScroll:true});return true}
 return false;
}
