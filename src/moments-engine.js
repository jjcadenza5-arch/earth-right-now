import { discoverableSource,currentSource } from "./discovery-eligibility.js";import { sourceScore } from "./source-score.js";
const editorial=["Beautiful Earth","Interesting Earth","Useful Earth","Earth Happening Now"];
export function momentFamilies(s){return(s.categories||[]).filter(c=>editorial.includes(c))}
export function momentEligible(s){return discoverableSource(s)&&momentFamilies(s).length>0}
export function happeningNowEligible(s,{now=new Date()}={}){return momentEligible(s)&&currentSource(s,{now})&&["LIVE_VIDEO","LIVE_IMAGE","EXTERNAL_LIVE","PARTNER"].includes(s.truth)}
export function rankMoments(sources,{now=new Date()}={}){return(sources||[]).filter(momentEligible).sort((a,b)=>{const ac=currentSource(a,{now})?1:0,bc=currentSource(b,{now})?1:0;if(ac!==bc)return bc-ac;const as=(a.moment||0)*.55+(a.quality||0)*.35+sourceScore(a,{now})*.1,bs=(b.moment||0)*.55+(b.quality||0)*.35+sourceScore(b,{now})*.1;return bs-as})}
export function bestMoment(sources,family,{now=new Date()}={}){const pool=family==="Earth Happening Now"?(sources||[]).filter(s=>happeningNowEligible(s,{now})):sources||[];return rankMoments(pool.filter(s=>(s.categories||[]).includes(family)),{now})[0]||null}
