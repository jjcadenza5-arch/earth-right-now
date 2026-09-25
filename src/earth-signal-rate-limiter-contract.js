export const EARTH_SIGNAL_RATE_LIMIT_REQUIREMENTS=Object.freeze({
  windowMinutes:10,
  maxSubmissionsPerSubject:6,
  maxActivePerSubjectPlace:3,
  maxReportsPerSubject:10,
  maxReportsPerTargetPerSubject:1,
  rawNetworkIdentifiersStored:false
});

function normalizedAction(action){
  return action==="REPORT"?"REPORT":"SUBMIT";
}

export function earthSignalRateSubject(input={}){
  const subject=String(input.subject||"").trim();
  if(!subject)return{ok:false,reason:"RATE_SUBJECT_REQUIRED"};
  if(subject.length>96)return{ok:false,reason:"RATE_SUBJECT_TOO_LONG"};
  if(!/^anon_[A-Za-z0-9_-]{24,90}$/.test(subject))return{ok:false,reason:"OPAQUE_RATE_SUBJECT_REQUIRED"};
  return{ok:true,subject};
}

export async function deriveEarthSignalRateSubject(clientToken,{digest}={}){
  const token=String(clientToken||"").trim();
  if(!/^[A-Za-z0-9_-]{24,128}$/.test(token))return{ok:false,reason:"CLIENT_TOKEN_INVALID"};
  if(typeof digest!=="function")return{ok:false,reason:"SUBJECT_DIGEST_REQUIRED"};
  const value=String(await digest(token)||"").replace(/[^A-Za-z0-9_-]/g,"");
  if(value.length<24)return{ok:false,reason:"SUBJECT_DIGEST_INVALID"};
  return earthSignalRateSubject({subject:"anon_"+value.slice(0,90)});
}

export function createInMemoryEarthSignalRateLimiter(){
  let events=[];
  return{
    async check({subject,placeId=null,action="SUBMIT",targetId=null,now=new Date()}={}){
      const parsed=earthSignalRateSubject({subject});
      if(!parsed.ok)return{allowed:false,reason:parsed.reason};
      const type=normalizedAction(action);
      const start=now.getTime()-EARTH_SIGNAL_RATE_LIMIT_REQUIREMENTS.windowMinutes*60000;
      events=events.filter(x=>x.at>=start&&x.at<=now.getTime());
      const subjectEvents=events.filter(x=>x.subject===parsed.subject&&x.action===type);

      if(type==="REPORT"){
        const target=String(targetId||"").trim();
        if(!target)return{allowed:false,reason:"REPORT_TARGET_REQUIRED"};
        if(subjectEvents.length>=EARTH_SIGNAL_RATE_LIMIT_REQUIREMENTS.maxReportsPerSubject)return{allowed:false,reason:"REPORT_RATE_LIMIT"};
        if(subjectEvents.some(x=>x.targetId===target))return{allowed:false,reason:"DUPLICATE_REPORT"};
        return{allowed:true,reason:null,remaining:EARTH_SIGNAL_RATE_LIMIT_REQUIREMENTS.maxReportsPerSubject-subjectEvents.length-1};
      }

      const place=String(placeId||"").trim();
      if(!place)return{allowed:false,reason:"INVALID_PLACE"};
      if(subjectEvents.length>=EARTH_SIGNAL_RATE_LIMIT_REQUIREMENTS.maxSubmissionsPerSubject)return{allowed:false,reason:"RATE_LIMIT"};
      const subjectPlace=subjectEvents.filter(x=>x.placeId===place);
      if(subjectPlace.length>=EARTH_SIGNAL_RATE_LIMIT_REQUIREMENTS.maxActivePerSubjectPlace)return{allowed:false,reason:"PLACE_LIMIT"};
      return{allowed:true,reason:null,remaining:EARTH_SIGNAL_RATE_LIMIT_REQUIREMENTS.maxSubmissionsPerSubject-subjectEvents.length-1};
    },
    async commit(input={}){
      const now=input.now instanceof Date?input.now:new Date();
      const decision=await this.check({...input,now});
      if(!decision.allowed)return decision;
      events.push({
        subject:String(input.subject),
        action:normalizedAction(input.action),
        placeId:input.placeId==null?null:String(input.placeId),
        targetId:input.targetId==null?null:String(input.targetId),
        at:now.getTime()
      });
      return{...decision,committed:true};
    },
    snapshot(){
      return events.map(x=>({...x}));
    }
  };
}
