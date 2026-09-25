function byId(catalog=[]){return new Map((catalog||[]).filter(x=>x?.id).map(x=>[String(x.id),x]))}

export function guideAiTrustedContext(selection={},catalog=[]){
  const map=byId(catalog);
  const ids=[...new Set(Array.isArray(selection.sourceIds)?selection.sourceIds.map(String):[])].slice(0,12);
  const sources=ids.map(id=>map.get(id)).filter(Boolean).map(source=>({
    id:source.id,
    placeId:source.placeId||source.id,
    title:source.title,
    region:source.region||null,
    country:source.country||null,
    truth:source.truth,
    permission:source.permission,
    health:source.health,
    playback:source.playback,
    checkedAt:source.checkedAt||null,
    lastSuccessfulCheck:source.lastSuccessfulCheck||null,
    categories:Array.isArray(source.categories)?source.categories.slice(0,8):[],
    story:source.story||null
  }));
  return{
    placeId:selection.placeId||null,
    action:selection.action||null,
    sourceIds:sources.map(x=>x.id),
    sources,
    serverRehydrated:true,
    selectionOrigin:"DETERMINISTIC_ERN_RESOLVER",
    truth:"Only server-resolved and server-rehydrated ERN source fields may ground generated place/source claims."
  };
}

export function validateGuideAiModelResult(result={},trustedContext={}){
  const answer=String(result.answer||"").trim();
  if(!answer)return{ok:false,reason:"MODEL_ANSWER_REQUIRED"};
  if(answer.length>1600)return{ok:false,reason:"MODEL_ANSWER_TOO_LONG"};
  const allowed=new Set(trustedContext.sourceIds||[]);
  const sourceIds=Array.isArray(result.sourceIds)?[...new Set(result.sourceIds.map(String))]:[];
  const unknown=sourceIds.filter(id=>!allowed.has(id));
  if(unknown.length)return{ok:false,reason:"UNTRUSTED_SOURCE_REFERENCE",sourceIds:unknown};
  return{ok:true,result:{answer,sourceIds,placeId:trustedContext.placeId||null,action:trustedContext.action||null}};
}
