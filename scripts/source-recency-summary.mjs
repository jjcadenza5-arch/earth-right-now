import {readFile} from "node:fs/promises";
import {ageHours as sourceAgeHours,recencyState,verificationWindowHours} from "../src/source-recency.js";
import {recencyProviderDebt} from "../src/recency-provider-debt.js";

const rows=JSON.parse(await readFile(new URL("../data/sources.json",import.meta.url),"utf8"));
const now=new Date();
const stateOf=s=>recencyState(s,{now});
const current=rows.filter(s=>stateOf(s)==="CURRENT_CHECK");
const stale=rows.filter(s=>stateOf(s)==="STALE_CHECK");
const other=rows.filter(s=>!["CURRENT_CHECK","STALE_CHECK"].includes(stateOf(s)));
const healthy=xs=>xs.filter(s=>s.health==="HEALTHY");
const degraded=xs=>xs.filter(s=>s.health==="DEGRADED");
const embeds=xs=>xs.filter(s=>s.playback==="EMBED");
const ageHours=s=>{
  const raw=s.lastSuccessfulCheck||s.checkedAt||null,age=sourceAgeHours(raw,now);
  return Number.isFinite(age)?Number(age.toFixed(1)):null;
};
const view=s=>({
  id:s.id,title:s.title,provider:s.provider||null,truth:s.truth,playback:s.playback,health:s.health,
  checkedAt:s.lastSuccessfulCheck||s.checkedAt||null,
  recencyState:stateOf(s),ageHours:ageHours(s),windowHours:verificationWindowHours(s),
  failureReason:s.failureReason||null
});
const persistentDebtIds=new Set(["pattaya-city-live","tbilisi-mtkvari-river","chidori-sakura"]);
const recheckItems=stale.map(view),persistentDebtItems=recheckItems.filter(x=>persistentDebtIds.has(x.id)),routineRecheckItems=recheckItems.filter(x=>!persistentDebtIds.has(x.id)),outsideItems=other.map(view);
const debt=recencyProviderDebt([...recheckItems,...outsideItems]);
const expiredEmbedDebt=recencyProviderDebt(outsideItems.filter(s=>s.playback==="EMBED"));
const report={
  generatedAt:now.toISOString(),
  total:rows.length,
  current:{total:current.length,healthy:healthy(current).length,degraded:degraded(current).length,embeds:embeds(healthy(current)).length},
  recheckDue:{total:stale.length,healthy:healthy(stale).length,degraded:degraded(stale).length,persistentDebt:persistentDebtItems,routine:routineRecheckItems,items:recheckItems},
  outsideCurrentOrRecheck:{total:other.length,healthy:healthy(other).length,degraded:degraded(other).length,items:outsideItems},
  providerDebt:debt,
  expiredEmbedProviderDebt:expiredEmbedDebt,
  maintenance:{
    healthyOutsideCurrent:healthy([...stale,...other]).length,
    degradedTotal:rows.filter(s=>s.health==="DEGRADED").length,
    expiredEmbedsNeedingProof:other.filter(s=>s.playback==="EMBED"&&s.health==="HEALTHY").map(view),
    replacementResearchSuggested:Boolean(expiredEmbedDebt.concentrated&&expiredEmbedDebt.primary?.provider)
  },
  note:"Advisory maintenance report only. It must not extend verification windows or promote a source. Current product surfaces still rely on the source-recency and playback-proof gates."
};
console.log(JSON.stringify(report,null,2));
