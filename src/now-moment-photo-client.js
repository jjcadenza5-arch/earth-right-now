import {NOW_MOMENT_PHOTO_POLICY} from "./now-moment-photo-policy.js";

function canvasBlob(canvas,type,quality){
  return new Promise((resolve,reject)=>{
    if(typeof canvas.convertToBlob==="function"){
      canvas.convertToBlob({type,quality}).then(resolve,reject);return;
    }
    canvas.toBlob(blob=>blob?resolve(blob):reject(new Error("PHOTO_ENCODE_FAILED")),type,quality);
  });
}
function targetSize(width,height,maxDimension){
  const max=Math.max(width,height);
  if(max<=maxDimension)return{width,height};
  const scale=maxDimension/max;
  return{width:Math.max(1,Math.round(width*scale)),height:Math.max(1,Math.round(height*scale))};
}

export async function prepareNowMomentPhoto(file,{
  createBitmap=globalThis.createImageBitmap,
  createCanvas=(w,h)=>{const c=document.createElement("canvas");c.width=w;c.height=h;return c}
}={}){
  if(!file||!NOW_MOMENT_PHOTO_POLICY.allowedMimeTypes.includes(file.type))return{ok:false,reason:"UNSUPPORTED_MEDIA_TYPE"};
  if(!Number.isFinite(file.size)||file.size<=0||file.size>NOW_MOMENT_PHOTO_POLICY.maxSourceBytes)return{ok:false,reason:"SOURCE_SIZE_INVALID"};
  if(typeof createBitmap!=="function")return{ok:false,reason:"IMAGE_DECODER_UNAVAILABLE"};

  let bitmap;
  try{bitmap=await createBitmap(file)}catch{return{ok:false,reason:"IMAGE_DECODE_FAILED"}}
  try{
    const target=targetSize(bitmap.width,bitmap.height,NOW_MOMENT_PHOTO_POLICY.maxDimensionPx);
    const canvas=createCanvas(target.width,target.height);
    const ctx=canvas.getContext?.("2d",{alpha:false});
    if(!ctx)return{ok:false,reason:"CANVAS_UNAVAILABLE"};
    ctx.drawImage(bitmap,0,0,target.width,target.height);

    const attempts=[0.86,0.78,0.68,0.58,0.48];
    let blob=null;
    for(const quality of attempts){
      blob=await canvasBlob(canvas,"image/jpeg",quality);
      if(blob.size<=NOW_MOMENT_PHOTO_POLICY.maxStoredBytes)break;
    }
    if(!blob||blob.size>NOW_MOMENT_PHOTO_POLICY.maxStoredBytes)return{ok:false,reason:"DERIVATIVE_TOO_LARGE"};
    return{
      ok:true,
      blob,
      mimeType:"image/jpeg",
      sourceBytes:file.size,
      storedBytes:blob.size,
      width:target.width,
      height:target.height,
      metadataStripped:true,
      originalNameStored:false
    };
  }finally{try{bitmap.close?.()}catch{}}
}
