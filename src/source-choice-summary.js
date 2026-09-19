export function sourceChoiceSummary(place){
 const sources=place?.sources||[],inside=sources.filter(s=>["EMBED","IMAGE_REFRESH"].includes(s.playback)&&["LIVE_VIDEO","LIVE_IMAGE"].includes(s.truth)).length,external=sources.filter(s=>["EXTERNAL_LIVE","PARTNER"].includes(s.truth)||s.playback==="EXTERNAL").length,preview=sources.filter(s=>s.truth==="PREVIEW"||s.playback==="PREVIEW").length;
 const parts=[];if(inside)parts.push(inside+" inside ERN");if(external)parts.push(external+" at source");if(preview)parts.push(preview+" preview");return parts.join(" · ")||"No available windows";
}
