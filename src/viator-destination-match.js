const norm=v=>String(v||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").trim().toLowerCase();

export function destinationAncestry(rows=[],destination={}){
  const byId=new Map(rows.map(x=>[String(x?.destinationId||""),x]).filter(([id])=>id));
  const chain=[];
  let current=destination,seen=new Set();
  for(let i=0;i<12;i++){
    const parentId=String(current?.parentDestinationId||"");
    if(!parentId||seen.has(parentId))break;
    seen.add(parentId);
    const parent=byId.get(parentId);
    if(!parent)break;
    chain.push({destinationId:String(parent.destinationId||""),name:String(parent.name||""),type:String(parent.type||"")});
    current=parent;
  }
  return chain;
}

export function exactDestinationCandidates(rows=[],{name,country,types=["CITY","TOWN"]}={}){
  const wanted=norm(name),wantedCountry=norm(country),allowed=new Set(types.map(x=>String(x).toUpperCase()));
  if(!wanted)return[];
  return rows.filter(x=>norm(x?.name)===wanted&&allowed.has(String(x?.type||"").toUpperCase())).map(x=>{
    const ancestry=destinationAncestry(rows,x);
    const countryMatch=!wantedCountry||ancestry.some(a=>norm(a.name)===wantedCountry&&String(a.type||"").toUpperCase()==="COUNTRY");
    return{
      destinationId:String(x.destinationId||""),
      name:String(x.name||""),
      type:String(x.type||""),
      parentDestinationId:x.parentDestinationId==null?null:String(x.parentDestinationId),
      lookupId:String(x.lookupId||""),
      timeZone:String(x.timeZone||""),
      center:x.center||null,
      ancestry,
      countryMatch
    };
  }).sort((a,b)=>Number(b.countryMatch)-Number(a.countryMatch)||a.destinationId.localeCompare(b.destinationId));
}
