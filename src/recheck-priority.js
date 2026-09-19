export function recheckPriority(source,{now=Date.now()}={}){
 const checked=Date.parse(source?.lastSuccessfulCheck||source?.checkedAt||""),age=Number.isFinite(checked)?Math.max(0,(now-checked)/36e5):Infinity;
 let score=0,reasons=[];
 if(!Number.isFinite(age)){score+=100;reasons.push("NO_VERIFICATION")}else{score+=Math.min(72,age/2)}
 if(source?.health==="DEGRADED"){score+=35;reasons.push("DEGRADED")}
 if(source?.health==="UNKNOWN"){score+=45;reasons.push("UNKNOWN_HEALTH")}
 if(source?.truth==="LIVE_VIDEO"||source?.truth==="LIVE_IMAGE"){score+=20;reasons.push("INSIDE_OR_DIRECT_LIVE")}
 if((source?.quality||0)>=85){score+=10;reasons.push("HIGH_VALUE")}
 return{sourceId:source?.id||null,score,reasons,ageHours:age};
}
export function prioritizedRechecks(sources=[],options={}){return sources.map(s=>({source:s,...recheckPriority(s,options)})).sort((a,b)=>b.score-a.score||String(a.sourceId).localeCompare(String(b.sourceId)))}
