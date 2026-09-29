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


function u16be(b,i){return (b[i]<<8)|b[i+1]}
function u24le(b,i){return b[i]|(b[i+1]<<8)|(b[i+2]<<16)}
function u32be(b,i){return ((b[i]*0x1000000)+(b[i+1]<<16)+(b[i+2]<<8)+b[i+3])>>>0}
function jpegDimensions(b){
  if(b.length<4||b[0]!==0xff||b[1]!==0xd8)return null;
  let i=2;
  while(i+3<b.length){
    while(i<b.length&&b[i]!==0xff)i++;
    while(i<b.length&&b[i]===0xff)i++;
    if(i>=b.length)break;
    const marker=b[i++];
    if(marker===0xd9||marker===0xda)break;
    if(marker===0x01||(marker>=0xd0&&marker<=0xd7))continue;
    if(i+1>=b.length)break;
    const len=u16be(b,i);
    if(len<2||i+len>b.length)break;
    const sof=(marker>=0xc0&&marker<=0xc3)||(marker>=0xc5&&marker<=0xc7)||(marker>=0xc9&&marker<=0xcb)||(marker>=0xcd&&marker<=0xcf);
    if(sof&&len>=7){
      const height=u16be(b,i+3),width=u16be(b,i+5);
      return width>0&&height>0?{width,height}:null;
    }
    i+=len;
  }
  return null;
}
function pngDimensions(b){
  if(b.length<24||!matchesAscii(b,12,"IHDR"))return null;
  const width=u32be(b,16),height=u32be(b,20);
  return width>0&&height>0?{width,height}:null;
}
function webpDimensions(b){
  if(b.length<30||!matchesAscii(b,0,"RIFF")||!matchesAscii(b,8,"WEBP"))return null;
  if(matchesAscii(b,12,"VP8X")){
    const width=1+u24le(b,24),height=1+u24le(b,27);
    return width>0&&height>0?{width,height}:null;
  }
  if(matchesAscii(b,12,"VP8L")&&b.length>=25&&b[20]===0x2f){
    const width=1+(b[21]|((b[22]&0x3f)<<8));
    const height=1+(((b[22]&0xc0)>>6)|(b[23]<<2)|((b[24]&0x0f)<<10));
    return width>0&&height>0?{width,height}:null;
  }
  if(matchesAscii(b,12,"VP8 ")&&b.length>=30&&b[23]===0x9d&&b[24]===0x01&&b[25]===0x2a){
    const width=(b[26]|(b[27]<<8))&0x3fff,height=(b[28]|(b[29]<<8))&0x3fff;
    return width>0&&height>0?{width,height}:null;
  }
  return null;
}
export function nowMomentImageDimensions(bytes,mimeType){
  const b=bytes instanceof Uint8Array?bytes:new Uint8Array(bytes||[]);
  const mime=String(mimeType||"");
  const value=mime==="image/jpeg"?jpegDimensions(b):mime==="image/png"?pngDimensions(b):mime==="image/webp"?webpDimensions(b):null;
  return value?{ok:true,...value}:{ok:false,reason:"IMAGE_DIMENSIONS_UNVERIFIED"};
}
