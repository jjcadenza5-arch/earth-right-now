export function myEarthStatusState({importMessage="",availabilityMessage=""}={}){const message=String(importMessage||availabilityMessage||"").trim();return{message,kind:importMessage?"IMPORT":availabilityMessage?"AVAILABILITY":"EMPTY"}}
export function hasMyEarthImportStatus(el){return el?.getAttribute?.("data-import-status")==="true"}
export function setMyEarthStatus(el,state={}){if(!el)return false;const x=myEarthStatusState(state);el.textContent=x.message;if(x.kind==="IMPORT")el.setAttribute?.("data-import-status","true");else el.removeAttribute?.("data-import-status");return true}
export function clearMyEarthImportStatus(el){if(!el)return false;el.removeAttribute?.("data-import-status");return true}
