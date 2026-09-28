const args=process.argv.slice(2);
const area=args[0],action=args[1];
const endpoint=String(process.env.ERN_OPERATOR_ENDPOINT||"").replace(/\/$/,"");
const token=String(process.env.ERN_OPERATOR_TOKEN||"");
if(!["submissions","signals"].includes(area)||!action||!/^https:\/\//.test(endpoint)||!token){
  console.error("Usage requires area/action plus ERN_OPERATOR_ENDPOINT=https://... and ERN_OPERATOR_TOKEN in the environment.");
  process.exit(2);
}
const headers={authorization:`Bearer ${token}`,"content-type":"application/json"};
async function request(path,{method="GET",body}={}){
  const r=await fetch(endpoint+path,{method,headers,cache:"no-store",body:body?JSON.stringify(body):undefined});
  let data=null;try{data=await r.json()}catch{}
  if(!r.ok){console.error(JSON.stringify({ok:false,status:r.status,reason:data?.reason||"REQUEST_FAILED"},null,2));process.exit(1)}
  return data;
}
if(area==="submissions"){
  if(action==="list"){
    console.log(JSON.stringify(await request("/internal/submissions"),null,2));
  }else if(action==="review"){
    const id=args[2],decision=args[3];
    if(!id||!["NEEDS_INFO","APPROVED","REJECTED"].includes(decision)){console.error("review requires <id> <NEEDS_INFO|APPROVED|REJECTED>");process.exit(2)}
    const checks=decision==="APPROVED"?{rights:true,public:true,truth:true,quality:true,embed:true,currentness:true}:{};
    console.log(JSON.stringify(await request(`/internal/submissions/${encodeURIComponent(id)}/review`,{method:"POST",body:{decision,checks,note:"Operator CLI review"}}),null,2));
  }else{console.error("Unknown submissions action");process.exit(2)}
}else{
  if(action==="reports"){
    console.log(JSON.stringify(await request("/internal/earth-signals/reports"),null,2));
  }else if(action==="resolve"){
    const id=args[2],decision=args[3];
    if(!id||!["RESTORE","REMOVE"].includes(decision)){console.error("resolve requires <signal-id> <RESTORE|REMOVE>");process.exit(2)}
    console.log(JSON.stringify(await request(`/internal/earth-signals/${encodeURIComponent(id)}/resolve`,{method:"POST",body:{decision}}),null,2));
  }else{console.error("Unknown signals action");process.exit(2)}
}
