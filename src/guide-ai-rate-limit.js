export const GUIDE_AI_RATE_POLICY=Object.freeze({
  windowMinutes:60,
  maxRequestsPerSubject:20,
  maxConcurrentPerSubject:1,
  rawNetworkIdentifiersStored:false
});

export function guideAiRateSubject(value){
  const subject=String(value||"").trim();
  if(!subject)return{ok:false,reason:"RATE_SUBJECT_REQUIRED"};
  if(subject.length>96)return{ok:false,reason:"RATE_SUBJECT_TOO_LONG"};
  if(!/^anon_[A-Za-z0-9_-]{24,90}$/.test(subject))return{ok:false,reason:"OPAQUE_RATE_SUBJECT_REQUIRED"};
  return{ok:true,subject};
}

export function createInMemoryGuideAiRateLimiter(){
  let events=[],active=new Set();
  return{
    async check({subject,now=new Date()}={}){
      const parsed=guideAiRateSubject(subject);if(!parsed.ok)return{allowed:false,reason:parsed.reason};
      if(active.has(parsed.subject))return{allowed:false,reason:"CONCURRENT_REQUEST_LIMIT"};
      const start=now.getTime()-GUIDE_AI_RATE_POLICY.windowMinutes*60000;
      events=events.filter(x=>x.at>=start&&x.at<=now.getTime());
      const used=events.filter(x=>x.subject===parsed.subject).length;
      if(used>=GUIDE_AI_RATE_POLICY.maxRequestsPerSubject)return{allowed:false,reason:"RATE_LIMIT"};
      return{allowed:true,remaining:GUIDE_AI_RATE_POLICY.maxRequestsPerSubject-used-1};
    },
    async begin({subject,now=new Date()}={}){
      const check=await this.check({subject,now});if(!check.allowed)return check;
      active.add(String(subject));events.push({subject:String(subject),at:now.getTime()});
      return{...check,begun:true};
    },
    async end({subject}={}){active.delete(String(subject));return{ended:true}}
  };
}
