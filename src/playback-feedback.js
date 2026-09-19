const STATES=["idle","loading","playing","external","unavailable","error"];
export function playbackFeedback(source,{action="idle",networkReason=null}={}){
 const title=source?.title||"This window";
 if(action==="loading")return{state:"loading",message:`Opening ${title}…`};
 if(action==="playing")return{state:"playing",message:`${title} is open.`};
 if(action==="external")return{state:"external",message:networkReason==="CONSTRAINED_EMBED"?"Data-saving mode: opening the official provider instead of embedded video.":"Opening the official provider in a new tab."};
 if(action==="unavailable")return{state:"unavailable",message:networkReason==="OFFLINE"?"You are offline. This window cannot be opened right now.":"This window is not available to open right now."};
 if(action==="error")return{state:"error",message:"The window could not be opened. Try the official source or another window."};
 return{state:"idle",message:""};
}
export function validPlaybackFeedback(value){return STATES.includes(value?.state)&&typeof value?.message==="string"}
