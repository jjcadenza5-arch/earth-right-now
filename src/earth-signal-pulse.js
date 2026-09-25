import {earthSignalViewModel} from "./earth-signal-view-model.js";

export const EARTH_SIGNAL_PULSE_TRUTH=Object.freeze({
  evidenceKind:"VISITOR_REPORT_AGGREGATE",
  verified:false,
  wording:"Visitor reports are short-lived observations, not independent verification."
});

export function earthSignalPulse(signals=[],placeId,{now=new Date()}={}){
  const visible=(signals||[])
    .filter(signal=>signal?.placeId===placeId)
    .map(signal=>earthSignalViewModel(signal,{now}))
    .filter(Boolean);

  const byType=new Map();
  for(const signal of visible){
    const current=byType.get(signal.type)||{
      type:signal.type,
      label:signal.label,
      count:0,
      nearPlaceCount:0,
      latestCreatedAt:null,
      latestAgeLabel:null
    };
    current.count++;
    if(signal.nearPlaceVerified)current.nearPlaceCount++;
    if(!current.latestCreatedAt||Date.parse(signal.createdAt)>Date.parse(current.latestCreatedAt)){
      current.latestCreatedAt=signal.createdAt;
      current.latestAgeLabel=signal.ageLabel;
    }
    byType.set(signal.type,current);
  }

  const groups=[...byType.values()].sort((a,b)=>
    b.nearPlaceCount-a.nearPlaceCount||
    b.count-a.count||
    Date.parse(b.latestCreatedAt||0)-Date.parse(a.latestCreatedAt||0)||
    a.type.localeCompare(b.type)
  );

  return{
    placeId,
    count:visible.length,
    groups,
    leading:groups[0]||null,
    multipleReports:visible.length>1,
    verified:false,
    evidenceKind:EARTH_SIGNAL_PULSE_TRUTH.evidenceKind,
    truth:EARTH_SIGNAL_PULSE_TRUTH.wording
  };
}

export function earthSignalPulseText(pulse,placeLabel="this place"){
  if(!pulse?.count||!pulse.leading)return null;
  const lead=pulse.leading;
  const reportWord=lead.count===1?"report":"reports";
  const extraKinds=Math.max(0,(pulse.groups?.length||0)-1);
  const near=lead.nearPlaceCount>0?` · ${lead.nearPlaceCount} marked near the place`:"";
  return `Visitors have ${lead.count} recent ${reportWord} of ${lead.label.toLowerCase()} at ${placeLabel}${near}${extraKinds?`, plus ${extraKinds} other signal type${extraKinds===1?"":"s"}`:""}.`;
}
