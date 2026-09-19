function focusable(dialog){return[...(dialog?.querySelectorAll?.('button:not([hidden]),a[href]:not([hidden]),input:not([hidden]),select:not([hidden]),textarea:not([hidden]),[tabindex]:not([tabindex="-1"]):not([hidden])')||[])].filter(x=>!x.disabled&&x.getAttribute?.("aria-hidden")!=="true")}
export function createDialogLifecycle({dialog,initialFocus=null,onClose=()=>{}}={}){
 let opener=null,active=false;
 function onKey(e){if(e.key==="Escape"){e.preventDefault();onClose();return}if(e.key!=="Tab")return;const list=focusable(dialog);if(!list.length){e.preventDefault();dialog?.focus?.({preventScroll:true});return}const first=list[0],last=list.at(-1),current=dialog?.ownerDocument?.activeElement||globalThis.document?.activeElement;if(!list.includes(current)){e.preventDefault();(e.shiftKey?last:first).focus?.({preventScroll:true})}else if(e.shiftKey&&current===first){e.preventDefault();last.focus?.({preventScroll:true})}else if(!e.shiftKey&&current===last){e.preventDefault();first.focus?.({preventScroll:true})}}
 function open({opener:nextOpener=globalThis.document?.activeElement}={}){if(active)return false;opener=nextOpener||null;active=true;if(dialog){dialog.hidden=false;dialog.addEventListener?.("keydown",onKey);(initialFocus||dialog).focus?.({preventScroll:true})}return true}
 function close({restoreFocus=true}={}){if(!active&&dialog?.hidden)return false;active=false;dialog?.removeEventListener?.("keydown",onKey);if(dialog)dialog.hidden=true;if(restoreFocus&&opener?.focus)opener.focus({preventScroll:true});opener=null;return true}
 function refocus(){if(!active||dialog?.hidden)return false;(initialFocus||dialog)?.focus?.({preventScroll:true});return true}
 function state(){return{open:active&&!dialog?.hidden}}return{open,close,refocus,state,onKey};
}
