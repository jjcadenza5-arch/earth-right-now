export function createModalCoordinator(){
 const suspended=new Map();
 function suspend(el){if(!el||el.hidden||suspended.has(el))return false;suspended.set(el,{ariaHidden:el.getAttribute?.("aria-hidden"),inert:Boolean(el.inert)});el.setAttribute?.("aria-hidden","true");try{el.inert=true}catch{}return true}
 function restore(el){const prev=suspended.get(el);if(!prev)return false;if(prev.ariaHidden==null)el.removeAttribute?.("aria-hidden");else el.setAttribute?.("aria-hidden",prev.ariaHidden);try{el.inert=prev.inert}catch{}suspended.delete(el);return true}
 function suspendAll(elements=[]){return elements.filter(suspend)}
 function restoreAll(){for(const el of [...suspended.keys()])restore(el)}
 function count(){return suspended.size}
 return{suspend,restore,suspendAll,restoreAll,count};
}
