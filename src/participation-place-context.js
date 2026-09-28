import {participationEvidenceHasContent} from "./participation-evidence.js";

export function participationPlaceSummary(pack){
  if(!participationEvidenceHasContent(pack))return null;
  const signalCount=(pack.signals||[]).reduce((n,x)=>n+(x.count||0),0);
  const photoCount=(pack.photos||[]).length;
  const parts=[];
  if(signalCount)parts.push(`${signalCount} recent visitor signal${signalCount===1?"":"s"}`);
  if(photoCount)parts.push(`${photoCount} temporary visitor photo${photoCount===1?"":"s"}`);
  return{
    placeId:pack.placeId,
    label:"RIGHT NOW — VISITOR REPORTS",
    summary:parts.join(" · "),
    verified:false,
    evidenceKind:"VISITOR_PARTICIPATION",
    disclosure:"Visitor-submitted and temporary · not independently verified",
    sourceTruthChanged:false,
    rankingAffected:false
  };
}
