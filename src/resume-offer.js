export function resumeOffer(resume,{validPlaceIds=new Set(),validSourceIds=new Set()}={}){
 if(!resume?.ok)return{show:false,reason:resume?.reason||"INVALID"};
 const x=resume.data||{},placeOk=x.placeId&&validPlaceIds.has(x.placeId),sourceOk=x.sourceId&&validSourceIds.has(x.sourceId);
 if(!placeOk&&!sourceOk)return{show:false,reason:"RETIRED"};
 const label=sourceOk?"Resume last window":placeOk?"Resume last place":"Resume";
 return{show:true,label,placeId:placeOk?x.placeId:null,sourceId:sourceOk?x.sourceId:null,surface:x.surface||null,reason:null};
}
