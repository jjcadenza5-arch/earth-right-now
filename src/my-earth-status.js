export function myEarthStatusState({importMessage="",availabilityMessage=""}={}){
 const message=String(importMessage||availabilityMessage||"").trim();
 return{message,kind:importMessage?"IMPORT":availabilityMessage?"AVAILABILITY":"EMPTY"};
}
export function setMyEarthStatus(el,state={}){
 if(!el)return false;const x=myEarthStatusState(state);el.textContent=x.message;
 if(x.kind==="IMPORT")el.dataset.importStatus="true";else delete el.dataset.importStatus;
 return true;
}
export function clearMyEarthImportStatus(el){if(!el)return false;delete el.dataset.importStatus;return true}
