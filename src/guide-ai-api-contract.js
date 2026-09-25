export const GUIDE_AI_API_VERSION="2026-09-25.v1";
export const GUIDE_AI_API_CONTRACT=Object.freeze({
  version:GUIDE_AI_API_VERSION,
  path:"/api/guide",
  method:"POST",
  maxQueryChars:500,
  maxSourceIds:12,
  supportedLanguages:["en","th","de","fr","es","ja","zh"],
  responseCache:"no-store",
  clientContextTrusted:false,
  serverCatalogRehydrationRequired:true
});

const ID=/^[a-z0-9][a-z0-9._-]{0,119}$/;
const KEYS=new Set(["version","query","language","placeId","sourceIds","sessionId"]);

export function guideAiRequestEnvelope(input={}){
  const unknown=Object.keys(input).filter(k=>!KEYS.has(k));
  if(unknown.length)return{ok:false,reason:"UNSUPPORTED_FIELDS",fields:unknown};
  if(input.version!==GUIDE_AI_API_VERSION)return{ok:false,reason:"API_VERSION_MISMATCH"};
  const query=String(input.query||"").trim();
  if(!query)return{ok:false,reason:"QUERY_REQUIRED"};
  if(query.length>GUIDE_AI_API_CONTRACT.maxQueryChars)return{ok:false,reason:"QUERY_TOO_LONG"};
  const language=String(input.language||"en").toLowerCase();
  if(!GUIDE_AI_API_CONTRACT.supportedLanguages.includes(language))return{ok:false,reason:"LANGUAGE_UNSUPPORTED"};
  const placeId=input.placeId==null?null:String(input.placeId).trim();
  if(placeId&&!ID.test(placeId))return{ok:false,reason:"INVALID_PLACE_ID"};
  const sourceIds=Array.isArray(input.sourceIds)?[...new Set(input.sourceIds.map(String))]:[];
  if(sourceIds.length>GUIDE_AI_API_CONTRACT.maxSourceIds)return{ok:false,reason:"TOO_MANY_SOURCE_IDS"};
  if(sourceIds.some(id=>!ID.test(id)))return{ok:false,reason:"INVALID_SOURCE_ID"};
  const sessionId=input.sessionId==null?null:String(input.sessionId).trim();
  if(sessionId&&(!/^anon_[A-Za-z0-9_-]{24,90}$/.test(sessionId)))return{ok:false,reason:"OPAQUE_SESSION_ID_REQUIRED"};
  return{ok:true,request:{version:GUIDE_AI_API_VERSION,query,language,placeId,sourceIds,sessionId}};
}

export function guideAiPublicResponse(input={}){
  return{
    answer:String(input.answer||"").slice(0,1600),
    sourceIds:Array.isArray(input.sourceIds)?input.sourceIds.slice(0,12):[],
    placeId:input.placeId||null,
    action:input.action||null,
    generated:true,
    truth:"AI wording is generated, but place/source claims must come from ERN trusted context."
  };
}
