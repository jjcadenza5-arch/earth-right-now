const states=new WeakMap();
export function liveRegion(el,{politeness="polite"}={}){
 if(!el)return null;
 el.setAttribute("role","status");el.setAttribute("aria-live",politeness);el.setAttribute("aria-atomic","true");return el;
}
export function announce(el,message,{dedupe=true}={}){
 if(!el)return false;const text=String(message||"").trim();if(!text)return false;
 if(dedupe&&states.get(el)===text)return false;states.set(el,text);el.textContent=text;return true;
}
