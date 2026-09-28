import {earthSignalState} from "./earth-signals.js";
import {nowMomentPhotoPublic} from "./now-moment-photo-record.js";

const SIGNAL_LABELS=Object.freeze({
  RAINING:"raining",
  BEAUTIFUL_LIGHT:"beautiful light",
  BUSY:"busy",
  PEACEFUL:"peaceful",
  SOMETHING_HAPPENING:"something happening",
  WORTH_SEEING:"worth seeing"
});

export function participationEvidencePack({
  place,
  signals=[],
  photos=[],
  now=new Date()
}={}){
  const placeId=String(place?.id||place?.placeId||"").trim();
  const placeLabel=String(place?.title||place?.placeLabel||"").trim()||placeId||"this place";
  const currentSignals=(signals||[]).filter(s=>s?.placeId===placeId&&earthSignalState(s,{now}).visible&&s?.reported!==true);
  const currentPhotos=(photos||[]).filter(p=>p?.placeId===placeId&&Date.parse(p?.storageExpiryAt||p?.expiresAt||0)>now.getTime()).map(nowMomentPhotoPublic).filter(Boolean);

  const grouped=new Map();
  for(const s of currentSignals){
    const type=String(s.type||"");
    const item=grouped.get(type)||{type,label:SIGNAL_LABELS[type]||"visitor signal",count:0,latestCreatedAt:null,nearPlaceCount:0};
    item.count++;
    if(s.locationEvidence==="NEAR_PLACE")item.nearPlaceCount++;
    if(!item.latestCreatedAt||Date.parse(s.createdAt||0)>Date.parse(item.latestCreatedAt||0))item.latestCreatedAt=s.createdAt||null;
    grouped.set(type,item);
  }

  return{
    placeId,
    placeLabel,
    verified:false,
    evidenceKind:"VISITOR_PARTICIPATION",
    signals:[...grouped.values()].sort((a,b)=>b.count-a.count||Date.parse(b.latestCreatedAt||0)-Date.parse(a.latestCreatedAt||0)),
    photos:currentPhotos,
    truth:{
      sourceTruthChanged:false,
      weatherVerified:false,
      crowdVerified:false,
      eventVerified:false,
      cameraStatusChanged:false,
      rankingAffected:false,
      wording:"Visitor participation is short-lived, attributed evidence and is not independent verification."
    }
  };
}

export function participationEvidenceHasContent(pack){
  return Boolean((pack?.signals?.length||0)||(pack?.photos?.length||0));
}
