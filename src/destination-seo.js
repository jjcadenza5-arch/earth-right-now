import { discoverableSource,currentSource } from "./discovery-eligibility.js";
import { sourceScore } from "./source-score.js";

function checkedTime(source){
  const t=Date.parse(source?.lastSuccessfulCheck||source?.checkedAt||"");
  return Number.isFinite(t)?t:0;
}
export function destinationPreferredSource(items=[],{now=new Date()}={}){
  const usable=(items||[]).filter(s=>s&&s.id&&s.title&&s.health!=="OFFLINE");
  if(!usable.length)return null;
  const pools=[
    usable.filter(s=>currentSource(s,{now})),
    usable.filter(s=>discoverableSource(s)&&s.health==="HEALTHY"),
    usable.filter(discoverableSource),
    usable
  ];
  const pool=pools.find(x=>x.length)||usable;
  return [...pool].sort((a,b)=>{
    const score=sourceScore(b,{now})-sourceScore(a,{now});
    if(score)return score;
    const checked=checkedTime(b)-checkedTime(a);
    if(checked)return checked;
    return String(a.id).localeCompare(String(b.id));
  })[0]||null;
}
export function destinationLastModified(items=[]){
  const times=(items||[]).map(checkedTime).filter(Boolean);
  return times.length?new Date(Math.max(...times)).toISOString():null;
}
export function destinationSeoGraph({placeId,preferred,description,url,lastModified}={}){
  if(!preferred||!placeId||!url)return null;
  const title=preferred.title,where=[preferred.region,preferred.country].filter(Boolean).join(", ");
  const placeIdUrl=url+"#place",pageId=url+"#webpage",siteId="https://earthrightnow.app/#website";
  const place={
    "@type":"Place","@id":placeIdUrl,name:title,description,
    url,
    containedInPlace:{"@type":"Place",name:where||preferred.country||title}
  };
  const lat=Number(preferred.lat),lon=Number(preferred.lon);
  if(Number.isFinite(lat)&&Number.isFinite(lon))place.geo={"@type":"GeoCoordinates",latitude:lat,longitude:lon};
  const page={
    "@type":"WebPage","@id":pageId,url,
    name:`See ${title} before you go — Earth Right Now`,
    description,
    isPartOf:{"@id":siteId},
    about:{"@id":placeIdUrl},
    breadcrumb:{"@id":url+"#breadcrumb"}
  };
  if(lastModified)page.dateModified=lastModified;
  const graph=[
    {"@type":"WebSite","@id":siteId,name:"Earth Right Now",url:"https://earthrightnow.app/"},
    page,
    place,
    {"@type":"BreadcrumbList","@id":url+"#breadcrumb",itemListElement:[
      {"@type":"ListItem",position:1,name:"Earth Right Now",item:"https://earthrightnow.app/"},
      {"@type":"ListItem",position:2,name:title,item:url}
    ]}
  ];
  return{"@context":"https://schema.org","@graph":graph};
}
