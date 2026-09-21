export function guidePlaceTarget(type,{nearbyCount=0}={}){
 if(type==="NEARBY")return nearbyCount>0?{target:"placeNearby",message:"NEARBY"}:{target:"placeWindows",message:"NO_NEARBY"};
 if(type==="STAY")return{target:"placeTravel",message:"STAY"};
 return{target:"placeWindows",message:"SEE_NOW"};
}
export function focusGuidePlaceTarget(document,target){
 const el=document?.getElementById?.(target);if(!el||el.hidden)return false;
 el.scrollIntoView?.({block:"nearest",behavior:"smooth"});
 el.querySelector?.("button,a,input,[tabindex]")?.focus?.({preventScroll:true});
 return true;
}
