function matchesAscii(bytes,offset,needle){
  if(offset<0||offset+needle.length>bytes.length)return false;
  for(let i=0;i<needle.length;i++)if(bytes[offset+i]!==needle.charCodeAt(i))return false;
  return true;
}
function includesAscii(bytes,needle){
  if(!needle||needle.length>bytes.length)return false;
  const first=needle.charCodeAt(0);
  for(let i=0;i<=bytes.length-needle.length;i++){
    if(bytes[i]===first&&matchesAscii(bytes,i,needle))return true;
  }
  return false;
}

export function nowMomentMetadataScan(bytes,mimeType){
  const b=bytes instanceof Uint8Array?bytes:new Uint8Array(bytes||[]);
  const mime=String(mimeType||"");
  const issues=[];
  if(!b.length)return{ok:false,issues:["EMPTY_MEDIA"]};

  if(mime==="image/jpeg"){
    if(!(b[0]===0xff&&b[1]===0xd8&&b[b.length-2]===0xff&&b[b.length-1]===0xd9))issues.push("JPEG_MAGIC_INVALID");
    if(includesAscii(b,"Exif\0\0"))issues.push("EXIF_PRESENT");
    if(includesAscii(b,"http://ns.adobe.com/xap/1.0/"))issues.push("XMP_PRESENT");
    if(includesAscii(b,"GPS"))issues.push("GPS_METADATA_SUSPECTED");
  }else if(mime==="image/png"){
    const sig=[137,80,78,71,13,10,26,10];
    if(sig.some((v,i)=>b[i]!==v))issues.push("PNG_MAGIC_INVALID");
    for(const chunk of ["eXIf","tEXt","zTXt","iTXt"])if(includesAscii(b,chunk))issues.push("PNG_METADATA_CHUNK:"+chunk);
  }else if(mime==="image/webp"){
    if(!matchesAscii(b,0,"RIFF")||!matchesAscii(b,8,"WEBP"))issues.push("WEBP_MAGIC_INVALID");
    for(const chunk of ["EXIF","XMP "])if(includesAscii(b,chunk))issues.push("WEBP_METADATA_CHUNK:"+chunk);
  }else{
    issues.push("UNSUPPORTED_MEDIA_TYPE");
  }
  return{ok:issues.length===0,issues};
}
