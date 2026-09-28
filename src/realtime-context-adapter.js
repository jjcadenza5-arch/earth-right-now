function text(v){return typeof v==="string"?v.trim():""}
function finite(v){const n=Number(v);return Number.isFinite(n)?n:null}
function firstRow(payload){
  const root=payload?.citydata_eng??payload?.CITYDATA_ENG??payload;
  if(!root||typeof root!=="object")return null;
  const rows=root.row??root.ROW??root.citydata??root.CITYDATA;
  if(Array.isArray(rows))return rows[0]||null;
  if(rows&&typeof rows==="object")return rows;
  if(text(root.AREA_NM)||text(root.AREA_CD))return root;
  return null;
}
function population(row){
  const raw=row?.LIVE_PPLTN_STTS;
  if(Array.isArray(raw))return raw[0]||null;
  return raw&&typeof raw==="object"?raw:null;
}
export function normalizeSeoulRealtimeContext(payload,{observedAt=null,areaAllowlist=[]}={}){
  const row=firstRow(payload);
  if(!row)return{ok:false,reason:"NO_CITYDATA_ROW"};
  const areaName=text(row.AREA_NM),areaCode=text(row.AREA_CD);
  if(!areaName&&!areaCode)return{ok:false,reason:"AREA_IDENTITY_MISSING"};
  if(areaAllowlist.length&&!areaAllowlist.includes(areaName)&&!areaAllowlist.includes(areaCode))return{ok:false,reason:"AREA_NOT_APPROVED"};
  const p=population(row);
  if(!p)return{ok:false,reason:"POPULATION_CONTEXT_MISSING"};
  const congestionLevel=text(p.AREA_CONGEST_LVL),congestionMessage=text(p.AREA_CONGEST_MSG);
  const min=finite(p.AREA_PPLTN_MIN),max=finite(p.AREA_PPLTN_MAX);
  const sourceObservedAt=text(p.PPLTN_TIME)||text(p.PPLTN_TIME_STAMP)||text(row.PPLTN_TIME)||text(row.UPDATE_TIME)||text(observedAt);
  if(!sourceObservedAt)return{ok:false,reason:"SOURCE_TIMESTAMP_MISSING"};
  if(!congestionLevel&&!congestionMessage&&min===null&&max===null)return{ok:false,reason:"CURRENT_CONTEXT_FIELDS_MISSING"};
  return{ok:true,context:{
    provider:"Seoul Metropolitan Government",
    service:"citydata_eng",
    areaName:areaName||null,
    areaCode:areaCode||null,
    sourceObservedAt,
    crowd:{
      congestionLevel:congestionLevel||null,
      congestionMessage:congestionMessage||null,
      populationMin:min,
      populationMax:max
    },
    cameraTruth:false,
    mayCreateLiveLabel:false
  }};
}
export function seoulContextFreshness(context,{now=Date.now(),maxAgeMinutes=15}={}){
  const t=Date.parse(context?.sourceObservedAt||"");
  const n=now instanceof Date?now.getTime():Number(now);
  if(!Number.isFinite(t)||!Number.isFinite(n))return{current:false,reason:"INVALID_SOURCE_TIMESTAMP"};
  const ageMinutes=Math.max(0,(n-t)/60000);
  return ageMinutes<=maxAgeMinutes?{current:true,ageMinutes}:{current:false,ageMinutes,reason:"STALE_CONTEXT"};
}
export function publicSeoulContext(result,opts={}){
  if(!result?.ok)return{ok:false,reason:result?.reason||"CONTEXT_UNAVAILABLE"};
  const fresh=seoulContextFreshness(result.context,opts);
  if(!fresh.current)return{ok:false,reason:fresh.reason};
  return{ok:true,context:{...result.context,ageMinutes:fresh.ageMinutes}};
}
