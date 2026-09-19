import { fallbackChain } from "./fallback-chain.js";
export function auditFallbackCoverage(rows){
 const issues=[];
 for(const s of rows||[]){
  if(s?.playback!=="EMBED")continue;
  const chain=fallbackChain(s),modes=chain.map(x=>x.mode);
  if(modes[0]!=="EMBED")issues.push({id:s.id||null,error:"EMBED_NOT_PRIMARY"});
  if(!modes.includes("EXTERNAL"))issues.push({id:s.id||null,error:"NO_EXTERNAL_FALLBACK"});
  if(modes.at(-1)!=="UNAVAILABLE")issues.push({id:s.id||null,error:"NO_TERMINAL_UNAVAILABLE"});
 }
 return issues;
}
