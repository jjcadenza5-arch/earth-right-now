export function playbackFailureMessage(failure={}){
 const kind=failure?.kind||"UNKNOWN";
 if(kind==="EMBED_TIMEOUT")return"The embedded provider did not respond in time. ERN switched to a safer fallback.";
 if(kind==="EMBED_FAILED")return"The embedded provider failed to load. ERN switched to a safer fallback.";
 if(kind==="IMAGE_FAILED")return"The current image stopped loading reliably. ERN switched to a safer fallback.";
 if(kind==="RENDER_FAILED")return"The window could not be rendered. ERN switched to a safer fallback.";
 return"The window encountered a playback problem. ERN switched to a safer fallback.";
}
