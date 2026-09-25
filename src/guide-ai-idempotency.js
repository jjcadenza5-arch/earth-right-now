export const GUIDE_AI_IDEMPOTENCY_POLICY=Object.freeze({
  ttlMinutes:15,
  requestIdPattern:"req_[A-Za-z0-9_-]{20,72}",
  rawPromptStored:false,
  rawResponseStored:false,
  publicResponseOnly:true
});

export function guideAiRequestId(value){
  const id=String(value||"").trim();
  if(!id)return{ok:false,reason:"REQUEST_ID_REQUIRED"};
  if(!/^req_[A-Za-z0-9_-]{20,72}$/.test(id))return{ok:false,reason:"INVALID_REQUEST_ID"};
  return{ok:true,requestId:id};
}

export function createInMemoryGuideAiIdempotencyStore({ttlMinutes=GUIDE_AI_IDEMPOTENCY_POLICY.ttlMinutes,now=()=>new Date()}={}){
  const rows=new Map();
  const key=(subject,requestId)=>String(subject)+"::"+String(requestId);
  const prune=()=>{
    const cutoff=now().getTime()-ttlMinutes*60000;
    for(const [k,row] of rows)if(row.at<cutoff)rows.delete(k);
  };
  return{
    async begin({subject,requestId}={}){
      prune();
      const parsed=guideAiRequestId(requestId);if(!parsed.ok)return{ok:false,reason:parsed.reason};
      const k=key(subject,parsed.requestId),existing=rows.get(k);
      if(existing?.state==="COMPLETE")return{ok:true,replay:true,response:existing.response};
      if(existing?.state==="IN_FLIGHT")return{ok:false,reason:"REQUEST_ALREADY_IN_PROGRESS"};
      rows.set(k,{state:"IN_FLIGHT",at:now().getTime(),response:null});
      return{ok:true,replay:false};
    },
    async complete({subject,requestId,response}={}){
      const parsed=guideAiRequestId(requestId);if(!parsed.ok)return{ok:false,reason:parsed.reason};
      rows.set(key(subject,parsed.requestId),{state:"COMPLETE",at:now().getTime(),response:response?JSON.parse(JSON.stringify(response)):null});
      return{ok:true};
    },
    async abort({subject,requestId}={}){
      const parsed=guideAiRequestId(requestId);if(!parsed.ok)return{ok:false,reason:parsed.reason};
      const k=key(subject,parsed.requestId),existing=rows.get(k);
      if(existing?.state==="IN_FLIGHT")rows.delete(k);
      return{ok:true};
    },
    snapshot(){
      prune();
      return [...rows.values()].map(x=>({state:x.state,at:x.at,hasResponse:Boolean(x.response)}));
    }
  };
}
