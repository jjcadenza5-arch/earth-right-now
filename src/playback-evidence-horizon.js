function ageHours(iso,now){const t=Date.parse(iso||""),n=now instanceof Date?now.getTime():Number(now);return Number.isFinite(t)&&Number.isFinite(n)?Math.max(0,(n-t)/36e5):Infinity}
export function playbackEvidenceHorizon(sources=[],{now=new Date(),maxAgeHours=24}={}){
 const items=(sources||[]).filter(s=>s.playback==="EMBED").map(s=>{
   const held=s.featuredHold===true,age=ageHours(s.playbackVerifiedAt,now),remaining=Number.isFinite(age)?maxAgeHours-age:null;
   let state="MISSING";
   if(held)state="HELD";
   else if(!Number.isFinite(age))state="MISSING";
   else if(remaining<0)state="EXPIRED";
   else if(remaining<=6)state="DUE_6H";
   else if(remaining<=12)state="DUE_12H";
   else state="CURRENT";
   return{id:s.id,title:s.title,provider:s.provider||null,health:s.health,held,playbackVerifiedAt:s.playbackVerifiedAt||null,expiresAt:Number.isFinite(age)?new Date((now instanceof Date?now.getTime():Number(now))+(remaining*36e5)).toISOString():null,remainingHours:remaining===null?null:Number(remaining.toFixed(1)),state};
 }).sort((a,b)=>{
   const rank={EXPIRED:0,DUE_6H:1,DUE_12H:2,MISSING:3,CURRENT:4,HELD:5};
   return (rank[a.state]??9)-(rank[b.state]??9)||(a.remainingHours??Infinity)-(b.remainingHours??Infinity)||a.id.localeCompare(b.id);
 });
 const count=state=>items.filter(x=>x.state===state).length;
 return{
   generatedAt:now instanceof Date?now.toISOString():new Date(now).toISOString(),
   maxAgeHours,
   summary:{totalEmbeds:items.length,current:count("CURRENT"),due6h:count("DUE_6H"),due12h:count("DUE_12H"),expired:count("EXPIRED"),missing:count("MISSING"),held:count("HELD")},
   urgent:items.filter(x=>["EXPIRED","DUE_6H","DUE_12H"].includes(x.state)),
   missing:items.filter(x=>x.state==="MISSING"),
   held:items.filter(x=>x.state==="HELD"),
   items,
   note:"Horizon only. playbackVerifiedAt expires after 24h for LIVE HERE eligibility; no source is reverified automatically."
 };
}
