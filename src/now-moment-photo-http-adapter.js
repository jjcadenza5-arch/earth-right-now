import {nowMomentPhotoActivation} from "./now-moment-photo-capabilities.js";
import {NOW_MOMENT_PHOTO_API} from "./now-moment-photo-api-contract.js";
import {createNowMomentPhoto,listNowMomentPhotos,reportNowMomentPhoto} from "./now-moment-photo-service.js";

const H={"content-type":"application/json; charset=utf-8","cache-control":"no-store"};
const response=(status,body)=>({status,headers:H,body});

function header(request,name){return request?.headers?.[name]??request?.headers?.[name.toLowerCase()]??null}

export async function nowMomentPhotoHttpRequest(request={},context={}){
  const activation=nowMomentPhotoActivation(context.capabilities||{});
  const method=String(request.method||"GET").toUpperCase();
  const path=String(request.path||"");

  if(method==="POST"&&path===NOW_MOMENT_PHOTO_API.uploadPath){
    if(!activation.ready)return response(503,{ok:false,mode:"OFF",reason:"NOW_MOMENT_PHOTO_NOT_ACTIVATED"});
    const bytes=request.body instanceof Uint8Array?request.body:new Uint8Array(request.body||[]);
    const input={
      bytes,
      mimeType:header(request,"x-ern-photo-mime"),
      placeId:header(request,"x-ern-place-id")
    };
    try{
      const result=await createNowMomentPhoto(input,context);
      if(!result.ok){
        const status=result.stage==="RATE_LIMIT"?429:400;
        return response(status,{ok:false,reason:result.reason,stage:result.stage,issues:result.issues||[]});
      }
      return response(202,{ok:true,id:result.record.id,status:"PENDING_REVIEW",published:false,expiresAt:result.record.storageExpiryAt});
    }catch(error){return response(503,{ok:false,reason:error?.code||"SERVICE_UNAVAILABLE"})}
  }

  if(method==="GET"&&path===NOW_MOMENT_PHOTO_API.uploadPath){
    if(!activation.ready)return response(503,{ok:false,mode:"OFF",reason:"NOW_MOMENT_PHOTO_NOT_ACTIVATED"});
    const placeId=String(request.query?.placeId||"").trim();
    if(!placeId)return response(400,{ok:false,reason:"PLACE_ID_REQUIRED"});
    try{return response(200,await listNowMomentPhotos({placeId},context))}
    catch(error){return response(503,{ok:false,reason:error?.code||"SERVICE_UNAVAILABLE"})}
  }

  const report=path.match(/^\/api\/now-moments\/photos\/([^/]+)\/report$/);
  if(method==="POST"&&report){
    if(!activation.ready)return response(503,{ok:false,mode:"OFF",reason:"NOW_MOMENT_PHOTO_NOT_ACTIVATED"});
    try{
      const result=await reportNowMomentPhoto({id:decodeURIComponent(report[1])},context);
      return result.ok?response(202,{ok:true,id:result.id,visible:false}):response(404,{ok:false,reason:result.reason});
    }catch(error){return response(503,{ok:false,reason:error?.code||"SERVICE_UNAVAILABLE"})}
  }

  return response(404,{ok:false,reason:"NOT_FOUND"});
}
