// Local daylight is a conservative proxy, not independent imagery or brightness evidence.
// Night-time promotion requires a recent, source-specific positive HUMAN visual review.
export function premiumVisualEligible(s,{now=new Date()}={}){
 if(!s||s.watchHold===true||s.featuredHold===true||Number(s.quality)<84||Number(s.moment)<80)return false;
 let hour=-1;
 try{hour=Number(new Intl.DateTimeFormat("en-US",{timeZone:s.timeZone,hour:"2-digit",hourCycle:"h23"}).formatToParts(now).find(p=>p.type==="hour")?.value)}catch{return false}
 if(hour>=8&&hour<17)return true;
 const t=Date.parse(s.nightVisualVerifiedAt||""),age=now.getTime()-t;
 return s.nightVisualReview==="VISUALLY_COMPELLING"&&String(s.nightVisualEvidence||"").trim().length>=20&&Number.isFinite(age)&&age>=0&&age<=72*3600000;
}
