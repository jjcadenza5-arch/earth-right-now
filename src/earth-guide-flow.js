export function guideResultState({actionType="SEARCH",previousPlaceId=null,resultItems=[]}={}){
 const ids=(resultItems||[]).map(x=>x?.id).filter(Boolean);
 if(actionType==="SEARCH")return{placeId:ids.length===1?ids[0]:null,clearStale:true};
 if(actionType==="DIFFERENT")return{placeId:ids.length===1?ids[0]:null,clearStale:true};
 if(actionType==="LIVE_NOW"||actionType==="SURPRISE")return{placeId:null,clearStale:true};
 return{placeId:previousPlaceId||null,clearStale:false};
}
export function guideEmptyActionMessage(type){
 if(type==="SURPRISE")return"I don’t have a suitable surprise window available right now. Try a place or another Guide prompt.";
 if(type==="LIVE_NOW")return"I don’t have a verified-current window to recommend right now. Try a place or ask for a clearly labeled available view.";
 return"";
}
