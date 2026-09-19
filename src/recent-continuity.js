export function recentContinuity(model,{limit=6}={}){
 const places=(model?.recentPlaces||[]).slice(0,limit),windows=(model?.availableRecentWindows||[]).slice(0,limit);
 return{places,windows,empty:places.length===0&&windows.length===0,summary:windows.length?windows.length+" recent playable window"+(windows.length===1?"":"s"):places.length?places.length+" recent place"+(places.length===1?"":"s"):"No recent Earth history yet"};
}
