export function connectionState({online=true,effectiveType="",saveData=false}={}){
 const type=String(effectiveType||"").toLowerCase(),constrained=saveData||["slow-2g","2g"].includes(type);
 return{online:online!==false,effectiveType:type||null,saveData:Boolean(saveData),constrained:online!==false&&constrained,mode:online===false?"OFFLINE":constrained?"CONSTRAINED":"NORMAL"};
}
export function browserConnection({navigatorRef=typeof navigator!=="undefined"?navigator:null}={}){
 return connectionState({online:navigatorRef?.onLine!==false,effectiveType:navigatorRef?.connection?.effectiveType,saveData:navigatorRef?.connection?.saveData});
}
export function playbackNetworkDecision(source,state){
 if(!state?.online)return{allow:false,reason:"OFFLINE"};
 if(state.constrained&&source?.playback==="EMBED")return{allow:false,reason:"CONSTRAINED_EMBED"};
 return{allow:true,reason:null};
}
