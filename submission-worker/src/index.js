import {submissionRecord} from "../../src/business-submission.js";
import {submissionEnvelope} from "../../src/submission-transport.js";
import {reviewSubmission} from "../../src/submission-review.js";
export {SubmissionInbox} from "./submission-inbox.js";

const H={"content-type":"application/json; charset=utf-8","cache-control":"no-store"};
const reply=(status,body,origin)=>new Response(JSON.stringify(body),{status,headers:{...H,...(origin?{"access-control-allow-origin":origin,vary:"Origin"}:{})}});
const originFor=(request,env)=>{
  const want=String(env.ERN_PUBLIC_ORIGIN||"https://earthrightnow.app").replace(/\/$/,"");
  const got=String(request.headers.get("origin")||"").replace(/\/$/,"");
  return got===want?got:null;
};
const inbox=(env)=>env.SUBMISSION_INBOX.get(env.SUBMISSION_INBOX.idFromName("global"));
async function call(env,body){
  const r=await inbox(env).fetch("https://submission-inbox/internal",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(body)});
  const x=await r.json();
  if(!r.ok)throw Object.assign(new Error(x.reason||"SUBMISSION_INBOX_ERROR"),{code:x.reason||"SUBMISSION_INBOX_ERROR",status:r.status});
  return x;
}
async function hmac(raw,key){
  const k=await crypto.subtle.importKey("raw",new TextEncoder().encode(key),{name:"HMAC",hash:"SHA-256"},false,["sign"]);
  const sig=await crypto.subtle.sign("HMAC",k,new TextEncoder().encode(raw));
  return btoa(String.fromCharCode(...new Uint8Array(sig))).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"");
}
async function subjectFor(request,env){
  const raw=request.headers.get("CF-Connecting-IP")||request.headers.get("x-real-ip")||"";
  if(!raw||!env.ERN_SUBMISSION_RATE_HMAC_KEY)return null;
  return "anon_"+(await hmac(raw,env.ERN_SUBMISSION_RATE_HMAC_KEY)).slice(0,64);
}
function adminAllowed(request,env){
  const expected=String(env.ERN_SUBMISSION_REVIEW_TOKEN||"");
  const got=String(request.headers.get("authorization")||"");
  return Boolean(expected&&got===`Bearer ${expected}`);
}
function retentionDays(env){return Math.max(1,Math.min(30,Number(env.ERN_SUBMISSION_RETENTION_DAYS)||30))}

export default{
  async fetch(request,env){
    const url=new URL(request.url),origin=originFor(request,env),enabled=env.ERN_SUBMISSION_ENABLED==="true";
    if(request.method==="OPTIONS")return origin?new Response(null,{status:204,headers:{"access-control-allow-origin":origin,"access-control-allow-methods":"POST, OPTIONS","access-control-allow-headers":"content-type","access-control-max-age":"600",vary:"Origin"}}):new Response(null,{status:403});
    if(request.method==="GET"&&url.pathname==="/health"){
      let state=null;try{state=await call(env,{op:"status"})}catch{}
      return reply(200,{ok:true,service:"ERN Submission API",submissionEnabled:enabled,durableStorage:Boolean(env.SUBMISSION_INBOX),rateSubjectSecretConfigured:Boolean(env.ERN_SUBMISSION_RATE_HMAC_KEY),reviewTokenConfigured:Boolean(env.ERN_SUBMISSION_REVIEW_TOKEN),retentionDays:retentionDays(env),automaticPublishAllowed:false,automaticApprovalAllowed:false,rawNetworkIdentifiersStored:false,state,secretValuesExposed:false},origin);
    }

    if(url.pathname.startsWith("/internal/submissions")){
      if(!adminAllowed(request,env))return reply(401,{ok:false,reason:"UNAUTHORIZED"});
      if(request.method==="GET"&&url.pathname==="/internal/submissions"){const x=await call(env,{op:"list"});return reply(200,x)}
      const m=url.pathname.match(/^\/internal\/submissions\/([^/]+)\/review$/);
      if(request.method==="POST"&&m){
        let body;try{body=await request.json()}catch{return reply(400,{ok:false,reason:"INVALID_JSON"})}
        const current=await call(env,{op:"get",id:m[1]});
        const reviewed=reviewSubmission(current.submission.record,{decision:body.decision,reviewedAt:new Date().toISOString(),note:body.note||"",checks:body.checks||{}});
        if(!reviewed.ok)return reply(400,{ok:false,reason:reviewed.error,missing:reviewed.missing||[]});
        const record=reviewed.record.status==="APPROVED"?{...reviewed.record,contact:null}:reviewed.record;
        await call(env,{op:"update",id:m[1],record});
        return reply(200,{ok:true,id:m[1],status:record.status,published:false});
      }
      return reply(404,{ok:false,reason:"NOT_FOUND"});
    }

    if(request.method!=="POST"||url.pathname!=="/api/submissions")return reply(404,{ok:false,reason:"NOT_FOUND"},origin);
    if(!origin)return reply(403,{ok:false,reason:"ORIGIN_NOT_ALLOWED"});
    if(!enabled)return reply(503,{ok:false,reason:"SUBMISSION_TRANSPORT_DISABLED"},origin);
    if((+request.headers.get("content-length")||0)>8192)return reply(413,{ok:false,reason:"REQUEST_TOO_LARGE"},origin);
    let body;try{body=await request.json()}catch{return reply(400,{ok:false,reason:"INVALID_JSON"},origin)}
    if(body?.consent!==true)return reply(400,{ok:false,reason:"CONSENT_REQUIRED"},origin);
    const prepared=submissionRecord(body);
    if(!prepared.ok)return reply(400,{ok:false,reason:"INVALID_SUBMISSION",errors:prepared.errors},origin);
    const envelope=submissionEnvelope(prepared.record,{consent:true});
    if(!envelope.ok)return reply(400,{ok:false,reason:envelope.reason},origin);
    const subject=await subjectFor(request,env);
    if(!subject)return reply(503,{ok:false,reason:"RATE_SUBJECT_CONFIG_INCOMPLETE"},origin);
    const rate=await call(env,{op:"rate-check",subject,now:Date.now()});
    if(!rate.allowed)return reply(429,{ok:false,reason:rate.reason},origin);
    const committed=await call(env,{op:"rate-commit",subject,now:Date.now()});
    if(!committed.allowed)return reply(429,{ok:false,reason:committed.reason},origin);
    const id=crypto.randomUUID();
    const stored=await call(env,{op:"put",id,record:envelope.payload.record,retentionDays:retentionDays(env)});
    return reply(202,{ok:true,id,status:"PENDING_REVIEW",published:false,expiresAt:stored.expiresAt},origin);
  }
};
