export async function readJsonBodyBounded(request,maxBytes){
  const limit=Math.max(1,Number(maxBytes)||1);
  if(!request?.body)return{};
  const reader=request.body.getReader(),chunks=[];let total=0;
  try{
    while(true){
      const {done,value}=await reader.read();if(done)break;
      total+=value.byteLength;
      if(total>limit){
        try{await reader.cancel("REQUEST_TOO_LARGE")}catch{}
        const error=new Error("REQUEST_TOO_LARGE");error.code="REQUEST_TOO_LARGE";throw error;
      }
      chunks.push(value);
    }
  }finally{try{reader.releaseLock()}catch{}}
  const bytes=new Uint8Array(total);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.byteLength}
  if(!bytes.length)return{};
  let text="";try{text=new TextDecoder().decode(bytes)}catch{const error=new Error("INVALID_JSON");error.code="INVALID_JSON";throw error}
  try{return JSON.parse(text)}catch{const error=new Error("INVALID_JSON");error.code="INVALID_JSON";throw error}
}
