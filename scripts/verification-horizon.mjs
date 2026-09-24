import { readFile } from "node:fs/promises";import { verificationWindowHours } from "../src/source-recency.js";
const rows=JSON.parse(await readFile(new URL("../data/sources.json",import.meta.url),"utf8")),now=Date.now();
const items=rows.map(s=>{
  const checked=s.lastSuccessfulCheck||s.checkedAt||null,time=Date.parse(checked||""),windowHours=verificationWindowHours(s),expiresAt=Number.isFinite(time)?time+windowHours*3600000:null,remainingHours=expiresAt===null?null:(expiresAt-now)/3600000;
  const state=s.featuredHold===true?"HELD":remainingHours===null?"UNKNOWN":remainingHours<0?"EXPIRED":remainingHours<=24?"DUE_24H":remainingHours<=72?"DUE_72H":"CURRENT";
  return{id:s.id,title:s.title,provider:s.provider||null,health:s.health,truth:s.truth,playback:s.playback,checkedAt:checked,windowHours,expiresAt:expiresAt===null?null:new Date(expiresAt).toISOString(),remainingHours:remainingHours===null?null:Number(remainingHours.toFixed(1)),state,featuredHold:s.featuredHold===true,featuredHoldReason:s.featuredHoldReason||null};
}).sort((a,b)=>Number(a.state==="HELD")-Number(b.state==="HELD")||(a.remainingHours??-Infinity)-(b.remainingHours??-Infinity)||a.id.localeCompare(b.id));
const summarize=state=>items.filter(x=>x.state===state);
console.log(JSON.stringify({
  generatedAt:new Date(now).toISOString(),
  summary:{total:items.length,expired:summarize("EXPIRED").length,due24h:summarize("DUE_24H").length,due72h:summarize("DUE_72H").length,current:summarize("CURRENT").length,unknown:summarize("UNKNOWN").length,held:summarize("HELD").length},
  urgent:items.filter(x=>["UNKNOWN","EXPIRED","DUE_24H"].includes(x.state)),
  next72h:summarize("DUE_72H"),
  held:summarize("HELD"),
  note:"Verification horizon is maintenance scheduling only. Featured holds are separated from expiry urgency and remain held until curation deliberately removes the hold."
},null,2));
