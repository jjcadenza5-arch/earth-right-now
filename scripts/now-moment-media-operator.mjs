const action=process.argv[2];
const id=process.argv[3],decision=process.argv[4];
const endpoint=String(process.env.ERN_MEDIA_OPERATOR_ENDPOINT||"").replace(/\/$/,"");
const token=String(process.env.ERN_MEDIA_OPERATOR_TOKEN||"");
if(!action||!/^https:\/\//.test(endpoint)||!token){console.error("Set ERN_MEDIA_OPERATOR_ENDPOINT and ERN_MEDIA_OPERATOR_TOKEN. Actions: list | review <id> <APPROVED|REJECTED>");process.exit(2)}
const headers={authorization:`Bearer ${token}`,"content-type":"application/json"};
async function req(path,{method="GET",body}={}){const r=await fetch(endpoint+path,{method,headers,cache:"no-store",body:body?JSON.stringify(body):undefined});let x=null;try{x=await r.json()}catch{}if(!r.ok){console.error(JSON.stringify({ok:false,status:r.status,reason:x?.reason||"REQUEST_FAILED"},null,2));process.exit(1)}return x}
if(action==="list")console.log(JSON.stringify(await req("/internal/now-moments/photos"),null,2));
else if(action==="review"){if(!id||!["APPROVED","REJECTED"].includes(decision)){console.error("review requires <id> <APPROVED|REJECTED>");process.exit(2)}console.log(JSON.stringify(await req(`/internal/now-moments/photos/${encodeURIComponent(id)}/review`,{method:"POST",body:{decision}}),null,2))}
else{console.error("Unknown action");process.exit(2)}
