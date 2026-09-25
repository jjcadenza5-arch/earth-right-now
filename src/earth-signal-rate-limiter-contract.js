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
  if(subject.length>160)return{ok:false,reason:"RATE_SUBJECT_TOO_LONG"};
  return{ok:true,subject};
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
