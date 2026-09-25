export const EARTH_SIGNAL_RATE_LIMIT_REQUIREMENTS=Object.freeze({
  windowMinutes:10,
  maxSubmissionsPerSubject:6,
  maxActivePerSubjectPlace:3,
  rawNetworkIdentifiersStored:false
});

function key(subject,placeId){
  return String(subject||"")+"::"+String(placeId||"");
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
    async check({subject,placeId,now=new Date()}={}){
      const parsed=earthSignalRateSubject({subject});
      if(!parsed.ok)return{allowed:false,reason:parsed.reason};
      const place=String(placeId||"").trim();
      if(!place)return{allowed:false,reason:"INVALID_PLACE"};
      const start=now.getTime()-EARTH_SIGNAL_RATE_LIMIT_REQUIREMENTS.windowMinutes*60000;
      events=events.filter(x=>x.at>=start&&x.at<=now.getTime());
      const subjectEvents=events.filter(x=>x.subject===parsed.subject);
      if(subjectEvents.length>=EARTH_SIGNAL_RATE_LIMIT_REQUIREMENTS.maxSubmissionsPerSubject)return{allowed:false,reason:"RATE_LIMIT"};
      const subjectPlace=subjectEvents.filter(x=>x.placeId===place);
      if(subjectPlace.length>=EARTH_SIGNAL_RATE_LIMIT_REQUIREMENTS.maxActivePerSubjectPlace)return{allowed:false,reason:"PLACE_LIMIT"};
      return{allowed:true,reason:null,remaining:EARTH_SIGNAL_RATE_LIMIT_REQUIREMENTS.maxSubmissionsPerSubject-subjectEvents.length-1};
    },
    async commit({subject,placeId,now=new Date()}={}){
      const decision=await this.check({subject,placeId,now});
      if(!decision.allowed)return decision;
      events.push({subject:String(subject),placeId:String(placeId),at:now.getTime()});
      return{...decision,committed:true};
    },
    snapshot(){
      return events.map(x=>({...x}));
    }
  };
}
