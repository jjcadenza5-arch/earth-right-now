import {participationEvidenceHasContent} from "./participation-evidence.js";

function ageText(iso,now){
  const t=Date.parse(iso||"");if(!Number.isFinite(t))return"recently";
  const m=Math.max(0,Math.floor((now.getTime()-t)/60000));
  return m<1?"just now":m===1?"1 minute ago":`${m} minutes ago`;
}

export function participationGuideContext(pack,{now=new Date()}={}){
  if(!participationEvidenceHasContent(pack))return null;
  const segments=[];
  for(const s of pack.signals||[]){
    const count=s.count===1?"One visitor":`${s.count} visitors`;
    const near=s.nearPlaceCount>0?`; ${s.nearPlaceCount} marked themselves near the place`:"";
    segments.push({
      kind:"VISITOR_SIGNAL",
      verified:false,
      text:`${count} recently reported ${s.label} at ${pack.placeLabel} (${ageText(s.latestCreatedAt,now)})${near}.`
    });
  }
  if((pack.photos||[]).length){
    segments.push({
      kind:"VISITOR_PHOTO",
      verified:false,
      text:`${pack.photos.length} approved temporary visitor photo${pack.photos.length===1?" is":"s are"} available for ${pack.placeLabel}. The photo${pack.photos.length===1?" is":"s are"} visitor media, not independent verification.`
    });
  }
  return{
    kind:"VISITOR_PARTICIPATION_CONTEXT",
    placeId:pack.placeId,
    verified:false,
    segments,
    mandatoryDisclaimer:"These are short-lived visitor reports or visitor media, not independently verified conditions.",
    prohibitedInferences:["verified weather","verified crowd level","verified event","camera live status","source health","editorial ranking"],
    sourceTruthChanged:false
  };
}

export function participationGuideText(context){
  if(!context?.segments?.length)return null;
  return [...context.segments.map(s=>s.text),context.mandatoryDisclaimer].join(" ");
}
