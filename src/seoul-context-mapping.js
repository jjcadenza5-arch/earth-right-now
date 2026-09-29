function clean(v){return String(v||"").trim()}
export function seoulContextMappingForPlace(registry={},placeId=""){
  const id=clean(placeId);
  const row=(registry?.mappings||[]).find(x=>clean(x?.ernPlaceId)===id);
  if(!row)return{ok:false,reason:"PLACE_MAPPING_NOT_FOUND"};
  if(row.state!=="APPROVED_VALIDATED"||row.realResponseValidated!==true||row.mayPublishContext!==true)return{ok:false,reason:"PLACE_MAPPING_NOT_PUBLIC",mapping:row};
  const areaName=clean(row.officialAreaName),areaCode=clean(row.officialAreaCode);
  if(!areaName&&!areaCode)return{ok:false,reason:"PROVIDER_AREA_IDENTITY_MISSING",mapping:row};
  return{ok:true,mapping:row,areaAllowlist:[areaName,areaCode].filter(Boolean)};
}
export function seoulMappingValidationTarget(registry={},placeId=""){
  const id=clean(placeId);
  const row=(registry?.mappings||[]).find(x=>clean(x?.ernPlaceId)===id);
  if(!row)return{ok:false,reason:"PLACE_MAPPING_NOT_FOUND"};
  const areaName=clean(row.officialAreaName),areaCode=clean(row.officialAreaCode);
  if(!areaName&&!areaCode)return{ok:false,reason:"PROVIDER_AREA_IDENTITY_MISSING"};
  return{ok:true,placeId:id,areaName:areaName||null,areaCode:areaCode||null,state:row.state,realResponseValidated:row.realResponseValidated===true};
}
