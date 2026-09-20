export function performanceBudget(){
 return{
  activeMediaMax:1,
  heroPosterEagerMax:1,
  interactionSampleMs:250,
  notes:["ERN should not create multiple active media players.","Discovery cards use posters/previews rather than live players.","Provider media begins only after an explicit playback action."]
 };
}
function mediaState(root){
 const nodes=[...(root?.querySelectorAll?.("iframe,video,audio")||[])];
 const active=nodes.filter(node=>{
  if(node.hidden||node.getAttribute?.("aria-hidden")==="true")return false;
  if(node.tagName==="IFRAME")return Boolean(node.getAttribute("src"));
  if(node.tagName==="VIDEO"||node.tagName==="AUDIO")return Boolean(node.getAttribute("src")||node.querySelector?.("source[src]"));
  return false;
 });
 return{mediaElements:nodes.length,activeMedia:active.length};
}
export function performanceSnapshot({root=typeof document!=="undefined"?document:null,now=()=>performance.now()}={}){
 const media=mediaState(root);
 const images=root?.querySelectorAll?.("img")?.length??0;
 return{capturedAt:new Date().toISOString(),...media,images,clock:now()};
}
export function performanceBudgetResult(snapshot,budget=performanceBudget()){
 const blockers=[];
 if(snapshot.activeMedia>budget.activeMediaMax)blockers.push("MULTIPLE_ACTIVE_MEDIA");
 return{ok:blockers.length===0,blockers,snapshot,budget};
}
