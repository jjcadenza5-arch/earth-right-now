import {readFile} from "node:fs/promises";
import {recencyState,verificationWindowHours} from "../src/source-recency.js";

const rows=JSON.parse(await readFile(new URL("../data/sources.json",import.meta.url),"utf8"));
const now=new Date();
const stateOf=s=>recencyState(s,{now});
const current=rows.filter(s=>stateOf(s)==="CURRENT_CHECK");
const stale=rows.filter(s=>stateOf(s)==="RECHECK_DUE");
const other=rows.filter(s=>!["CURRENT_CHECK","RECHECK_DUE"].includes(stateOf(s)));
const healthy=xs=>xs.filter(s=>s.health==="HEALTHY");
const degraded=xs=>xs.filter(s=>s.health==="DEGRADED");
const embeds=xs=>xs.filter(s=>s.playback==="EMBED");
const ageHours=s=>{
  const raw=s.lastSuccessfulCheck||s.checkedAt||null,t=Date.parse(raw||"");
  return Number.isFinite(t)?Number(((now-t)/36e5).toFixed(1)):null;
};
const view=s=>({
  id:s.id,title:s.title,provider:s.provider||null,truth:s.truth,playback:s.playback,health:s.health,
  checkedAt:s.lastSuccessfulCheck||s.checkedAt||null,
  ageHours:ageHours(s),windowHours:verificationWindowHours(s),
  failureReason:s.failureReason||null
});
const report={
  generatedAt:now.toISOString(),
  total:rows.length,
  current:{total:current.length,healthy:healthy(current).length,degraded:degraded(current).length,embeds:embeds(healthy(current)).length},
  recheckDue:{total:stale.length,healthy:healthy(stale).length,degraded:degraded(stale).length,items:stale.map(view)},
  outsideCurrentOrRecheck:{total:other.length,healthy:healthy(other).length,degraded:degraded(other).length,items:other.map(view)},
  maintenance:{
    healthyOutsideCurrent:healthy([...stale,...other]).length,
    degradedTotal:rows.filter(s=>s.health==="DEGRADED").length,
    expiredEmbedsNeedingProof:other.filter(s=>s.playback==="EMBED"&&s.health==="HEALTHY").map(view)
  },
  note:"Advisory maintenance report only. It must not extend verification windows or promote a source. Current product surfaces still rely on the source-recency and playback-proof gates."
};
console.log(JSON.stringify(report,null,2));
